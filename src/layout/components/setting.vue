<template>
  <div class="setting">
    <a-dropdown-button>
      个人中心
      <template #overlay>
        <a-menu @click="handleMenuClick">
          <a-menu-item key="1">
            <UserOutlined />
            退出登录
          </a-menu-item>
        </a-menu>
      </template>
      <template #icon><UserOutlined /></template>
    </a-dropdown-button>
  </div>
</template>
<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import { LOGIN_PATH } from "../../router/base";
import request from "@/utils/request";
const route = useRouter();

/**
 * @description 退出登录
 */
async function handleMenuClick() {
  const res = await request.post("/v1/cw/layout");

  if (!res) {
    return;
  }
  route.push({ path: LOGIN_PATH });
}
</script>
<style lang="scss" scoped>
.setting {
  padding-right: 24px;
}
</style>
