export const observesvg = (svg, setRunning, animar) => {  

  const observer = new IntersectionObserver(
    entries => {
        
      setRunning(entries[0].isIntersecting)

      entries[0].isIntersecting && animar()
    },
    { threshold: 0.5 }
  )
  .observe(svg)
}