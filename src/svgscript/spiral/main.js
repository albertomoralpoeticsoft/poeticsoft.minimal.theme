import { times } from 'lodash'
import { 
  polarPosition,
  inertia,
  rectangle,
  mousemove,
  mousedc,
  createCursor
} from '../common/utils'
const script = document.currentScript
const svgid = script.getAttribute('data-svgid')
const color = script.getAttribute('data-color')
const svg = document.getElementById('svg_' + svgid)

const svgc = {
  x: 50, 
  y: 50
}

let mouse = {
  x: 0,
  y: 0
}

mousemove(svg, mouse)

const cursor = createCursor(svg)

const OCA = 100
let OA = []
times(
  OCA,
  index => {

    const o = rectangle(color)
    svg.appendChild(o)
    OA.push({
      w: 30,
      h: 30,
      rad: 20,
      r: 0,
      i: 0,
      o 
    })
  }
)

let a = 0
const inca = 0.6

function animate() {

  a = (a - inca) % 360

  const dc = mousedc(svgc, mouse)

  cursor.setAttribute('cx', mouse.x)
  cursor.setAttribute('cy', mouse.y)
  cursor.setAttribute('r', Math.min(1 / dc, 10))
  cursor.setAttribute('opacity', 1 - dc)

  times(
    OCA,
    index => {

      const obj = OA[index]

      const ang = 360 / OCA * index
      const anginc = (ang + a) % 360

      obj.r = (obj.r + 0.5) % 360

      obj.i = inertia(obj.i, dc, 0.05)
      const w = obj.w * (obj.i + 0.1)
      const h = obj.h * (obj.i + 0.1)
      const rx = obj.i * 6
      const ry = obj.i * 6

      const pos = polarPosition(svgc, obj.rad, anginc)
      const posx = pos.x - w / 2
      const posy = pos.y - h / 2

      obj.o.setAttribute('x', posx)
      obj.o.setAttribute('y', posy)
      obj.o.setAttribute('width', w)
      obj.o.setAttribute('height', w)
      obj.o.setAttribute('rx', rx)
      obj.o.setAttribute('ry', ry)
      obj.o.setAttribute(
        'transform', 
        `rotate(
          ${ obj.r } 
          ${ pos.x } 
          ${ pos.y }
        )`
      )
    }
  )

  requestAnimationFrame(animate)
}

animate()