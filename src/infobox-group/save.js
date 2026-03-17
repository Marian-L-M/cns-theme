import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const { bg_color, text_color, contrast_color, group_title } = attributes;
  return (
    <div
      {...useBlockProps.save()}
      style={{ backgroundColor: bg_color, color: text_color }}
    >
      <div className="infobox-group__outer">
        {group_title && (
          <h3
            className="infobox-group__title"
            style={{ backgroundColor: contrast_color }}
          >
            {group_title}
          </h3>
        )}
        <div className="infobox-group__inner">
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}
