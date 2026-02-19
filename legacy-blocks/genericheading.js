import { ToolbarGroup, ToolbarButton } from "@wordpress/components";
import { RichText, BlockControls } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("cns-theme/genericheading", {
  title: "CNS Heading",
  supports: {
    align: true,
  },
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  function handleTextChange(x) {
    props.setAttributes({ text: x });
  }

  const titleSize = ["large", "medium", "small"];

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          {titleSize.map((size) => {
            return (
              <ToolbarButton
                isPressed={props.attributes.size == size}
                onClick={() => props.setAttributes({ size: size })}
              >
                {size}
              </ToolbarButton>
            );
          })}
        </ToolbarGroup>
      </BlockControls>
      <RichText
        value={props.attributes.text}
        className={`headline headline--${props.attributes.size}`}
        onChange={handleTextChange}
      />
    </>
  );
}

function SaveComponent(props) {
  function createTagName() {
    switch (props.attributes.size) {
      case "large":
        return "h1";
      case "medium":
        return "h2";
      case "small":
        return "h3";
      default:
        return "p";
    }
  }
  return (
    <RichText.Content
      tagName={createTagName()}
      className={`headline headline--${props.attributes.size}`}
      value={props.attributes.text}
    />
  );
}
