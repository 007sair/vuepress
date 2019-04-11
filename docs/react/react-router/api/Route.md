# [Route](https://reacttraining.com/web/api/Route)

The Route component is perhaps the most important component in React Router to understand and learn to use well. Its most basic responsibility is to render some UI when a [location](https://reacttraining.com/web/api/location) matches the route’s `path`.

> `<Route>` 可能是 React Router 中最重要的组件，它可以帮助你理解和学习如何更好的使用 React Router。它最基本的职责是在其 path 属性与某个 location 匹配时呈现一些 UI。

Consider the following code:

> 请考虑以下代码：

```jsx
import { BrowserRouter as Router, Route } from "react-router-dom";

<Router>
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/news" component={NewsFeed} />
  </div>
</Router>;
```

If the location of the app is `/` then the UI hierarchy will be something like:

> 如果应用程序的位置是 `/`，那么 UI 的层次结构将会是：

```html
<div>
  <Home />
  <!-- react-empty: 2 -->
</div>
```

And if the location of the app is `/news` then the UI hierarchy will be:

> 如果应用程序的位置是 `/news`，那么 UI 的层次结构将会是：

```html
<div>
  <!-- react-empty: 1 -->
  <NewsFeed />
</div>
```

The “react-empty” comments are just implementation details of React’s `null` rendering. But for our purposes, it is instructive. A Route is always technically “rendered” even though its rendering `null`. As soon as the app location matches the route’s path, your component will be rendered.

> 其中 `react-empty` 注释只是 React 空渲染的实现细节。但对于我们的目的而言，它是有启发性的。路由始终在技术上被“渲染”，即使它的渲染为空。只要应用程序的位置匹配 `<Route>` 的 `path`，你的组件就会被渲染。

## [Route render methods](https://reacttraining.com/react-router/web/api/Route/route-render-methods)

There are 3 ways to render something with a `<Route>`:

> 使用 `<Route>` 渲染一些内容有以下三种方式：

- [`component`](https://reacttraining.com/react-router/web/api/Route/component)
- [`render-func`](https://reacttraining.com/react-router/web/api/Route/render-func)
- [`children-func`](https://reacttraining.com/react-router/web/api/Route/children-func)

Each is useful in different circumstances. You should use only one of these props on a given `<Route>`. See their explanations below to understand why you have 3 options. Most of the time you’ll use `component`.

> 在不同的情况下使用不同的方式。在指定的 `<Route>` 中，你应该只使用其中的一种。请参阅下面的解释，了解为什么有三个选项。大多数情况下你会使用 `component`。

## [Route props](https://reacttraining.com/react-router/web/api/Route/route-props)

All three [render methods](https://reacttraining.com/react-router/web/api/Route/route-render-methods) will be passed the same three route props

> 三种渲染方式都将提供相同的三个路由属性：

- [match](https://reacttraining.com/react-router/web/api/match)
- [location](https://reacttraining.com/react-router/web/api/location)
- [history](https://reacttraining.com/react-router/web/api/history)

## [component](https://reacttraining.com/web/api/Route/component)

A React component to render only when the location matches. It will be rendered with [route props](https://reacttraining.com/web/api/Route/route-props).

> 指定只有当位置匹配时才会渲染的 React 组件，该组件会接收 route props 作为属性。

```jsx
<Route path="/user/:username" component={User} />;

function User({ match }) {
  return <h1>Hello {match.params.username}!</h1>;
}
```

When you use `component` (instead of `render` or `children`, below) the router uses [`React.createElement`](https://facebook.github.io/react/docs/react-api.html#createelement) to create a new [React element](https://facebook.github.io/react/docs/rendering-elements.html) from the given component. That means if you provide an inline function to the `component`prop, you would create a new component every render. This results in the existing component unmounting and the new component mounting instead of just updating the existing component. When using an inline function for inline rendering, use the `render` or the `children` prop (below).

> 当你使用 `component`（而不是 `render` 或 `children`）时，Router 将根据指定的组件，使用 `React.createElement` 创建一个新的 React 元素。这意味着，如果你向 `component` 提供一个内联函数，那么每次渲染都会创建一个新组件。这将导致现有组件的卸载和新组件的安装，而不是仅仅更新现有组件。当使用内联函数进行内联渲染时，请使用 `render` 或 `children`（见下文）。

## [render: func](https://reacttraining.com/web/api/Route/render-func)

This allows for convenient inline rendering and wrapping without the undesired remounting explained above.

Instead of having a new [React element](https://facebook.github.io/react/docs/rendering-elements.html) created for you using the [`component`](https://reacttraining.com/web/api/Route/component)prop, you can pass in a function to be called when the location matches. The `render` prop receives all the same [route props](https://reacttraining.com/web/api/Route/route-props) as the `component` render prop.

> 使用 render 可以方便地进行内联渲染和包装，而无需进行上文解释的不必要的组件重装。
>
> 你可以传入一个函数，以在位置匹配时调用，而不是使用 component 创建一个新的 React 元素。render 渲染方式接收所有与 component 方式相同的 route props。

```jsx
// convenient inline rendering
<Route path="/home" render={() => <div>Home</div>}/>

// wrapping/composing
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

**Warning:** `<Route component>` takes precedence over `<Route render>` so don’t use both in the same `<Route>`.

> **警告：**`<Route component>` 优先于 `<Route render>`，因此不要在同一个 `<Route>` 中同时使用两者。

## [children: func](https://reacttraining.com/web/api/Route/children-func)

Sometimes you need to render whether the path matches the location or not. In these cases, you can use the function `children` prop. It works exactly like `render` except that it gets called whether there is a match or not.

The `children` render prop receives all the same [route props](https://reacttraining.com/web/api/Route/route-props) as the `component` and `render` methods, except when a route fails to match the URL, then `match` is `null`. This allows you to dynamically adjust your UI based on whether or not the route matches. Here we’re adding an `active` class if the route matches

> 有时候不论 path 是否匹配位置，你都想渲染一些内容。在这种情况下，你可以使用 children 属性。除了不论是否匹配它都会被调用以外，它的工作原理与 render 完全一样。
>
> children 渲染方式接收所有与 component 和 render 方式相同的 route props，除非路由与 URL 不匹配，不匹配时 match 为 null。这允许你可以根据路由是否匹配动态地调整用户界面。如下所示，如果路由匹配，我们将添加一个激活类:

```jsx
<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-else" />
</ul>;

const ListItemLink = ({ to, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? "active" : ""}>
        <Link to={to} {...rest} />
      </li>
    )}
  />
);
```

This could also be useful for animations:

> 这对动画也很有用：

```jsx
<Route children={({ match, ...rest }) => (
  {/* Animate will always render, so you can use lifecycles
      to animate its child in and out */}
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

**Warning:** Both `<Route component>` and `<Route render>` take precedence over `<Route children>` so don’t use more than one in the same `<Route>`.

> 警告：`<Route component>` 和 `<Route render>` 优先于 `<Route children>`，因此不要在同一个 `<Route>` 中同时使用多个。

## [path: string | string](https://reacttraining.com/web/api/Route/path-string-string)

Any valid URL path or array of paths that [`path-to-regexp@^1.7.0`](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)understands.

> 可以是 path-to-regexp 能够理解的任何有效的 URL 路径。

```jsx
<Route path="/users/:id" component={User} />
<Route path={["/users/:id", "/profile/:id"]} component={User} />
```

Routes without a `path` _always_ match.

> 没有定义 `path` 的 `<Route>` 总是会被匹配。

## [exact: bool](https://reacttraining.com/web/api/Route/exact-bool)

When `true`, will only match if the path matches the `location.pathname`_exactly_.

> 如果为 `true`，则只有在 `path` 完全匹配 `location.pathname` 时才匹配。

```jsx
<Route exact path="/one" component={About} />
```

|  path  | location.pathname |  exact  | matches? |
| :----: | :---------------: | :-----: | :------: |
| `/one` |    `/one/two`     | `true`  |    no    |
| `/one` |    `/one/two`     | `false` |   yes    |

## [strict: bool](https://reacttraining.com/web/api/Route/strict-bool)

When `true`, a `path` that has a trailing slash will only match a `location.pathname` with a trailing slash. This has no effect when there are additional URL segments in the `location.pathname`.

> 如果为 `true`，则具有尾部斜杠的 `path` 仅与具有尾部斜杠的 `location.pathname` 匹配。当 `location.pathname` 中有附加的 URL 片段时，`strict` 就没有效果了。

```jsx
<Route strict path="/one/" component={About} />
```

|  path   | location.pathname | matches? |
| :-----: | :---------------: | :------: |
| `/one/` |      `/one`       |    no    |
| `/one/` |      `/one/`      |   yes    |
| `/one/` |    `/one/two`     |   yes    |

**Warning:** `strict` can be used to enforce that a `location.pathname` has no trailing slash, but in order to do this both `strict` and `exact` must be `true`.

> **警告：**可以使用 `strict` 来强制规定 `location.pathname` 不能具有尾部斜杠，但是为了做到这一点，`strict` 和 `exact` 必须都是 `true`。

```jsx
<Route exact strict path="/one" component={About} />
```

|  path  | location.pathname | matches? |
| :----: | :---------------: | :------: |
| `/one` |      `/one`       |   yes    |
| `/one` |      `/one/`      |    no    |
| `/one` |    `/one/two`     |    no    |

## [location: object](https://reacttraining.com/web/api/Route/location-object)

A `<Route>` element tries to match its `path` to the current history location (usually the current browser URL). However, a [`location`](https://reacttraining.com/react-router/location.md) with a different `pathname` can also be passed for matching.

This is useful in cases when you need to match a `<Route>` to a location other than the current history location, as shown in the [Animated Transitions](https://reacttraining.com/react-router/web/example/animated-transitions)example.

If a `<Route>` element is wrapped in a `<Switch>` and matches the location passed to the `<Switch>` (or the current history location), then the `location`prop passed to `<Route>` will be overridden by the one used by the `<Switch>`(given [here](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/Switch.js#L51)).

> 一般情况下，`<Route>` 尝试将其 `path` 与当前历史位置（通常是当前的浏览器 URL）进行匹配。但是，也可以传递具有不同路径名的位置进行匹配。
>
> 当你需要将 `<Route>` 与当前历史位置以外的 `location` 进行匹配时，此功能非常有用。如[过渡动画](https://link.jianshu.com?t=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fexample%2Fanimated-transitions)示例中所示。
>
> 如果一个 `<Route>` 被包含在一个 `<Switch>` 中，并且需要匹配的位置（或当前历史位置）传递给了 `<Switch>`，那么传递给 `<Route>` 的 `location` 将被 `<Switch>` 所使用的 `location` 覆盖。

## [sensitive: bool](https://reacttraining.com/web/api/Route/sensitive-bool)

When `true`, will match if the path is **case sensitive**.

> 如果为 `true`，进行匹配时将区分大小写。

```jsx
<Route sensitive path="/one" component={About} />
```

|  path  | location.pathname | sensitive | matches? |
| :----: | :---------------: | :-------: | :------: |
| `/one` |      `/one`       |  `true`   |   yes    |
| `/One` |      `/one`       |  `true`   |    no    |
| `/One` |      `/one`       |  `false`  |   yes    |
