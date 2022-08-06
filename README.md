# GraphQL Simple Explorer

## Example Usage

```vue
<template>
    <GraphQLUI
      checkbox-class="checkbox checkbox-xs"
      select-class="select w-full max-w-xs"
      padding-class="px-4"
      :schema="testSchema"
      :allowed-fields="['historicalinvoices']"
      :fieldRenames="{ historicalinvoices: 'facturas', created_at: 'fecha' }"
    />
</template>

<script setup lang="ts">
import GraphQLUI from "@/components/GraphqlSimpleExplorer.vue";
import testSchema from "@/assets/testSchema.json";
</script>
```
