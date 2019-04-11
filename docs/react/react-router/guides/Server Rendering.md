# [Server Rendering](https://reacttraining.com/web/guides/server-rendering)

> 服务端渲染

Rendering on the server is a bit different since it’s all stateless. The basic idea is that we wrap the app in a stateless [`BrowserRouter`](https://reacttraining.com/web/api/StaticRouter) instead of a [`BrowserRouter`](https://reacttraining.com/web/api/BrowserRouter). We pass in the requested url from the server so the routes can match and a `context` prop we’ll discuss next.

> 在服务器上呈现有点不同，因为它都是无状态的。 基本的想法是我们将应用程序包装在无状态[`BrowserRouter`]而不是[`BrowserRouter`]中。 我们从服务器传入请求的URL，以便路由可以匹配，然后我们将讨论一个`context` prop。

```jsx
// client
<BrowserRouter>
  <App/>
</BrowserRouter>

// server (not the complete story)
<StaticRouter
  location={req.url}
  context={context}
>
  <App/>
</StaticRouter>
```

When you render a [`Redirect`](https://reacttraining.com/web/api/Redirect) on the client, the browser history changes state and we get the new screen. In a static server environment we can’t change the app state. Instead, we use the `context` prop to find out what the result of rendering was. If we find a `context.url`, then we know the app redirected. This allows us to send a proper redirect from the server.

> 当您在客户端上呈现[`Redirect`]时，浏览器历史记录会更改状态，我们将获得新屏幕。 在静态服务器环境中，我们无法更改应用程序状态。 相反，我们使用`context` prop来找出渲染的结果。 如果我们找到`context.url`，那么我们知道应用程序被重定向。 这允许我们从服务器发送适当的重定向。

```jsx
const context = {};
const markup = ReactDOMServer.renderToString(
  <StaticRouter location={req.url} context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // Somewhere a `<Redirect>` was rendered
  redirect(301, context.url);
} else {
  // we're good, send the response
}
```

## [Adding app specific context information](https://reacttraining.com/web/guides/server-rendering/adding-app-specific-context-information)

> 添加应用特定上下文信息

The router only ever adds `context.url`. But you may want some redirects to be 301 and others 302. Or maybe you’d like to send a 404 response if some specific branch of UI is rendered, or a 401 if they aren’t authorized. The context prop is yours, so you can mutate it. Here’s a way to distinguish between 301 and 302 redirects:

> 路由器只添加`context.url`。 但您可能希望某些重定向为301和其他302.或者您可能希望在呈现UI的某个特定分支时发送404响应，或者如果未授权则发送401。 上下文道具是你的，所以你可以改变它。 这是区分301和302重定向的一种方法：

```jsx
function RedirectWithStatus({ from, to, status }) {
  return (
    <Route
      render={({ staticContext }) => {
        // there is no `staticContext` on the client, so
        // we need to guard against that here
        if (staticContext) staticContext.status = status;
        return <Redirect from={from} to={to} />;
      }}
    />
  );
}

// somewhere in your app
function App() {
  return (
    <Switch>
      {/* some other routes */}
      <RedirectWithStatus status={301} from="/users" to="/profiles" />
      <RedirectWithStatus status={302} from="/courses" to="/dashboard" />
    </Switch>
  );
}

// on the server
const context = {};

const markup = ReactDOMServer.renderToString(
  <StaticRouter context={context}>
    <App />
  </StaticRouter>
);

if (context.url) {
  // can use the `context.status` that
  // we added in RedirectWithStatus
  redirect(context.status, context.url);
}
```

## [404, 401, or any other status](https://reacttraining.com/web/guides/server-rendering/404-401-or-any-other-status)

> 404, 401, 或者其他状态

We can do the same thing as above. Create a component that adds some context and render it anywhere in the app to get a different status code.

> 我们可以做同样的事情。 创建一个组件，添加一些上下文并在应用程序中的任何位置呈现它以获取不同的状态代码。

```jsx
function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}
```

Now you can render a `Status` anywhere in the app that you want to add the code to `staticContext`.

> 现在，您可以在应用程序中的任何位置呈现“状态”，以便将代码添加到“staticContext”。

```jsx
function NotFound() {
  return (
    <Status code={404}>
      <div>
        <h1>Sorry, can’t find that.</h1>
      </div>
    </Status>
  );
}

// somewhere else
<Switch>
  <Route path="/about" component={About} />
  <Route path="/dashboard" component={Dashboard} />
  <Route component={NotFound} />
</Switch>;
```

## [Putting it all together](https://reacttraining.com/web/guides/server-rendering/putting-it-all-together)

> 把它们放一起

This isn’t a real app, but it shows all of the general pieces you’ll need to put it all together.

> 这不是一个真正的应用程序，但它显示了将所有这些组合在一起所需的所有常规部分。

```jsx
import { createServer } from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

createServer((req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);
    res.end();
  }
}).listen(3000);
```

And then the client:

```jsx
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
```

## [Data Loading](https://reacttraining.com/web/guides/server-rendering/data-loading)

> 数据加载

There are so many different approaches to this, and there’s no clear best practice yet, so we seek to be composable with any approach, and not prescribe or lean toward one or the other. We’re confident the router can fit inside the constraints of your application.

The primary constraint is that you want to load data before you render. React Router exports the `matchPath` static function that it uses internally to match locations to routes. You can use this function on the server to help determine what your data dependencies will be before rendering.

The gist of this approach relies on a static route config used to both render your routes and match against before rendering to determine data dependencies.

> 有很多不同的方法，并没有明确的最佳实践，所以我们寻求可以用任何方法组合，而不是规定或倾向于一个或另一个。 我们相信路由器可以适应您的应用程序的限制。
>
> 主要约束是您希望在呈现之前加载数据。 React Router导出它在内部使用的`matchPath`静态函数，以匹配路由的位置。 您可以在服务器上使用此功能来帮助确定在呈现之前您的数据依赖项。
>
> 这种方法的要点依赖于静态路由配置，用于在呈现之前呈现路由并匹配以确定数据依赖性。

```js
const routes = [
  {
    path: "/",
    component: Root,
    loadData: () => getSomeData()
  }
  // etc.
];
```

Then use this config to render your routes in the app:

> 然后使用此配置在应用程序中呈现您的路线：

```jsx
import { routes } from "./routes";

function App() {
  return (
    <Switch>
      {routes.map(route => (
        <Route {...route} />
      ))}
    </Switch>
  );
}
```

Then on the server you’d have something like:

> 然后在服务器上你会有类似的东西：

```js
import { matchPath } from "react-router-dom";

// inside a request
const promises = [];
// use `some` to imitate `<Switch>` behavior of selecting only
// the first to match
routes.some(route => {
  // use `matchPath` here
  const match = matchPath(req.path, route);
  if (match) promises.push(route.loadData(match));
  return match;
});

Promise.all(promises).then(data => {
  // do something w/ the data so the client
  // can access it then render the app
});
```

And finally, the client will need to pick up the data. Again, we aren’t in the business of prescribing a data loading pattern for your app, but these are the touch points you’ll need to implement.

You might be interested in our [React Router Config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) package to assist with data loading and server rendering with static route configs.

> 最后，客户端需要获取数据。 同样，我们不是为您的应用程序规定数据加载模式的业务，但这些是您需要实现的接触点。
>
> 您可能对我们的[React Router Config]软件包感兴趣，以协助使用静态路由配置进行数据加载和服务器呈现。