// http://snapsvg.io/about/

import { times } from 'lodash'
import { observesvg } from '../common/inviewport'
import { 
  followMouse,
  rotatePoint,
  rotateLine
} from '../common/utils'
const script = document.currentScript
const svgid = script.getAttribute('data-svgid')
const svg = document.getElementById('svg_' + svgid)

let running = true
const lado = 100
const rad = 1.4142 * lado
const opaco = 1
const itemscount = 100
const items = []
let mouse = {
  x: 50, 
  y: 50
}
let a = 0
const r = 360 / itemscount

times(itemscount, index => {

  const c = document.createElementNS(
    'http://www.w3.org/2000/svg', 
    'line'
  )
  c.setAttribute('stroke', '#000000')
  c.setAttribute('stroke-width', 1)
  svg.appendChild(c)

  items.push({
    e: c,
    cx: 0,
    cy: 0,
    rs: 0.5,
    r: 360 / itemscount * index
  })
})

const animar = () => {

  a = (a + r) % 360

  times(itemscount, index => {

    const item = items[index]
    
    const pr = rotatePoint(
      {
        x: 50,
        y: 50
      },
      lado / 8,
      a
    )

    const friction = ((1 / (itemscount + 1)) + (index / itemscount)) / 10
    followMouse(item, mouse, friction) //index / itemscount);

    item.r = (item.r + item.rs) % 360
    const rline = rotateLine(item, rad, item.r)

    item.e.setAttribute('x1', rline.x1 + '%')
    item.e.setAttribute('x2', rline.x2 + '%')
    item.e.setAttribute('y1', rline.y1 + '%')
    item.e.setAttribute('y2', rline.y2 + '%')

  })

  if(running) {
    
    requestAnimationFrame(animar)
  }
}

svg.addEventListener(
  'mousemove', 
  e => {

    const svgBox = svg.getBoundingClientRect()    
    mouse.x = e.offsetX * 100 / svgBox.width
    mouse.y = e.offsetY * 100 / svgBox.height
  }
)

svg.addEventListener(
  'mouseleave', 
  () => {

    mouse.x = mouse.x
    mouse.y = mouse.y
  }
)

const setRunning = r => {

  running = r
}

observesvg(svg, setRunning, animar)