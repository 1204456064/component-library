<template>
  <div>
    <formTableVue
      ref="formTableRef"
      :table-cell-height="conf().tableCellHeight"
      :table-header-height="conf().tableHeaderHeight"
      :columns="conf().columns"
    ></formTableVue>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import conf from "./conf";
import formTableVue from "./component/oridinary-table.vue";
const formTableRef = ref();
console.log(conf());

const tableData = ref([
  {
    id: 1,
    monitor: "九年一班",
    taHao: "玲珑塔",
    materialNum: 100,
    temperature: 120,
    in: "1231",
    out: "123qwe",
    in2: "12311",
    out2: "123qwe1",
    oxygen: "213",
    productNum: "dsa",
    operatorName: "小陈",
    operatorTime: "2023-4-11 11",
  },
  {
    id: 2,
    monitor: "九年一班",
    taHao: "玲珑塔",
    materialNum: 100,
    temperature: 120,
    in: "1231",
    out: "123qwe",
    in2: "12311",
    out2: "123qwe1",
    oxygen: "213",
    productNum: "dsa",
    operatorName: "小陈",
    operatorTime: "2023-4-11 11",
  },
  {
    id: 3,
    monitor: "九年一班",
    taHao: "玲珑塔",
    materialNum: 100,
    temperature: 120,
    in: "1231",
    out: "123qwe",
    in2: "12311",
    out2: "123qwe1",
    oxygen: "213",
    productNum: "dsa",
    operatorName: "小陈",
    operatorTime: "2023-4-11 11",
  },
  {
    id: 4,
    monitor: "九年一班",
    taHao: "玲珑塔",
    materialNum: 100,
    temperature: 120,
    in: "1231",
    out: "123qwe",
    in2: "12311",
    out2: "123qwe1",
    oxygen: "213",
    productNum: "dsa",
    operatorName: "小陈",
    operatorTime: "2023-4-11 11",
  },
]);
onMounted(() => {
  formTableRef.value.setData(tableData.value);

  nextTick(() => {});
});
</script>
