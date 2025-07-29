/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/editor/formats/main.js ***!
  \************************************/
var __ = wp.i18n.__;
var select = wp.data.select;
var insert = wp.richText.insert;
var _wp$blockEditor = wp.blockEditor,
    BlockFormatControls = _wp$blockEditor.BlockFormatControls,
    RichTextToolbarButton = _wp$blockEditor.RichTextToolbarButton;
var _wp$components = wp.components,
    ToolbarGroup = _wp$components.ToolbarGroup,
    DropdownMenu = _wp$components.DropdownMenu,
    MenuGroup = _wp$components.MenuGroup,
    MenuItem = _wp$components.MenuItem;
var registerFormatType = wp.richText.registerFormatType;

var Editor = function Editor(props) {
  console.log(props);

  var selectOption = function selectOption(e) {
    console.log(props.contentRef.current.innerHTML);
  };
  /* COMPONENT */


  return /*#__PURE__*/React.createElement(RichTextToolbarButton, {
    icon: "editor-textcolor",
    title: "Add class 'portfolio'",
    onClick: selectOption
  });
};

registerFormatType('poeticsoft/editor-formats', {
  title: __('Add class to a'),
  tagName: 'a',
  className: 'EditorFormats',
  edit: Editor
});
/******/ })()
;
//# sourceMappingURL=main.js.map