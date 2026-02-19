import { link } from "@wordpress/icons";
import colorSet from "../inc/colorSet";
import {
  ToolbarGroup,
  ToolbarButton,
  Popover,
  Button,
  PanelBody,
  PanelRow,
  ColorPalette,
} from "@wordpress/components";
import {
  RichText,
  InspectorControls,
  BlockControls,
  LinkControl,
  getColorObjectByColorValue,
} from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";
import { useState } from "@wordpress/element";

registerBlockType("cns-theme/genericbutton", {
  title: "CNS Button",
  supports: {
    align: true,
  },
  attributes: {
    text: { type: "string", default: "button" },
    size: { type: "string", default: "large" },
    linkObject: { type: "object", default: { url: "" } },
    colorName: { type: "string", default: "blue" },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
  const currentColorValue = colorSet.filter((color) => {
    return color.name === props.attributes.colorName;
  })[0].color;
  function handleColorChange(colorCode) {
    const { name } = getColorObjectByColorValue(colorSet, colorCode);
    props.setAttributes({ colorName: name });
  }
  function handleTextChange(text) {
    props.setAttributes({ text: text });
  }
  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink });
  }

  function buttonHandler() {
    setIsLinkPickerVisible((prev) => !prev);
  }

  const titleSize = ["large", "medium", "small"];

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>
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
      <InspectorControls>
        <PanelBody title="Color" initialOpen={true}>
          <PanelRow>
            <ColorPalette
              colors={colorSet}
              value={currentColorValue}
              onChange={handleColorChange}
              // Disable color picker:
              disableCustomColors={true}
              clearable={false}
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <RichText
        allowedFormats={[]}
        tagName="a"
        value={props.attributes.text}
        className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
        onChange={handleTextChange}
      />
      {isLinkPickerVisible && (
        <Popover
          position="middle center"
          onFocusOutside={() => setIsLinkPickerVisible(false)}
        >
          <LinkControl
            settings={[]}
            value={props.attributes.linkObject}
            onChange={handleLinkChange}
          />
          <Button
            variant="primary"
            onClick={() => setIsLinkPickerVisible(false)}
            style={{ display: "block", width: "100%" }}
          >
            Confirm
          </Button>
        </Popover>
      )}
    </>
  );
}

function SaveComponent(props) {
  return (
    <a
      href={props.attributes.linkObject.url}
      className={`btn btn--${props.attributes.size} btn--${props.attributes.colorName}`}
    >
      {props.attributes.text}
    </a>
  );
}
