# [Link](https://reacttraining.com/web/api/Link)

Provides declarative, accessible navigation around your application.

> 为你的应用提供声明式的、可访问的导航链接。

```jsx
import { Link } from 'react-router-dom'

<Link to="/about">About</Link>
```

## [to: string](https://reacttraining.com/web/api/Link/to-string)

A string representation of the location to link to, created by concatenating the location’s pathname, search, and hash properties.

> 一个字符串形式的链接地址，通过 `pathname`、`search` 和 `hash` 属性创建。

```jsx
<Link to="/courses?sort=name" />
```

## [to: object](https://reacttraining.com/web/api/Link/to-object)

An object that can have any of the following properties:

- `pathname`: A string representing the path to link to.
- `search`: A string representation of query parameters.
- `hash`: A hash to put in the URL, e.g. `#a-hash`.
- `state`: State to persist to the `location`.

> 一个对象形式的链接地址，可以具有以下任何属性：
>
>  - `pathname`：要链接到的路径。
>  - `search`：查询参数
>  - `hash`：URL 中的 hash，例如 `#a-hash`
>  - `state`：存储到 location 中的额外状态数据

```jsx
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```

## [replace: bool](https://reacttraining.com/web/api/Link/replace-bool)

When `true`, clicking the link will replace the current entry in the history stack instead of adding a new one.

> 当设置为 `true` 时，点击链接后将替换历史堆栈中的当前条目，而不是添加新条目。

```jsx
<Link to="/courses" replace />
```

## [innerRef: function](https://reacttraining.com/web/api/Link/innerref-function)

Allows access to the underlying `ref` of the component

> 允许访问组件的底层`ref`

```jsx
const refCallback = node => {
  // `node` refers to the mounted DOM element or null when unmounted
}

<Link to="/" innerRef={refCallback} />
```

## [innerRef: RefObject](https://reacttraining.com/web/api/Link/innerref-refobject)

Get the underlying `ref` of the component with `React.createRef()`

> 使用`React.createRef（）`获取组件的底层`ref`

```jsx
const anchorRef = React.createRef()

<Link to="/" innerRef={anchorRef} />
```

## [others](https://reacttraining.com/web/api/Link/others)

You can also pass props you’d like to be on the `<a>` such as a `title`, `id`, `className`, etc.

> 你也可以传递你希望在`<a>`上的道具，比如`title`，`id`，`className`等。