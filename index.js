import {push, replace} from 'connected-react-router';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const queryString = require('query-string');

function pushNewState({dispatch, routerState, allVariables, doReturnUrl, path, doReplaceInsteadPush}) {
  const replaceOrPush = doReplaceInsteadPush ? 'replace' : 'push';

  const pathname = typeof path === 'string' ? path
    : routerState && routerState.location && routerState.location.pathname
      ? routerState.location.pathname
      : '';

  const hash = routerState && routerState.location && routerState.location.hash
    ? routerState.location.hash
    : '';

  const search = queryString.stringify(allVariables);
  const url = `${pathname}${search ? `?${search}` : ''}${hash}`;

  if (doReturnUrl === true) {
    return url;
  }
  if (replaceOrPush === 'push') {
    return dispatch(push(url));
  }
  if (replaceOrPush === 'replace') {
    return dispatch(replace(url));
  }
}

function index() {
  const dispatch = useDispatch();
  const routerState = useSelector((_state) => _state.router);

  const search = routerState && routerState.location && routerState.location.search
    ? routerState.location.search
    : '';
  const allVariables = queryString.parse(search);
  const url = {
    get: ({variable}) => allVariables[variable] || null,
    arrayGet({variable}) {
      let values = url.get({variable}) || [];
      if (typeof values === 'string') {
        if (values) {
          values = [values];
        } else {
          values = [];
        }
      }
      return values;
    },
    set: ({variable, value, path, doReturnUrl, doReplaceInsteadPush}) => {
      pushNewState({
        dispatch,
        allVariables: {
          ...allVariables,
          [variable]: value,
        },
        doReturnUrl,
        path,
        doReplaceInsteadPush,
        routerState,
      });
    },
    remove: ({variable, doReturnUrl, doReplaceInsteadPush}) => {
      const newVariables = {...allVariables};
      delete newVariables[variable];
      pushNewState({
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
    urlSetSeveral: ({pairs, doReturnUrl, path, doReplaceInsteadPush}) => {
      const newVariables = {...allVariables};
      pairs.forEach((pair) => {
        newVariables[pair.variable] = pair.value;
      });
      pushNewState({
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        path,
        doReplaceInsteadPush,
        routerState,
      });
    },
    urlMultipleActions: ({setPairs, removeArray, arrayAddPairs, arrayRemovePairs, doReturnUrl, doReplaceInsteadPush}) => {
      let newVariables = {...allVariables};

      if (arrayAddPairs && arrayAddPairs.length > 0) {
        arrayAddPairs.forEach((pair) => {
          let values = url.arrayGet({variable: pair.variable});
          if (values.includes(pair.value) === false) {
            values.push(pair.value);
            newVariables[pair.variable] = values;
          }
          newVariables[pair.variable] = values;
        });
      }

      if (arrayRemovePairs && arrayRemovePairs.length > 0) {
        arrayRemovePairs.forEach((pair) => {
          let values = url.arrayGet({variable: pair.variable});
          if (values.includes(pair.value)) {
            values = values.filter((x) => x !== pair.value);
            newVariables[pair.variable] = values;
          }
        });
      }

      if (setPairs && setPairs.length > 0) {
        setPairs.forEach((pair) => {
          newVariables[pair.variable] = pair.value;
        });
      }

      if (removeArray && removeArray.length > 0) {
        removeArray.forEach((_variable) => {
          delete newVariables[_variable];
        });
      }

      pushNewState({
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
    setPath: ({path, keepQuery, removeArray, doReturnUrl, doReplaceInsteadPush}) => {
      let newVariables = [];
      if (keepQuery === true) {
        newVariables = {...allVariables};
        removeArray && removeArray.length > 0 && removeArray.forEach((r) => delete newVariables[r]);
      }
      pushNewState({
        path,
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
    getPath: ({keepQuery, removeArray}) => {
      let newVariables = [];
      if (keepQuery === true) {
        newVariables = {...allVariables};
        removeArray && removeArray.length > 0 && removeArray.forEach((r) => delete newVariables[r]);
      }
      pushNewState({
        doReturnUrl: true,
        allVariables: newVariables,
        routerState,
      });
    },
    arrayAdd: ({variable, value, doReturnUrl, doReplaceInsteadPush}) => {
      const newVariables = {...allVariables};
      let values = url.arrayGet({variable});
      if (values.includes(value) === false) {
        values.push(value);
        newVariables[variable] = values;
      }
      pushNewState({
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
    arrayRemove: ({variable, value, doReturnUrl, doReplaceInsteadPush}) => {
      const newVariables = {...allVariables};
      let values = url.arrayGet({variable});
      if (values.includes(value) === false) {
        values = values.filter((x) => x !== value);
        newVariables[variable] = values;
      }
      pushNewState({
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
    isArrayIncludes: ({variable, value}) => {
      let values = url.arrayGet({variable});
      return values.includes(value);
    },
    arrayToggle: ({variable, value, doReturnUrl, doReplaceInsteadPush}) => {
      return url.isArrayIncludes({variable, value})
        ? url.arrayRemove({variable, value, doReturnUrl, doReplaceInsteadPush})
        : url.arrayAdd({variable, value, doReturnUrl, doReplaceInsteadPush});
    },
    toggle({variable, value, doReturnUrl, doReplaceInsteadPush}) {
      // if value is in url and value is same - remove it, if it's not - add it.
      return (url.get({variable}) === value)
        ? url.remove({variable, doReturnUrl})
        : url.set({variable, value, doReturnUrl});
    },
    removeSeveral: ({variables, doReturnUrl, doReplaceInsteadPush}) => {
      const newVariables = {...allVariables};
      variables.forEach((variable) => {
        delete newVariables[variable];
      });
      pushNewState({
        dispatch,
        allVariables: newVariables,
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
    removeAll: ({doReturnUrl, path, doReplaceInsteadPush}) => {
      pushNewState({
        dispatch,
        path,
        allVariables: [],
        doReturnUrl,
        doReplaceInsteadPush,
        routerState,
      });
    },
  };

  return url;
}

export default index;
