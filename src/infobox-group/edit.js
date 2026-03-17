import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  ColorPalette,
} from "@wordpress/block-editor";
import {
  Button,
  Panel,
  PanelBody,
  PanelRow,
  TextControl,
} from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const { bg_color, text_color, contrast_color } = attributes;
  const onChangeBGColor = (hexColor) => {
    setAttributes({ bg_color: hexColor });
  };

  const onChangeTextColor = (hexColor) => {
    setAttributes({ text_color: hexColor });
  };
  const onChangeContrastColor = (hexColor) => {
    setAttributes({ contrast_color: hexColor });
  };

  function updateGroupTitle(value) {
    setAttributes({ group_title: value });
  }
  const TEMPLATE = [["cns-theme/infobox-row", {}]];

  return (
    <div
      {...useBlockProps()}
      style={{ backgroundColor: bg_color, color: text_color }}
    >
      <InspectorControls>
        <PanelBody title="Infobox Group Settings" initialOpen={true}>
          <PanelRow>
            <div>
              <fieldset>
                <legend className="blocks-base-control__label">
                  {__("Background color", "block-development-examples")}
                </legend>
                <ColorPalette
                  value={attributes.bg_color}
                  onChange={onChangeBGColor}
                />
              </fieldset>
              <fieldset>
                <legend className="blocks-base-control__label">
                  {__("Text color", "block-development-examples")}
                </legend>
                <ColorPalette
                  value={attributes.text_color}
                  onChange={onChangeTextColor}
                />
              </fieldset>
              <fieldset>
                <legend className="blocks-base-control__label">
                  {__("Contrast color", "block-development-examples")}
                </legend>
                <ColorPalette
                  value={attributes.contrast_color}
                  onChange={onChangeContrastColor}
                />
              </fieldset>
            </div>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className="infobox-group__outer">
        <h3
          className="infobox-group__title"
          style={{ backgroundColor: contrast_color }}
        >
          <TextControl
            placeholder="Group title"
            value={attributes.group_title}
            onChange={updateGroupTitle}
            style={{ fontSize: "20px" }}
          />
        </h3>
        <div className="infobox-group__inner">
          <InnerBlocks template={TEMPLATE} />
        </div>
      </div>
    </div>
  );
}
