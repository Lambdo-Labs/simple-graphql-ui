<template>
  <!-- <div>{{ queryTypeFields }}</div> -->
  <FieldSelect
    v-model="selectedField"
    :fields="queryTypeFields"
    :fieldRenames="fieldRenames"
  />
  <div v-if="selectedFieldObject && selectionSet">
    <FieldView
      :fieldRenames="fieldRenames"
      :parent-selection-set-node="selectionSet"
      :field="selectedFieldObject"
      :depth="0"
    />
  </div>
</template>

<script setup lang="ts">
import { buildClientSchema, type IntrospectionQuery } from "graphql";
import FieldSelect from "./tree/FieldSelect.vue";
import FieldView from "./tree/FieldView.vue";
import { ref, computed } from "vue";
import { useGraphqlStore } from "@/GraphqlStore";

const props = defineProps<{
  schema?: { data: IntrospectionQuery };
  allowedFields?: string[];
  fieldRenames?: Record<string, string>;
  // fetcher: Promise<string>;
  // inputValueDeprecation?: boolean;
  // introspectionQueryName?: string;
  // schemaDescription?: boolean;
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
// watchEffect(() => {
//   console.log(schema.value);
// });

// TODO get schema from introscpection query

// type IntrospectionArgs = {
//   inputValueDeprecation?: boolean;
//   introspectionQueryName?: string;
//   schemaDescription?: boolean;
// };

// function useIntrospectionQuery({
//   inputValueDeprecation,
//   introspectionQueryName,
//   schemaDescription,
// }: IntrospectionArgs) {
//   const queryName = introspectionQueryName || "IntrospectionQuery";

//   let query = getIntrospectionQuery({
//     inputValueDeprecation,
//     schemaDescription,
//   });
//   if (introspectionQueryName) {
//     query = query.replace("query IntrospectionQuery", `query ${queryName}`);
//   }

//   const querySansSubscriptions = query.replace("subscriptionType { name }", "");

//   return {
//     introspectionQueryName: queryName,
//     introspectionQuery: query,
//     introspectionQuerySansSubscriptions: querySansSubscriptions,
//   };
// }

// const {
//   introspectionQuery,
//   introspectionQueryName,
//   introspectionQuerySansSubscriptions,
// } = useIntrospectionQuery({
//   inputValueDeprecation: props.inputValueDeprecation,
//   introspectionQueryName: props.introspectionQueryName,
//   schemaDescription: props.schemaDescription,
// });

// watchEffect(() => {
//   if (schema.value) {
//     return;
//   }
// });
</script>
