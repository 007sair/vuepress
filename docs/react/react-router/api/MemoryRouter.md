# [MemoryRouter](https://reacttraining.com/web/api/MemoryRouter)

A [`Router`](https://reacttraining.com/react-router/Router.md) that keeps the history of your “URL” in memory (does not read or write to the address bar). Useful in tests and non-browser environments like [React Native](https://facebook.github.io/react-native/).

> 将 URL 的历史记录保存在内存中的 `<Router>`（不读取或写入地址栏）。在测试和非浏览器环境中很有用，例如 [React Native](https://facebook.github.io/react-native/).

```jsx
import { MemoryRouter } from "react-router";

<MemoryRouter>
  <App />
</MemoryRouter>;
```

## [initialEntries: array](https://reacttraining.com/web/api/MemoryRouter/initialentries-array)

An array of `location`s in the history stack. These may be full-blown location objects with `{ pathname, search, hash, state }` or simple string URLs.

> 历史堆栈中的一系列位置信息。这些可能是带有 `{pathname, search, hash, state}` 的完整位置对象或简单的字符串 URL。

```jsx
<MemoryRouter
  initialEntries={["/one", "/two", { pathname: "/three" }]}
  initialIndex={1}
>
  <App />
</MemoryRouter>
```

## [initialIndex: number](https://reacttraining.com/web/api/MemoryRouter/initialindex-number)

The initial location’s index in the array of `initialEntries`.

> `initialEntries` 数组中的初始位置索引。

## [getUserConfirmation: func](https://reacttraining.com/web/api/MemoryRouter/getuserconfirmation-func)

A function to use to confirm navigation. You must use this option when using `<MemoryRouter>` directly with a `<Prompt>`.

> 用于确认导航的函数。当 `<MemoryRouter>` 直接与 `<Prompt>` 一起使用时，你必须使用此选项。

## [keyLength: number](https://reacttraining.com/web/api/MemoryRouter/keylength-number)

The length of `location.key`. Defaults to 6.

```jsx
<MemoryRouter keyLength={12} />
```

## [children: node](https://reacttraining.com/web/api/MemoryRouter/children-node)

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.
