<template>
  <div>
    <button class="test" @click="handleSubmit">我是测试要发布的按钮组件</button>

    <button class="test" @click="handleSubmit">我是测试要发布的按钮组件</button>
  </div>
</template>

<script>
export default {
  name: "cw-button",
};
</script>
<script setup>
function handleSubmit() {
  alert("cw组件一定成功");
}
</script>

<style>
.test {
  height: 100px;
  width: 200px;
  background-color: red;
  color: black;
}
</style>
