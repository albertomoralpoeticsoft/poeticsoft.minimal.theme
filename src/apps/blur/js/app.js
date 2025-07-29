import React, {
  useEffect,
  useRef
} from 'react'
import blur from './blur'

export default props => { 

  const blurRef = useRef()

  useEffect(() => {

    if(blurRef.current) {

      blur(blurRef.current)

      setTimeout(() => {

        blurRef.current.className = 'Visible'

      }, 500)
    }

  }, [blurRef.current])

  return <div 
    id="Blur" 
    ref={ blurRef }
  />
}