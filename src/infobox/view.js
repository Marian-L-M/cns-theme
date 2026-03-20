import { store, getContext } from "@wordpress/interactivity";
store("cns-theme/infobox", {
  actions: {
    toggle() {
      const context = getContext();
      context.isOpen = !context.isOpen;
    },
  },
});
