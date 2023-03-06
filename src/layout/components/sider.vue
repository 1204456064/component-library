<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    class="layout"
  >
    <Logo ref="logoRef"></Logo>
    <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <a-menu-item v-for="item in menuList" :key="item.key">
        <user-outlined />
        <span>{{ item.title }}</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Logo from "./logo.vue";
import { UserOutlined } from "@ant-design/icons-vue";
interface menuItem {
  title: string;
  key: string;
}

// 侧边栏列表
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
