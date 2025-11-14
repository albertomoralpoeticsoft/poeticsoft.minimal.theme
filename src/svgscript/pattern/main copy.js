const script = document.currentScript
const svgid = script.getAttribute('data-svgid')
const svg = document.getElementById('svg_' + svgid)

// Responsive 

const width = 100, height = 100
const cx = width / 2, 
      cy = height / 2
let mouseOn = true

// Configuración del patrón

const layers = 2              // cantidad de anillos concéntricos
const pointsPerLayer = 16     // puntos por anillo
const maxRadius = 30          // radio máximo
const connectDist = 10        // distancia máxima para conectar líneas

// Crear elementos SVG
let points = []
for (let j = 0; j < layers; j++) {

  const r = (maxRadius / layers) * (j + 1)

  for (let i = 0; i < pointsPerLayer; i++) {

    const angle = (i / pointsPerLayer) * 2 * Math.PI
    const x = cx + r * Math.cos(angle)
    const y = cy + r * Math.sin(angle)

    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    dot.setAttribute('r', 1)
    dot.setAttribute('fill', 'white')
    svg.appendChild(dot)
    points.push({ x, y, r, angle, dot })
  }
}

let mouse = { x: cx, y: cy }

// Seguimiento del ratón
svg.addEventListener(
  'mousemove', 
  e => {

    mouseOn = true

    const svgBox = svg.getBoundingClientRect()    
    mouse.x = e.offsetX * 100 / svgBox.width
    mouse.y = e.offsetY * 100 / svgBox.height
  }
)

svg.addEventListener(
  'mouseleave', 
  e => {

    mouseOn = false
  }
)

// Función para crear una línea SVG
function line(x1, y1, x2, y2, opacity) {

  const l = document.createElementNS('http://www.w3.org/2000/svg', 'line')
  l.setAttribute('x1', x1 + '%')
  l.setAttribute('y1', y1 + '%')
  l.setAttribute('x2', x2 + '%')
  l.setAttribute('y2', y2 + '%')
  l.setAttribute('stroke', 'rgba(0, 0, 0,' + opacity + ')')
  l.setAttribute('stroke-width', '0.5')

  svg.appendChild(l)
}

// Animación principal
let t = 0
function animate() {

  t += 0.01;

  // limpiar todas las líneas antes de redibujar
  [...svg.querySelectorAll('line')].forEach(l => l.remove())

  // actualizar posiciones de los puntos
  points.forEach((p, i) => {

    const offset = Math.sin(t + p.r * 0.05) * 10 // movimiento ondulatorio
    const theta = p.angle + t * 0.3

    p.x = cx + (p.r + offset) * Math.cos(theta)
    p.y = cy + (p.r + offset) * Math.sin(theta)

    p.dot.setAttribute('cx', p.x + '%')
    p.dot.setAttribute('cy', p.y + '%')
  })

  // conectar puntos cercanos
  for (let i = 0; i < points.length; i++) {

    for (let j = i + 1; j < points.length; j++) {

      const dx = points[i].x - points[j].x
      const dy = points[i].y - points[j].y
      const d = Math.sqrt(dx * dx + dy * dy)

      if (d < connectDist) {

        const opacity = 1 - d / connectDist
        line(points[i].x, points[i].y, points[j].x, points[j].y, opacity * 0.6)
      }
    }
  }

  // efecto de atracción al ratón
  points.forEach(p => {

    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 20 && mouseOn) {

      p.dot.setAttribute('fill', '#ff6600')
      p.dot.setAttribute('r', 0.4 + '%')

    } else {

      p.dot.setAttribute('fill', '#000000')
      p.dot.setAttribute('r', 0.4 + '%')
    }
  })

  requestAnimationFrame(animate)
}

animate()