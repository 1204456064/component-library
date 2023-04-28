<template>
  <div>
    {{ columnsItem.label }}
  </div>
</template>

<script setup lang="ts">
import { columnsType } from "../../table";

const props = withDefaults(
  defineProps<{
    columnsItem: columnsType;
  }>(),
  {
    columnsItem: () => {
      return {
        prop: "",
        label: "",
      };
    },
  }
);
</script>
