import GraphqlSimpleExplorer from "./components/GraphqlSimpleExplorer.vue";
import FieldSelectCheckboxes from "./components/tree/FieldSelectCheckboxes.vue";
import FieldSelectOption from "./components/tree/FieldSelectOption.vue";
import type { App } from "vue";

const components = {
  GraphqlSimpleExplorer,
  FieldSelectCheckboxes,
  FieldSelectOption,
};

const install = {
  install(Vue: App) {
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        // @ts-expect-error
        const component = components[prop];
        Vue.component(component.name, component);
      }
    }
  },
};

export default install;
