# [Dealing with Update Blocking](https://reacttraining.com/core/guides/dealing-with-update-blocking)

> 处理更新阻止

React Router has a number of location-aware components that use the current `location` object to determine what they render. By default, the current `location` is passed implicitly to components using React’s context model. When the location changes, those components should re-render using the new `location` object from the context.

React provides two approaches to optimize the rendering performance of applications: the `shouldComponentUpdate` lifecycle method and the `PureComponent`. Both block the re-rendering of components unless the right conditions are met. Unfortunately, this means that React Router’s location-aware components can become out of sync with the current location if their re-rendering was prevented.

> React Router有许多位置感知组件，它们使用当前的`location`对象来确定它们呈现的内容。 默认情况下，使用React的上下文模型将当前`location`隐式传递给组件。 当位置发生变化时，这些组件应使用上下文中的新“location”对象重新渲染。
>
> React提供了两种优化应用程序渲染性能的方法：`shouldComponentUpdate`生命周期方法和`PureComponent`。 除非满足正确的条件，否则两者都会阻止组件的重新渲染。 不幸的是，这意味着如果阻止重新渲染，React Router的位置感知组件可能会与当前位置不同步。

### Example of the Problem

We start out with a component that prevents updates.

> 我们从一个阻止更新的组件开始。

```js
class UpdateBlocker extends React.PureComponent {
  render() {
    return (
      <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/faq">F.A.Q.</NavLink>
      </div>
    );
  }
}
```

When the `<UpdateBlocker>` is mounting, any location-aware child components will use the current `location` and `match` objects to render.

> 当挂载`<UpdateBlocker>`时，任何位置感知的子组件都将使用当前的`location`和`match`对象进行渲染。

```jsx
// location = { pathname: '/about' }
<UpdateBlocker />
// <div>
//   <a href='/about' class='active'>About</a>
//   <a href='/faq'>F.A.Q.</a>
// </div>
```

When the location changes, the `<UpdateBlocker>` does not detect any prop or state changes, so its child components will not be re-rendered.

> 当位置发生变化时，`<UpdateBlocker>`不会检测到任何prop或状态更改，因此不会重新呈现其子组件。

```jsx
// location = { pathname: '/faq' }
<UpdateBlocker />
// the links will not re-render, so they retain their previous attributes
// <div>
//   <a href='/about' class='active'>About</a>
//   <a href='/faq'>F.A.Q.</a>
// </div>
```

### `shouldComponentUpdate`

In order for a component that implements `shouldComponentUpdate` to know that it *should* update when the location changes, its `shouldComponentUpdate` method needs to be able to detect location changes.

If you are implementing `shouldComponentUpdate` yourself, you *could*compare the location from the current and next `context.router` objects. However, as a user, you should not have to use context directly. Instead, it would be ideal if you could compare the current and next `location` without touching the context.

> 为了使实现`shouldComponentUpdate`的组件知道它*应该*在位置改变时更新，它的`shouldComponentUpdate`方法需要能够检测位置变化。
>
> 如果你自己实现`shouldComponentUpdate`，你*可以*比较当前和下一个`context.router`对象的位置。 但是，作为用户，您不必直接使用上下文。 相反，如果您可以在不触及上下文的情况下比较当前和下一个“位置”，那将是理想的。

#### Third-Party Code

You may run into issues with components not updating after a location change despite not calling `shouldComponentUpdate` yourself. This is most likely because `shouldComponentUpdate` is being called by third-party code, such as `react-redux`'s `connect` and `mobx-react`'s `observer`.

> 尽管没有自己调用`shouldComponentUpdate`，但是在位置更改后可能会遇到组件未更新的问题。 这很可能是因为`shouldComponentUpdate`被第三方代码调用，例如`react-redux`的`connect`和`mobx-react`的`observer`。

```js
// react-redux
const MyConnectedComponent = connect(mapStateToProps)(MyComponent);

// mobx-react
const MyObservedComponent = observer(MyComponent);
```

With third-party code, you likely cannot even control the implementation of `shouldComponentUpdate`. Instead, you will have to structure your code to make location changes obvious to those methods.

Both `connect` and `observer` create components whose `shouldComponentUpdate` methods do a shallow comparison of their current `props` and their next `props`. Those components will only re-render when at least one prop has changed. This means that in order to ensure they update when the location changes, they will need to be given a prop that changes when the location changes.

> 使用第三方代码，您甚至可能无法控制`shouldComponentUpdate`的实现。 相反，您必须构建代码以使位置更改对这些方法显而易见。
>
> `connect`和`observer`都创建了`shouldComponentUpdate`方法对其当前`props`和下一个`props`进行浅层比较的组件。 只有当至少一个道具发生变化时，这些组件才会重新渲染。 这意味着为了确保在位置发生变化时更新，他们需要获得一个在位置发生变化时更改的道具。

### `PureComponent`

React’s `PureComponent` does not implement `shouldComponentUpdate`, but it takes a similar approach to preventing updates. When a “pure” component updates, it will do a shallow comparison of its current `props` and `state` to the next `props` and `state`. If the comparison does not detect any differences, the component will not update. Like with `shouldComponentUpdate`, that means that in order to force a “pure” component to update when the location changes, it needs to have a prop or state that has changed.

> React的`PureComponent`没有实现`shouldComponentUpdate`，但它采取了类似的方法来阻止更新。 当一个“纯”组件更新时，它将对其当前的`props`和`state`进行浅层比较，然后与下一个`props`和`state`进行比较。 如果比较未检测到任何差异，则组件将不会更新。 与`shouldComponentUpdate`一样，这意味着为了在位置更改时强制“纯”组件更新，它需要具有已更改的prop或state。

### The Solution

