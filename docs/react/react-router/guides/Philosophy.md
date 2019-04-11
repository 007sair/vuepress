# [Philosophy](https://reacttraining.com/core/guides/philosophy)

> 原理

This guide’s purpose is to explain the mental model to have when using React Router. We call it “Dynamic Routing”, which is quite different from the “Static Routing” you’re probably more familiar with.

> 本指南的目的是解释使用React Router时的心智模型。 我们将其称为“动态路由”，这与您可能更熟悉的“静态路由”完全不同。

## [Static Routing](https://reacttraining.com/core/guides/philosophy/static-routing)

> 静态路由

If you’ve used Rails, Express, Ember, Angular etc. you’ve used static routing. In these frameworks, you declare your routes as part of your app’s initialization before any rendering takes place. React Router pre-v4 was also static (mostly). Let’s take a look at how to configure routes in express:

> 如果您使用过Rails，Express，Ember，Angular等，那么您已经使用了静态路由。 在这些框架中，在进行任何渲染之前，您将路由声明为应用程序初始化的一部分。 React Router pre-v4也是静态的（大多数情况下）。 我们来看看如何在express中配置路由：

```js
// Express Style routing:
app.get("/", handleIndex);
app.get("/invoices", handleInvoices);
app.get("/invoices/:id", handleInvoice);
app.get("/invoices/:id/edit", handleInvoiceEdit);

app.listen();
```

Note how the routes are declared before the app listens. The client side routers we’ve used are similar. In Angular you declare your routes up front and then import them to the top-level `AppModule` before rendering:

> 请注意在应用侦听之前如何声明路由。 我们使用的客户端路由器是类似的。 在Angular中，您先声明您的路由，然后在渲染之前将它们导入顶层的“AppModule”：

```js
// Angular Style routing:
const appRoutes: Routes = [
  {
    path: "crisis-center",
    component: CrisisListComponent
  },
  {
    path: "hero/:id",
    component: HeroDetailComponent
  },
  {
    path: "heroes",
    component: HeroListComponent,
    data: { title: "Heroes List" }
  },
  {
    path: "",
    redirectTo: "/heroes",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppModule {}
```

Ember has a conventional `routes.js` file that the build reads and imports into the application for you. Again, this happens before your app renders.

> Ember有一个传统的`routes.js`文件，构建会读取并导入到应用程序中。 同样，这会在您的应用呈现之前发生。

```js
// Ember Style Router:
Router.map(function() {
  this.route("about");
  this.route("contact");
  this.route("rentals", function() {
    this.route("show", { path: "/:rental_id" });
  });
});

export default Router;
```

Though the APIs are different, they all share the model of “static routes”. React Router also followed that lead up until v4.

To be successful with React Router, you need to forget all that! :O

> 尽管API不同，但它们都共享“静态路由”模型。 反应路由器也跟着那个引导直到v4。
>
> 要成功使用React Router，您需要忘记这一切！：o

## [Backstory](https://reacttraining.com/core/guides/philosophy/backstory)

> 背景故事

To be candid, we were pretty frustrated with the direction we’d taken React Router by v2. We (Michael and Ryan) felt limited by the API, recognized we were reimplementing parts of React (lifecycles, and more), and it just didn’t match the mental model React has given us for composing UI.

We were walking through the hallway of a hotel just before a workshop discussing what to do about it. We asked each other: “What would it look like if we built the router using the patterns we teach in our workshops?”

It was only a matter of hours into development that we had a proof-of-concept that we knew was the future we wanted for routing. We ended up with API that wasn’t “outside” of React, an API that composed, or naturally fell into place, with the rest of React. We think you’ll love it.

> 坦率地说，我们对我们采用React Router v2的方向感到非常沮丧。 我们（Michael和Ryan）感觉受到API的限制，认识到我们重新实现了React（生命周期等）的部分，并且它与React给我们创建UI的心理模型不匹配。
>
> 在研讨会讨论如何应对之前，我们正走过酒店的走廊。 我们互相问道：“如果我们使用我们在工作室教授的模式构建路由器会是什么样子？”
>
> 开发只需要几个小时，我们就有一个概念验证，我们知道这是我们想要路由的未来。 我们最终得到的API并不是React的“外部”，这是一个由React的其余部分组成或自然落实到位的API。 我们认为你会喜欢它。

