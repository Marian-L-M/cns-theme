import { store, getContext } from "@wordpress/interactivity";
store("cns-theme/cns-header", {
  actions: {
    toggleHamburger() {
      const context = getContext();
      context.isActiveHamburger = !context.isActiveHamburger;
    },
  },
});
