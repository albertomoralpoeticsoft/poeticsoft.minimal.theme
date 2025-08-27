const { addFilter } = wp.hooks
const { createHigherOrderComponent } = wp.compose
const { InspectorControls } = wp.blockEditor
const { PanelBody, BoxControl } = wp.components

import './main.scss';

const ALLOWED = [
  'core/group', 
  'core/cover', 
  'core/columns'
]

const withSpacingControls = createHigherOrderComponent(BlockEdit => {

  return (props) => {

    if (! props.isSelected || ! ALLOWED.includes(props.name)) {

      return <BlockEdit { ...props } />
    }

    const { attributes, setAttributes } = props

    const spacing = attributes.style?.spacing || {}
    const padding = spacing.padding || {}
    const margin = spacing.margin || {}

    const updateSpacing = (type, nextValues) => {

      const newStyle = {
        style: {
          ...attributes.style,
          spacing: {
            ...spacing,
            [type]: {
              ...(spacing[type] || {}),
              ...nextValues,
            },
          },
        },
      }

      setAttributes(newStyle)
    }

    return <>
      <BlockEdit { ...props } />
      <InspectorControls>
        <PanelBody title="Padding personalizado" initialOpen={ true }>
          <div className="PaddingControl">
            <BoxControl
              label="Padding"
              values={ padding }
              onChange={ (next) => updateSpacing('padding', next) }
              __experimentalUnits={ ['px', 'em', 'rem', '%'] }
            />
          </div>
        </PanelBody>
        <PanelBody title="Margin personalizado" initialOpen={ false }>
          <div className="MarginControl">
            <BoxControl
              label="Margin"
              values={ margin }
              onChange={ (next) => updateSpacing('margin', next) }
              __experimentalUnits={ ['px', 'em', 'rem', '%'] }
            />
          </div>
        </PanelBody>
      </InspectorControls>
    </>
  }
}, 'withSpacingControls')

addFilter(
  'editor.BlockEdit',
  'poeticsoft-spacing-controls/with-spacing-controls',
  withSpacingControls
)

const withSpacingStyle = createHigherOrderComponent((BlockListBlock) => {

  return (props) => {

    const { attributes } = props
    const spacing = attributes?.style?.spacing || {}

    const getBoxValue = (box) => {

      if (!box) return undefined

      const unit = box.unit || "px" // valor por defecto
      return [
        box.top ? box.top + unit : "0",
        box.right ? box.right + unit : "0",
        box.bottom ? box.bottom + unit : "0",
        box.left ? box.left + unit : "0",
     ].join(" ")
    }

    const style = {}

    if (spacing.margin) {

      style.margin = getBoxValue(spacing.margin)
    }

    if (spacing.padding) {

      style.padding = getBoxValue(spacing.padding)
    }

    return <BlockListBlock {...props} wrapperProps={{ style }} />
  }
}, "withSpacingStyle")

addFilter(
  "editor.BlockListBlock",
  "poeticsoft-spacing-controls/with-spacing-style",
  withSpacingStyle
)

