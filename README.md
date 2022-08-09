# GraphQL Simple Explorer

## Example Usage

add from git:

```bash
yarn add Lambdo-Labs/simple-graphql-ui#main
```

```ts
import { GraphqlSimpleExplorer } from `simple-graphql-ui`

app.component('GraphqlSimpleExplorer',GraphqlSimpleExplorer )
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
