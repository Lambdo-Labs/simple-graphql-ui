<template>
  <FieldSelect
    v-model="selectedField"
    :fields="queryTypeFields"
    :fieldRenames="fieldRenames"
    :select-class="props.selectClass"
  />
  <div v-if="selectedFieldObject && selectionSet">
    <FieldView
      :checkbox-class="props.checkboxClass"
      :padding-class="props.paddingClass"
      :fieldRenames="fieldRenames"
      :parent-selection-set-node="selectionSet"
      :field="selectedFieldObject"
      :depth="0"
    />
  </div>
</template>

<script setup lang="ts">
import { buildClientSchema, type IntrospectionQuery } from "graphql";
import FieldSelect from "./tree/FieldSelectOption.vue";
import FieldView from "./tree/FieldSelectCheckboxes.vue";
import { ref, computed } from "vue";
import { useGraphqlStore } from "@/composables/GraphqlStore";

const props = defineProps<{
  schema?: { data: IntrospectionQuery };
  allowedFields?: string[];
  fieldRenames?: Record<string, string>;
  // fetcher: Promise<string>;
  // inputValueDeprecation?: boolean;
  // introspectionQueryName?: string;
  // schemaDescription?: boolean;
  //classes
  checkboxClass?: string;
  paddingClass?: string;
  selectClass?: string;
}>();

const {
  setRootSelectionSet,
  store: { selectionSet },
} = useGraphqlStore();

const allowedFieldsMap = computed(() => {
  const map: Record<string, boolean> = {};
  if (props.allowedFields) {
    props.allowedFields.forEach((field) => {
      map[field] = true;
    });
  }
  return map;
});

const schema = buildClientSchema(props.schema?.data as IntrospectionQuery);
const selectedField = ref<string | undefined>(undefined);

const nameToField = computed(() => {
  return schema.getQueryType()?.getFields();
});

const queryTypeFields = computed(() => {
  const fields = nameToField.value;
  if (!fields) {
    return [];
  }

  const keys = Object.keys(fields);

  const filteredArray = props.allowedFields
    ? keys.filter(
        (k) =>
          allowedFieldsMap.value.hasOwnProperty(k) && allowedFieldsMap.value[k]
      )
    : keys;

  const fieldsArray = filteredArray.map(function (key) {
    return fields[key];
  });
  return fieldsArray;
});

const selectedFieldObject = computed(() => {
  if (selectedField.value && nameToField.value) {
    return nameToField.value[selectedField.value];
  } else {
    return undefined;
  }
});

// this might belong in FieldSelect.vue
watch(selectedFieldObject, (newValue) => {
  if (newValue) {
    setRootSelectionSet(newValue.name);
  }
});
</script>
