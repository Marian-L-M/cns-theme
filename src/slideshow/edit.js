import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function Edit() {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <div class="cns-slideshow__wrapper">
        <div className="slideshow__container">
          <h3 className="slideshow__title">Add slides below</h3>
          <InnerBlocks allowedBlocks={["cns-theme/slide"]} />
        </div>
      </div>
    </div>
  );
}