> 解决方案

#### Quick Solution

If you are running into this issue while using a higher-order component like `connect` (from react-redux) or `observer` (from Mobx), you can just wrap that component in a `withRouter` to remove the blocked updates.

> 如果你在使用更高阶的组件（例如`connect`（来自react-redux）或`observer`（来自Mobx））时遇到这个问题，你可以将该组件包装在`withRouter`中以删除被阻止的更新。

```javascript
// redux before
const MyConnectedComponent = connect(mapStateToProps)(MyComponent);
// redux after
const MyConnectedComponent = withRouter(connect(mapStateToProps)(MyComponent));

// mobx before
const MyConnectedComponent = observer(MyComponent);
// mobx after
const MyConnectedComponent = withRouter(observer(MyComponent));
```

**This is not the most efficient solution**, but will prevent the blocked updates issue. For more info regarding this solution, read the [Redux guide](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates). To understand why this is not the most optimal solution, read [this thread](https://github.com/ReactTraining/react-router/pull/5552#issuecomment-331502281).

> **这不是最有效的解决方案**，但会阻止阻止更新问题。 有关此解决方案的更多信息，请阅读[Redux指南]。 要理解为什么这不是最佳解决方案，请阅读[此主题]。

#### Recommended Solution

> 推荐解决方案

The key to avoiding blocked re-renders after location changes is to pass the blocking component the `location` object as a prop. This will be different whenever the location changes, so comparisons will detect that the current and next location are different.

> 在位置更改后避免阻塞重新渲染的关键是将阻止组件“location”对象作为prop传递。 每当位置改变时，这将是不同的，因此比较将检测当前和下一个位置是不同的。

```jsx
// location = { pathname: '/about' }
<UpdateBlocker location={location} />
// <div>
//   <a href='/about' class='active'>About</a>
//   <a href='/faq'>F.A.Q.</a>
// </div>

// location = { pathname: '/faq' }
<UpdateBlocker location={location} />
// <div>
//   <a href='/about'>About</a>
//   <a href='/faq' class='active'>F.A.Q.</a>
// </div>
```

#### Getting the location

> 获取位置

In order to pass the current `location` object as a prop to a component, you must have access to it. The primary way that a component can get access to the `location` is via a `<Route>` component. When a `<Route>` matches (or always if you are using the `children` prop), it passes the current `location`to the child element it renders.

> 为了将当前`location`对象作为prop传递给组件，您必须有权访问它。 组件可以访问`location`的主要方式是通过`<Route>`组件。 当`<Route>`匹配时（或者总是使用`children` prop），它将当前的`location`传递给它呈现的子元素。

```jsx
<Route path='/here' component={Here}/>
const Here = (props) => {
  // props.location = { pathname: '/here', ... }
  return <div>You are here</div>
}

<Route path='/there' render={(props) => {
  // props.location = { pathname: '/there', ... }
  return <div>You are there</div>
}}/>

<Route path='/everywhere' children={(props) => {
  // props.location = { pathname: '/everywhere', ... }
  return <div>You are everywhere</div>
}}/>
```

This means that given a component that blocks updates, you can easily pass it the `location` as a prop in the following ways:

> 这意味着给定一个阻止更新的组件，您可以通过以下方式轻松地将`location`作为prop传递：

```jsx
// the Blocker is a "pure" component, so it will only
// update when it receives new props
class Blocker extends React.PureComponent {
  render() {
    return (
      <div>
        <NavLink to="/oz">Oz</NavLink>
        <NavLink to="/kansas">Kansas</NavLink>
      </div>
    );
  }
}
```

1. A component rendered directly by a `<Route>` does not have to worry about blocked updates because it has the `location` injected as a prop.

   > 由`<Route>`直接呈现的组件不必担心阻塞的更新，因为它将`location`注入为prop。

```jsx
// The <Blocker>'s location prop will change whenever
// the location changes
<Route path="/:place" component={Blocker} />
```

2. A component rendered directly by a `<Route>` can pass that location prop to any child elements it creates.

   > 由`<Route>`直接呈现的组件可以将该位置prop传递给它创建的任何子元素。

```jsx
<Route path="/parent" component={Parent} />;

const Parent = props => {
  // <Parent> receives the location as a prop. Any child
  // element it creates can be passed the location.
  return (
    <SomeComponent>
      <Blocker location={props.location} />
    </SomeComponent>
  );
};
```

What happens when the component isn’t being rendered by a `<Route>` and the component rendering it does not have the `location` in its variable scope? There are two approaches that you can take to automatically inject the `location` as a prop of your component.

> 当组件没有被`<Route>`渲染并且渲染它的组件在其变量范围内没有`location`时会发生什么？ 有两种方法可以自动将“位置”作为组件的支柱注入。

1. Render a pathless `<Route>`. While `<Route>`s are typically used for matching a specific path, a pathless `<Route>` will always match, so it will always render its component.

   > 渲染一个无路径的`<Route>`。 虽然`<Route>`通常用于匹配特定路径，但无路径`<Route>`将始终匹配，因此它将始终呈现其组件。

```jsx
// pathless <Route> = <Blocker> will always be rendered
const MyComponent = () => (
  <SomeComponent>
    <Route component={Blocker} />
  </SomeComponent>
);
```

2. You can wrap a component with the `withRouter` higher-order component and it will be given the current `location` as one of its props.

   > 你可以用`withRouter`高阶组件包装一个组件，它将被赋予当前的`location`作为它的一个道具。

```jsx
// internally, withRouter just renders a pathless <Route>
const BlockAvoider = withRouter(Blocker);

const MyComponent = () => (
  <SomeComponent>
    <BlockAvoider />
  </SomeComponent>
);
```