# [Basic Components](https://reacttraining.com/web/guides/basic-components)

There are three types of components in React Router: router components, route matching components, and navigation components.

All of the components that you use in a web application should be imported from `react-router-dom`.

> React Router 中有三种类型的组件：路由组件，路由匹配组件和导航组件。
>
> 您在 Web 应用程序中使用的所有组件都应从`react-router-dom`导入。

```js
import { BrowserRouter, Route, Link } from "react-router-dom";
```

## [Routers](https://reacttraining.com/web/guides/basic-components/routers)

At the core of every React Router application should be a router component. For web projects, `react-router-dom` provides `<BrowserRouter>` and `<HashRouter>` routers. Both of these will create a specialized `history`object for you. Generally speaking, you should use a `<BrowserRouter>` if you have a server that responds to requests and a `<HashRouter>` if you are using a static file server.

> 每个 React Router 应用程序的核心应该是路由组件。 对于 web 项目，`react-router-dom`提供`<BrowserRouter>`和`<HashRouter>`路由器。 这两个都将为您创建一个专门的“history”对象。 一般来说，如果你有一个响应请求的服务器，应该使用`BrowserRouter`。使用静态文件服务的时候使用`HashRouter`。

```jsx
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  holder
);
```

## [Route Matching](https://reacttraining.com/web/guides/basic-components/route-matching)

There are two route matching components: `<Route>` and `<Switch>`.

> 有两个路由匹配组件：`<Route>`和`<Switch>`。

```js
import { Route, Switch } from "react-router-dom";
```

Route matching is done by comparing a `<Route>`'s `path` prop to the current location’s `pathname`. When a `<Route>` matches it will render its content and when it does not match, it will render `null`. A `<Route>` with no path will always match.

> 路由匹配是通过将`<Route>`的`path`道具与当前位置的`pathname`进行比较来完成的。 当`<Route>`匹配时，它将呈现其内容，当它不匹配时，它将呈现“null”。 没有路径的`<Route>`总是匹配。

```jsx
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>
```

You can include a `<Route>` anywhere that you want to render content based on the location. It will often make sense to list a number of possible `<Route>`s next to each other. The `<Switch>` component is used to group `<Route>`s together.

> 您可以在任何想要根据位置呈现内容的位置包含`<Route>`。 列出一些可能的`<Route>`彼此相邻通常是有意义的。 `<Switch>`组件用于将`<Route>`组合在一起。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>
```

The `<Switch>` is not required for grouping `<Route>`'s, but it can be quite useful. A `<Switch>` will iterate over all of its children `<Route>` elements and only render the first one that matches the current location. This helps when multiple route’s paths match the same pathname, when animating transitions between routes, and in identifying when no routes match the current location (so that you can render a “404” component).

> 分组`<Route>`不需要`<Switch>`，但它非常有用。 一个`<Switch>`将迭代它的所有子`<Route>`元素，只渲染第一个匹配当前位置的元素。 当多个路径的路径匹配相同的路径名，动画路由之间的转换，以及识别何时没有路径与当前位置匹配时（这样您可以渲染“404”组件），这会有所帮助。

```jsx
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  {/* when none of the above match, <NoMatch> will be rendered */}
  <Route component={NoMatch} />
</Switch>
```

## [Route Rendering Props](https://reacttraining.com/web/guides/basic-components/route-rendering-props)

You have three prop choices for how you render a component for a given `<Route>`: `component`, `render`, and `children`. You can check out the [``documentation](https://reacttraining.com/web/api/Route) for more information on each one, but here we’ll focus on `component` and `render` because those are the two you will almost always use.

`component` should be used when you have an existing component (either a `React.Component` or a stateless functional component) that you want to render. `render`, which takes an inline function, should only be used when you have to pass in-scope variables to the component you want to render. You should **not** use the `component` prop with an inline function to pass in-scope variables because you will get undesired component unmounts/remounts.

> 对于给定的`<Route>`：`component`，`render`和`children`呈现组件，你有三个 prop 选择。 您可以查看[``documentation]（https://reacttraining.com/web/api/Route）以获取有关每一个的更多信息，但在这里我们将重点关注`component`和`render`，因为它们是 两个你几乎总是会用。
>
> 当你有一个想要渲染的现有组件（一个“React.Component”或一个无状态功能组件）时，应该使用`component`。 只有当您必须将范围内变量传递给要渲染的组件时，才应使用带有内联函数的`render`。 你不应该\*\*使用带有内联函数的`component` prop 来传递范围内变量，因为你会得到不需要的组件卸载/重新安装。

```jsx
const Home = () => <div>Home</div>;

const App = () => {
  const someVariable = true;

  return (
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* do not do this */}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```

## [Navigation](https://reacttraining.com/web/guides/basic-components/navigation)

React Router provides a `<Link>` component to create links in your application. Wherever you render a `<Link>`, an anchor (`<a>`) will be rendered in your application’s HTML.

> React Router 提供了一个`<Link>`组件来在您的应用程序中创建链接。 无论您在何处呈现`<Link>`，都会在应用程序的 HTML 中呈现锚点（`<a>`）。

```jsx
<Link to="/">Home</Link>
// <a href='/'>Home</a>
```

The `<NavLink>` is a special type of `<Link>` that can style itself as “active” when its `to` prop matches the current location.

> `<NavLink>`是一种特殊类型的`<Link>`，当它的`to`道具与当前位置匹配时，它可以自己设置为“活动”。

```jsx
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>
// <a href='/react' className='hurray'>React</a>
```

Any time that you want to force navigation, you can render a `<Redirect>`. When a `<Redirect>` renders, it will navigate using its `to` prop.

> 任何时候你想强制导航，你可以渲染一个`<Redirect>`。 当`<Redirect>`呈现时，它将使用其`to`道具进行导航。

```jsx
<Redirect to="/login" />
```
