# [location](https://reacttraining.com/web/api/location)

Locations represent where the app is now, where you want it to go, or even where it was. It looks like this:

> 位置代表应用程序现在的位置，您希望它去的位置，甚至是它的位置。 它看起来像这样：

```js
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

The router will provide you with a location object in a few places:

- [Route component](https://reacttraining.com/web/api/Route/component) as `this.props.location`
- [Route render](https://reacttraining.com/web/api/Route/render-func) as `({ location }) => ()`
- [Route children](https://reacttraining.com/web/api/Route/children-func) as `({ location }) => ()`
- [withRouter](https://reacttraining.com/web/api/withRouter) as `this.props.location`

> 路由器将在几个地方为您提供位置对象：
>
>  -  [Route component]为`this.props.location`
>  -  [Route render]为`（{location}）=>（）`
>  -  [路由子项]为`（{location}）=>（）`
>  -  [withRouter]为`this.props.location`

It is also found on `history.location` but you shouldn’t use that because its mutable. You can read more about that in the [history](https://reacttraining.com/web/api/history) doc.

A location object is never mutated so you can use it in the lifecycle hooks to determine when navigation happens, this is really useful for data fetching and animation.

> 它也可以在`history.location`中找到，但你不应该使用它，因为它是可变的。 您可以在[history] doc中阅读更多相关信息。
>
> 位置对象永远不会发生变异，因此您可以在生命周期挂钩中使用它来确定导航何时发生，这对于数据获取和动画非常有用。

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // navigated!
  }
}
```

You can provide locations instead of strings to the various places that navigate:

> 您可以为导航的各个位置提供位置而不是字符串：

- Web [Link to](https://reacttraining.com/web/api/Link/to)
- Native [Link to](https://reacttraining.com/native/api/Link/to)
- [Redirect to](https://reacttraining.com/web/api/Redirect/to)
- [history.push](https://reacttraining.com/web/api/history/push)
- [history.replace](https://reacttraining.com/web/api/history/push)

Normally you just use a string, but if you need to add some “location state” that will be available whenever the app returns to that specific location, you can use a location object instead. This is useful if you want to branch UI based on navigation history instead of just paths (like modals).

> 通常，您只需使用字符串，但如果您需要添加一些“位置状态”，只要应用程序返回到该特定位置，该状态就可用，您可以使用位置对象。 如果您想基于导航历史记录而不仅仅是路径（如模态）来分支UI，这将非常有用。

```jsx
// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

Finally, you can pass a location to the following components:

- [Route](https://reacttraining.com/web/api/Route/location)
- [Switch](https://reacttraining.com/web/api/Switch/location)

This will prevent them from using the actual location in the router’s state. This is useful for animation and pending navigation, or any time you want to trick a component into rendering at a different location than the real one.

> 最后，您可以将位置传递给以下组件：
>
>  -  Route
>  -  Switch
>
> 这将阻止他们使用路由器状态中的实际位置。 这对于动画和待定导航很有用，或者您想要将组件欺骗渲染到与真实位置不同的位置时。