---
sidebarDepth: 1
---

# 主要概念

## 文档地址

官方中文地址(目前发现好几个，排列顺序由翻译完整度从到到低)：

- <http://react.html.cn/>
- <https://react.docschina.org>
- <https://zh-hans.reactjs.org>
- <https://www.reactjscn.com>

## 文档中提到的一些链接

在这篇文档中，提到了许多链接，记录如下：

- [入门教程：认识 React](http://react.html.cn/tutorial/tutorial.html) 阅读该教程不需要你预先掌握任何 React 知识。适合边学边做的开发者。
- [codepen](https://codepen.io/pen?&editable=true&editors=0010) or [codesandbox](https://codesandbox.io/s/new) 在线体验，可以尝试在线编辑 react 代码
- [一个简单的 HTML 页面](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) 包含了 react 代码的简单页面
- [你可能需要一些工具链](http://react.html.cn/docs/create-a-new-react-app.html) 一些适合大型应用的工具链，可能让你 0 配置开发
- [React 入门 - 概述和演练](http://react.html.cn/docs/create-a-new-react-app.html) 如果觉得 React 官方文档节奏太快，不太适应，可以先去看看这篇，它以新手友好的方式详细介绍了最重要的 React 概念。[中文翻译](https://www.html.cn/archives/9710)
- [JavaScript 概览](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/A_re-introduction_to_JavaScript) 推荐你浏览 JavaScript 概览来评估自己的知识水平。这将花费你大约 30 分钟到 1 个小时，但之后学习 React 你会感觉更加自信。
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)、[JavaScript.info](https://zh.javascript.info/) 当你对一些 JavaScript 知识感到疑惑时，MDN 和 javascript.info 是很棒的资源网站。
- [推荐资源清单](http://react.html.cn/community/courses.html) 相比官方文档，有时人们更喜欢第三方的书籍或视频课程。我们维护了一个推荐资源清单，其中有一些资源是免费的。
- [React 术语词汇表](http://react.html.cn/docs/glossary.html) 单页面应用、ES6, ES2015, ES2016、Compiler、Bundler 等等词汇都有介绍。
- [JSX 在线转换器](https://babeljs.io/repl/)
- [介绍 npx：一个 npm 包运行器](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)
- [react 开发者工具](https://github.com/facebook/react-devtools)
- [debounce_throttle](http://demo.nimius.net/debounce_throttle/) 防抖、节流的代码示例介绍
- [css-in-js](https://github.com/MicheleBertoli/css-in-js) css-in-js 方案对比

## JSX 语法

1. jsx 中可嵌入任何表达式
2. 为便于阅读，我们将 JSX 分割成多行。我们推荐使用括号将 JSX 包裹起来，虽然这不是必须的，但这样做可以避免[分号自动插入](http://stackoverflow.com/q/2846283)的陷阱。
3. jsx 使用 camelCase 属性命名约定，如：class 变为 className、tabindex 变为 tabIndex
4. 单标签可使用 `/>` 来闭合
5. jsx 可防止注入攻击。默认情况下， 在渲染之前, React DOM 会格式化([escapes](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)) JSX 中的所有值. 从而保证用户无法注入任何应用之外的代码. 在被渲染之前，所有的数据都被转义成为了字符串处理。 以避免 [XSS(跨站脚本)](https://en.wikipedia.org/wiki/Cross-site_scripting) 攻击。
6. jsx 表示对象，伪代码：

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
// 等同于
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
// 最终会变为
// 注意: 这是简化的结构
const element = {
  type: "h1",
  props: {
    className: "greeting",
    children: "Hello, world"
  }
};
```

## 组件 与 元素

1. 不同于浏览器的 DOM 元素， React 元素是普通的对象，非常容易创建。React DOM 会负责更新 DOM ，以匹配 React 元素（注：DOM 元素与 React 元素保持一致）。

2. React 元素是 [不可突变（immutable）](https://en.wikipedia.org/wiki/Immutable_object) 的. 一旦你创建了一个元素, 就不能再修改其子元素或任何属性。更新 UI 的唯一方法是创建一个新的元素, 并将其传入 `ReactDOM.render()` 方法.

3. 即使 `ReactDOM.render()` 每隔 1 秒重建整个元素，但实际上 React DOM 只更新了修改过的文本节点。

4. 组件分为：函数式组件 与 类组件

   ```jsx
   // 函数式组件
   function Welcome(props) {
     return <h1>Hello, {props.name}</h1>;
   }

   // 类组件
   class Welcome extends React.Component {
     render() {
       return <h1>Hello, {this.props.name}</h1>;
     }
   }
   ```

   这个函数是一个有效的 React 组件，因为它接收一个 `props` 参数, 并返回一个 React 元素。 我们把此类组件称为”函数式(Functional)“组件， 因为从字面上看来它就是一个 JavaScript 函数。

   上面两个组件从 React 的角度来看是等效的。且类组件有一些额外特性。

5. 组件名称总是以大写字母开头。

6. React 组件都必须是纯函数，并禁止修改其自身 props 。

7. 防止组件渲染，可以返回 null。从组件的 `render` 方法返回 `null` 不会影响组件生命周期方法的触发。 例如， `componentWillUpdate` 和 `componentDidUpdate` 仍将被调用。

## 状态(state)

### 1. 不要直接修改 state

```jsx
// 错误，无法重新渲染一个组件
this.state.comment = "Hello";
```

应该使用 `setState()` 代替。

### 2. this.setState 的更新有可能是异步的

React 为了优化性能，有可能会将多个 `setState()` 调用合并为一次更新。
因为 `this.props` 和 `this.state` 可能是异步更新的，你不能依赖他们的值计算下一个 state(状态)。

```jsx
// 错误
this.setState({
  counter: this.state.counter + this.props.increment
});

// 正确
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

### 3. 合并是浅合并

```jsx
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}

componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
```

合并是浅合并，所以 `this.setState({comments})` 不会改变 `this.state.posts` 的值，但会完全替换`this.state.comments` 的值。

### 4. 数据向下流动

组件无法获取另外一个组件的状态(state)，也不需要关心其他组件。组件与组件之间是完全隔离状态。

通常称为一个“从上到下”，或者“单向”的数据流。

一个组件可以选择将 state(状态) 向下传递，作为其子组件的 props(属性)

## 处理事件

- React 事件使用驼峰命名，而不是全部小写。
- 通过 JSX , 你传递一个函数作为事件处理程序，而不是一个字符串。
- 在 React 中你不能通过返回 `false`（即 `return false;` 语句） 来阻止默认行为。必须明确调用 `preventDefault` 。
- 事件函数中的 e 是合成事件，参考：[SyntheticEvent](http://react.html.cn/docs/events.html)

### 关于事件绑定中的 this 问题

官方推荐的方法是在 constructor 中人工绑定事件：

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 这个绑定是必要的，使`this`在回调中起作用
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById("root"));
```

如果觉得繁琐，还提供了如下两种方法：

**1、实验性的 [属性初始化语法](https://babeljs.io/docs/plugins/transform-class-properties/) ，该方法在 [create-react-app](https://github.com/facebookincubator/create-react-app) 中是默认开启的。**

```jsx
class LoggingButton extends React.Component {
  // 这个语法确保 `this` 绑定在 handleClick 中。
  // 警告：这是 *实验性的* 语法。
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

**2、回调中使用箭头函数**

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return <button onClick={e => this.handleClick(e)}>Click me</button>;
  }
}
```

**注意：**这个语法的问题是，每次 `LoggingButton` 渲染时都创建一个不同的回调。在多数情况下，没什么问题。然而，如果这个回调被作为 prop(属性) 传递给下级组件，这些组件可能需要额外的重复渲染。我们通常建议在构造函数中进行绑定，以避免这类性能问题。

### 传递参数问题

在循环内部，通常需要将一个额外的参数传递给事件处理程序。 例如，如果 `id` 是一个内联 ID，则以下任一方式都可以正常工作：

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两行代码是等价的，分别使用 [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 和 [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) 。

上面两个例子中，参数 `e` 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。

## 列表(list) 与 键(keys)

- 必须性。遍历元素需添加 key 属性，否则会发出警告。
- 同级唯一性。不一定全局唯一
- 位置特殊性。应该是 map 后的第一个组件的属性
- 性能不确定性。索引作为 key 并不一定是最佳选择。
- 不可传递性。内部映射，无法作为 props 传递给子组件，子组件也无法获取这个属性。

> 键(Keys) 帮助 React 标识哪个项被修改、添加或者移除了。数组中的每一个元素都应该有一个唯一不变的键(Keys)来标识。
>
> 挑选 key 最好的方式是使用一个在它的同辈元素中不重复的标识字符串。多数情况你可以使用数据中的 IDs 作为 keys，当要渲染的列表项中没有稳定的 IDs 时，你可以使用数据项的索引值作为 key 的最后选择。
>
> 如果列表项的顺序可能改变，我们不建议使用索引作为 keys。这可能会对性能产生负面影响，并可能导致组件状态问题。 查阅 Robin Pokorny 的文章[深入解释使用索引作为 键(key) 的负面影响](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) 。 如果您选择不将明确的 键(key) 分配给列表项，那么 React 将默认使用索引作为键(key)。
>
> 如果您有兴趣了解更多信息，请参阅 [关于为什么必须输入 键(key) 的深入解释](http://react.html.cn/docs/reconciliation.html#recursing-on-children)。

## 表单(Forms)

### 受控组件

在 HTML 中，表单元素如 `<input>`，`<textarea>` 和 `<select>` 表单元素通常保持自己的状态，并根据用户输入进行更新。而在 React 中，可变状态一般保存在组件的 state(状态) 属性中，并且只能通过 [`setState()`](http://react.html.cn/docs/react-component.html#setstate) 更新。

我们可以通过使 React 的 state 成为 “单一数据源原则” 来结合这两个形式。然后渲染表单的 React 组件也可以控制在用户输入之后的行为。这种形式，其值由 React 控制的输入表单元素称为“受控组件”。

**关键词：** state、value、onChange

### textarea

书写形式类似 input，使用 value 属性表示文本内容

### select

不同于 html 的 select 方式，react 中也是使用 value、onChange 来改变值的，这两个属性在 select 标签中

```jsx
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

**注意：**您可以将一个数组传递给 `value` 属性，允许你在 `select` 标签中选择多个选项

```jsx
<select multiple={true} value={['B', 'C']}>
```

### 处理多个输入元素

当您需要处理多个受控的 `input` 元素时，您可以为每个元素添加一个 `name` 属性，并且让处理函数根据 `event.target.name` 的值来选择要做什么。

[**在 CodePan 上尝试**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

### 完全成熟的解决方案

如果您正在寻找一个完整的解决方案，包括验证、跟踪访问的字段以及处理表单提交，那么 [Formik](https://jaredpalmer.com/formik) 是最受欢迎的选择之一。但是，它建立在受控组件和管理状态的相同原则之上 - 所以不要忽视学习它们。

## 计算的属性名称

注意我们如何使用 ES6 [计算的属性名称](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names)语法来更新与给定输入名称相对应的 state(状态) 键：

```jsx
this.setState({
  [name]: value
});
```

这段代码等价于 ES5 代码:

```jsx
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

此外，由于 `setState()` 自动[将部分状态合并到当前状态](http://react.html.cn/docs/state-and-lifecycle.html#state-updates-are-merged)，所以我们只需要调用更改的部分即可。

## 组合 与 继承

- 组件与组件之间可以是包含关系，如：父子组件。

- 也可以使用 children 渲染外部传递的元素，如：[**在 CodePen 中尝试**](http://codepen.io/gaearon/pen/ozqNOV?editors=0010)。
- 还可以将组件通过 props 的方式传递给子组件，如：[**在 CodePen 中尝试**](http://codepen.io/gaearon/pen/gwZOJp?editors=0010)。

### 如何看待继承？

在 react 中，组件的组合方式足以满足各种需求，目前还未发现通过继承的方式来使用组件。

使用 props(属性) 和 组合已经足够灵活来明确、安全的定制一个组件的外观和行为。切记，组件可以接受任意的 props(属性) ，包括原始值、React 元素，或者函数。

如果要在组件之间重用非 U I 功能，我们建议将其提取到单独的 JavaScript 模块中。组件可以导入它并使用该函数，对象或类，而不扩展它。

## 常见问题

- [AJAX and APIs](https://zh-hans.reactjs.org/docs/faq-ajax.html) 如：怎样发送 AJAX 请求?
- [组件状态](http://react.html.cn/docs/faq-state.html) 如：setState 做了什么？
- [文件结构](http://react.html.cn/docs/faq-structure.html) 如：是否有推荐的方式来组织 React 项目？
