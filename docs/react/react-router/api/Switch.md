# [Switch](https://reacttraining.com/web/api/Switch)

Renders the first child [`Route`](https://reacttraining.com/react-router/Route.md) or [`Redirect`](https://reacttraining.com/react-router/Redirect.md) that matches the location.

**How is this different than just using a bunch of `<Route>`s?**

`<Switch>` is unique in that it renders a route _exclusively_. In contrast, every `<Route>` that matches the location renders _inclusively_. Consider this code:

> 用于渲染与路径匹配的第一个子 `<Route>` 或 `<Redirect>`。
>
> 这与仅仅使用一系列 `<Route>` 有何不同？
>
> `<Switch>` 只会渲染一个路由。相反，仅仅定义一系列 `<Route>` 时，每一个与路径匹配的 `<Route>` 都将包含在渲染范围内。考虑如下代码：

```jsx
<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>
```

If the URL is `/about`, then `<About>`, `<User>`, and `<NoMatch>` will all render because they all match the path. This is by design, allowing us to compose `<Route>`s into our apps in many ways, like sidebars and breadcrumbs, bootstrap tabs, etc.

Occasionally, however, we want to pick only one `<Route>` to render. If we’re at `/about` we don’t want to also match `/:user` (or show our “404” page). Here’s how to do it with `Switch`:

> 如果 URL 是 `/about`，那么 `<About>`、`<User>` 和 `<NoMatch>` 将全部渲染，因为它们都与路径匹配。这是通过设计，允许我们以很多方式将 `<Route>` 组合成我们的应用程序，例如侧边栏和面包屑、引导标签等。
>
> 但是，有时候我们只想选择一个 `<Route>` 来呈现。比如我们在 URL 为 `/about` 时不想匹配 `/:user`（或者显示我们的 404 页面），这该怎么实现呢？以下就是如何使用 `<Switch>` 做到这一点：

```jsx
import { Switch, Route } from "react-router";

<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/:user" component={User} />
  <Route component={NoMatch} />
</Switch>;
```

Now, if we’re at `/about`, `<Switch>` will start looking for a matching `<Route>`. `<Route path="/about"/>` will match and `<Switch>` will stop looking for matches and render `<About>`. Similarly, if we’re at `/michael` then `<User>` will render.

This is also useful for animated transitions since the matched `<Route>` is rendered in the same position as the previous one.

> 现在，当我们在 `/about` 路径时，`<Switch>` 将开始寻找匹配的 `<Route>`。我们知道，`<Route path="/about" />` 将会被正确匹配，这时 `<Switch>` 会停止查找匹配项并立即呈现 `<About>`。同样，如果我们在 `/michael` 路径时，那么 `<User>` 会呈现。
>
> 这对于动画转换也很有用，因为匹配的 `<Route>` 与前一个渲染位置相同。

```jsx
<Fade>
  <Switch>
    {/* there will only ever be one child here */}
    <Route/>
    <Route/>
  </Switch>
</Fade>

<Fade>
  <Route/>
  <Route/>
  {/* there will always be two children here,
      one might render null though, making transitions
      a bit more cumbersome to work out */}
</Fade>
```

## [location: object](https://reacttraining.com/web/api/Switch/location-object)

A [`location`](https://reacttraining.com/web/api/location) object to be used for matching children elements instead of the current history location (usually the current browser URL).

> 用于匹配子元素而不是当前历史位置（通常是当前的浏览器 URL）的 location 对象。

## [children: node](https://reacttraining.com/web/api/Switch/children-node)

All children of a `<Switch>` should be `<Route>` or `<Redirect>` elements. Only the first child to match the current location will be rendered.

`<Route>` elements are matched using their `path` prop and `<Redirect>`elements are matched using their `from` prop. A `<Route>` with no `path` prop or a `<Redirect>` with no `from` prop will always match the current location.

When you include a `<Redirect>` in a `<Switch>`, it can use any of the `<Route>`'s location matching props: `path`, `exact`, and `strict`. `from` is just an alias for the `path` prop.

If a `location` prop is given to the `<Switch>`, it will override the `location`prop on the matching child element.

> 所有 `<Switch>` 的子元素都应该是 `<Route>` 或 `<Redirect>`。只有第一个匹配当前路径的子元素将被呈现。
>
> `<Route>` 组件使用 `path` 属性进行匹配，而 `<Redirect>` 组件使用它们的 `from` 属性进行匹配。没有 `path` 属性的 `<Route>` 或者没有 `from` 属性的 `<Redirect>` 将始终与当前路径匹配。
>
> 当在 `<Switch>` 中包含 `<Redirect>` 时，你可以使用任何 `<Route>` 拥有的路径匹配属性：`path`、`exact` 和 `strict`。`from` 只是 `path` 的别名。
>
> 如果给 `<Switch>` 提供一个 `location` 属性，它将覆盖匹配的子元素上的 `location` 属性。

```jsx
<Switch>
  <Route exact path="/" component={Home} />

  <Route path="/users" component={Users} />
  <Redirect from="/accounts" to="/users" />

  <Route component={NoMatch} />
</Switch>
```
