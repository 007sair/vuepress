# [Redirect](https://reacttraining.com/web/api/Redirect)

Rendering a `<Redirect>` will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.

> 使用 `<Redirect>` 会导航到一个新的位置。新的位置将覆盖历史堆栈中的当前条目，例如服务器端重定向（HTTP 3xx）。

```jsx
import { Route, Redirect } from "react-router";

<Route
  exact
  path="/"
  render={() => (loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />)}
/>;
```

## [to: string](https://reacttraining.com/web/api/Redirect/to-string)

The URL to redirect to. Any valid URL path that [`path-to-regexp@^1.7.0`](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)understands. All URL parameters that are used in `to` must be covered by `from`.

> 要重定向到的 URL，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有要使用的 URL 参数必须由 from 提供。

```jsx
<Redirect to="/somewhere/else" />
```

## [to: object](https://reacttraining.com/web/api/Redirect/to-object)

A location to redirect to. `pathname` can be any valid URL path that [`path-to-regexp@^1.7.0`](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) understands.

> 要重定向到的位置，其中 pathname 可以是 path-to-regexp 能够理解的任何有效的 URL 路径。

```jsx
<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>
```

The `state` object can be accessed via `this.props.location.state` in the redirected-to component. This new `referrer` key (which is not a special name) would then be accessed via `this.props.location.state.referrer`in the `Login` component pointed to by the pathname `'/login'`

> 上例中的 `state` 对象可以在重定向到的组件中通过 `this.props.location.state` 进行访问。而 `referrer` 键（不是特殊名称）将通过路径名 `/login` 指向的登录组件中的 `this.props.location.state.referrer` 进行访问。

## [push: bool](https://reacttraining.com/web/api/Redirect/push-bool)

When `true`, redirecting will push a new entry onto the history instead of replacing the current one.

> 如果为 `true`，重定向会将新的位置推入历史记录，而不是替换当前条目。

```jsx
<Redirect push to="/somewhere/else" />
```

## [from: string](https://reacttraining.com/web/api/Redirect/from-string)

A pathname to redirect from. Any valid URL path that [`path-to-regexp@^1.7.0`](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) understands. All matched URL parameters are provided to the pattern in `to`. Must contain all parameters that are used in `to`. Additional parameters not used by `to` are ignored.

This can only be used to match a location when rendering a `<Redirect>`inside of a `<Switch>`. See [`children-node`](https://reacttraining.com/web/api/Switch/children-node) for more details.

> 要从中进行重定向的路径名，可以是 path-to-regexp 能够理解的任何有效的 URL 路径。所有匹配的 URL 参数都会提供给 to，必须包含在 to 中用到的所有参数，to 未使用的其它参数将被忽略。
>
> 只能在 `<Switch>` 组件内使用 `<Redirect from>`，以匹配一个位置。有关更多细节，请参阅 `<Switch children>`。

```jsx
<Switch>
  <Redirect from='/old-path' to='/new-path'/>
  <Route path='/new-path' component={Place}/>
</Switch>

// Redirect with matched parameters
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id'/>
  <Route path='/users/profile/:id' component={Profile}/>
</Switch>
```

## [exact: bool](https://reacttraining.com/web/api/Redirect/exact-bool)

Match `from` exactly; equivalent to [Route.exact](https://reacttraining.com/web/api/Route/exact-bool).

> 完全匹配，相当于 Route.exact

## [strict: bool](https://reacttraining.com/web/api/Redirect/strict-bool)

Match `from` strictly; equivalent to [Route.strict](https://reacttraining.com/web/api/Route/strict-bool).

> 严格匹配，相当于 Route.strict。
