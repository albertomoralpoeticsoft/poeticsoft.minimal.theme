/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/editor/controls/main.scss":
/*!***************************************!*\
  !*** ./src/editor/controls/main.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/editor/controls/main.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/editor/controls/main.scss");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var addFilter = wp.hooks.addFilter;
var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
var InspectorControls = wp.blockEditor.InspectorControls;
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  BoxControl = _wp$components.BoxControl;

var ALLOWED = ['core/group', 'core/cover', 'core/columns'];
var withSpacingControls = createHigherOrderComponent(function (BlockEdit) {
  return function (props) {
    var _attributes$style;
    if (!props.isSelected || !ALLOWED.includes(props.name)) {
      return /*#__PURE__*/React.createElement(BlockEdit, props);
    }
    var attributes = props.attributes,
      setAttributes = props.setAttributes;
    var spacing = ((_attributes$style = attributes.style) === null || _attributes$style === void 0 ? void 0 : _attributes$style.spacing) || {};
    var padding = spacing.padding || {};
    var margin = spacing.margin || {};
    var updateSpacing = function updateSpacing(type, nextValues) {
      var newStyle = {
        style: _objectSpread(_objectSpread({}, attributes.style), {}, {
          spacing: _objectSpread(_objectSpread({}, spacing), {}, _defineProperty({}, type, _objectSpread(_objectSpread({}, spacing[type] || {}), nextValues)))
        })
      };
      setAttributes(newStyle);
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(InspectorControls, null, /*#__PURE__*/React.createElement(PanelBody, {
      title: "Padding personalizado",
      initialOpen: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "PaddingControl"
    }, /*#__PURE__*/React.createElement(BoxControl, {
      label: "Padding",
      values: padding,
      onChange: function onChange(next) {
        return updateSpacing('padding', next);
      },
      __experimentalUnits: ['px', 'em', 'rem', '%']
    }))), /*#__PURE__*/React.createElement(PanelBody, {
      title: "Margin personalizado",
      initialOpen: false
    }, /*#__PURE__*/React.createElement("div", {
      className: "MarginControl"
    }, /*#__PURE__*/React.createElement(BoxControl, {
      label: "Margin",
      values: margin,
      onChange: function onChange(next) {
        return updateSpacing('margin', next);
      },
      __experimentalUnits: ['px', 'em', 'rem', '%']
    })))));
  };
}, 'withSpacingControls');
addFilter('editor.BlockEdit', 'poeticsoft-spacing-controls/with-spacing-controls', withSpacingControls);
var withSpacingStyle = createHigherOrderComponent(function (BlockListBlock) {
  return function (props) {
    var _attributes$style2;
    var attributes = props.attributes;
    var spacing = (attributes === null || attributes === void 0 || (_attributes$style2 = attributes.style) === null || _attributes$style2 === void 0 ? void 0 : _attributes$style2.spacing) || {};
    var getBoxValue = function getBoxValue(box) {
      if (!box) return undefined;
      var unit = box.unit || "px"; // valor por defecto
      return [box.top ? box.top + unit : "0", box.right ? box.right + unit : "0", box.bottom ? box.bottom + unit : "0", box.left ? box.left + unit : "0"].join(" ");
    };
    var style = {};
    if (spacing.margin) {
      style.margin = getBoxValue(spacing.margin);
    }
    if (spacing.padding) {
      style.padding = getBoxValue(spacing.padding);
    }
    return /*#__PURE__*/React.createElement(BlockListBlock, _extends({}, props, {
      wrapperProps: {
        style: style
      }
    }));
  };
}, "withSpacingStyle");
addFilter("editor.BlockListBlock", "poeticsoft-spacing-controls/with-spacing-style", withSpacingStyle);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map