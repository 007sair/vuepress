# [Testing](https://reacttraining.com/web/guides/testing)

React Router relies on React context to work. This affects how you can test your components that use our components.

> React Router依赖React上下文来工作。 这会影响您如何测试使用我们组件的组件。

## [Context](https://reacttraining.com/web/guides/testing/context)

> 上下文

If you try to unit test one of your components that renders a `<Link>` or a `<Route>`, etc. you’ll get some errors and warnings about context. While you may be tempted to stub out the router context yourself, we recommend you wrap your unit test in a `<StaticRouter>` or a `<MemoryRouter>`. Check it out:

> 如果你试图对你的一个组件进行单元测试，这些组件呈现一个`<Link>`或一个`<Route>`等等，你会得到一些关于上下文的错误和警告。 虽然您可能想要自己删除路由器上下文，但我们建议您将单元测试包装在`<StaticRouter>`或`<MemoryRouter>`中。 看看这个：

```jsx
class Sidebar extends Component {
  // ...
  render() {
    return (
      <div>
        <button onClick={this.toggleExpand}>expand</button>
        <ul>
          {users.map(user => (
            <li>
              <Link to={user.path}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// broken
test("it expands when the button is clicked", () => {
  render(<Sidebar />);
  click(theButton);
  expect(theThingToBeOpen);
});

// fixed!
test("it expands when the button is clicked", () => {
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  );
  click(theButton);
  expect(theThingToBeOpen);
});
```

That’s all there is to it.

## [Starting at specific routes](https://reacttraining.com/web/guides/testing/starting-at-specific-routes)

> 从特定路由开始

`<MemoryRouter>` supports the `initialEntries` and `initialIndex` props, so you can boot up an app (or any smaller part of an app) at a specific location.

> `<MemoryRouter>`支持`initialEntries`和`initialIndex`道具，因此您可以在特定位置启动应用程序（或应用程序的任何较小部分）。

```jsx
test("current user is active in sidebar", () => {
  render(
    <MemoryRouter initialEntries={["/users/2"]}>
      <Sidebar />
    </MemoryRouter>
  );
  expectUserToBeActive(2);
});
```

## [Navigating](https://reacttraining.com/web/guides/testing/navigating)

> 导航

We have a lot of tests that the routes work when the location changes, so you probably don’t need to test this stuff. But if you must, since everything happens in render, we do something a little clever like this:

> 当位置发生变化时，我们有很多测试路线可以工作，所以你可能不需要测试这些东西。 但如果你必须，因为所有事情都发生在渲染中，我们会做一些像这样聪明的事情：

```jsx
import { render, unmountComponentAtNode } from "react-dom";
import React from "react";
import { Route, Link, MemoryRouter } from "react-router-dom";
import { Simulate } from "react-addons-test-utils";

// a way to render any part of your app inside a MemoryRouter
// you pass it a list of steps to execute when the location
// changes, it will call back to you with stuff like
// `match` and `location`, and `history` so you can control
// the flow and make assertions.
const renderTestSequence = ({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps
}) => {
  const div = document.createElement("div");

  class Assert extends React.Component {
    componentDidMount() {
      this.assert();
    }

    componentDidUpdate() {
      this.assert();
    }

    assert() {
      const nextStep = steps.shift();
      if (nextStep) {
        nextStep({ ...this.props, div });
      } else {
        unmountComponentAtNode(div);
      }
    }

    render() {
      return this.props.children;
    }
  }

  class Test extends React.Component {
    render() {
      return (
        <MemoryRouter
          initialIndex={initialIndex}
          initialEntries={initialEntries}
        >
          <Route
            render={props => (
              <Assert {...props}>
                <Subject />
              </Assert>
            )}
          />
        </MemoryRouter>
      );
    }
  }

  render(<Test />, div);
};

// our Subject, the App, but you can test any sub
// section of your app too
const App = () => (
  <div>
    <Route
      exact
      path="/"
      render={() => (
        <div>
          <h1>Welcome</h1>
        </div>
      )}
    />
    <Route
      path="/dashboard"
      render={() => (
        <div>
          <h1>Dashboard</h1>
          <Link to="/" id="click-me">
            Home
          </Link>
        </div>
      )}
    />
  </div>
);

// the actual test!
it("navigates around", done => {
  renderTestSequence({
    // tell it the subject you're testing
    subject: App,

    // and the steps to execute each time the location changes
    steps: [
      // initial render
      ({ history, div }) => {
        // assert the screen says what we think it should
        console.assert(div.innerHTML.match(/Welcome/));

        // now we can imperatively navigate as the test
        history.push("/dashboard");
      },

      // second render from new location
      ({ div }) => {
        console.assert(div.innerHTML.match(/Dashboard/));

        // or we can simulate clicks on Links instead of
        // using history.push
        Simulate.click(div.querySelector("#click-me"), {
          button: 0
        });
      },

      // final render
      ({ location }) => {
        console.assert(location.pathname === "/");
        // you'll want something like `done()` so your test
        // fails if you never make it here.
        done();
      }
    ]
  });
});
```