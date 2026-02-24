import {
  require_react
} from "./chunk-5W7N3W2G.js";
import {
  capitalizeFirstLetter,
  createDynamicPathProxy,
  getClientConfig,
  listenKeys
} from "./chunk-MNLFJTZ6.js";
import "./chunk-JLKGKI2U.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// ../../node_modules/.pnpm/better-auth@1.4.18_drizzle-kit@0.31.9_drizzle-orm@0.45.1_@types+pg@8.16.0_kysely@0.28.1_b87f67cc461bdc0197103db61a2dd465/node_modules/better-auth/dist/client/react/react-store.mjs
var import_react = __toESM(require_react(), 1);
function useStore(store, options = {}) {
  const snapshotRef = (0, import_react.useRef)(store.get());
  const { keys, deps = [store, keys] } = options;
  const subscribe = (0, import_react.useCallback)((onChange) => {
    const emitChange = (value) => {
      if (snapshotRef.current === value) return;
      snapshotRef.current = value;
      onChange();
    };
    emitChange(store.value);
    if (keys?.length) return listenKeys(store, keys, emitChange);
    return store.listen(emitChange);
  }, deps);
  const get = () => snapshotRef.current;
  return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}

// ../../node_modules/.pnpm/better-auth@1.4.18_drizzle-kit@0.31.9_drizzle-orm@0.45.1_@types+pg@8.16.0_kysely@0.28.1_b87f67cc461bdc0197103db61a2dd465/node_modules/better-auth/dist/client/react/index.mjs
function getAtomKey(str) {
  return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
  const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
  const resolvedHooks = {};
  for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
  return createDynamicPathProxy({
    ...pluginsActions,
    ...resolvedHooks,
    $fetch,
    $store
  }, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
export {
  createAuthClient,
  useStore
};
//# sourceMappingURL=better-auth_react.js.map
