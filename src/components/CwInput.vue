<template>
  <div>
    <input class="test" v-model="inputValue" @input="changeInput"/>
  </div>
</template>

<script>
export default{
  name:'cw-input'
}
</script>
<script setup>

import {ref} from "vue";

const inputValue = ref('222')

function changeInput(e) {
  alert(`${e.target.value}cw`)
}
</script>
<style>
.test{
  height: 100px;
  width: 200px;
  background-color: red;
  color: black;
}
</style>

