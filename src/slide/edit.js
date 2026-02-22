import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function Edit() {
  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <div className="slideshow__container">
        <p className="slideshow__title">Slide</p>
        <InnerBlocks allowedBlocks={["cns-theme/banner"]} />
      </div>
    </div>
  );
}
