<script setup lang="ts">
import CwAButton from "@/components/CwAButton.vue";
</script>

<template>
  <div class="app">
    <!-- <CwAButton class="app-content"></CwAButton> -->

    <router-view to="/login"></router-view>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
}

.app-content {
  /* text-align: center; */
}
</style>
