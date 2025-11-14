/******/ (() => { // webpackBootstrap
/*!*************************************!*\
  !*** ./src/svgscript/flock/main.js ***!
  \*************************************/
var script = document.currentScript;
var svgid = script.getAttribute('data-svgid');
var color = script.getAttribute('data-color');
var svg = document.getElementById('svg_' + svgid);
if (svg) {
  var limit = function limit(vx, vy, max) {
    var m = Math.sqrt(vx * vx + vy * vy);
    if (m > max) return {
      vx: vx / m * max,
      vy: vy / m * max
    };
    return {
      vx: vx,
      vy: vy
    };
  }; // ------------ ANIMACIÓN ----------------
  var _animate = function animate() {
    // limpiar links anteriores
    linksGroup.innerHTML = '';

    // dibujar nuevas líneas
    for (var _i = 0; _i < boids.length; _i++) {
      for (var j = _i + 1; j < boids.length; j++) {
        var b1 = boids[_i];
        var b2 = boids[j];
        var dx = b2.x - b1.x;
        var dy = b2.y - b1.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK_DISTANCE) {
          var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('opacity', 0.1);
          line.setAttribute('x1', b1.x);
          line.setAttribute('y1', b1.y);
          line.setAttribute('x2', b2.x);
          line.setAttribute('y2', b2.y);

          // opacidad según distancia
          var alpha = 1 - d / LINK_DISTANCE;
          line.setAttribute('stroke', color);
          line.setAttribute('stroke-width', 0.3);
          linksGroup.appendChild(line);
        }
      }
    }

    // actualizar boids
    for (var _i2 = 0, _boids = boids; _i2 < _boids.length; _i2++) {
      var b = _boids[_i2];
      var alignX = 0,
        alignY = 0;
      var cohX = 0,
        cohY = 0;
      var sepX = 0,
        sepY = 0;
      var count = 0;
      for (var _i3 = 0, _boids2 = boids; _i3 < _boids2.length; _i3++) {
        var o = _boids2[_i3];
        if (o === b) continue;
        var _dx = o.x - b.x;
        var _dy = o.y - b.y;
        var dist = Math.sqrt(_dx * _dx + _dy * _dy);
        if (dist > VISION_RADIUS) continue;

        // campo de visión
        var angleTo = Math.atan2(_dy, _dx);
        var heading = Math.atan2(b.vy, b.vx);
        var diff = angleTo - heading;
        if (Math.abs(diff) > Math.PI) diff -= Math.sign(diff) * 2 * Math.PI;
        if (Math.abs(diff) > VISION_ANGLE / 2) continue;
        count++;
        alignX += o.vx;
        alignY += o.vy;
        cohX += o.x;
        cohY += o.y;
        if (dist < 6) {
          sepX -= _dx / dist;
          sepY -= _dy / dist;
        }
      }

      // reset aceleración
      b.ax = 0;
      b.ay = 0;
      if (count > 0) {
        // alineamiento
        alignX /= count;
        alignY /= count;
        var a1 = limit(alignX - b.vx, alignY - b.vy, MAX_FORCE);
        b.ax += a1.vx * ALIGN_WEIGHT;
        b.ay += a1.vy * ALIGN_WEIGHT;

        // cohesión
        cohX = cohX / count - b.x;
        cohY = cohY / count - b.y;
        var a2 = limit(cohX, cohY, MAX_FORCE);
        b.ax += a2.vx * COHESION_WEIGHT;
        b.ay += a2.vy * COHESION_WEIGHT;

        // separación
        var a3 = limit(sepX, sepY, MAX_FORCE);
        b.ax += a3.vx * SEPARATION_WEIGHT;
        b.ay += a3.vy * SEPARATION_WEIGHT;
      }

      // ----------- mouse ------------------

      var mdx = mouseX - b.x;
      var mdy = mouseY - b.y;
      var mdist = Math.sqrt(mdx * mdx + mdy * mdy);

      // atracción 
      if (mdist < MOUSE_RADIUS) {
        b.ax += mdx / mdist * MOUSE_FORCE;
        b.ay += mdy / mdist * MOUSE_FORCE;
      }

      // Repulsion
      // if (mdist < MOUSE_RADIUS) {
      //   b.ax -= (mdx / mdist) * MOUSE_FORCE;  // <-- signo invertido
      //   b.ay -= (mdy / mdist) * MOUSE_FORCE;  // <-- signo invertido
      // }

      // velocidad
      b.vx += b.ax;
      b.vy += b.ay;
      var sp = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
      if (sp < MIN_SPEED) {
        b.vx = b.vx / sp * MIN_SPEED;
        b.vy = b.vy / sp * MIN_SPEED;
      } else if (sp > MAX_SPEED) {
        b.vx = b.vx / sp * MAX_SPEED;
        b.vy = b.vy / sp * MAX_SPEED;
      }

      // movimiento
      b.x += b.vx;
      b.y += b.vy;

      // rebote
      // if (b.x < 0)  { b.x = 0; b.vx *= -1; }
      // if (b.x > WIDTH) { b.x = WIDTH; b.vx *= -1; }
      // if (b.y < 0)  { b.y = 0; b.vy *= -1; }
      // if (b.y > HEIGHT) { b.y = HEIGHT; b.vy *= -1; }

      // rebase
      if (b.x < 0) {
        b.x = WIDTH;
      }
      if (b.x > WIDTH) {
        b.x = 0;
      }
      if (b.y < 0) {
        b.y = HEIGHT;
      }
      if (b.y > HEIGHT) {
        b.y = 0;
      }

      // posicion SVG
      b.el.setAttribute('cx', b.x);
      b.el.setAttribute('cy', b.y);
    }
    requestAnimationFrame(_animate);
  };
  var linksGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  linksGroup.setAttribute('id', 'links');
  svg.appendChild(linksGroup);
  var NUM_BOIDS = 4;
  var WIDTH = 100;
  var HEIGHT = 100;

  // MAX_SPEED: velocidad máxima que puede alcanzar un boid.
  // Reducirlo → movimientos más lentos, más fluidos.
  // Aumentarlo → más energía y caos.
  // MIN_SPEED: velocidad mínima para que los boids no se queden estáticos.
  // MAX_FORCE: fuerza máxima que puede aplicar una aceleración por frame.
  // Controla qué tan rápido pueden cambiar de dirección.
  // Valores muy bajos → giros suaves y bandada estable.
  // Valores altos → giros bruscos y dispersión.
  var MAX_SPEED = 0.3;
  var MIN_SPEED = 0.1;
  var MAX_FORCE = 0.0003;

  // VISION_RADIUS: distancia máxima a la que un boid “ve” a sus vecinos para alineamiento/cohesión/separación.
  // Mayor → boids más conscientes del grupo, más cohesionados.
  // Menor → bandada más dispersa y reactiva solo a vecinos cercanos.
  // VISION_ANGLE: ángulo frontal de visión (en radianes).
  // Math.PI * 0.55 ≈ 100°.
  // Reduce el ángulo → boids solo reaccionan a lo que está frente a ellos → movimiento más realista.
  // Aumenta → más caos, porque ven a casi todos los vecinos.
  var VISION_RADIUS = 30;
  var VISION_ANGLE = Math.PI * 0.55;

  // COHESION_WEIGHT → cuánto tienden a moverse hacia el centro del grupo.
  // Mayor → bandada más compacta.
  // Menor → boids más dispersos.
  // ALIGN_WEIGHT → cuánto intentan igualar su dirección con la del grupo.
  // Mayor → movimientos más sincronizados.
  // Menor → movimientos más descoordinados.
  // SEPARATION_WEIGHT → cuánto evitan chocar con vecinos cercanos.
  // Mayor → bandada más separada y nerviosa.
  // Menor → bandada más pegada y cohesionada.
  var COHESION_WEIGHT = 0.1;
  var ALIGN_WEIGHT = 0.12;
  var SEPARATION_WEIGHT = 0.1;

  // mouseX, mouseY → posición actual del mouse en coordenadas SVG.
  // MOUSE_FORCE → fuerza que aplica sobre los boids.
  // Positiva → atracción.
  // Negativa → repulsión.
  // Ajusta este valor para que la interacción sea más o menos intensa.
  // MOUSE_RADIUS → radio de influencia del mouse.
  // Boids fuera de este radio ignoran al cursor.
  // Mayor → influencia más global.
  // Menor → interacción más localizada.
  var mouseX = WIDTH / 2;
  var mouseY = HEIGHT / 2;
  var MOUSE_FORCE = 0.03;
  var MOUSE_RADIUS = 20;

  // distancia máxima para líneas
  var LINK_DISTANCE = 20;

  // Para bandadas más cohesionadas:
  // Aumenta COHESION_WEIGHT
  // Aumenta VISION_RADIUS
  // Reduce SEPARATION_WEIGHT si los boids están demasiado separados
  // Para interacción más fuerte con mouse:
  // Aumenta MOUSE_FORCE y/o MOUSE_RADIUS
  // Para movimiento más suave y orgánico:
  // Reduce MAX_FORCE
  // Reduce MAX_SPEED ligeramente
  // Mantén MIN_SPEED > 0 para que nunca se queden congelados

  // ------------ mouse tracking -------------
  svg.addEventListener('mousemove', function (e) {
    var pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    var p = pt.matrixTransform(svg.getScreenCTM().inverse());
    mouseX = p.x;
    mouseY = p.y;
  });

  // ------------ BOIDS ----------------
  var boids = [];
  for (var i = 0; i < NUM_BOIDS; i++) {
    var x = Math.random() * WIDTH;
    var y = Math.random() * HEIGHT;
    var a = Math.random() * Math.PI * 2;
    var vx = Math.cos(a) * 0.8;
    var vy = Math.sin(a) * 0.8;
    var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    el.setAttribute('r', 0.7);
    el.setAttribute('fill', color);
    svg.appendChild(el);
    boids.push({
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      ax: 0,
      ay: 0,
      el: el
    });
  }
  _animate();
}
/******/ })()
;
//# sourceMappingURL=main.js.map