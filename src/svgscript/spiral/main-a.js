import { times } from 'lodash'
import { rotatePoint } from '../common/utils'
var svgns = "http://www.w3.org/2000/svg";
const script = document.currentScript
const svgid = script.getAttribute('data-svgid')
const svg = document.getElementById('svg_' + svgid)

const svgc = {
  x: 50, 
  y: 50
}

const OCA = 10;
let OA = [];

// Crear OA
times(
  OCA,
  index => {

    const o = document.createElementNS(svgns, 'rect');
    o.setAttribute('x', 0);
    o.setAttribute('y', 0);
    o.setAttribute('width', 0);
    o.setAttribute('height', 0);
    o.setAttribute('fill', 'none');
    o.setAttribute('stroke', '#000000');
    o.setAttribute('stroke-width', 0.5);
    o.setAttribute('opacity', 0.5);
    svg.appendChild(o);
    OA.push({
      w: 20,
      h: 20,
      rad: 30,
      r: 0,
      o 
    });
  }
)

let a = 0;
const inc = 0.1

function animate() {

  a = (a + inc) % 360

  times(
    OCA,
    index => {

      const obj = OA[index]
      const ang = 360 / OCA * index
      const anga = (ang + a) % 360
      obj.r = (obj.r + 1) % 360

      const pos = rotatePoint(svgc, obj.rad, anga)
      const posx = pos.x - obj.w / 2
      const posy = pos.y - obj.h / 2

      obj.o.setAttribute('x', posx)
      obj.o.setAttribute('y', posy)
      obj.o.setAttribute('width', obj.w)
      obj.o.setAttribute('height', obj.h)
      obj.o.setAttribute('transform', `rotate(${ obj.r }, ${ pos.x }, ${ pos.y })`)
    }
  )

  requestAnimationFrame(animate);
}

animate();