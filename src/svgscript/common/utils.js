var svgns = "http://www.w3.org/2000/svg"
const angle = a => a * Math.PI / 180;

export const followMouse = (item, mouse, k) => {

  item.cx = item.cx + (mouse.x - item.cx) * k
  item.cy = item.cy + (mouse.y - item.cy) * k
}

export const polarPosition = (center, radio, r) => {

  const theta = angle(r)
  const x = center.x + radio * Math.cos(theta);
  const y = center.y + radio * Math.sin(theta);

  return { x, y };
}

export const rotateLine = (item, radio, r) => {

  const theta = angle(r)
  const x1 = item.cx + radio * Math.cos(theta);
  const y1 = item.cy + radio * Math.sin(theta);
  const x2 = item.cx - radio * Math.cos(theta);
  const y2 = item.cy - radio * Math.sin(theta);
  return { x1, y1, x2, y2 };
}

export const inertia = (follower, value, friction) => {

  return follower + (value - follower) * friction
}

export const createCursor = (
  svg,
  color='#000', 
  stroke=0.2, 
  opacity=0.5
) => {

  console.log(color)

  const cursor = document.createElementNS(svgns, 'circle')
  cursor.setAttribute('cx', 0)
  cursor.setAttribute('cy', 0)
  cursor.setAttribute('r', 0)
  cursor.setAttribute('fill', 'none')
  cursor.setAttribute('stroke', color)
  cursor.setAttribute('stroke-width', stroke)
  cursor.setAttribute('opacity', opacity)

  svg.appendChild(cursor)

  return cursor
}

export const rectangle = (
  color='#000', 
  stroke=0.2, 
  opacity=0.5
) => {

  const rect = document.createElementNS(svgns, 'rect')
  rect.setAttribute('x', 0)
  rect.setAttribute('y', 0)
  rect.setAttribute('height', 0)
  rect.setAttribute('fill', 'none')
  rect.setAttribute('stroke', color)
  rect.setAttribute('stroke-width', stroke)
  rect.setAttribute('opacity', opacity)
  rect.setAttribute('rx', 4)
  rect.setAttribute('ry', 4)

  return rect
}

export const mousemove = (svg, mouse) => {

  document.addEventListener(
    'mousemove', 
    e => {

      if(e.target.tagName == 'svg') {

        const svgBox = svg.getBoundingClientRect()    
        mouse.x = e.offsetX * 100 / svgBox.width
        mouse.y = e.offsetY * 100 / svgBox.height        
      }
    }
  )
}

export const mousedc = (svgc, mouse) => {
  
  const dx = mouse.x - svgc.x
  const dy = mouse.y - svgc.y  

  return Math.sqrt(dx * dx + dy * dy) / 50
}