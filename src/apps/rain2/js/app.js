import React, {
  useEffect,
  useRef
} from 'react'
import Rain from './vaho'
import imgvaho from 'assets/images/vaho.jpg'

export default props => { 

  const imgRef = useRef()
  const canvasRef = useRef()

  useEffect(() => {

    if(
      imgRef.current,
      canvasRef.current
    ) {

      Rain(
        canvasRef.current,
        imgRef.current
      )
    }
  }, [
    imgRef.current,
    canvasRef.current
  ])

  return <div id="Rain">
    <img 
      id="Texture" 
      src={ imgvaho }
      ref={ imgRef }
    />
    <canvas
      id="container"
      ref={ canvasRef }
    />
  </div>
}



<canvas id="Container"></canvas>