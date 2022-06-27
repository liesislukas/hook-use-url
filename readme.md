`npm i hook-use-url`

> Tiny lib to easily use URL inside ReactJS App with React Router v6

_Tested with react-router v6 and ReactJS v18_

## Overview

```jsx
import useUrl from 'hook-use-url';

function MyComponent() {
  const url = useUrl();

  // get current url
  url.getUri(); // https://example.com/some-path?a=b&arr=x&arr=y
  // get key's value from URL. Works with arrays too.
  const a = url.get('a'); // b
  const b = url.getAll('a'); // ["b"]
  const arr = url.get('arr'); // ["x", "y"]

  // update a to c & update URL & update browser's history with history.push
  url.set("a", "c").push();
  // update a to c & update URL & update browser's history with history.replace
  url.set("a", "c").replace();
  // update a to c & return new URL without changing it and without changing browser's history
  url.set("a", "c").get();
  // add several values for same variable and update browser's URL & create new history event
  url.add("tag", "tag-1").add("tag", "tag-2").push()
}
```

## API

- You can chain several actions like so: `url.set("x1", "foo").set("x2", "foo").push()`
- To update browser's URL & history after changes - use `.push()` or `.replace()`
- When getting value, if it's not available, undefined is returned.

| Function                          | Description                                                                                         | Sample Output                             |
|-----------------------------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------|
| `url.getProtocol()`               | Get protocol                                                                                        | `https`                                   |
| `url.getDomain()`                 | Get domain                                                                                          | `example.com`                             |
| `url.getDomainWithPort()`         | Get domain with port                                                                                | `example.com:3000`                        |
| `url.getPort()`                   | Get port                                                                                            | 3000                                      | 
| `url.getPath()`                   | Get path                                                                                            | `/some-path`                              |
| `url.getQuery()`                  | Get query                                                                                           | `x1=b`                                    |
| `url.getFragment()`               | Get fragment                                                                                        | `foo`                                     |
| `url.getUri()`                    | Get full URI with everything                                                                        | `https://example.come/some-path?x1=b#foo` |
| `url.getUri()`                    | Get full URI without protocol, domain, or port                                                      | `/some-path?x1=b#foo`                     |
| `url.get(variable)`               | Get value of `x1` from query `url.get("x1")`                                                        | `some-string-value`                       |
| `url.getAll(variable)`            | Get values of `x1` from query. Always returns an array. `url.getAll("x1")`                          | `[]`, `["value"]`, `["a", "b"]`            |
| `url.removeQuery()`               | Remove query from URI                                                                               | `url` object to chain more methods.       | 
| `url.removeFragment()`            | Remove fragment from URI                                                                            | `url` object to chain more methods.       | 
| `url.removePath()`                | Remove path from URI                                                                                | `url` object to chain more methods.       | 
| `url.setPath(value, doKeepQuery)` | Set path & either keep rest of query/fragment or not. Default is not. `url.setPath("/about", true)` | `url` object to chain more methods.       | 
| `url.setFragment(value)`          | Set new value for fragment. May be any falsy value or string. `url.setFragment('title')`            | `url` object to chain more methods.       | 
| `url.set(variable, value)`        | Set value of variable in url `url.set("x1", "y")`                                                   | `url` object to chain more methods.       | 
| `url.add(variable, value)`        | Add one more value or set 1st value for the variable in url. `url.add("tag", "foo")`                | `url` object to chain more methods.       | 
| `url.subtract(variable, value)`   | Subtract one value from the variable in url. `url.subtract("tag", "foo")`                           | `url` object to chain more methods.       | 
| `url.delete(variable)`            | Delete single or multiple values of the variable. `url.delete("tag", "foo")`                        | `url` object to chain more methods.       | 
| `url.push()`                      | Set URI at browser's address input and push history event to browser's history                      | `url` object to chain more methods.       | 
| `url.replace()`                   | Set URI at browser's address input and replace current history event with new at browser's history  | `url` object to chain more methods.       |


