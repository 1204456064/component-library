<template>
  <a-layout class="layout">
    <Sider ref="siderRef"></Sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="layout__trigger"
          @click="open"
        />
        <menu-fold-outlined v-else class="layout__trigger" @click="open" />
      </a-layout-header>
      <!-- <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content> -->
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sider from "./components/sider.vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";

// 菜单栏的打开与关闭属性
const collapsed = ref<boolean>(false);

const siderRef = ref();

function open() {
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

// #components-layout-demo-custom-trigger .trigger:hover {
//   color: #1890ff;
// }

// #components-layout-demo-custom-trigger .logo {
//   height: 32px;
//   background: rgba(255, 255, 255, 0.3);
//   margin: 16px;
// }

// .site-layout .site-layout-background {
//   background: #fff;
// }
</style>
