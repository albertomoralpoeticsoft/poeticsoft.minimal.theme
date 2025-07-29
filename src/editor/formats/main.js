const { __ } = wp.i18n;
const { select } = wp.data
const { 
  insert
} = wp.richText
const {
  BlockFormatControls,
  RichTextToolbarButton 
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

const Editor = props => {

  console.log(props)
  
  const selectOption = e => {

    console.log(props.contentRef.current.innerHTML)
  }
  
  /* COMPONENT */

  return <RichTextToolbarButton 
    icon="editor-textcolor"
    title="Add class 'portfolio'"
    onClick={ selectOption }
  />
}

registerFormatType(
	'poeticsoft/editor-formats', 
	{
		title: __( 'Add class to a' ),
		tagName: 'a',
		className: 'EditorFormats',
		edit: Editor 
	}
)