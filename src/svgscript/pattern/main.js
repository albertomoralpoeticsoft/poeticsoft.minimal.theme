const script = document.currentScript
const svgid = script.getAttribute('data-svgid')
const svg = document.getElementById('svg_' + svgid)

const cx = 50, cy = 50;
const layers = 4;
const pointsPerLayer = 10;
const maxRadius = 40;
const connectDist = 12;

let points = [];
for (let j = 0; j < layers; j++) {
  const r = (maxRadius / layers) * (j + 1);
  for (let i = 0; i < pointsPerLayer; i++) {
    const angle = (i / pointsPerLayer) * 2 * Math.PI;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", 2);
    dot.setAttribute("fill", "white");
    svg.appendChild(dot);
    points.push({ x, y, r, angle, dot });
  }
}

let mouse = { x: cx, y: cy };

// Pulso de energía
let pulses = [];

// Escalar coordenadas del ratón
svg.addEventListener("mousemove", e => {

  const rect = svg.getBoundingClientRect();
  const scaleX = 100 / rect.width;
  const scaleY = 100 / rect.height;
  mouse.x = (e.clientX - rect.left) * scaleX;
  mouse.y = (e.clientY - rect.top) * scaleY;
});

// Clic genera pulso
svg.addEventListener("click", e => {

  const rect = svg.getBoundingClientRect();
  const scaleX = 100 / rect.width;
  const scaleY = 100 / rect.height;
  const px = (e.clientX - rect.left) * scaleX;
  const py = (e.clientY - rect.top) * scaleY;
  pulses.push({ x: px, y: py, radius: 0, maxRadius: 30, speed: 1 });
});

// Crear línea SVG
function line(x1, y1, x2, y2, color, opacity) {
  
  const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
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
  const t = Math.max(0, Math.min(1, 1 - dist / maxDist));
  const hue = 200 + t * 100;
  const light = 40 + t * 40;
  return `hsl(${hue}, 100%, ${light}%)`;
}

let t = 0;
function animate() {
  t += 0.01;
  [...svg.querySelectorAll("line")].forEach(l => l.remove());

  // Actualizar posiciones
  points.forEach(p => {
    const offset = Math.sin(t + p.r * 0.05) * 2;
    const theta = p.angle + t * 0.3;
    p.x = cx + (p.r + offset) * Math.cos(theta);
    p.y = cy + (p.r + offset) * Math.sin(theta);
  });

  // Dibujar líneas entre puntos cercanos
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < connectDist) {
        const opacity = 1 - d / connectDist;
        const c = colorByDistance(d, connectDist);
        line(points[i].x, points[i].y, points[j].x, points[j].y, c, opacity * 0.5);
      }
    }
  }

  // Actualizar puntos según ratón y pulsos
  points.forEach(p => {

    // Atracción al ratón
    const dxm = mouse.x - p.x;
    const dym = mouse.y - p.y;
    const distMouse = Math.sqrt(dxm * dxm + dym * dym);

    // Pulso
    let pulseEffect = 0;

    pulses.forEach(pulse => {
      const dx = pulse.x - p.x;
      const dy = pulse.y - p.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < pulse.radius) {
        pulseEffect = Math.max(pulseEffect, 1 - d / pulse.radius);
      }
    });

    const color = colorByDistance(distMouse, 20);
    p.dot.setAttribute("fill", pulseEffect > 0 ? "hsl(320,100%," + (60 + pulseEffect*40) + "%)" : color);
    p.dot.setAttribute("r", 1 + Math.max(0, 1 - distMouse / 20) * 1.2 + pulseEffect * 1.5);
    p.dot.setAttribute("cx", p.x + '%');
    p.dot.setAttribute("cy", p.y + '%');
  });

  // Actualizar pulsos
  pulses.forEach(p => {
    p.radius += p.speed;
  });
  pulses = pulses.filter(p => p.radius < p.maxRadius);

  requestAnimationFrame(animate);
}

animate();