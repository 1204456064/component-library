<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="inline"
    :open-keys="openKeys"
    @openChange="onOpenChange"
  >
    <template v-for="menu in menuList" :key="menu.path">
      <a-sub-menu v-if="hasSubMenu(menu)" :key="menu.path">
        <template #title>{{ menu.meta!.title }}</template>
        <template #icon>
          <UserOutlined />
        </template>

        <subMenu :sub-menu-list="menu.children" />
      </a-sub-menu>
      <template v-else>
        <a-menu-item :key="menu.path">
          <template #icon>
            <UserOutlined />
          </template>
          <router-link :to="menu.path"> {{ menu.meta!.title }}</router-link>
        </a-menu-item>
      </template>
    </template>
  </a-menu>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { menu } from "../../router/menu/menu";
import { RouteRecordRaw } from "vue-router";
import subMenu from "./subMenu.vue";
import { HOME_PATH } from "../../router/base";
import { useRouter } from "vue-router";
const router = useRouter();

// 侧边栏列表
const menuList = ref<RouteRecordRaw[]>(menu);

// 选中的key
const selectedKeys = ref<string[]>([HOME_PATH]);

// 当前展开的 SubMenu 菜单项 key 数组
const openKeys = ref<string[]>([]);

/**
 * @description SubMenu 展开/关闭的回调
 * @param openKey 展开的key集合
 */
const onOpenChange = (openKey: string[]) => {
  // console.log(openKey);
  // console.log(openKeys.value);
};

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

onBeforeMount(() => {
  router.push({ path: HOME_PATH });
});

/**
 * 暴露属性/方法
 */
defineExpose({
  changeCollapsed(value: boolean) {},
});
</script>
