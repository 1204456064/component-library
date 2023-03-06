<template>
  <a-layout class="layout">
    <Sider ref="siderRef"></Sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="layout__trigger"
          @click="changeCollapsed"
        />
        <menu-fold-outlined
          v-else
          class="layout__trigger"
          @click="changeCollapsed"
        />
      </a-layout-header>
      <Content></Content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sider from "./components/sider.vue";
import Content from "./components/content.vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

// 菜单栏的打开与关闭属性
const collapsed = ref<boolean>(false);

// 侧边栏组件实例
const siderRef = ref();

// 打开与折叠侧边栏
function changeCollapsed() {
  collapsed.value = !collapsed.value;
  siderRef.value.changeCollapsed(collapsed.value);
}
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100%;

  &__trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
}
</style>
