<template>
  <div class="table-wrap" :style="{ width: `100%` }">
    <table style="width: 1800px">
      <thead>
        <tr v-for="(row, index) in renderHeaderList" :key="index">
          <th
            v-for="columnsItem in row"
            :key="columnsItem.prop"
            :rowspan="computedHeaderRowSpan(columnsItem)"
            :colspan="computedHeaderColSpan(columnsItem)"
            :class="`width-${columnsItem.width} height-${tableHeaderHeight} header-b`"
          >
            <headerCell :columnsItem="columnsItem"></headerCell>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <template
            v-for="(headerItem, headerIndex) in renderDataList"
            :key="headerIndex"
          >
            <td
              v-if="
                computedTdColspan(item, index, headerItem) !== 0 &&
                computedTdRowspan(item, index, headerItem) !== 0
              "
              align="center"
              :class="`height-${tableCellHeight} cell-b`"
              :colspan="computedTdColspan(item, index, headerItem)"
              :rowspan="computedTdRowspan(item, index, headerItem)"
            >
              <!-- 索引列 -->
              <view v-if="headerItem?.prop === 'index'">{{ index + 1 }}</view>

              <!-- text -->
              <view v-else>
                {{ item?.[`${headerItem.prop}`] }}
              </view>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts">
import { columnsType } from "../table";
import useFormTable from "../useFormTable";
import headerCell from "./element/header-cell.vue";
const props = withDefaults(
  defineProps<{
    columns: columnsType[];
    tableCellHeight: number;
    tableHeaderHeight: number;
  }>(),
  { columns: () => [], tableHeaderHeight: 30, tableCellHeight: 30 }
);
console.log(props);

const {
  renderHeaderList,
  tableData,
  renderDataList,
  computedTdColspan,
  computedHeaderRowSpan,
  computedHeaderColSpan,
  computedTdRowspan,
} = useFormTable(props);

function setData(data: []) {
  tableData.value = data;
}

/**
 * 子组件暴露的属性与方法
 */
defineExpose({
  setData,
  tableData,
});
</script>
<style lang="scss" scoped>
@import url(./index.scss);

.table-wrap {
  width: 100%;
  overflow: auto scroll;
}

.tableHeight {
  height: 30px;
}

table,
tr,
th,
td {
  padding: 0;
  font-size: 15px;
  border: 1px solid rgb(214 215 217);
  border-spacing: 0;
}
</style>
