# [Scroll Restoration](https://reacttraining.com/web/guides/scroll-restoration)

> 滚动恢复

In earlier versions of React Router we provided out-of-the-box support for scroll restoration and people have been asking for it ever since. Hopefully this document helps you get what you need out of the scroll bar and routing!

Browsers are starting to handle scroll restoration with `history.pushState`on their own in the same manner they handle it with normal browser navigation. It already works in chrome and it’s really great. [Here’s the Scroll Restoration Spec](https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl).

Because browsers are starting to handle the “default case” and apps have varying scrolling needs (like this website!), we don’t ship with default scroll management. This guide should help you implement whatever scrolling needs you have.

> 在早期版本的 React Router 中，我们为滚动恢复提供了开箱即用的支持，从那时起人们就一直在寻求它。 希望本文档可以帮助您从滚动条和路由中获取所需内容！
>
> 浏览器开始使用`history.pushState`来处理卷轴恢复，就像它们使用普通浏览器导航一样处理它。 它已经在 chrome 中运行了，它真的很棒。 [这是滚动恢复规范]。
>
> 因为浏览器开始处理“默认情况”并且应用程序具有不同的滚动需求（如此网站！），我们不提供默认滚动管理。 本指南应该可以帮助您实现任何滚动需求。

## [Scroll to top](https://reacttraining.com/web/guides/scroll-restoration/scroll-to-top)

Most of the time all you need is to “scroll to the top” because you have a long content page, that when navigated to, stays scrolled down. This is straightforward to handle with a `<ScrollToTop>` component that will scroll the window up on every navigation, make sure to wrap it in `withRouter` to give it access to the router’s props:

> 大多数情况下，您需要的是“滚动到顶部”，因为您有一个很长的内容页面，当导航到时，会保持向下滚动。 使用`<ScrollToTop>`组件可以直接处理，它会在每个导航上滚动窗口，确保将它包装在`withRouter`中，以便访问路由器的道具：

```jsx
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
```

Then render it at the top of your app, but below Router

> 然后将其呈现在应用程序的顶部，但在路由器下方

```jsx
function App() {
  return (
    <Router>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>
  );
}

// or just render it bare anywhere you want, but just one :)
<ScrollToTop />;
```

If you have a tab interface connected to the router, then you probably don’t want to be scrolling to the top when they switch tabs. Instead, how about a `<ScrollToTopOnMount>` in the specific places you need it?

> 如果您有一个连接到路由器的选项卡界面，那么您可能不希望在切换选项卡时滚动到顶部。 相反，在需要的特定位置如何`<ScrollToTopOnMount>`？

```jsx
class ScrollToTopOnMount extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

class LongContent extends Component {
  render() {
    <div>
      <ScrollToTopOnMount />
      <h1>Here is my long content page</h1>
    </div>;
  }
}

// somewhere else
<Route path="/long-content" component={LongContent} />;
```

## [Generic Solution](https://reacttraining.com/web/guides/scroll-restoration/generic-solution)

> 通用解决方案

For a generic solution (and what browsers are starting to implement natively) we’re talking about two things:

1. Scrolling up on navigation so you don’t start a new screen scrolled to the bottom
2. Restoring scroll positions of the window and overflow elements on “back” and “forward” clicks (but not Link clicks!)

At one point we were wanting to ship a generic API. Here’s what we were headed toward:

> 对于通用解决方案（以及哪些浏览器开始本地实现），我们谈论两件事：
>
> 1.向上滚动导航，这样就不会启动滚动到底部的新屏幕 2.在“后退”和“前进”点击时恢复窗口和溢出元素的滚动位置（但不是链接点击！）
>
> 有一次，我们想要发布通用 API。 以下是我们的目标：

```jsx
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>

      <RestoredScroll id="bunny">
        <div style={{ height: "200px", overflow: "auto" }}>I will overflow</div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>
```

First, `ScrollRestoration` would scroll the window up on navigation. Second, it would use `location.key` to save the window scroll position *and*the scroll positions of `RestoredScroll` components to `sessionStorage`. Then, when `ScrollRestoration` or `RestoredScroll` components mount, they could look up their position from `sessionsStorage`.

What got tricky for me was defining an “opt-out” API for when I didn’t want the window scroll to be managed. For example, if you have some tab navigation floating inside the content of your page you probably _don’t_ want to scroll to the top (the tabs might be scrolled out of view!).

When I learned that chrome manages scroll position for us now, and realized that different apps are going to have different scrolling needs, I kind of lost the belief that we needed to provide something–especially when people just want to scroll to the top (which you saw is straight-forward to add to your app on your own).

Based on this, we no longer feel strongly enough to do the work ourselves (like you we have limited time!). But, we’d love to help anybody who feels inclined to implement a generic solution. A solid solution could even live in the project. Hit us up if you get started on it :)

> 首先，`ScrollRestoration`会在导航时向上滚动窗口。其次，它将使用`location.key`将窗口滚动位置\*和`RestoredScroll`组件的滚动位置保存到`sessionStorage`。然后，当`ScrollRestoration`或`RestoredScroll`组件挂载时，他们可以从`sessionsStorage`查找它们的位置。
>
> 对我来说棘手的是定义一个“选择退出”API，当我不希望管理窗口滚动时。例如，如果您在页面内容中浮动某些选项卡导航，则可能*不想*滚动到顶部（选项卡可能会滚动到视图之外！）。
>
> 当我了解到 chrome 现在为我们管理滚动位置，并意识到不同的应用程序将有不同的滚动需求时，我有点失去了我们需要提供某些东西的信念 - 特别是当人们只想滚动到顶部时（你看到很容易直接添加到你的应用程序）。
>
> 基于此，我们不再感到有足够的力量来完成这项工作（就像你我们有限的时间！）。但是，我们很乐意帮助任何愿意实施通用解决方案的人。一个可靠的解决方案甚至可以存在于项目中。如果你开始它就打我们了:)
