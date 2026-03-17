import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    bg_color,
    text_color,
    contrast_color,
    infobox_title,
    is_infobox_open,
  } = attributes;
  return (
    <div
      {...useBlockProps.save()}
      data-wp-interactive="cns-theme/infobox"
      data-wp-context={JSON.stringify({ isOpen: is_infobox_open })}
      style={{ backgroundColor: bg_color, color: text_color }}
    >
      <div className="infobox">
        {infobox_title && (
          <h2
            className="infobox__title"
            style={{ backgroundColor: contrast_color, color: text_color }}
          >
            <button
              data-wp-on--click="actions.toggle"
              data-wp-bind--aria-expanded="context.isOpen"
            >
              {infobox_title}
            </button>
          </h2>
        )}
        <div
          className="infobox__inner"
          data-wp-class--is-hidden="!context.isOpen"
        >
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}
