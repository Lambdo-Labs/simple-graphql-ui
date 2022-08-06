<template>
  <div :class="props.paddingClass">
    <div v-if="!isRoot">
      <input
        type="checkbox"
        :id="`${depth}-${field.name}`"
        :class="props.checkboxClass"
        v-model="isFieldSelected"
        :indeterminate="fields && isFieldSelected"
      />
      <label :for="`${depth}-${field.name}`" style="padding-left: 20px">{{
        displayFieldName
      }}</label>
    </div>
    <br />
    <div v-if="isFieldSelected">
      <div v-for="childField in fields" :key="childField.name">
        <FieldSelectCheckboxes
          :checkbox-class="props.checkboxClass"
          :padding-class="props.paddingClass"
          v-model:parent-selection-set-node="fieldSelectionSet.selectionSet"
          :field="childField"
          :depth="depth + 1"
          :fieldRenames="fieldRenames"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { unwrapOutputType } from "@/helper";
import FieldSelectCheckboxes from "./FieldSelectCheckboxes.vue";
import type { Field, GraphQLSelectionSetNode } from "@/types";
import { isInterfaceType, isObjectType } from "graphql";
import { useFieldSelectionSet } from "@/composables/FieldSelectionSet";
import { computed, ref } from "vue";
import { useDisplayFieldName } from "@/composables/DisplayFieldName";
// type Selections = ReadonlyArray<SelectionNode>;

const props = defineProps<{
  field: Field;
  depth: number;
  parentSelectionSetNode: GraphQLSelectionSetNode;
  fieldRenames?: Record<string, string>;
  checkboxClass?: string;
  paddingClass?: string;
}>();

const { displayFieldName } = useDisplayFieldName(
  props.field.name,
  props.fieldRenames
);

const emit = defineEmits<{
  (e: "update:parentSelectionSetNode", value: GraphQLSelectionSetNode): void;
}>();

const isRoot = props.depth === 0;

const isFieldSelected = ref(isRoot);

const parentSelectionSetNode = useVModel(props, "parentSelectionSetNode", emit);

const { fieldSelectionSet } = useFieldSelectionSet(
  props.field.name,
  parentSelectionSetNode,
  isFieldSelected,
  displayFieldName.value
);

const type = computed(() => unwrapOutputType(props.field.type));

const fields = computed(() => {
  if (isObjectType(type.value) || isInterfaceType(type.value)) {
    return type.value?.getFields();
  } else {
    return undefined;
  }
});
</script>
