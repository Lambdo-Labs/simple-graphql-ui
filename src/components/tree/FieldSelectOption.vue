<template>
  <select
    :value="modelValue"
    @change="
      emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
    :class="props.selectClass"
  >
    <option disabled selected value="">Select Field</option>
    <option
      v-for="field in props.fields"
      v-bind:key="field.name"
      :value="field.name"
    >
      {{ getFieldDisplayName(field?.name) }}
    </option>
  </select>
</template>
<script setup lang="ts">
import type { Fields } from "@/types";
import { useDisplayFieldName } from "../../composables/DisplayFieldName";

const props = defineProps<{
  fields: Fields;
  modelValue?: string;
  fieldRenames?: Record<string, string>;
  selectClass?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

function getFieldDisplayName(field: string) {
  const displayFieldName = useDisplayFieldName(field, props.fieldRenames);
  return displayFieldName.displayFieldName;
}
</script>
