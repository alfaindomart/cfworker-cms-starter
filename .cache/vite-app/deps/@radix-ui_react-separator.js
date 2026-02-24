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

// ../../node_modules/.pnpm/@radix-ui+react-separator@1.1.8_@types+react-dom@19.2.3_@types+react@19.2.14__@types+re_aa2d5d85a81bb702303f0548763b9797/node_modules/@radix-ui/react-separator/dist/index.mjs
var React = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator = React.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return (0, import_jsx_runtime.jsx)(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator;
export {
  Root,
  Separator
};
//# sourceMappingURL=@radix-ui_react-separator.js.map
