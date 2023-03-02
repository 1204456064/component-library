<template>
  <div class="content">
    <a-button type="primary" class="content-child">我是组件按钮qq</a-button>
    <a-tag color="blue" class="content-child">我是蓝色Tag</a-tag>
    <a-tag class="content-child">purple</a-tag>
  </div>
</template>

<script>
export default {
  name: "cw-a-button",
};
</script>
<script setup></script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content-child {
  width: 200px;
  height: 30px;
  margin-top: 10px;
}
</style>
