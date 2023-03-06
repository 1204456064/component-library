<template>
  <a-layout class="layout">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      class="layout"
    >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in menuList" :key="item.key">
          <!-- <user-outlined /> -->
          <span>{{ item.title }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <!-- <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px',
        }"
      >
        Content
      </a-layout-content>
    </a-layout> -->
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface menuItem {
  title: string;
  key: string;
}
const menuList = ref<menuItem[]>([
  {
    title: "侧边栏1",
    key: "1",
  },
  {
    title: "侧边栏2",
    key: "2",
  },
]);

// 菜单栏的打开与关闭属性
const collapsed = ref<boolean>(false);

const selectedKeys = ref<string[]>(["1"]);
</script>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  width: 100%;
}
/* #components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
} */
</style>
