import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { bg_color, text_color } = attributes;
  return (
    <div
      {...useBlockProps.save()}
      style={{ backgroundColor: bg_color, color: text_color }}
    >
      <div className="infobox-group">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
