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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { particles } from "./particles";
import { loadFull } from "tsparticles";
import { useRouter } from "vue-router";

const router = useRouter();
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

function clickLogin() {
  router.push({ path: "/layout" });
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
