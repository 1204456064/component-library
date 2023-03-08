<template>
  <div class="home">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="作者" :bordered="false">
          <p>可搬山，倒海，降妖，镇魔，敕神，摘星，断江，摧城，开天！</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="访问量" :bordered="false">
          <p>可搬山，倒海，降妖，镇魔，敕神，摘星，断江，摧城，开天！</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="我有一剑" :bordered="false">
          <p>可搬山，倒海，降妖，镇魔，敕神，摘星，断江，摧城，开天！</p>
        </a-card>
      </a-col>
    </a-row>
    <a-card title="" :bordered="false" class="home__card">
      <div id="main" class="home__chart"></div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, reactive } from "vue";
let myChart: echarts.EChartsType | null = null;

const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
    now = new Date(+now - 2000);
  }
  return res;
})();
const categories2 = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(10 - len - 1);
  }
  return res;
})();
const data = (function () {
  let res = [];
  let len = 10;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();
const data2 = (function () {
  let res = [];
  let len = 0;
  while (len < 10) {
    res.push(+(Math.random() * 10 + 5).toFixed(1));
    len++;
  }
  return res;
})();

const app = reactive({
  count: 0,
});

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(document.getElementById("main") as HTMLElement);
  // 绘制图表
  myChart.setOption({
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#283b56",
        },
      },
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    dataZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: categories,
      },
      {
        type: "category",
        boundaryGap: true,
        data: categories2,
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        name: "Price",
        max: 30,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
      {
        type: "value",
        scale: true,
        name: "Order",
        max: 1200,
        min: 0,
        boundaryGap: [0.2, 0.2],
      },
    ],
    series: [
      {
        name: "Dynamic Bar",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: data,
      },
      {
        name: "Dynamic Line",
        type: "line",
        data: data2,
      },
    ],
  });
});

app.count = 11;

setInterval(function () {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
  data.shift();
  data.push(Math.round(Math.random() * 1000));
  data2.shift();
  data2.push(+(Math.random() * 10 + 5).toFixed(1));
  categories.shift();
  categories.push(axisData);
  categories2.shift();
  categories2.push(app.count++);
  myChart!.setOption({
    xAxis: [
      {
        data: categories,
      },
      {
        data: categories2,
      },
    ],
    series: [
      {
        data: data,
      },
      {
        data: data2,
      },
    ],
  });
}, 2100);
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
  height: 100%;
  overflow-y: scroll;

  &__card {
    margin-top: 20px;
  }

  &__chart {
    height: 600px;
    width: 100%;
  }
}
</style>
