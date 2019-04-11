# [NavLink](https://reacttraining.com/web/api/NavLink)

A special version of the [`Link`](https://reacttraining.com/react-router/Link.md) that will add styling attributes to the rendered element when it matches the current URL.

> 一个特殊版本的 `<Link>`，它会在与当前 URL 匹配时为其呈现元素添加样式属性。

```jsx
import { NavLink } from 'react-router-dom'

<NavLink to="/about">About</NavLink>
```

## [activeClassName: string](https://reacttraining.com/web/api/NavLink/activeclassname-string)

The class to give the element when it is active. The default given class is `active`. This will be joined with the `className` prop.

> 当元素处于激活状态时应用的类，默认为 `active`。它将与 `className` 属性一起使用。

```jsx
<NavLink to="/faq" activeClassName="selected">
  FAQs
</NavLink>
```

## [activeStyle: object](https://reacttraining.com/web/api/NavLink/activestyle-object)

The styles to apply to the element when it is active.

> 当元素处于激活状态时应用的样式。

```jsx
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>
```

## [exact: bool](https://reacttraining.com/web/api/NavLink/exact-bool)

When `true`, the active class/style will only be applied if the location is matched exactly.

> 如果为 `true`，则只有在位置完全匹配时才应用激活类/样式。

```jsx
<NavLink exact to="/profile">
  Profile
</NavLink>
```

## [strict: bool](https://reacttraining.com/web/api/NavLink/strict-bool)

When `true`, the trailing slash on a location’s `pathname` will be taken into consideration when determining if the location matches the current URL. See the [`strict-bool`](https://reacttraining.com/core/api/Route/strict-bool) documentation for more information.

> 当'true`时，在确定位置是否与当前URL匹配时，将考虑位置的`pathname`上的尾部斜杠。 有关更多信息，请参阅[`strict-bool`]文档。
>

```jsx
<NavLink strict to="/events/">
  Events
</NavLink>
```

## [isActive: func](https://reacttraining.com/web/api/NavLink/isactive-func)

A function to add extra logic for determining whether the link is active. This should be used if you want to do more than verify that the link’s pathname matches the current URL’s `pathname`.

> 添加额外逻辑以确定链接是否处于激活状态的函数。如果你要做的不仅仅是验证链接的路径名与当前 URL 的路径名相匹配，那么应该使用它。

```jsx
// only consider an event active if its event id is an odd number
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}

<NavLink
  to="/events/123"
  isActive={oddEvent}
>Event 123</NavLink>
```

## [location: object](https://reacttraining.com/web/api/NavLink/location-object)

The [`isActive`](https://reacttraining.com/web/api/NavLink/isactive-func) compares the current history location (usually the current browser URL). To compare to a different location, a [`location`](https://reacttraining.com/core/api/location) can be passed.

> `isActive` 默认比较当前历史位置（通常是当前的浏览器 URL）。你也可以传递一个不同的位置进行比较。

## [aria-current: string](https://reacttraining.com/web/api/NavLink/aria-current-string)

The value of the `aria-current` attribute used on an active link. Available values are:

- `"page"` - used to indicate a link within a set of pagination links
- `"step"` - used to indicate a link within a step indicator for a step-based process
- `"location"` - used to indicate the image that is visually highlighted as the current component of a flow chart
- `"date"` - used to indicate the current date within a calendar
- `"time"` - used to indicate the current time within a timetable
- `"true"` - used to indicate if the NavLink is active

Defaults to `"page"`.

> ❎
>
> 在活动链接上使用的`aria-current`属性的值。 可用值包括：
>
>  - “page”` - 用于表示一组分页链接中的链接
>  - “step”` - 用于指示基于步骤的过程的步骤指示符中的链接
>  - “位置”` - 用于指示视觉上突出显示为流程图当前组件的图像
>  - “日期”` - 用于表示日历中的当前日期
>  - “time”` - 用于表示时间表内的当前时间
>  - “”true“` - 用于指示NavLink是否处于活动状态
>
> 默认为“”页面“`。

Based on [WAI-ARIA 1.1 specifications](https://www.w3.org/TR/wai-aria-1.1/#aria-current)