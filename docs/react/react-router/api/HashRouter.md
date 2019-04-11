# [HashRouter](https://reacttraining.com/web/api/HashRouter)

A [`Router`](https://reacttraining.com/core/api/Router) that uses the hash portion of the URL (i.e. `window.location.hash`) to keep your UI in sync with the URL.

**IMPORTANT NOTE:** Hash history does not support `location.key` or `location.state`. In previous versions we attempted to shim the behavior but there were edge-cases we couldn’t solve. Any code or plugin that needs this behavior won’t work. As this technique is only intended to support legacy browsers, we encourage you to configure your server to work with `<BrowserHistory>` instead.

> `<HashRouter>` 使用 URL 的 `hash` 部分（即 `window.location.hash`）来保持 UI 和 URL 的同步。
>
> **重要说明：**使用 `hash` 记录导航历史不支持 `location.key` 和 `location.state`。在以前的版本中，我们视图 shim 这种行为，但是仍有一些问题我们无法解决。任何依赖此行为的代码或插件都将无法正常使用。由于该技术仅用于支持旧式（低版本）浏览器，因此对于一些新式浏览器，我们鼓励你使用 `<BrowserHistory>` 代替。

```jsx
import { HashRouter } from 'react-router-dom'

<HashRouter>
  <App/>
</HashRouter>
```

## [basename: string](https://reacttraining.com/web/api/HashRouter/basename-string)

The base URL for all locations. A properly formatted basename should have a leading slash, but no trailing slash.

> 所有位置的基准 URL。`basename` 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠。

```jsx
<HashRouter basename="/calendar"/>
<Link to="/today"/> // renders <a href="#/calendar/today">
```

## [getUserConfirmation: func](https://reacttraining.com/web/api/HashRouter/getuserconfirmation-func)

A function to use to confirm navigation. Defaults to using [`window.confirm`](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm).

> 用于确认导航的功能。 默认使用[`window.confirm`]。

```jsx
// this is the default behavior
function getConfirmation(message, callback) {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
}

<HashRouter getUserConfirmation={getConfirmation} />;
```

## [hashType: string](https://reacttraining.com/web/api/HashRouter/hashtype-string)

The type of encoding to use for `window.location.hash`. Available values are:

- `"slash"` - Creates hashes like `#/` and `#/sunshine/lollipops`
- `"noslash"` - Creates hashes like `#` and `#sunshine/lollipops`
- `"hashbang"` - Creates [“ajax crawlable”](https://developers.google.com/webmasters/ajax-crawling/docs/learn-more) (deprecated by Google) hashes like `#!/` and `#!/sunshine/lollipops`

Defaults to `"slash"`.

> `window.location.hash` 使用的 `hash` 类型，有如下几种：
>
>  - `“slash”` - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops
>  - `“noslash”` - 后面没有斜杠，例如 # 和 #sunshine/lollipops
>  - `“hashbang”` - Google 风格的 [ajax crawlable](https://link.jianshu.com/?t=https%3A%2F%2Fdevelopers.google.com%2Fwebmasters%2Fajax-crawling%2Fdocs%2Flearn-more)，例如 #!/ 和 #!/sunshine/lollipops
>
> 默认为“slash”`。

## [children: node](https://reacttraining.com/web/api/HashRouter/children-node)

A [single child element](https://facebook.github.io/react/docs/react-api.html#react.children.only) to render.

> 渲染单个子元素