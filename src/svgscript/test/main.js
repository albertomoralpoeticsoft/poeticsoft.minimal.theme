// http://snapsvg.io/about/
 
import { observesvg } from '../common/inviewport'
const script = document.currentScript;
const svgid = script.getAttribute('data-svgid');
const svg = document.getElementById('svg_' + svgid)

let running = false
const ancho = 100;
const alto = 100;
const opaco = 1;
const numCirculos = 10;
const circulos = [];
let mouse = {x: null, y: null};

const setRunning = r => {

  running = r
}

function colorHSL(hue) {

  return `hsl(${hue % 360}, 80%, 50%)`;
}

for (let i = 0; i < numCirculos; i++) {

  const r = Math.random() * 8 + 5;
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("r", r + '%');
  c.setAttribute("cx", (Math.random() * (ancho - 2*r) + r) + '%');
  c.setAttribute("cy", (Math.random() * (alto - 2*r) + r) + '%');
  c.setAttribute("fill", 'none');
  c.setAttribute("stroke", colorHSL(Math.random() * 360));
  c.setAttribute("stroke-width", 10);
  svg.appendChild(c);

  circulos.push({
    el: c,
    x: Math.random() * (ancho - 2*r) + r,
    y: Math.random() * (alto - 2*r) + r,
    o: 0,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    vo: (Math.random() - 0.5) * 0.1,
    hue: Math.random() * 360
  });
}

svg.addEventListener(
  "mousemove", 
  e => {

    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  }
);

svg.addEventListener(
  "mouseleave", 
  () => {

    mouse.x = null;
    mouse.y = null;
  }
);

function animar() {

  circulos.forEach(c => {
    
    c.x += c.vx;
    c.y += c.vy;
    c.o += c.vo;

    
    if (c.x < 0 || c.x > ancho) c.vx *= -1;
    if (c.y < 0 || c.y > alto) c.vy *= -1;
    if (c.o < 0 || c.o > opaco) c.vo *= -1;

    if (mouse.x !== null && mouse.y !== null) {

      const dx = mouse.x - c.x;
      const dy = mouse.y - c.y;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 100) {
        
        const force = (100 - dist)/100 * 0.5;
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

  if(running) {
    
    requestAnimationFrame(animar)
  }
}

observesvg(svg, setRunning, animar)