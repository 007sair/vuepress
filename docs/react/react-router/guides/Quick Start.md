# [Quick Start](https://reacttraining.com/web/guides/quick-start)

> 快速入门

You’ll need a React web app to add `react-router`.

If you need to create one, the easiest way to get started is with a popular tool called [Create React App](https://github.com/facebook/create-react-app).

First install `create-react-app`, if you don’t already have it, and then make a new project with it.

> 你需要一个 React web 应用来添加 react-router
>
> 如果你需要创建一个web应用，最简单的方法是使用现在流行的工具 Create React App
>
> 首先安装`create-react-app`，如果你还没有，可以使用下面命令创建一个项目。

```sh
npm install -g create-react-app
create-react-app demo-app
cd demo-app
```

## [Installation](https://reacttraining.com/web/guides/quick-start/installation)

> 安装

React Router DOM is [published to npm](https://npm.im/react-router-dom) so you can install it with either `npm` or [`yarn`](https://yarnpkg.com/).

> React Router DOM 已经发布到 npm 上，所以你可以使用 npm 或者 yarn 命令安装它。

```sh
npm install react-router-dom
```

Copy/paste either of the examples (below) into your `src/App.js`.

> 复制/粘贴 下方代码示例到你的`src/App.js`中

## [Example: Basic Routing](https://reacttraining.com/web/guides/quick-start/example-basic-routing)

> 示例：基本路由

In this example we have 3 ‘Page’ Components handled by the `<Router>`.

Note: Instead of `<a href="/">` we use `<Link to="/">`.

> 在这个例子中，我们有3个'Page'组件由`<Router>`处理。
>
> 注意：使用`<Link to =“/”>`替代`<a href="/">`。

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;
```

## [Example: Nested Routing](https://reacttraining.com/web/guides/quick-start/example-nested-routing)

> 示例：嵌套路由

This example shows how nested routing works. The route `/topics` loads the `Topics` component, which renders any further `<Route>`'s conditionally on the paths `:id` value.

> 此示例展示了嵌套路由的工作原理。路由会通过`/topics`加载`Topics`组件，可通过添加条件`:id`值的方式进一步呈现。

```jsx
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topic({ match }) {
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => <h3>Please select a topic.</h3>}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;
```

Now you’re ready to tinker. Happy routing!