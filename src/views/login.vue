<template>
  <div class="login">
    <Particles
      id="tsparticles"
      :particlesLoaded="particlesLoaded"
      :particlesInit="particlesInit"
      class="login__particles"
      :options="particles"
    >
    </Particles>
    <div class="login__content">
      <a-form
        :model="form"
        class="login__form"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 18 }"
      >
        <h3 class="login__title">系统登录</h3>
        <a-form-item
          label="用户名"
          name="userName"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="form.userName" />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="form.userName" />
        </a-form-item>

        <a-form-item
          :wrapper-col="{ offset: 4, span: 18 }"
          label=""
          name="checked"
        >
          <a-checkbox v-model:checked="form.checked">记住我</a-checkbox>
        </a-form-item>

        <a-button type="primary" class="login__login-button" @click="clickLogin"
          >登录</a-button
        >
      </a-form>

      <a-modal
        v-model:visible="visible"
        title="提示"
        okText="确认"
        cancelText="取消"
        @ok="confirm"
      >
        <p>暂未查到此账号！是否确认注册并登录?</p>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { particles } from "./particles";
import { loadFull } from "tsparticles";
import { useRouter } from "vue-router";
import request from "@/utils/request";
import { useStore } from "@/store";
const router = useRouter();

// 是否显示弹框
const visible = ref<boolean>(false);

// form表单
const form = ref<{ userName: string; password: string; checked: boolean }>({
  userName: "admin",
  password: "123456",
  checked: true,
});

const particlesInit = async (engine: any) => {
  await loadFull(engine);
};

const particlesLoaded = async (container: any) => {
  console.log("Particles container loaded", container);
};

/**
 * @description 登录
 */
async function clickLogin() {
  const res = await request.post("/v1/user/get-username", {
    userName: form.value.userName,
    password: form.value.password,
  });

  if (!res.data) {
    visible.value = true;
    return;
  }

  useStore().save(res.data.data);
  router.push({ path: "/" });
}

/**
 * @description 确认注册
 */
async function confirm() {
  const res = await request.post("/v1/user/add-username", {
    userName: form.value.userName,
    password: form.value.password,
  });

  if (!res.data) {
    return;
  }

  const respon = await request.post("/v1/user/get-username", {
    userName: form.value.userName,
    password: form.value.password,
  });
  if (!respon.data) {
    return;
  }

  useStore().save(respon.data);
  router.push({ path: "/" });
}
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
  width: 100%;
}
body {
  padding: 0;
  margin: 0;
}

.login {
  height: 100vh;
  width: 100%;

  &__title {
    margin: 0px auto 48px auto;
    text-align: center;
    font-size: 40px;
  }

  &__content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__form {
    border-radius: 15px;
    background-clip: padding-box;
    width: 500px;
    padding: 15px 35px 15px 35px;
    background-color: #ffc0cb;
    border: 1px solid blueviolet;
    box-shadow: 0 0 25px #f885ff;
  }

  &__login-button {
    width: 100%;
    height: 40px;
  }
}
</style>