## [Dynamic Routing](https://reacttraining.com/core/guides/philosophy/dynamic-routing)

> 动态路由

When we say dynamic routing, we mean routing that takes place **as your app is rendering**, not in a configuration or convention outside of a running app. That means almost everything is a component in React Router. Here’s a 60 second review of the API to see how it works:

First, grab yourself a `Router` component for the environment you’re targeting and render it at the top of your app.

> 当我们说动态路由时，我们的意思是当您的应用呈现**时发生的路由**，而不是在正在运行的应用之外的配置或约定中。 这意味着几乎所有东西都是React Router中的一个组件。 这是对API的60秒评论，看看它是如何工作的：
>
> 首先，为自己定位的环境抓住自己的“路由器”组件，并将其呈现在应用程序的顶部。

```jsx
// react-native
import { NativeRouter } from "react-router-native";

// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);
```

Next, grab the link component to link to a new location:

> 接下来，抓取链接组件以链接到新位置：

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);
```

Finally, render a `Route` to show some UI when the user visits `/dashboard`.

> 最后，渲染一个`Route`以在用户访问`/ dashboard`时显示一些UI。

```jsx
const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);
```

The `Route` will render `<Dashboard {...props}/>` where `props` are some router specific things that look like `{ match, location, history }`. If the user is **not** at `/dashboard` then the `Route` will render `null`. That’s pretty much all there is to it.

> `Route`将呈现`<Dashboard {... props} />`其中`props`是一些特定于路由器的东西，看起来像`{match，location，history}。 如果用户在** / dashboard中不是**，则`Route`将呈现`null`。 这就是它的全部内容。

## [Nested Routes](https://reacttraining.com/core/guides/philosophy/nested-routes)

> 嵌套路由

Lots of routers have some concept of “nested routes”. If you’ve used versions of React Router previous to v4, you’ll know it did too! When you move from a static route configuration to dynamic, rendered routes, how do you “nest routes”? Well, how do you nest a `div`?

> 很多路由器都有一些“嵌套路由”的概念。 如果您在v4之前使用过React Router的版本，那么您也知道它也是如此！ 当您从静态路由配置移动到动态渲染路由时，如何“嵌套路由”？ 好吧，你如何筑巢`div`？

```jsx
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
);

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route path={match.url + "/carnitas"} component={Carnitas} />
  </div>
);
```

See how the router has no “nesting” API? `Route` is just a component, just like `div`. So to nest a `Route` or a `div`, you just … do it.

Let’s get trickier.

> 看看路由器没有“嵌套”API？ `Route`只是一个组件，就像`div`一样。 所以要嵌套一个`Route`或`div`，你就......做吧。
>
> 让我们变得更加棘手。

## [Responsive Routes](https://reacttraining.com/core/guides/philosophy/responsive-routes)

> 响应式路由

Consider a user navigates to `/invoices`. Your app is adaptive to different screen sizes, they have a narrow viewport, and so you only show them the list of invoices and a link to the invoice dashboard. They can navigate deeper from there.

> 考虑用户导航到`/ invoices`。 您的应用适用于不同的屏幕尺寸，它们具有较窄的视口，因此您只需向其显示发票列表和发票仪表板的链接。 他们可以从那里更深入地导航。

```asciidoc
Small Screen
url: /invoices

+----------------------+
|                      |
|      Dashboard       |
|                      |
+----------------------+
|                      |
|      Invoice 01      |
|                      |
+----------------------+
|                      |
|      Invoice 02      |
|                      |
+----------------------+
|                      |
|      Invoice 03      |
|                      |
+----------------------+
|                      |
|      Invoice 04      |
|                      |
+----------------------+
```

On a larger screen we’d like to show a master-detail view where the navigation is on the left and the dashboard or specific invoices show up on the right.

