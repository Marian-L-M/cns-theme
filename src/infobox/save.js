import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const {
    bg_color,
    text_color,
    contrast_color,
    infobox_title,
    mobile_display_mode,
  } = attributes;

  const is_infobox_open = mobile_display_mode == "expanded" ? true : false;

  return (
    <div
      {...useBlockProps.save()}
      data-wp-interactive="cns-theme/infobox"
      data-wp-context={JSON.stringify({ isOpen: is_infobox_open })}
      style={{ backgroundColor: bg_color, color: text_color }}
    >
      <div className={`infobox ${mobile_display_mode}`}>
        {infobox_title && (
          <h2
            className="infobox__title"
            style={{ backgroundColor: contrast_color, color: text_color }}
          >
            <button
              className="toggle-btn"
              data-wp-on--click="actions.toggle"
              data-wp-bind--aria-expanded="context.isOpen"
              data-wp-class--is-toggle-active="context.isOpen"
            >
              {infobox_title}
            </button>
          </h2>
        )}
        <div
          className="infobox__inner"
          data-wp-class--is-toggle-hidden="!context.isOpen"
        >
          <InnerBlocks.Content />
        </div>
      </div>
    </div>
  );
}
