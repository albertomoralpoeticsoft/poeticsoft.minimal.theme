import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import init from './init'
import videojpg from 'assets/images/video.jpg'
import videomp4 from 'assets/images/video.mp4'

const Rain = props => {

  const videoRef = useRef()
  const containerRef = useRef()

  useEffect(() => {

    if(videoRef.current && containerRef.current) {

      init(
        videoRef.current,
        containerRef.current
      )
    }
  }, [
    videoRef.current,
    containerRef.current
  ])

  return <div id="Rain">
    <video 
      id="videobg" 
      src={ videomp4 } 
      poster={ videojpg }
      autoPlay 
      loop 
      muted
      ref={ videoRef }
    >
      <source src={ videomp4 } type="video/mp4" />
    </video>
    <canvas
      id="container"
      ref={ containerRef }
    />
  </div>
}

export default props => { 

  const [ refresh, setRefresh ] = useState()

  const resize = () => {

    setRefresh(null)

    setTimeout(() => {
      
      setRefresh(Math.random())

    }, 1)
  }

  useEffect(() => {

    window.addEventListener(
      'resize',
      resize
    )

    resize()

    return () => {

      window.removeEventListener(
        'resize',
        resize
      )
    }

  }, [])

  return <>
    {
      refresh ?
      <Rain />
      :
      <></>
    }
  </>
}