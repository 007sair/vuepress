# [Redux Integration](https://reacttraining.com/core/guides/redux-integration)

> Redux 集成

Redux is an important part of the React ecosystem. We want to make the integration of React Router and Redux as seamless as possible for people wanting to use both.

> Redux是React生态系统的重要组成部分。 我们希望将React Router和Redux的集成尽可能无缝地集成到想要同时使用它们的人们身上。

## [Blocked Updates](https://reacttraining.com/core/guides/redux-integration/blocked-updates)

> 被阻止的更新

Generally, React Router and Redux work just fine together. Occasionally though, an app can have a component that doesn’t update when the location changes (child routes or active nav links don’t update).

> 通常，React Router和Redux可以很好地协同工作。 有时，应用程序可能有一个组件在位置更改时不会更新（子路由或活动导航链接不会更新）。

This happens if:

1. The component is connected to redux via `connect()(Comp)`.
2. The component is **not** a “route component”, meaning it is not rendered like so: `<Route component={SomeConnectedThing}/>`

> 这种情况发生在：
>
> 1.组件通过`connect（）（Comp）`连接到redux。
> 2.组件**不是“路由组件”，意味着它不是这样呈现的：`<Route component = {SomeConnectedThing} />`

The problem is that Redux implements `shouldComponentUpdate` and there’s no indication that anything has changed if it isn’t receiving props from the router. This is straightforward to fix. Find where you `connect` your component and wrap it in `withRouter`.

> 问题是Redux实现了`shouldComponentUpdate`，如果它没有从路由器接收道具，则没有任何迹象表明有任何改变。 这很容易解决。 找到你“连接”组件的位置并将其包装在`withRouter`中。

```js
// before
export default connect(mapStateToProps)(Something)

// after
import { withRouter } from 'react-router-dom'
export default withRouter(connect(mapStateToProps)(Something))
```

## [Deep integration](https://reacttraining.com/core/guides/redux-integration/deep-integration)

> 深度集成

Some folks want to:

1. Synchronize the routing data with, and accessed from, the store.
2. Be able to navigate by dispatching actions.
3. Have support for time travel debugging for route changes in the Redux devtools.

All of this requires deeper integration.

> 有些人想：
>
> 1.将路由数据与商店同步，并从商店访问。
> 2.能够通过调度操作进行导航。
> 3.支持Redux devtools中路由更改的时间旅行调试。
>
> 所有这些都需要更深入的整合。

Our recommendation is **not to keep your routes in your Redux store at all**. Reasoning:

1. Routing data is already a prop of most of your components that care about it. Whether it comes from the store or the router, your component’s code is largely the same.
2. In most cases, you can use `Link`, `NavLink` and `Redirect` to perform navigation actions. Sometimes you might also need to navigate programmatically, after some asynchronous task that was originally initiated by an action. For example, you might dispatch an action when the user submits a login form. Your [thunk](https://github.com/reduxjs/redux-thunk), [saga](https://redux-saga.js.org/) or other async handler then authenticates the credentials, *then* it needs to somehow navigate to a new page if successful. The solution here is simply to include the `history` object (provided to all route components) in the payload of the action, and your async handler can use this to navigate when appropriate.
3. Route changes are unlikely to matter for time travel debugging. The only obvious case is to debug issues with your router/store synchronization, and this problem goes away if you don’t synchronize them at all.

But if you feel strongly about synchronizing your routes with your store, you may want to try [Connected React Router](https://github.com/supasate/connected-react-router), a third party binding for React Router v4 and Redux.

> 我们的建议是**不要将您的路线保留在您的Redux商店**。推理：
>
> 1.路由数据已经是大多数关心它的组件的支柱。无论是来自商店还是路由器，您的组件代码都大致相同。
> 2.在大多数情况下，您可以使用`Link`，`NavLink`和`Redirect`来执行导航操作。有时您可能还需要在最初由操作启动的某个异步任务之后以编程方式导航。例如，您可以在用户提交登录表单时调度操作。您的[thunk]（https://github.com/reduxjs/redux-thunk），[saga]（https://redux-saga.js.org/）或其他异步处理程序然后验证凭据，*然后*它如果成功，需要以某种方式导航到新页面。这里的解决方案只是在操作的有效负载中包含`history`对象（提供给所有路由组件），并且异步处理程序可以在适当时使用它来导航。
> 路线变更不太可能对时间旅行调试有影响。唯一明显的情况是调试路由器/存储同步的问题，如果你根本不同步这个问题就会消失。
>
> 但是如果你强烈想要将你的路线与你的商店同步，你可能想尝试[连接反应路由器]，第三方绑定React Router v4和Redux。