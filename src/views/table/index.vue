<template>
  <div>
    <a-button type="primary" @click="sendRequest">测试axios</a-button>
    <div style="overflow: auto scroll">
      <!-- <a-table
        style="width:100%,min-width: 100%;table-layout:fixed"
        id="tableId"
        ref="tableRef"
        :dataSource="dataSource"
        :columns="columns"
        :scroll="scrollProps"
      /> -->

      <a-date-picker v-model:value="value1" />
    </div>
    <a-config-provider :locale="zhCN">
      <div class="locale-components">
        <div class="example">
          <a-pagination :total="50" show-size-changer />
        </div>
        <div class="example">
          <a-select show-search style="width: 200px">
            <a-select-option value="jack">jack</a-select-option>
            <a-select-option value="lucy">lucy</a-select-option>
          </a-select>
          <a-date-picker />
          <a-time-picker />
          <a-range-picker style="width: 200px" />
        </div>
      </div>
    </a-config-provider>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import request from "@/utils/request";
import locale from "ant-design-vue/es/date-picker/locale/zh_CN";
import picker from "./picker.vue";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
function getPopupContainer(el, dialogContext) {
  if (dialogContext) {
    return dialogContext.getDialogWrap();
  } else {
    return document.body;
  }
}
const value1 = ref("");

function sendRequest() {
  request.get("/ddd", {
    params: {
      type: 123,
    },
  });
}

// 固定列需要设置
const scrollProps = ref({
  x: "100%",
  y: "500px",
});

const dataSource = ref([
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
    1: 1,
    2: 2,
    3: 3,
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
    1: 1,
    2: 2,
    3: 3,
  },
  {
    key: "3",
    name: "1",
    age: 2,
    address: "3",
    1: 1,
    2: 2,
    3: 3,
  },
  {
    key: "4",
    name: "1",
    age: 2,
    address: "3",
    1: 1,
    2: 2,
    3: 3,
  },
  {
    key: "5",
    name: "1",
    age: 2,
    address: "3",
    1: 1,
    2: 2,
    3: 3,
  },
]);

const columns = ref([
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "1",
    dataIndex: "1",
    key: "1",
  },
  {
    title: "2",
    dataIndex: 2,
    key: "2",
  },
  {
    title: "3",
    dataIndex: "3",
    key: "3",
  },
]);

const tableRef = ref();

onMounted(() => {
  console.log("我加载了");

  const tableId = document.getElementById("tableId");
  const className = document.getElementsByClassName("ant-table-body");
  function getClass() {}

  console.log(tableId?.getElementsByClassName("ant-table-body")[0].scrollWidth);
  console.log(tableId?.style);
});
</script>
