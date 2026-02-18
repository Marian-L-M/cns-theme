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

registerBlockType("cns-theme/slide", {
  title: "CNS Slide",
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
    defaultimg: {
      type: "text",
    },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  useEffect(function () {
    if (props.attributes.defaultimg) {
      props.setAttributes({
        imgURL: `${slide.themeimagepath + props.attributes.defaultimg}`,
      });
    }
  }, []);

  useEffect(
    function () {
      async function go() {
        const response = await apiFetch({
          path: `/wp/v2/media/${props.attributes.imgID}`,
          method: "GET",
        });
        props.setAttributes({
          defaultimg: "",
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

  // To do: enable slides in editor(?)
  // All very hacky
  // Seems counterproductive ui/ux wise. Consider a stacked preview instead
  return (
    <>
      <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
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
      <div className="page-banner">
        <div
          className="page-banner__bg-image"
          style={{ backgroundImage: `url(${props.attributes.imgURL})` }}
        ></div>
        <div className="page-banner__content">
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

function SaveComponent() {
  return <InnerBlocks.Content />;
}
