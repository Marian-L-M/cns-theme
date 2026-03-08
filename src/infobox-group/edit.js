import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  ColorPalette,
} from "@wordpress/block-editor";
import { Button, Panel, PanelBody, PanelRow } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const { bg_color, text_color } = attributes;
  const onChangeBGColor = (hexColor) => {
    setAttributes({ bg_color: hexColor });
  };

  const onChangeTextColor = (hexColor) => {
    setAttributes({ text_color: hexColor });
  };
  return (
    <div {...useBlockProps()}>
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
            </div>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <InnerBlocks />
    </div>
  );
}
