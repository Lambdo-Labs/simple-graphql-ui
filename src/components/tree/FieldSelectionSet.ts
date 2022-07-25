import type {
  Field,
  GraphQLSelectionSetNode,
  GraphQLSelectionNode,
} from "@/types";
import { Kind } from "graphql";
import type { Ref } from "vue";

export function useFieldSelectionSet(
  fieldName: string,
  parentSelectionSetNode: Ref<GraphQLSelectionSetNode>,
  isFieldSelected: Ref<Boolean>,
  displayFieldName: string
) {
  const fieldSelectionSet: GraphQLSelectionNode = reactive({
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: fieldName,
    },
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [],
    },
    alias: {
      kind: Kind.NAME,
      // replace with letters
      // value: displayFieldName
      value: displayFieldName.replace(/[^a-zA-Z]+/g, ""),
    },
  });

  watch(fieldSelectionSet, (newValue) => {
    const index = parentSelectionSetNode.value.selections.findIndex(
      (selection) =>
        selection.kind === Kind.FIELD && selection.name.value === fieldName
    );
    if (index > -1) {
      parentSelectionSetNode.value.selections[index] = newValue;
    }
  });

  watch(isFieldSelected, (newValue) => {
    if (newValue) {
      parentSelectionSetNode.value.selections.push(fieldSelectionSet);
      // emit("update:parentSelectionSetNode", parentSelectionSetNode.value);
    } else {
      const index = parentSelectionSetNode.value.selections.findIndex(
        (selection) =>
          selection.kind === Kind.FIELD && selection.name.value === fieldName
      );
      if (index > -1) {
        parentSelectionSetNode.value.selections.splice(index, 1);
      }
    }
  });
  return { fieldSelectionSet };
}
