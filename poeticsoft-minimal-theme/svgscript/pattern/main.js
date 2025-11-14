/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/svgscript/pattern/main.js ***!
  \***************************************/
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var script = document.currentScript;
var svgid = script.getAttribute('data-svgid');
var svg = document.getElementById('svg_' + svgid);
var cx = 50,
  cy = 50;
var layers = 4;
var pointsPerLayer = 10;
var maxRadius = 40;
var connectDist = 12;
var points = [];
for (var j = 0; j < layers; j++) {
  var r = maxRadius / layers * (j + 1);
  for (var i = 0; i < pointsPerLayer; i++) {
    var angle = i / pointsPerLayer * 2 * Math.PI;
    var x = cx + r * Math.cos(angle);
    var y = cy + r * Math.sin(angle);
    var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", 2);
    dot.setAttribute("fill", "white");
    svg.appendChild(dot);
    points.push({
      x: x,
      y: y,
      r: r,
      angle: angle,
      dot: dot
    });
  }
}
var mouse = {
  x: cx,
  y: cy
};

// Pulso de energía
var pulses = [];

// Escalar coordenadas del ratón
svg.addEventListener("mousemove", function (e) {
  var rect = svg.getBoundingClientRect();
  var scaleX = 100 / rect.width;
  var scaleY = 100 / rect.height;
  mouse.x = (e.clientX - rect.left) * scaleX;
  mouse.y = (e.clientY - rect.top) * scaleY;
});

// Clic genera pulso
svg.addEventListener("click", function (e) {
  var rect = svg.getBoundingClientRect();
  var scaleX = 100 / rect.width;
  var scaleY = 100 / rect.height;
  var px = (e.clientX - rect.left) * scaleX;
  var py = (e.clientY - rect.top) * scaleY;
  pulses.push({
    x: px,
    y: py,
    radius: 0,
    maxRadius: 30,
    speed: 1
  });
});

// Crear línea SVG
function line(x1, y1, x2, y2, color, opacity) {
  var l = document.createElementNS("http://www.w3.org/2000/svg", "line");
  l.setAttribute("x1", x1 + '%');
  l.setAttribute("y1", y1 + '%');
  l.setAttribute("x2", x2 + '%');
  l.setAttribute("y2", y2 + '%');
  l.setAttribute("stroke", color);
  l.setAttribute("stroke-opacity", opacity);
  l.setAttribute("stroke-width", 0.1);
  svg.appendChild(l);
}

// Color dinámico
function colorByDistance(dist, maxDist) {
  var t = Math.max(0, Math.min(1, 1 - dist / maxDist));
  var hue = 200 + t * 100;
  var light = 40 + t * 40;
  return "hsl(".concat(hue, ", 100%, ").concat(light, "%)");
}
var t = 0;
function animate() {
  t += 0.01;
  _toConsumableArray(svg.querySelectorAll("line")).forEach(function (l) {
    return l.remove();
  });

  // Actualizar posiciones
  points.forEach(function (p) {
    var offset = Math.sin(t + p.r * 0.05) * 2;
    var theta = p.angle + t * 0.3;
    p.x = cx + (p.r + offset) * Math.cos(theta);
    p.y = cy + (p.r + offset) * Math.sin(theta);
  });

  // Dibujar líneas entre puntos cercanos
  for (var _i = 0; _i < points.length; _i++) {
    for (var _j = _i + 1; _j < points.length; _j++) {
      var dx = points[_i].x - points[_j].x;
      var dy = points[_i].y - points[_j].y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < connectDist) {
        var opacity = 1 - d / connectDist;
        var c = colorByDistance(d, connectDist);
        line(points[_i].x, points[_i].y, points[_j].x, points[_j].y, c, opacity * 0.5);
      }
    }
  }

  // Actualizar puntos según ratón y pulsos
  points.forEach(function (p) {
    // Atracción al ratón
    var dxm = mouse.x - p.x;
    var dym = mouse.y - p.y;
    var distMouse = Math.sqrt(dxm * dxm + dym * dym);

    // Pulso
    var pulseEffect = 0;
    pulses.forEach(function (pulse) {
      var dx = pulse.x - p.x;
      var dy = pulse.y - p.y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < pulse.radius) {
        pulseEffect = Math.max(pulseEffect, 1 - d / pulse.radius);
      }
    });
    var color = colorByDistance(distMouse, 20);
    p.dot.setAttribute("fill", pulseEffect > 0 ? "hsl(320,100%," + (60 + pulseEffect * 40) + "%)" : color);
    p.dot.setAttribute("r", 1 + Math.max(0, 1 - distMouse / 20) * 1.2 + pulseEffect * 1.5);
    p.dot.setAttribute("cx", p.x + '%');
    p.dot.setAttribute("cy", p.y + '%');
  });

  // Actualizar pulsos
  pulses.forEach(function (p) {
    p.radius += p.speed;
  });
  pulses = pulses.filter(function (p) {
    return p.radius < p.maxRadius;
  });
  requestAnimationFrame(animate);
}
animate();
/******/ })()
;
//# sourceMappingURL=main.js.map