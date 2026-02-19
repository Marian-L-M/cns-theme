import { registerBlockType } from "@wordpress/blocks";
import ServerSideRender from "@wordpress/server-side-render";

registerBlockType("cns-theme/header", {
  title: "CNS Header",
  supports: {
    align: ["full"],
  },
  edit: () => {
    return <ServerSideRender block="cns-theme/header" />;
  },
  save: () => null,
});
