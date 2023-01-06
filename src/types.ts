import type { GraphQLField, SelectionSetNode, FieldNode } from "graphql";

export type Fields = GraphQLField<any, any, any>[];
export type Field = GraphQLField<any, any>;
export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type GraphQLSelectionNode = Omit<Mutable<FieldNode>, "selectionSet"> & {
  selectionSet: GraphQLSelectionSetNode;
};

export type GraphQLSelectionSetNode = Omit<SelectionSetNode, "selections"> & {
  selections: Array<GraphQLSelectionNode>;
};

export interface GraphqlStore {
  selectionSet: GraphQLSelectionSetNode | null;
  queryName: string;
}