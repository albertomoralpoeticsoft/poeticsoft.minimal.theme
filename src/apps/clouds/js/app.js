import React, {
  useEffect,
  useRef
} from 'react'
import clouds from './clouds'

export default props => { 

  const cloudsRef = useRef()
  const containerRef = useRef()

  useEffect(() => {

    if(containerRef.current) {

      clouds(containerRef.current)

      cloudsRef.current.className = 'Visible'
    }

  }, [containerRef.current])

  return <div 
    id="Clouds" 
    ref={ cloudsRef }
  >
    <div 
      id="container" 
      ref={ containerRef }
    />
  </div>
}