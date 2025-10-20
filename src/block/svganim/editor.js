import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps,
  InspectorControls
} = wp.blockEditor
const { 
  PanelBody,
  RangeControl,
  SelectControl
} = wp.components
const {
  apiFetch
} = wp
const {
  useState,
  useEffect
} = wp.element

import './editor.scss';

import metadata from 'block/svganim/block.json'

const Edit = props => {

  const {
    attributes, 
    setAttributes 
  } = props
  const { 
    blockId,
    svgscript,
    width,
    minWidth,
    maxWidth,
    velocity
  } = attributes
  const blockProps = useBlockProps()
  const [ scripts, setScripts ] = useState([])

  const selectScript = script => {

    setAttributes({ 
      svgscript: null 
    })

    setTimeout(() => {
    
      setAttributes({ 
        svgscript: script 
      })
    }, 50)
  }

  useEffect(() => {

    if (!attributes.blockId) {

      setAttributes({ blockId: uuidv4() })
    }

    apiFetch({ 
      path: 'minimaltheme/svgscripts'
    })
    .then(scripts => {

      setScripts(
        [{
          label: 'Selecciona script',
          value: ''
        }].concat(
          scripts
          .map(s => ({
            label: s,
            value: s
          }))
        )
      )
    })

  }, [])

  return <div
    { ...blockProps }
    style={{ 
      ...blockProps.style,
      width: `clamp(${minWidth}px, ${width}%, ${maxWidth}px)`, 
      padding: `0 0 clamp(${minWidth}px, ${width}%, ${maxWidth}px) 0`
    }}
  >
    <InspectorControls>
      <PanelBody 
        title="SVG Scripts" 
        initialOpen={ true }
      >        
        <SelectControl
          __nextHasNoMarginBottom
          __next40pxDefaultSize
          label="Animaciones"
          noOptionLabel="Selecciona una animación"
          value={ svgscript }
          options={ scripts }
          onChange={ selectScript }
        />
      </PanelBody>
      <PanelBody 
        title="Tamaño" 
        initialOpen={true}
      >
        <RangeControl
          label="Min Width (px)"
          value={ minWidth }
          onChange={ 
            value => setAttributes({ 
              minWidth: value 
            }) 
          }
          min={ 20}
          max={ 1600 }
        />
        <RangeControl
          label="Ancho (%)"
          value={ width }
          onChange={ 
            value => setAttributes({ 
              width: value 
            }) 
          }
          min={ 10 }
          max={ 100 }
        />
        <RangeControl
          label="Max Width (px)"
          value={ maxWidth }
          onChange={ 
            value => setAttributes({ 
              maxWidth: value 
            }) 
          }
          min={ 20}
          max={ 1600 }
        />
        <RangeControl
          label="Transición"
          value={ velocity }
          onChange={ 
            value => setAttributes({ 
              velocity: value 
            }) 
          }
          min={ 1000}
          max={ 10000 }
        />
      </PanelBody>
    </InspectorControls>
    <div className="SVG">
      {
        svgscript &&
        svgscript != '' ?
        <>
          <svg 
            id={ blockId }
            width="100%" 
            height="100%" 
            viewPort="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <script 
              type="application/ecmascript"
              href={ `/wp-content/themes/poeticsoft-minimal-theme/svgscript/${ svgscript }/main.js` }
              data-svgid={ blockId }
            ></script>
          </svg>
        </>   
        :
        <></>
      }  
    </div>
  </div>
}

const Save = () => null

registerBlockType(
  metadata.name,
  {
    edit: Edit,
    save: Save
  }
)