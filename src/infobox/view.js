import { store, getContext } from "@wordpress/interactivity";
console.log("clickz1");
store("cns-theme/infobox", {
  actions: {
    toggle() {
      const context = getContext();
      console.log("clickz2");
      context.isOpen = !context.isOpen;
    },
  },
});