> 在更大的屏幕上，我们想要显示一个主 - 详细视图，其中导航位于左侧，仪表板或特定发票显示在右侧。

```asciidoc
Large Screen
url: /invoices/dashboard

+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |   Unpaid:             5   |
+----------------------+                           |
|                      |   Balance:   $53,543.00   |
|      Invoice 01      |                           |
|                      |   Past Due:           2   |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |                           |
|                      |   +-------------------+   |
+----------------------+   |                   |   |
|                      |   |  +    +     +     |   |
|      Invoice 03      |   |  | +  |     |     |   |
|                      |   |  | |  |  +  |  +  |   |
+----------------------+   |  | |  |  |  |  |  |   |
|                      |   +--+-+--+--+--+--+--+   |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

Now pause for a minute and think about the `/invoices` url for both screen sizes. Is it even a valid route for a large screen? What should we put on the right side?

> 现在暂停一下，并考虑两种屏幕尺寸的`/发票`网址。 它甚至是大屏幕的有效路线吗？ 我们应该把右边的东西放在什么位置？

```asciidoc
Large Screen
url: /invoices
+----------------------+---------------------------+
|                      |                           |
|      Dashboard       |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 01      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 02      |             ???           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 03      |                           |
|                      |                           |
+----------------------+                           |
|                      |                           |
|      Invoice 04      |                           |
|                      |                           |
+----------------------+---------------------------+
```

On a large screen, `/invoices` isn’t a valid route, but on a small screen it is! To make things more interesting, consider somebody with a giant phone. They could be looking at `/invoices` in portrait orientation and then rotate their phone to landscape. Suddenly, we have enough room to show the master-detail UI, so you ought to redirect right then!

React Router’s previous versions’ static routes didn’t really have a composable answer for this. When routing is dynamic, however, you can declaratively compose this functionality. If you start thinking about routing as UI, not as static configuration, your intuition will lead you to the following code:

> 在大屏幕上，`/ invoices`不是有效的路线，但在小屏幕上它是！ 为了让事情变得更有趣，请考虑一个拥有巨型手机的人。 他们可以纵向查看“/发票”，然后将手机旋转到横向。 突然间，我们有足够的空间来显示主 - 细节用户界面，所以你应该立即重定向！
>
> React Router的先前版本的静态路由并没有真正具有可组合的答案。 但是，当路由是动态的时，您可以声明性地组成此功能。 如果您开始考虑将路由作为UI而不是静态配置，您的直觉将引导您使用以下代码：

```js
const App = () => (
  <AppLayout>
    <Route path="/invoices" component={Invoices} />
  </AppLayout>
);

const Invoices = () => (
  <Layout>
    {/* always show the nav */}
    <InvoicesNav />

    <Media query={PRETTY_SMALL}>
      {screenIsSmall =>
        screenIsSmall ? (
          // small screen has no redirect
          <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard} />
            <Route path="/invoices/:id" component={Invoice} />
          </Switch>
        ) : (
          // large screen does!
          <Switch>
            <Route exact path="/invoices/dashboard" component={Dashboard} />
            <Route path="/invoices/:id" component={Invoice} />
            <Redirect from="/invoices" to="/invoices/dashboard" />
          </Switch>
        )
      }
    </Media>
  </Layout>
);
```

As the user rotates their phone from portrait to landscape, this code will automatically redirect them to the dashboard. *The set of valid routes change depending on the dynamic nature of a mobile device in a user’s hands*.

This is just one example. There are many others we could discuss but we’ll sum it up with this advice: To get your intuition in line with React Router’s, think about components, not static routes. Think about how to solve the problem with React’s declarative composability because nearly every “React Router question” is probably a “React question”.

> 当用户将手机从纵向旋转到横向时，此代码会自动将其重定向到仪表板。 *有效路由集的变化取决于用户手中移动设备的动态特性*。
>
> 这只是一个例子。 我们可以讨论许多其他问题，但我们总结一下这个建议：为了让你的直觉与React Router的一致，考虑组件，而不是静态路由。 考虑如何使用React的声明可组合性来解决问题，因为几乎每个“React Router问题”都可能是“React问题”。