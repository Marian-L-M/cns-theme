import { registerBlockType } from "@wordpress/blocks";
import ServerSideRender from "@wordpress/server-side-render";

registerBlockType("cns-theme/footer", {
  title: "CNS Footer",
  supports: {
    align: ["full"],
  },
  edit: () => {
    return <ServerSideRender block="cns-theme/footer" />;
  },
  save: () => null,
});
