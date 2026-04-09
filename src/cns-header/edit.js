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
        { className: "column-search", verticalAlignment: "center" },
        [
          [
            "core/search",
            {
              anchor: "site-search",

              label: "Search",
              showLabel: false,
              placeholder: "Search...",
              buttonText: "Search",
              buttonPosition: "button-inside",
              buttonUseIcon: true,
              isSearchFieldHidden: false,
              width: 100,
              widthUnit: "%",

              align: "center",
              backgroundColor: "element-bg",
              fontSize: "small",
              textColor: "text-soft",
            },
          ],
        ],
      ],
      [
        "core/column",
        { className: "column-menu", verticalAlignment: "center" },
        [
          [
            "core/group",
            {
              align: "full",
              layout: { type: "flex", flexWrap: "nowrap" },
            },
            [
              ["cns-theme/cns-header-nav", {}, []],
              [
                "core/navigation",
                {
                  anchor: "hamburger-menu",
                  overlayMenu: "always",
                  overlayBackgroundColor: "header-bg",
                  overlayTextColor: "header-text",
                },
              ],
            ],
          ],
        ],
      ],
    ],
  ],
  [
    "core/search",
    {
      anchor: "mobile-search",

      label: "Search",
      showLabel: false,
      placeholder: "Search...",
      buttonText: "Search",
      buttonPosition: "button-inside",
      buttonUseIcon: true,
      isSearchFieldHidden: false,
      width: 100,
      widthUnit: "%",

      align: "center",
      backgroundColor: "element-bg",
      fontSize: "small",
      textColor: "text-soft",
    },
  ],
];
export default function Edit() {
  return (
    <div {...useBlockProps()}>
      <InnerBlocks template={TEMPLATE} />
    </div>
  );
}
