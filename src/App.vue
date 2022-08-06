<template>
  <main>
    <div>Selection Set:</div>
    <div>{{ store.selectionSet }}</div>
    <div>Query String:</div>
    <div>
      {{ queryString }}
    </div>
    <GraphqlSimpleExplorer
      checkbox-class="checkbox checkbox-xs"
      select-class="select w-full max-w-xs"
      padding-class="px-4"
      :schema="testSchema"
      :allowed-fields="['historicalinvoices']"
      :fieldRenames="{ historicalinvoices: 'facturas', created_at: 'fecha' }"
    />
  </main>
</template>

<script setup lang="ts">
import GraphqlSimpleExplorer from "@/components/GraphqlSimpleExplorer.vue";
import testSchema from "@/assets/testSchema.json";
import { useGraphqlStore } from "./composables/GraphqlStore";
const { queryString, store } = useGraphqlStore();
</script>
