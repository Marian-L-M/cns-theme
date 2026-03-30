import { __ } from "@wordpress/i18n";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

const TEMPLATE = [
  [
    "core/columns",
    { className: "header-layout", isStackedOnMobile: false },
    [
      ["core/column", { className: "logo" }, [["core/site-logo"]]],
      [
        "core/column",
        { className: "header-menu-element" },
        [["cns-theme/cns-header-nav"]],
      ],
    ],
  ],
];
export default function Edit() {
  return (
    <div {...useBlockProps()}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
