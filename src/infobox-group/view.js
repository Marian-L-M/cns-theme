import { store, getContext } from "@wordpress/interactivity";
store("cns-theme/infobox-group", {
  actions: {
    toggle() {
      const context = getContext();
      context.isActive = !context.isActive;
    },
  },
});
