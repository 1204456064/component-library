<template>
  <div>
    <a-button type="primary" @click="changeStore">测试Pinia</a-button>

    {{ userName }}
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";
const store = useStore();

const userName = ref("");

function changeStore() {
  userName.value = store.userInfo?.userName;
}
</script>
