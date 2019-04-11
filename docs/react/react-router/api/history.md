# [history](https://reacttraining.com/web/api/history)

The term “history” and "`history` object" in this documentation refers to [the `history` package](https://github.com/ReactTraining/history), which is one of only 2 major dependencies of React Router (besides React itself), and which provides several different implementations for managing session history in JavaScript in various environments.

> 本文档中的术语“历史”和“历史”对象是指[历史`包]（https://github.com/ReactTraining/history），它是React Router的两个主要依赖项之一（ 除了React本身），它提供了几种不同的实现，用于在各种环境中管理JavaScript中的会话历史记录。

The following terms are also used:

- “browser history” - A DOM-specific implementation, useful in web browsers that support the HTML5 history API
- “hash history” - A DOM-specific implementation for legacy web browsers
- “memory history” - An in-memory history implementation, useful in testing and non-DOM environments like React Native

> 还使用以下术语：
>
>  - “浏览器历史记录” - 特定于DOM的实现，在支持HTML5历史记录API的Web浏览器中非常有用
>  - “哈希历史记录” - 针对旧版Web浏览器的特定于DOM的实现
>  - “内存历史记录” - 内存中历史记录实现，在测试和非DOM环境（如React Native）中非常有用

`history` objects typically have the following properties and methods:

- `length` - (number) The number of entries in the history stack
- `action` - (string) The current action (`PUSH`, `REPLACE`, or `POP`)

> `history`对象通常具有以下属性和方法：
>
>  - `length`  - （number）历史堆栈中的条目数
>  - `action`  - （string）当前动作（`PUSH`，`REPLACE`或`POP`）

- ```
  location
  ```

   

  \- (object) The current location. May have the following properties:

  - `pathname` - (string) The path of the URL
  - `search` - (string) The URL query string
  - `hash` - (string) The URL hash fragment
  - `state` - (object) location-specific state that was provided to e.g. `push(path, state)` when this location was pushed onto the stack. Only available in browser and memory history.

  >  - （对象）当前位置。 可能具有以下属性：
  >
  >  - `pathname`  - （字符串）URL的路径
  >  - `search`  - （字符串）URL查询字符串
  >  - `hash`  - （string）URL哈希片段
  >  - 提供给例如的“状态” - （对象）特定于位置的状态。 `push（path，state）`当这个位置被推入堆栈时。 仅适用于浏览器和内存历史记录。

- `push(path, [state])` - (function) Pushes a new entry onto the history stack

- `replace(path, [state])` - (function) Replaces the current entry on the history stack

- `go(n)` - (function) Moves the pointer in the history stack by `n` entries

- `goBack()` - (function) Equivalent to `go(-1)`

- `goForward()` - (function) Equivalent to `go(1)`

- `block(prompt)` - (function) Prevents navigation (see [the history docs](https://github.com/ReactTraining/history#blocking-transitions))

>  - `push（path，[state]）` - （function）将新条目推送到历史堆栈
>  - `replace（path，[state]）` - （function）替换历史堆栈中的当前条目
>  - `go（n）` - （function）通过`n`条目移动历史堆栈中的指针
>  - `goBack（）` - （function）相当于`go（-1）`
>  - `goForward（）` - （function）相当于`go（1）`
>  - `block（prompt）` - （function）阻止导航（参见[历史文档]

## [history is mutable](https://reacttraining.com/web/api/history/history-is-mutable)

The history object is mutable. Therefore it is recommended to access the [`location`](https://reacttraining.com/web/api/location) from the render props of [`Route`](https://reacttraining.com/web/api/Route), not from `history.location`. This ensures your assumptions about React are correct in lifecycle hooks. For example:

> 历史对象是可变的。 因此，建议从[`Route`]的渲染道具访问[`location`]，而不是从`history.location`。 这可以确保您在生命周期钩子中对React的假设是正确的。 例如：

```jsx
class Comp extends React.Component {
  componentDidUpdate(prevProps) {
    // will be true
    const locationChanged = this.props.location !== prevProps.location;

    // INCORRECT, will *always* be false because history is mutable.
    const locationChanged =
      this.props.history.location !== prevProps.history.location;
  }
}

<Route component={Comp} />;
```

Additional properties may also be present depending on the implementation you’re using. Please refer to [the history documentation](https://github.com/ReactTraining/history#properties) for more details.

> 根据您使用的实施情况，还可能存在其他属性。 有关详细信息，请参阅[历史记录]。