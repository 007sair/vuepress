# [Code Splitting](https://reacttraining.com/web/guides/code-splitting)

One great feature of the web is that we don’t have to make our visitors download the entire app before they can use it. You can think of code splitting as incrementally downloading the app. To accomplish this we’ll use [webpack](https://webpack.js.org/), [`@babel/plugin-syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/), and [`loadable-components`](https://github.com/smooth-code/loadable-components).

[webpack](https://webpack.js.org/) has built-in support for [dynamic imports](https://github.com/tc39/proposal-dynamic-import); however, if you are using [Babel](https://babeljs.io/) (e.g., to compile JSX to JavaScript) then you will need to use the [`@babel/plugin-syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/) plugin. This is a syntax-only plugin, meaning Babel won’t do any additional transformations. The plugin simply allows Babel to parse dynamic imports so webpack can bundle them as a code split. Your `.babelrc` should look something like this:

> 代码拆分是一个非常棒的特性，可以让访问者在使用它之前不用下载整个应用程序。为了实现这一点，我们将使用[webpack]，[`@babel/plugin-syntax-dynamic-import`]和[`loadable-components`]。
>
>  [webpack]内置了对[动态导入]的支持； 但是，如果您使用[Babel]（例如，将JSX编译为JavaScript），则需要使用[`@babel/plugin-syntax-dynamic-import`]插件。 这是一个仅限语法的插件，这意味着Babel不会进行任何其他转换。 该插件只允许Babel解析动态导入，因此webpack可以将它们捆绑为代码拆分。 你的`.babelrc`应该是这样的：

```json
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

[`loadable-components`](https://github.com/smooth-code/loadable-components) is a library for loading components with dynamic imports. It handles all sorts of edge cases automatically and makes code splitting simple! Here’s an example of how to use [`loadable-components`](https://github.com/smooth-code/loadable-components):

> [`loadable-components`]是一个用于加载具有动态导入的组件的库。 它自动处理各种边缘情况，使代码分割变得简单！ 这是一个如何使用[`loadable-components`]的例子：

```jsx
import loadable from '@loadable/component'
import Loading from "./Loading";

const LoadableComponent = loadable(() => import('./Dashboard'), {
  fallback: Loading,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

That’s all there is to it! Simply use `LoadableDashboard` (or whatever you named your component) and it will automatically be loaded and rendered when you use it in your application. The `fallback` is a placeholder component to show while the real component is loading.

Full documentation is available [here](https://www.smooth-code.com/open-source/loadable-components/docs/getting-started/)

> 这里的所有都是它的！ 只需使用`LoadableDashboard`（或您命名为组件的任何名称），当您在应用程序中使用它时，它将自动加载和呈现。 `fallback`是一个占位符组件，用于在加载实际组件时显示。
>
> 完整文档[这里]

## [Code Splitting and Server-Side Rendering](https://reacttraining.com/web/guides/code-splitting/code-splitting-and-server-side-rendering)

[`loadable-components`](https://github.com/smooth-code/loadable-components) includes [a guide for server-side rendering](https://www.smooth-code.com/open-source/loadable-components/docs/server-side-rendering/).