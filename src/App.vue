<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import CwButton from "./components/CwButton.vue";
import CwInput from "./components/CwInput.vue";
import CwAButton from "./components/CwAButton.vue";
</script>

<template>
  <div class="app">
    <!-- <cw-e-button></cw-e-button> -->
    <CwAButton class="app-content"></CwAButton>
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
