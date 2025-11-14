import { v4 as uuidv4 } from 'uuid'
const { 
  registerBlockType 
} = wp.blocks
const { 
  useBlockProps,
  InspectorControls,
  MediaUpload
} = wp.blockEditor
const { 
  PanelBody,
  RangeControl,
  SelectControl,
  ColorPicker,
  Button 
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
    cursorid,
    cursorurl,
    color
  } = attributes
  const blockProps = useBlockProps({
    style: {
      width: `clamp(${minWidth}px, ${width}%, ${maxWidth}px)`, 
      padding: `0 0 clamp(${minWidth}px, ${width}%, ${maxWidth}px) 0`
    }
  })
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

    const actsvgscript = svgscript

    setAttributes({ 
      svgscript: null 
    })

    setTimeout(() => {
    
      setAttributes({ 
        svgscript: actsvgscript 
      })

    }, 1)

  }, [color])

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
        title="Mouse Cursor" 
        initialOpen={ true }
      >        
        <MediaUpload
          onSelect={ 
            media => setAttributes({
              cursorid: media.id,
              cursorurl: media.url
            }) 
          }
          allowedTypes={[
            'image/png'
          ]}
          value={ cursorid }
          render={({ open }) => (
            <Button  
              isPrimary
              onClick={ 
              () => {
                
                const frame = wp.media.frames.file_frame;
                open();
                setTimeout(() => {
                  try {
                    wp.media.frame.content.mode('browse');
                  } catch (e) {}
                }, 50);
              }
            }
            >
              {
                cursorid ?
                'Change cursor'
                :
                'Select cursor'
              }
            </Button>
          )}
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
        <ColorPicker
          color={ color }
          onChange={ 
            value => setAttributes({ 
              color: value 
            }) 
          }
          defaultValue={ color }
        />
      </PanelBody>
    </InspectorControls>
    <div className="SVG">
      {
        svgscript &&
        svgscript != '' ?
        <>
          <svg 
            id={ 'svg_' + blockId }
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <script 
              type="application/ecmascript"
              href={ `/wp-content/themes/poeticsoft-minimal-theme/svgscript/${ svgscript }/main.js` }
              data-svgid={ blockId }
              data-color={ color }
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
    ...metadata,
    edit: Edit,
    save: Save
  }
)