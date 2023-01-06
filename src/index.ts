import { useGraphqlStore } from './composables/GraphqlStore';
import GraphqlSimpleExplorer from "./components/GraphqlSimpleExplorer.vue";
import FieldSelectCheckboxes from "./components/tree/FieldSelectCheckboxes.vue";
import FieldSelectOption from "./components/tree/FieldSelectOption.vue";
import type { App } from "vue";

export const simpleExplorer = {
  install(Vue: App) {
    Vue.component("GraphqlSimpleExplorer", GraphqlSimpleExplorer);
    Vue.component("GraphqlSimpleFieldSelectCheckboxes", FieldSelectCheckboxes);
    Vue.component("GraphqlSimpleFieldSelectOption", FieldSelectOption);
  },
};

export const useSimpleGraphqlStore = useGraphqlStore;
