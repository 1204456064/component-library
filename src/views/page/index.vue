<template>
  <div><a-button type="primary" @click="sendRequest">测试axios</a-button></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import request from "@/utils/request";
function sendRequest() {
  request.get("/ddd", {
    params: {
      type: 123,
    },
  });
}
onMounted(() => {
  console.log("我加载了");
});
</script>
