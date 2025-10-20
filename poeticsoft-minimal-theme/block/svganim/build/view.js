/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/block/svganim/view.scss":
/*!*************************************!*\
  !*** ./src/block/svganim/view.scss ***!
  \*************************************/
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
/*!***********************************!*\
  !*** ./src/block/svganim/view.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view.scss */ "./src/block/svganim/view.scss");

window.wp_block_poeticsoft_svganim = function (id) {

  // const $ = jQuery

  // const $block = $('#' + id)
  // const block = $block[0]
  // const $objsvg = $block.find('.SVG object')
  // let svgwindow = $objsvg[0].contentWindow

  // window.addEventListener(
  //   'message',
  //   e => {

  //     switch(e.data.type) {

  //       case 'LOADED':

  //         const observer = new IntersectionObserver(
  //           entries => {

  //             svgwindow.postMessage({ 
  //               type: entries[0].isIntersecting ? 'RUN' : 'STOP'
  //             })
  //           },
  //           { threshold: 0.5 }
  //         )
  //         .observe(block)

  //         break

  //       default:

  //         break
  //     }
  //   }
  // )

  // const init = () => {

  // }

  // if(!svgwindow) {

  //   $objsvg[0]
  //   .addEventListener(
  //     'load',
  //     e => {

  //       svgwindow = $objsvg[0].contentWindow

  //       init()
  //     }
  //   )

  // } else {

  //   init()
  // }
};
})();

/******/ })()
;
//# sourceMappingURL=view.js.map