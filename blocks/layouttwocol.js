import { registerBlockType } from "@wordpress/blocks";
import ServerSideRender from "@wordpress/server-side-render";

registerBlockType("cns-theme/layouttwocol", {
  title: "CNS Two Column Layout",
  supports: {
    align: ["full"],
  },
  edit: () => {
    return <ServerSideRender block="cns-theme/layouttwocol" />;
  },
  save: () => null,
});
