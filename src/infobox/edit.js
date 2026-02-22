import apiFetch from "@wordpress/api-fetch";
import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import { Button, Panel, PanelBody, PanelRow } from "@wordpress/components";
import { useEffect } from "@wordpress/element";

export default function Edit(props) {
  const blockProps = useBlockProps();

  useEffect(function () {
    if (!props.attributes.imgURL) {
      props.setAttributes({
        imgURL: cnsThemeData.theme_uri + "/assets/images/banner.png",
      });
    }
  }, []);

  useEffect(
    function () {
      if (props.attributes.imgID) {
        async function go() {
          const response = await apiFetch({
            path: `/wp/v2/media/${props.attributes.imgID}`,
            method: "GET",
          });
          props.setAttributes({
            imgURL: response.media_details.sizes.banner.source_url,
          });
        }
        go();
      }
    },
    [props.attributes.imgID],
  );

  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id });
  }

  return (
    <div {...blockProps}>
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
            allowedBlocks={["core/paragraph", "core/heading", "core/list"]}
          />
        </div>
      </div>
    </div>
  );
}
