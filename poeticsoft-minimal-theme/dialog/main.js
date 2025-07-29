/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dialog/main.scss":
/*!******************************!*\
  !*** ./src/dialog/main.scss ***!
  \******************************/
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
/*!****************************!*\
  !*** ./src/dialog/main.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.scss */ "./src/dialog/main.scss");

(function ($) {
  var $dialog = $('#Dialog');
  var $slides = $dialog.find('.Slide');

  /* Init slides */

  $slides.each(function () {
    var $this = $(this);
    if (location.pathname == '/') {
      $this.find('.wp-block-button.common.home').remove();
    }
    if ($this.hasClass('First')) {
      $this.find('.wp-block-button.common.root').remove();
    }
  });

  /* Slides height */

  var calculateSize = function calculateSize() {
    $dialog.removeClass('Calculated');
    var width = 0;
    var height = 0;
    setTimeout(function () {
      $slides.each(function () {
        var $this = $(this);
        width = Math.ceil(Math.max(height, $this.outerWidth()));
        height = Math.ceil(Math.max(height, $this.outerHeight()));
      });
      $dialog.height(width);
      $dialog.height(height);
      $dialog.addClass('Calculated');
    }, 100);
  };
  window.addEventListener('resize', calculateSize);
  setTimeout(function () {
    calculateSize();
  }, 800);

  /* Hash changes */

  var hashchanged = function hashchanged() {
    $slides.each(function () {
      $(this).removeClass('Current');
    });
    var hash = location.hash;
    var $targetSlide = hash ? $dialog.find(hash) : $dialog.find('.Slide.First');
    setTimeout(function () {
      if ($targetSlide.length) {
        $targetSlide.addClass('Current');
      }
    }, 600);
  };
  window.addEventListener('hashchange', hashchanged);
  setTimeout(function () {
    hashchanged();
  }, 1000);
})(jQuery);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map