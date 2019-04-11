# [Prompt](https://reacttraining.com/web/api/Prompt)

Used to prompt the user before navigating away from a page. When your application enters a state that should prevent the user from navigating away (like a form is half-filled out), render a `<Prompt>`.

> 用于在位置跳转之前给予用户一些确认信息。当你的应用程序进入一个应该阻止用户导航的状态时（比如表单只填写了一半），弹出一个提示。

```jsx
import { Prompt } from 'react-router'

<Prompt
  when={formIsHalfFilledOut}
  message="Are you sure you want to leave?"
/>
```

## [message: string](https://reacttraining.com/core/api/Prompt/message-string)

The message to prompt the user with when they try to navigate away.

> 当用户试图离开某个位置时弹出的提示信息。

```jsx
<Prompt message="Are you sure you want to leave?" />
```

## [message: func](https://reacttraining.com/core/api/Prompt/message-func)

Will be called with the next `location` and `action` the user is attempting to navigate to. Return a string to show a prompt to the user or `true` to allow the transition.

> 将在用户试图导航到下一个位置时调用。需要返回一个字符串以向用户显示提示，或者返回 `true` 以允许直接跳转。

```jsx
<Prompt
  message={location =>
    location.pathname.startsWith("/app")
      ? true
      : `Are you sure you want to go to ${location.pathname}?`
  }
/>
```

> 译注：上例中的 `location` 对象指的是下一个位置（即用户想要跳转到的位置）。你可以基于它包含的一些信息，判断是否阻止导航，或者允许直接跳转。

## [when: bool](https://reacttraining.com/core/api/Prompt/when-bool)

Instead of conditionally rendering a `<Prompt>` behind a guard, you can always render it but pass `when={true}` or `when={false}` to prevent or allow navigation accordingly.

> 在应用程序中，你可以始终渲染 `<Prompt>` 组件，并通过设置 `when={true}` 或 `when={false}` 以阻止或允许相应的导航，而不是根据某些条件来决定是否渲染 `<Prompt>` 组件。
>
> 译注：`when` 只有两种情况，当它的值为 `true` 时，会弹出提示信息。如果为 `false` 则不会弹出。见[阻止导航](https://reacttraining.com/react-router/web/example/preventing-transitions)示例。

```jsx
<Prompt when={formIsHalfFilledOut} message="Are you sure?" />
```