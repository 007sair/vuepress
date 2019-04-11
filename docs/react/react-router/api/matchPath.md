# [matchPath](https://reacttraining.com/web/api/matchPath)

This lets you use the same matching code that `<Route>` uses except outside of the normal render cycle, like gathering up data dependencies before rendering on the server.

> 这使得你可以使用`<Route>`使用的相同匹配代码，除了正常的渲染周期之外，比如在服务器上渲染之前收集数据依赖关系。

```js
import { matchPath } from "react-router";

const match = matchPath("/users/123", {
  path: "/users/:id",
  exact: true,
  strict: false
});
```

## [pathname](https://reacttraining.com/web/api/matchPath/pathname)

The first argument is the pathname you want to match. If you’re using this on the server with Node.js, it would be `req.path`.

> 第一个参数是您要匹配的路径名。 如果你在带有Node.js的服务器上使用它，它将是`req.path`。

## [props](https://reacttraining.com/web/api/matchPath/props)

The second argument are the props to match against, they are identical to the matching props `Route` accepts:

> 第二个参数是匹配的道具，它们与匹配的道具`Route`接受：

```js
{
  path, // like /users/:id; either a single string or an array of strings
    strict, // optional, defaults to false
    exact; // optional, defaults to false
}
```