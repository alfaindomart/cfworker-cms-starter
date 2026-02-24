"use client";
import {
  Primitive
} from "./chunk-JKYCZ3W4.js";
import "./chunk-KZWM62VB.js";
import "./chunk-ZKGZLFER.js";
import "./chunk-UV4LW6D6.js";
import {
  require_jsx_runtime
} from "./chunk-V4HIJQKK.js";
import {
  require_react
} from "./chunk-5W7N3W2G.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// ../../node_modules/.pnpm/@radix-ui+react-label@2.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@_55fa612a976b7bdfbf4dcdd93d861aab/node_modules/@radix-ui/react-label/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var NAME = "Label";
var Label = React.forwardRef((props, forwardedRef) => {
  return (0, import_jsx_runtime.jsx)(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        props.onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label.displayName = NAME;
var Root = Label;
export {
  Label,
  Root
};
//# sourceMappingURL=@radix-ui_react-label.js.map
