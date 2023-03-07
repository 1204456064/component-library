<template>
  <div>我是page</div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("我加载了");
});
</script>
