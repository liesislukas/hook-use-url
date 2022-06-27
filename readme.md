`npm i hook-use-url`

Tested with react-router v6 and ReactJS v18

## Overview

```jsx
import useUrl from 'hook-use-url';

function MyComponent() {
  const url = useUrl();

  // get current url
  url.get(); // https://example.com/some-path?a=b&arr=x&arr=y
  // get key's value from URL. Works with arrays too.
  const a = url.get('a'); // b
  const arr = url.get('arr'); // ["x", "y"]

  // update a to c & update URL & update browser's history with history.push
  url.set({key: 'a', value: 'c'}).push();
  // update a to c & update URL & update browser's history with history.replace
  url.set({key: 'a', value: 'c'}).replace();
  // update a to c & return new URL without changing it and without changing browser's history
  url.set({key: 'a', value: 'c'}).get();
}

```

## API

- You can chain several actions like so: `url.set("x1", "foo").set("x2", "foo").push()`
- To update browser's URL & history after changes - use `.push()` or `.replace()`
- When getting value, if it's not available, undefined is returned.

| Function                               | Description                                                                                        | Sample Output                             |
|----------------------------------------|----------------------------------------------------------------------------------------------------|-------------------------------------------|
| `url.getUri()`                         | Get full URI                                                                                       | `https://example.come/some-path?x1=b#foo` |
| `url.getPath()`                        | Get path                                                                                           | `/some-path`                              |
| `url.getQuery()`                       | Get query                                                                                          | `x1=b`                                    |
| `url.getFragment()`                    | Get fragment                                                                                       | `foo`, `undefined`                        |
| `url.getDomain()`                      | Get domain                                                                                         | `example.com`                             |
| `url.getProtocol()`                    | Get protocol                                                                                       | `https`                                   |
| `url.get("x1")`                        | Get value of `x1`                                                                                  | `b`                                       |
| `url.set("x1", "c").getUri()`          | Set value of `x1` to `c` and get new uri.                                                          | `https://example.come/some-path?x1=c#foo` | 
| `url.set("x1", ["c", "d"]).getQuery()` | Set value of `x1` and get new query.                                                               | `x1=c&x1=d`                               | 
| `url.add("x1", ["e"])`                 | If `x1` already has some value, add one more value. Otherwise just set `x1` to `e`                 | `url` object to chain more methods.       | 
| `url.set("x1")`                        | Set `x1` value to `undefined`. Does same as `url.remove("x1")`                                     | `url` object to chain more methods.       | 
| `url.remove("x1")`                     | Remove `x1` value if there is any.                                                                 | `url` object to chain more methods.       | 
| `url.removeQuery()`                    | Remove query from URI                                                                              | `url` object to chain more methods.       | 
| `url.removeFragment()`                 | Remove fragment from URI                                                                           | `url` object to chain more methods.       | 
| `url.removePath()`                     | Remove path from URI                                                                               | `url` object to chain more methods.       | 
| `url.push()`                           | Set URI at browser's address input and push history event to browser's history                     | undefined                                 | 
| `url.replace()`                        | Set URI at browser's address input and replace current history event with new at browser's history | undefined                                 | 

