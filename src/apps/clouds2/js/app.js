import React, {
  useEffect,
  useRef
} from 'react'
import * as THREE from 'three'
import './vanta.clouds'

export default props => { 

  const containerRef = useRef()

  useEffect(() => {

    if(containerRef.current) {

      VANTA.CLOUDS({
        el: "#container",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        THREE: THREE
      })
    }

  }, [containerRef.current])

  return <div id="Clouds">
    <div 
      id="container" 
      ref={ containerRef }
    />
  </div>
}