/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/svgscript/common/inviewport.js":
/*!********************************************!*\
  !*** ./src/svgscript/common/inviewport.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   observesvg: () => (/* binding */ observesvg)
/* harmony export */ });
var observesvg = function observesvg(svg, setRunning, animar) {
  var observer = new IntersectionObserver(function (entries) {
    setRunning(entries[0].isIntersecting);
    entries[0].isIntersecting && animar();
  }, {
    threshold: 0.5
  }).observe(svg);
};

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/*!************************************!*\
  !*** ./src/svgscript/test/main.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _common_inviewport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/inviewport */ "./src/svgscript/common/inviewport.js");
// http://snapsvg.io/about/


var script = document.currentScript;
var svgid = script.getAttribute('data-svgid');
var svg = document.getElementById('svg_' + svgid);
var running = false;
var ancho = 100;
var alto = 100;
var opaco = 1;
var numCirculos = 10;
var circulos = [];
var mouse = {
  x: null,
  y: null
};
var setRunning = function setRunning(r) {
  running = r;
};
function colorHSL(hue) {
  return "hsl(".concat(hue % 360, ", 80%, 50%)");
}
for (var i = 0; i < numCirculos; i++) {
  var r = Math.random() * 8 + 5;
  var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("r", r + '%');
  c.setAttribute("cx", Math.random() * (ancho - 2 * r) + r + '%');
  c.setAttribute("cy", Math.random() * (alto - 2 * r) + r + '%');
  c.setAttribute("fill", 'none');
  c.setAttribute("stroke", colorHSL(Math.random() * 360));
  c.setAttribute("stroke-width", 10);
  svg.appendChild(c);
  circulos.push({
    el: c,
    x: Math.random() * (ancho - 2 * r) + r,
    y: Math.random() * (alto - 2 * r) + r,
    o: 0,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    vo: (Math.random() - 0.5) * 0.1,
    hue: Math.random() * 360
  });
}
svg.addEventListener("mousemove", function (e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});
svg.addEventListener("mouseleave", function () {
  mouse.x = null;
  mouse.y = null;
});
function animar() {
  circulos.forEach(function (c) {
    c.x += c.vx;
    c.y += c.vy;
    c.o += c.vo;
    if (c.x < 0 || c.x > ancho) c.vx *= -1;
    if (c.y < 0 || c.y > alto) c.vy *= -1;
    if (c.o < 0 || c.o > opaco) c.vo *= -1;
    if (mouse.x !== null && mouse.y !== null) {
      var dx = mouse.x - c.x;
      var dy = mouse.y - c.y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        var force = (100 - dist) / 100 * 0.5;
        c.vx += dx * force * 0.01;
        c.vy += dy * force * 0.01;
      }
    }
    c.hue += 0.5;
    c.el.setAttribute("stroke", colorHSL(c.hue));
    c.el.setAttribute("cx", c.x + '%');
    c.el.setAttribute("cy", c.y + '%');
    c.el.setAttribute("opacity", c.o);
  });
  if (running) {
    requestAnimationFrame(animar);
  }
}
(0,_common_inviewport__WEBPACK_IMPORTED_MODULE_0__.observesvg)(svg, setRunning, animar);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map