# [match](https://reacttraining.com/web/api/match)

A `match` object contains information about how a `<Route path>` matched the URL. `match` objects contain the following properties:

- `params` - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
- `isExact` - (boolean) `true` if the entire URL was matched (no trailing characters)
- `path` - (string) The path pattern used to match. Useful for building nested `<Route>`s
- `url` - (string) The matched portion of the URL. Useful for building nested `<Link>`s

> `match`对象包含有关`<Route path>`如何与 URL 匹配的信息。 `match`对象包含以下属性：
>
> - `params` - （object）从对应于路径动态段的 URL 解析的键/值对
> - `isExact` - （boolean）`true`如果整个 URL 匹配（没有尾随字符）
> - `path` - （字符串）用于匹配的路径模式。 用于构建嵌套的`<Route>`
> - `url` - （字符串）URL 的匹配部分。 用于构建嵌套的`<Link>`

You’ll have access to `match` objects in various places:

> 你可以在不同的地方访问`match`对象：

- [Route component](https://reacttraining.com/web/api/Route/component) as `this.props.match`
- [Route render](https://reacttraining.com/web/api/Route/render-func) as `({ match }) => ()`
- [Route children](https://reacttraining.com/web/api/Route/children-func) as `({ match }) => ()`
- [withRouter](https://reacttraining.com/web/api/withRouter) as `this.props.match`
- [matchPath](https://reacttraining.com/web/api/matchPath) as the return value

If a Route does not have a `path`, and therefore always matches, you’ll get the closest parent match. Same goes for `withRouter`.

> 如果 Route 没有`path`，因此总是匹配，那么你将获得最接近的父匹配。 同样适用于`withRouter`。

## [null matches](https://reacttraining.com/web/api/match/null-matches)

A `<Route>` that uses the `children` prop will call its `children` function even when the route’s `path` does not match the current location. When this is the case, the `match` will be `null`. Being able to render a `<Route>`'s contents when it does match can be useful, but certain challenges arise from this situation.

The default way to “resolve” URLs is to join the `match.url` string to the “relative” path.

> 使用`children` prop 的`<Route>`将调用其`children`函数，即使路径的`path`与当前位置不匹配。 在这种情况下，`match`将为'null'。 能够在匹配时呈现`<Route>`的内容可能很有用，但是这种情况会产生某些挑战。
>
> “解析”URL 的默认方法是将`match.url`字符串加入“relative”路径。

```js
`${match.url}/relative-path`;
```

If you attempt to do this when the match is `null`, you will end up with a `TypeError`. This means that it is considered unsafe to attempt to join “relative” paths inside of a `<Route>` when using the `children` prop.

A similar, but more subtle situation occurs when you use a pathless `<Route>`inside of a `<Route>` that generates a `null` match object.

> 如果在匹配为“null”时尝试执行此操作，则最终会出现“TypeError”。 这意味着在使用`children` prop 时尝试连接`<Route>`内的“相对”路径被认为是不安全的。
>
> 当你在生成“null”匹配对象的`<Route>`中使用无路径`<Route>`时，会发生类似但更微妙的情况。

```js
// location.pathname = '/matches'
<Route path='/does-not-match' children={({ match }) => (
  // match === null
  <Route render={({ match:pathlessMatch }) => (
    // pathlessMatch === ???
  )}/>
)}/>
```

Pathless `<Route>`s inherit their `match` object from their parent. If their parent `match` is `null`, then their match will also be `null`. This means that a) any child routes/links will have to be absolute because there is no parent to resolve with and b) a pathless route whose parent `match` can be `null` will need to use the `children` prop to render.

> 无路径的`<Route>`从父节点继承它们的`match`对象。 如果他们的父`match`是'null`，那么他们的匹配也将是'null`。 这意味着 a）任何子路由/链接必须是绝对的，因为没有父亲可以解决，而 b）父路径匹配为`null`的无路径路由将需要使用`children` prop 来渲染。
