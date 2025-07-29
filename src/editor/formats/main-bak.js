const { __ } = wp.i18n;
const { select } = wp.data
const { 
  insert
} = wp.richText
const {
  BlockFormatControls
} = wp.blockEditor
const { 
  ToolbarGroup,
  DropdownMenu,
  MenuGroup,
  MenuItem
} = wp.components
const { 
  registerFormatType 
} = wp.richText
const { 
  useEffect,
  useReducer
} = wp.element
import immutableUpdate from 'immutable-update'

const Editor = props => {
  
  const selectOption = () => {

    console.log('option')
  }
  
  /* COMPONENT */

  return <BlockFormatControls>
    <ToolbarGroup>
      <DropdownMenu
        icon="editor-textcolor"
        label="Select values"
      >
        <MenuGroup>
          <MenuItem 
            icon="megaphone"
            onClick={ selectOption }
          >
            titulo
          </MenuItem>
        </MenuGroup>
      </DropdownMenu>
    </ToolbarGroup>
  </BlockFormatControls>
}

registerFormatType(
	'poeticsoft/editor-formats', 
	{
		title: __( 'Editor formats' ),
		tagName: 'a',
		className: 'EditorFormats',
		edit: Editor 
	}
)