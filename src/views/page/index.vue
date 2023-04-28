<template>
  <div><a-button type="primary" @click="sendRequest">测试axios</a-button></div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import request from "@/utils/request";
async function sendRequest() {
  const res = await request.post("/v1/user/add-username", {
    title: "chenwen",
    type: "q3",
    num: 4,
  });
  console.log(res);
}
onMounted(() => {
  console.log("我加载了");
});
</script>
