`npm i hook-use-url`

useUrl hook for easier URL reading & writing within ReactJS app


```javascript
import useUrl from 'hook-use-url';

...

  const url = useUrl();
  const view = url.get({variable: 'extension-single-view'});

...

  url.set({variable: 'extension-single-view', value: 'state-manager'});


```
