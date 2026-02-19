import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

registerBlockType("cns-theme/slideshow", {
  title: "CNS Slideshow",
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
  return (
    <div className="slideshow__container">
      <p className="slideshow__title">Slideshow</p>
      <InnerBlocks allowedBlocks={["cns-theme/slide"]} />
    </div>
  );
}
// function EditComponent(props) {
//   useEffect(
//     function () {
//       async function go() {
//         const response = await apiFetch({
//           path: `/wp/v2/media/${props.attributes.imgID}`,
//           method: "GET",
//         });
//         console.log(response);
//         props.setAttributes({
//           imgURL: response.media_details.sizes.banner.source_url,
//         });
//       }
//       go();
//     },
//     [props.attributes.imgID],
//   );

//   function onFileSelect(x) {
//     props.setAttributes({ imgID: x.id });
//   }

//   return (
//     <>
//       <InspectorControls>
//         <PanelBody title="Background" initialOpen={true}>
//           <PanelRow>
//             <MediaUploadCheck>
//               <MediaUpload
//                 onSelect={onFileSelect}
//                 value={props.attributes.imgID}
//                 render={({ open }) => {
//                   return <Button onClick={open}>Choose image</Button>;
//                 }}
//               />
//             </MediaUploadCheck>
//           </PanelRow>
//         </PanelBody>
//       </InspectorControls>
//       <div className="page-banner">
//         <div
//           className="page-banner__bg-image"
//           style={{ backgroundImage: `url(${props.attributes.imgURL})` }}
//         ></div>
//         <div className="page-banner__content">
//           <InnerBlocks
//             allowedBlocks={[
//               "core/paragraph",
//               "core/heading",
//               "core/list",
//               "cns-theme/genericheading",
//               "cns-theme/genericbutton",
//             ]}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

function SaveComponent() {
  return <InnerBlocks.Content />;
}
