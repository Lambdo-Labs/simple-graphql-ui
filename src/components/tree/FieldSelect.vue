<template>
  <select
    :value="modelValue"
    @change="
      emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    class="select w-full max-w-xs"
  >
    <option disabled selected value="">Select Field</option>
    <option
      v-for="field in props.fields"
      v-bind:key="field.name"
      :value="field.name"
    >
      {{ useDisplayFieldName(field?.name, fieldRenames).displayFieldName }}
    </option>
  </select>
</template>
<script setup lang="ts">
import type { Fields } from "@/types";
import { useDisplayFieldName } from "./DisplayFieldName";

// type Selections = ReadonlyArray<SelectionNode>;

const props = defineProps<{
  fields: Fields;
  modelValue?: string;
  fieldRenames?: Record<string, string>;
  // selections: Selections;
  // schema: GraphQLSchema;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>
