# [withRouter](https://reacttraining.com/web/api/withRouter)

You can get access to the [`history`](https://reacttraining.com/web/api/history) object’s properties and the closest [`Route`](https://reacttraining.com/web/api/Route)'s [`match`](https://reacttraining.com/web/api/match) via the `withRouter` higher-order component. `withRouter`will pass updated `match`, `location`, and `history` props to the wrapped component whenever it renders.

> 您可以通过`withRouter`高阶组件访问[`history`]对象的属性和最近的[`Route`]的[`match`]。 `withRouter`会在呈现时将更新的`match`，`location`和`history` props传递给包装组件。

```jsx
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

// A simple component that shows the pathname of the current location
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    const { match, location, history } = this.props;

    return <div>You are now at {location.pathname}</div>;
  }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const ShowTheLocationWithRouter = withRouter(ShowTheLocation);
```

#### Important Note

> 重要的提示

`withRouter` does not subscribe to location changes like React Redux’s `connect` does for state changes. Instead, re-renders after location changes propagate out from the `<Router>` component. This means that `withRouter`does *not* re-render on route transitions unless its parent component re-renders. If you are using `withRouter` to prevent updates from being blocked by `shouldComponentUpdate`, it is important that `withRouter` wraps the component that implements `shouldComponentUpdate`. For example, when using Redux:

> `withRouter`没有订阅像React Redux的`connect`那样的状态变化的位置变化。 相反，位置更改后重新呈现从`<Router>`组件传播出去。 这意味着`withRouter`does *不会*在路由转换时重新呈现，除非其父组件重新呈现。 如果你使用`withRouter`来防止更新被`shouldComponentUpdate`阻塞，那么`withRouter`包装实现`shouldComponentUpdate`的组件是很重要的。 例如，使用Redux时：

```js
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))
// or
compose(
  withRouter,
  connect(...)
)(MyComponent)

// This does not
connect(...)(withRouter(MyComponent))
// nor
compose(
  connect(...),
  withRouter
)(MyComponent)
```

See [this guide](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md) for more information.

#### Static Methods and Properties

> 静态方法和属性

All non-react specific static methods and properties of the wrapped component are automatically copied to the "connected" component.

> 包装组件的所有“non-react”特定静态方法和属性将自动复制到“已连接”组件。

## [Component.WrappedComponent](https://reacttraining.com/web/api/withRouter/componentwrappedcomponent)

The wrapped component is exposed as the static property `WrappedComponent` on the returned component, which can be used for testing the component in isolation, among other things.

> 被包装的组件在返回的组件上作为静态属性`WrappedComponent`公开，可以用于单独测试组件等。

```jsx
// MyComponent.js
export default withRouter(MyComponent)

// MyComponent.test.js
import MyComponent from './MyComponent'
render(<MyComponent.WrappedComponent location={{...}} ... />)
```

## [wrappedComponentRef: func](https://reacttraining.com/web/api/withRouter/wrappedcomponentref-func)

A function that will be passed as the `ref` prop to the wrapped component.

> 一个函数，它将作为`ref` prop传递给包装组件。

```jsx
class Container extends React.Component {
  componentDidMount() {
    this.component.doSomething();
  }

  render() {
    return <MyComponent wrappedComponentRef={c => (this.component = c)} />;
  }
}
```