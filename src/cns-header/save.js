import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save() {
  return (
    <div
      {...useBlockProps.save()}
      data-wp-interactive="cns-theme/cns-header"
      data-wp-context={JSON.stringify({
        isActiveHamburger: false,
        isActiveUserMenu: false,
      })}
    >
      <InnerBlocks.Content />
    </div>
  );
}
