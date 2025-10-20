const script = document.currentScript;
const svgid = script.getAttribute('data-svgid');
const svg = document.getElementById(svgid)

let running = false
      
const c = document.createElementNS("http://www.w3.org/2000/svg", "circle")
c.setAttribute('r', '20%')
c.setAttribute('cx', '0%')
c.setAttribute('cy', '0%')
c.setAttribute('fill', 'none')
c.setAttribute('stroke', '#000000')
c.setAttribute('stroke-width', 1)
svg.appendChild(c)

function animar() {

  const newX = (Math.random() * 100)
  const newY = (Math.random() * 100)

  c.setAttribute('cx', newX + '%')
  c.setAttribute('cy', newY + '%')

  if(running) {
    
    requestAnimationFrame(animar)
  }
}

const observer = new IntersectionObserver(
  entries => {
      
    running = entries[0].isIntersecting

    entries[0].isIntersecting && animar()
  },
  { threshold: 0.5 }
)
.observe(svg)