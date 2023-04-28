<template>
  <div class="app">
    <a-config-provider :getPopupContainer="getPopupContainer">
      <router-view></router-view>
    </a-config-provider>
  </div>
</template>

<script setup>
function getPopupContainer(el, dialogContext) {
  if (dialogContext) {
    return dialogContext.getDialogWrap();
  } else {
    return document.body;
  }
}
</script>
>
<style scoped>
.app {
  width: 100%;
}
</style>
