import { toRefs } from "@vueuse/core";
import { computed, reactive } from "vue";
import { Kind, type DocumentNode, print, OperationTypeNode } from "graphql";

import type { GraphQLSelectionSetNode, GraphqlStore } from "@/types";

const store: GraphqlStore = reactive({
  selectionSet: null as GraphQLSelectionSetNode | null,
});

function toQuery(selectionSet: GraphQLSelectionSetNode | null) {
  if (!selectionSet) {
    return "";
  }
  const document: DocumentNode = {
    kind: Kind.DOCUMENT,
    definitions: [
      {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: {
          kind: Kind.NAME,
          value: "test",
        },
        variableDefinitions: [],
        directives: undefined,
        selectionSet: selectionSet,
      },
    ],
  };

  return print(document);
}
/// A store used hold the graphql query selections
export function useGraphqlStore() {
  function setRootSelectionSet(name: string) {
    store.selectionSet = {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: name,
          },
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [],
          },
          // TODO: add arguments
          // readonly arguments?: ReadonlyArray<ArgumentNode>;
          // readonly directives?: ReadonlyArray<DirectiveNode>;
        },
      ],
    };
  }
  const refStore = toRefs(store);

  const queryString = computed(() => toQuery(refStore.selectionSet.value));
  return { store: refStore, setRootSelectionSet, queryString };
}
