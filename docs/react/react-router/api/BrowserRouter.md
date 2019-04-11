# [BrowserRouter](https://reacttraining.com/web/api/BrowserRouter)

A [`Router`](https://reacttraining.com/core/api/Router) that uses the HTML5 history API (`pushState`, `replaceState` and the `popstate` event) to keep your UI in sync with the URL.

>`<BrowserRouter>` 使用 HTML5 提供的 history API (`pushState`, `replaceState` 和 `popstate` 事件) 来保持 UI 和 URL 的同步。

```jsx
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```

## [basename: string](https://reacttraining.com/web/api/BrowserRouter/basename-string)

The base URL for all locations. If your app is served from a sub-directory on your server, you’ll want to set this to the sub-directory. A properly formatted basename should have a leading slash, but no trailing slash.

> 所有路由的基础地址，如果你的app分配的域名地址是带子目录的，那么就可以将basename设置为子目录。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```jsx
<BrowserRouter basename="/calendar" />
<Link to="/today"/> // renders <a href="/calendar/today">
```

## [getUserConfirmation: func](https://reacttraining.com/web/api/BrowserRouter/getuserconfirmation-func)

A function to use to confirm navigation. Defaults to using [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm).

> 函数，用来确认是否跳转，默认使用 window.confirm

```jsx
// this is the default behavior
function getConfirmation(message, callback) {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<BrowserRouter getUserConfirmation={getConfirmation} />;
```

## [forceRefresh: bool](https://reacttraining.com/web/api/BrowserRouter/forcerefresh-bool)

If `true` the router will use full page refreshes on page navigation. You probably only want this in [browsers that don’t support the HTML5 history API](http://caniuse.com/#feat=history).

> 如果为 `true` ，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能。

```jsx
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />
```

## [keyLength: number](https://reacttraining.com/web/api/BrowserRouter/keylength-number)

The length of `location.key`. Defaults to 6.

> `location.key`的长度。 默认为6。

```jsx
<BrowserRouter keyLength={12} />
```

## [children: node](https://reacttraining.com/web/api/BrowserRouter/children-node)

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.

> 渲染单个子元素