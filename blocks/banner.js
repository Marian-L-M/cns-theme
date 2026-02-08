import { InnerBlocks } from "@wordpress/block-editor";
import { registerBlockType } from "@wordpress/blocks";

registerBlockType("cns-theme/banner", {
  title: "CNS Banner",
  supports: {
    align: ["full"],
  },
  attributes: {
    align: {
      type: "text",
      default: "full",
    },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent() {
  const bannerUrl = "/wp-content/themes/cns-theme/assets/images/banner.png";
  return (
    <div className="page-banner">
      <div
        className="page-banner__bg-image"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      ></div>
      <div className="page-banner__content">
        <InnerBlocks
          allowedBlocks={[
            "core/paragraph",
            "core/heading",
            "core/list",
            "cns-theme/genericheading",
            "cns-theme/genericbutton",
          ]}
        />
      </div>
    </div>
  );
}

function SaveComponent() {
  const bannerUrl = "/wp-content/themes/cns-theme/assets/images/banner.png";
  return (
    <div className="page-banner">
      <div
        className="page-banner__bg-image"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      ></div>
      <div className="page-banner__content">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}

{
  /* <h1 className="headline headline--large">Welcome</h1>
        <h2 className="headline headline--medium">How is it going?</h2>
        <h3 className="headline headline--small">Come again please!</h3>
        <a href="" className="a-btn">
          See more
        </a> */
}
