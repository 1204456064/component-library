<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="layout"
  >
    <Logo ref="logoRef"></Logo>
    <Menu></Menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "./logo.vue";
import Menu from "./menu.vue";

// 菜单栏的打开与关闭属性
const collapsed = ref<boolean>(false);

// logo组件实例
const logoRef = ref();

/**
 * 暴露属性/方法
 */
defineExpose({
  changeCollapsed(value: boolean) {
    collapsed.value = value;
    logoRef.value.changeCollapsed(value);
  },
});
</script>
