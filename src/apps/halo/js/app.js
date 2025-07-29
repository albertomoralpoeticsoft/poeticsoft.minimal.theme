import React, {
  useEffect,
  useRef
} from 'react'
import halo from './halo'

export default props => { 

  const haloRef = useRef()

  useEffect(() => {

    if(haloRef.current) {

      halo(haloRef.current)
    }

  }, [haloRef.current])

  return <div 
    id="Halo" 
    ref={ haloRef }
  />
}