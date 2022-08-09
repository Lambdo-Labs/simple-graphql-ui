# GraphQL Simple Explorer

## Example Usage

add from git:

```bash
yarn add @lambdo/graphql-simple-explorer
```

```ts
import graphqlSimplExplorer from '@lambdo/graphql-simple-explorer'

createApp(App)
  .use(graphqlSimplExplorer)
  .mount('#app')

```

```vue
<template>
    <GraphqlSimpleExplorer
      checkbox-class="checkbox checkbox-xs"
      select-class="select w-full max-w-xs"
      padding-class="px-4"
      :schema="testSchema"
      :allowed-fields="['historicalinvoices']"
      :fieldRenames="{ historicalinvoices: 'facturas', created_at: 'fecha' }"
    />
</template>

<script setup lang="ts">
import testSchema from "@/assets/testSchema.json";
</script>
```
