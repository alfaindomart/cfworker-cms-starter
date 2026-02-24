import {
  TanStackRouterDevtoolsCore,
  TanStackRouterDevtoolsPanelCore
} from "./chunk-HUYNP2OI.js";
import {
  useRouter,
  useRouterState
} from "./chunk-4RNNH7LZ.js";
import "./chunk-3NIPJJA4.js";
import "./chunk-Z77H7FTL.js";
import "./chunk-ZKGZLFER.js";
import {
  require_jsx_runtime
} from "./chunk-V4HIJQKK.js";
import {
  require_react
} from "./chunk-5W7N3W2G.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// ../../node_modules/.pnpm/@tanstack+react-router-devtools@1.162.4_@tanstack+react-router@1.162.4_react-dom@19.2.4_3b511744b7c4f225b592bc8895c23b09/node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function TanStackRouterDevtools(props) {
  const {
    initialIsOpen,
    panelProps,
    closeButtonProps,
    toggleButtonProps,
    position,
    containerElement,
    shadowDOMTarget,
    router: propsRouter
  } = props;
  const hookRouter = useRouter({ warn: false });
  const activeRouter = propsRouter ?? hookRouter;
  const activeRouterState = useRouterState({ router: activeRouter });
  const devToolRef = (0, import_react.useRef)(null);
  const [devtools] = (0, import_react.useState)(
    () => new TanStackRouterDevtoolsCore({
      initialIsOpen,
      panelProps,
      closeButtonProps,
      toggleButtonProps,
      position,
      containerElement,
      shadowDOMTarget,
      router: activeRouter,
      routerState: activeRouterState
    })
  );
  (0, import_react.useEffect)(() => {
    devtools.setRouter(activeRouter);
  }, [devtools, activeRouter]);
  (0, import_react.useEffect)(() => {
    devtools.setRouterState(activeRouterState);
  }, [devtools, activeRouterState]);
  (0, import_react.useEffect)(() => {
    devtools.setOptions({
      initialIsOpen,
      panelProps,
      closeButtonProps,
      toggleButtonProps,
      position,
      containerElement,
      shadowDOMTarget
    });
  }, [
    devtools,
    initialIsOpen,
    panelProps,
    closeButtonProps,
    toggleButtonProps,
    position,
    containerElement,
    shadowDOMTarget
  ]);
  (0, import_react.useEffect)(() => {
    if (devToolRef.current) {
      devtools.mount(devToolRef.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: (0, import_jsx_runtime.jsx)("div", { ref: devToolRef }) });
}

// ../../node_modules/.pnpm/@tanstack+react-router-devtools@1.162.4_@tanstack+react-router@1.162.4_react-dom@19.2.4_3b511744b7c4f225b592bc8895c23b09/node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtoolsPanel.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var import_react2 = __toESM(require_react(), 1);
var TanStackRouterDevtoolsPanel = (props) => {
  const { router: propsRouter, ...rest } = props;
  const hookRouter = useRouter({ warn: false });
  const activeRouter = propsRouter ?? hookRouter;
  const activeRouterState = useRouterState({ router: activeRouter });
  const devToolRef = (0, import_react2.useRef)(null);
  const [devtools] = (0, import_react2.useState)(
    () => new TanStackRouterDevtoolsPanelCore({
      ...rest,
      router: activeRouter,
      routerState: activeRouterState
    })
  );
  (0, import_react2.useEffect)(() => {
    devtools.setRouter(activeRouter);
  }, [devtools, activeRouter]);
  (0, import_react2.useEffect)(() => {
    devtools.setRouterState(activeRouterState);
  }, [devtools, activeRouterState]);
  (0, import_react2.useEffect)(() => {
    devtools.setOptions({
      className: props.className,
      style: props.style,
      shadowDOMTarget: props.shadowDOMTarget
    });
  }, [devtools, props.className, props.style, props.shadowDOMTarget]);
  (0, import_react2.useEffect)(() => {
    if (devToolRef.current) {
      devtools.mount(devToolRef.current);
    }
    return () => {
      devtools.unmount();
    };
  }, [devtools]);
  return (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: (0, import_jsx_runtime2.jsx)("div", { ref: devToolRef }) });
};

// ../../node_modules/.pnpm/@tanstack+react-router-devtools@1.162.4_@tanstack+react-router@1.162.4_react-dom@19.2.4_3b511744b7c4f225b592bc8895c23b09/node_modules/@tanstack/react-router-devtools/dist/esm/index.js
var TanStackRouterDevtools2 = false ? function() {
  return null;
} : TanStackRouterDevtools;
var TanStackRouterDevtoolsInProd = TanStackRouterDevtools;
var TanStackRouterDevtoolsPanel2 = false ? function() {
  return null;
} : TanStackRouterDevtoolsPanel;
var TanStackRouterDevtoolsPanelInProd = TanStackRouterDevtoolsPanel;
export {
  TanStackRouterDevtools2 as TanStackRouterDevtools,
  TanStackRouterDevtoolsInProd,
  TanStackRouterDevtoolsPanel2 as TanStackRouterDevtoolsPanel,
  TanStackRouterDevtoolsPanelInProd
};
//# sourceMappingURL=@tanstack_react-router-devtools.js.map
