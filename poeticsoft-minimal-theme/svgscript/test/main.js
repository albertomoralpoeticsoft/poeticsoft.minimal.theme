/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./src/svgscript/test/main.js ***!
  \************************************/
var script = document.currentScript;
var svgid = script.getAttribute('data-svgid');
var svg = document.getElementById(svgid);
var running = false;
var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
c.setAttribute('r', '20%');
c.setAttribute('cx', '0%');
c.setAttribute('cy', '0%');
c.setAttribute('fill', 'none');
c.setAttribute('stroke', '#000000');
c.setAttribute('stroke-width', 1);
svg.appendChild(c);
function animar() {
  var newX = Math.random() * 100;
  var newY = Math.random() * 100;
  c.setAttribute('cx', newX + '%');
  c.setAttribute('cy', newY + '%');
  if (running) {
    requestAnimationFrame(animar);
  }
}
var observer = new IntersectionObserver(function (entries) {
  running = entries[0].isIntersecting;
  entries[0].isIntersecting && animar();
}, {
  threshold: 0.5
}).observe(svg);
/******/ })()
;
//# sourceMappingURL=main.js.map