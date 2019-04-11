# [Router](https://reacttraining.com/web/api/Router)

The common low-level interface for all router components. Typically apps will use one of the high-level routers instead:

> 所有 Router 组件的通用低阶接口。通常情况下，应用程序只会使用其中一个高阶 Router：

- [`BrowserRouter`](https://reacttraining.com/web/api/BrowserRouter)
- [`HashRouter`](https://reacttraining.com/web/api/HashRouter)
- [`MemoryRouter`](https://reacttraining.com/web/api/MemoryRouter)
- [`NativeRouter`](https://reacttraining.com/native/api/NativeRouter)
- [`StaticRouter`](https://reacttraining.com/web/api/StaticRouter)

The most common use-case for using the low-level `<Router>` is to synchronize a custom history with a state management lib like Redux or Mobx. Note that this is not required to use state management libs alongside React Router, it’s only for deep integration.

> 使用低阶 `<Router>` 的最常见用例是同步一个自定义历史记录与一个状态管理库，比如 Redux 或 Mobx。请注意，将 React Router 和状态管理库一起使用并不是必需的，它仅用于深度集成。

```jsx
import { Router } from "react-router";
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

<Router history={history}>
  <App/>
</Router>
```

## [history: object](https://reacttraining.com/web/api/Router/history-object)

A [`history`](https://github.com/ReactTraining/history) object to use for navigation.

> 用于导航的历史记录对象。

```jsx
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

<Router history={customHistory} />;
```

## [children: node](https://reacttraining.com/web/api/Router/children-node)

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.

> 要渲染的单个子元素(组件)

```jsx
<Router>
  <App />
</Router>
```

# [StaticRouter](https://reacttraining.com/web/api/StaticRouter)

A [`Router`](https://reacttraining.com/react-router/Router.md) that never changes location.

This can be useful in server-side rendering scenarios when the user isn’t actually clicking around, so the location never actually changes. Hence, the name: static. It’s also useful in simple tests when you just need to plug in a location and make assertions on the render output.

Here’s an example node server that sends a 302 status code for [`Redirect`](https://reacttraining.com/react-router/Redirect.md)s and regular HTML for other requests:

> 一个永远不会改变位置的 `<Router>`。
>
> 这在服务器端渲染场景中非常有用，因为用户实际上没有点击，所以位置实际上并未发生变化。因此，名称是 `static`（静态的）。当你只需要插入一个位置，并在渲染输出上作出断言以便进行简单测试时，它也很有用。
>
> 以下是一个示例，node server 为 `<Redirect>` 发送 302 状态码，并为其它请求发送常规 HTML：

```jsx
import { createServer } from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";

createServer((req, res) => {
  // This context object contains the results of the render
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(html);
    res.end();
  }
}).listen(3000);
```

## [basename: string](https://reacttraining.com/web/api/StaticRouter/basename-string)

The base URL for all locations. A properly formatted basename should have a leading slash, but no trailing slash.

> 所有位置的基准 URL。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```jsx
<StaticRouter basename="/calendar">
  <Link to="/today"/> // renders <a href="/calendar/today">
</StaticRouter>
```

## [location: string](https://reacttraining.com/web/api/StaticRouter/location-string)

The URL the server received, probably `req.url` on a node server.

> 服务器收到的 URL，可能是 node server 上的 `req.url`。

```jsx
<StaticRouter location={req.url}>
  <App />
</StaticRouter>
```

## [location: object](https://reacttraining.com/web/api/StaticRouter/location-object)

A location object shaped like `{ pathname, search, hash, state }`

> 一个形如 `{pathname, search, hash, state}` 的位置对象。

```jsx
<StaticRouter location={{ pathname: "/bubblegum" }}>
  <App />
</StaticRouter>
```

## [context: object](https://reacttraining.com/web/api/StaticRouter/context-object)

A plain JavaScript object. During the render, components can add properties to the object to store information about the render.

> 一个普通的 JavaScript 对象。在渲染过程中，组件可以向对象添加属性以存储有关渲染的信息。

```jsx
const context = {}
<StaticRouter context={context}>
  <App />
</StaticRouter>
```

When a `<Route>` matches, it will pass the context object to the component it renders as the `staticContext` prop. Check out the [Server Rendering guide](https://reacttraining.com/web/guides/server-rendering)for more information on how to do this yourself.

After the render, these properties can be used to to configure the server’s response.

> 当一个 `<Route>` 匹配时，它将把 context 对象传递给呈现为 `staticContext` 的组件。查看[服务器渲染指南]以获取有关如何自行完成此操作的更多信息。
>
> 渲染之后，可以使用这些属性来配置服务器的响应。

```js
if (context.status === "404") {
  // ...
}
```

## [children: node](https://reacttraining.com/web/api/StaticRouter/children-node)

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.
