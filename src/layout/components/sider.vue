<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="layout"
  >
    <Logo ref="logoRef"></Logo>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item v-for="item in menuList" :key="item.path">
        <user-outlined />
        <!-- <component :is="item.meta!.icon"></component> -->
        <span>{{ item.meta!.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "./logo.vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { menu } from "../../router/menu/menu";
import { RouteRecordRaw } from "vue-router";

console.log(menu);
// 侧边栏列表
const menuList = ref<RouteRecordRaw[]>(menu);

// 菜单栏的打开与关闭属性
const collapsed = ref<boolean>(false);

// 选中的key
const selectedKeys = ref<string[]>(["1"]);

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
