import { toRefs } from "@vueuse/core";
import { reactive } from "vue";
import { Kind, type DocumentNode, print, OperationTypeNode } from "graphql";

import type { GraphQLSelectionSetNode } from "@/types";

interface GraphqlStore {
  selectionSet: GraphQLSelectionSetNode | null;
}

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

const store: GraphqlStore = reactive({
  selectionSet: null as GraphQLSelectionSetNode | null,

  // operationName: null,
  // operations: null,
  // TODO: add setters for the above properties
  // setDocumentAST(documentAST: GraphQLDocumentNode) {
  //   this.documentAST.definitions[0] = documentAST.definitions[0];
  // },

  // documentToQuery() {
  //   if (!this.documentAST) {
  //     return "";
  //   }
  //   return print(this.documentAST);
  // },
  // addSelections(selections: FieldNode) {
  //   if (!this.documentAST) {
  //     return;
  //   }
  //   const selectionsNode = this.documentAST.definitions[0].selectionSet
  //     .selections as Array<SelectionNode>;
  //   selectionsNode.push(selections);
  // },
});

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
