import React, {
  useEffect,
  useRef
} from 'react'
import fire from './fire'

export default props => { 

  const canvasRef = useRef()

  useEffect(() => {

    if(canvasRef.current) {

      fire(canvasRef.current)
    }

  }, [canvasRef.current])

  return <div id="Fire">
    <canvas 
      id="container" 
      ref={ canvasRef }
    />
  </div>
}