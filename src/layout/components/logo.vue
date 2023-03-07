<template>
  <div class="logo" :class="logoClassName">
    <img class="logo__image" src="/logo.png" alt="LOGO正在加载" />
    <span class="logo__span">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// logo对应的名称
const title = ref<string | boolean | undefined>("我是导航栏");

// 折叠样式名
const logoClassName = ref<string>("");

/**
 * 暴露属性/方法
 */
defineExpose({
  changeCollapsed(value: boolean) {
    logoClassName.value = value ? "logo--collapse" : "";
    title.value = value ? "" : "我是导航栏";
  },
});
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 64px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: rgb(0 21 41 / 2%) 0 1px 4px;
  align-items: center;

  &__image {
    width: 40px;
    height: 40px;
    // margin-top: 5%;
    margin-left: 20px;
    line-height: 80px;
  }

  &__span {
    display: inline-block;
    justify-content: center;
    height: 32px;
    margin-top: 5%;
    margin-left: 20px;
    overflow: hidden;
    font-size: 15px;
    line-height: 32px;
    color: white;
  }
}

.logo--collapse {
  width: 80px;

  .logo__span {
    width: 0;
    margin: 0;
    display: none;
  }
}
</style>
