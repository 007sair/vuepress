---
sidebarDepth: 1
---

# 高级指南

## 可访问性(a11y)

- JSX 完全支持所有的`aria-*` HTML 属性。然而，在 React 中大部分 DOM 属性和特性采用驼峰命名规则。

- Fragment。短语法

  ```jsx
  function ListItem({ item }) {
    return (
      <>
        <dt>{item.term}</dt>
        <dd>{item.description}</dd>
      </>
    );
  }
  ```

## 代码拆分(Code Splitting)

### import

```jsx
// before
import { add } from "./math.js";

// after
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

### React.lazy

> 注意：
>
> `React.lazy` 和 Suspense 尚不可用于服务器端渲染。如果要在服务器渲染的应用程序中进行代码拆分，我们建议使用 [Loadable Components](https://github.com/smooth-code/loadable-components) 。它有一个很好的[服务器端渲染打包拆分指南](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md)。

`React.lazy` 函数允许您渲染动态导入为常规组件。

```jsx
// before
import OtherComponent from "./OtherComponent";

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}

// after
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

当渲染此组件时，这将自动加载包含 `OtherComponent` 包。

`React.lazy` 接受一个函数，必须调用动态 `import()` 。 这必须返回一个 `Promise` ，它 resolves 为一个带有包含 React 组件的 `default` 导出的模块。

#### Suspense

如果在 `MyComponent` 渲染时尚未加载包含 `OtherComponent` 的模块，我们必须在等待加载时显示一些后备内容 - 例如加载指示符。 这是使用`Suspense` 组件完成的。

```jsx
const OtherComponent = React.lazy(() => import("./OtherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`fallback` prop（属性） 接受在等待加载组件时要渲染的任何 React 元素。 您可以将 `Suspense` 组件放在惰性组件上方的任何位置。 您甚至可以使用一个 `Suspense` 组件包装多个惰性组件。

#### 错误边界

如果其他模块无法加载（例如，由于网络故障），则会触发错误。 您可以使用 [错误边界](http://react.html.cn/docs/error-boundaries.html) 处理这些错误以显示良好的用户体验并管理恢复。 一旦创建了错误边界，就可以在惰性组件上方的任何位置使用它，以便在出现网络错误时显示错误状态。

```jsx
import MyErrorBoundary from "./MyErrorBoundary";
const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

### 基于路由的代码拆分

```jsx
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Suspense>
  </Router>
);
```

### 命名导出(Exports)

`React.lazy` 目前只支持 `default` 导出，不支持命名导出。例如，只支持：

```jsx
export default () => {
  return <div>I am a Lazy component</div>;
};
```

如果要支持命令导出，需要重新再 `export` ,例如：

```jsx
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```
