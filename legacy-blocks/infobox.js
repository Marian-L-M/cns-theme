import apiFetch from "@wordpress/api-fetch";
import { registerBlockType } from "@wordpress/blocks";
import {
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button, Panel, PanelBody, PanelRow } from "@wordpress/components";
import { useEffect } from "@wordpress/element";

registerBlockType("cns-theme/infobox", {
  title: "CNS Infobox",
  supports: {
    align: ["full"],
  },
  attributes: {
    align: {
      type: "text",
      default: "full",
    },
    imgID: {
      type: "number",
    },
    imgURL: {
      type: "text",
      default: "/wp-content/themes/cns-theme/assets/images/banner.png", // Dirty solution
    },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  useEffect(
    function () {
      async function go() {
        const response = await apiFetch({
          path: `/wp/v2/media/${props.attributes.imgID}`,
          method: "GET",
        });
        console.log(response);
        props.setAttributes({
          imgURL: response.media_details.sizes.banner.source_url,
        });
      }
      go();
    },
    [props.attributes.imgID],
  );

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id });
  }

  return (
    <>
      <InspectorControls>
        <PanelBody title="Infobox Image" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose image</Button>;
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className="infobox">
        <div
          className="infobox__image"
          style={{ backgroundImage: `url(${props.attributes.imgURL})` }}
        ></div>
        <div className="infobox__content">
          <InnerBlocks
            allowedBlocks={[
              "core/paragraph",
              "core/heading",
              "core/list",
              "cns-theme/genericheading",
              "cns-theme/genericbutton",
            ]}
          />
        </div>
      </div>
    </>
  );
}

function SaveComponent(props) {
  return (
    <div className="infobox">
      <div
        className="infobox__image"
        style={{ backgroundImage: `url(${props.attributes.imgURL})` }}
      ></div>
      <div className="infobox__content">
        <InnerBlocks.Content />;
      </div>
    </div>
  );
}
