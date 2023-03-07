<template>
  <template v-for="menu in subMenuList" :key="menu.path">
    <a-sub-menu v-if="hasSubMenu(menu)">
      <template #title>{{ menu.meta!.title }}</template>

      <template #icon>
        <UserOutlined />
      </template>
      <subMenu :sub-menu-list="menu.children" />
    </a-sub-menu>

    <a-menu-item v-else :key="menu.path">
      <user-outlined />
      <router-link :to="menu.path"> {{ menu.meta!.title }}</router-link>
    </a-menu-item>
  </template>
</template>

<script setup lang="ts">
import subMenu from "./subMenu.vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { RouteRecordRaw } from "vue-router";
// props
withDefaults(
  defineProps<{
    subMenuList: Array<RouteRecordRaw>;
  }>(),
  {
    subMenuList: () => [],
  }
);

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
