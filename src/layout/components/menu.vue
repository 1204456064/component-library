<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <template v-for="menu in menuList" :key="menu.path">
      <a-sub-menu v-if="hasSubMenu(menu)">
        <template #title>{{ menu.meta!.title }}</template>

        <template #icon>
          <UserOutlined />
        </template>

        <subMenu :sub-menu-list="menu.children" />
      </a-sub-menu>

      <a-menu-item v-else>
        <user-outlined />
        <span>{{ menu.meta!.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { menu } from "../../router/menu/menu";
import { RouteRecordRaw } from "vue-router";
import subMenu from "./subMenu.vue";
// 侧边栏列表
const menuList = ref<RouteRecordRaw[]>(menu);

// 选中的key
const selectedKeys = ref<string[]>(["1"]);

/**
 * @description 用来确认是否有子路由
 * @param menu 路由的配置项
 * @return false代表没有子路由，true代表有子路由
 */
function hasSubMenu(menu: RouteRecordRaw) {
  if (!menu.children) {
    return false;
  }

  if (menu.children.length === 0) {
    return false;
  }

  return true;
}

/**
 * 暴露属性/方法
 */
defineExpose({
  changeCollapsed(value: boolean) {},
});
</script>
