<template>
  <div class="list">
    <el-table :data="arr" style="width: 100%">
      <el-table-column prop="sarea" label="地區"> </el-table-column>
      <el-table-column prop="sna" label="地點"> </el-table-column>
      <el-table-column prop="ar" label="地址"> </el-table-column>
      <el-table-column prop="sbi" label="可借車輛"> </el-table-column>
      <el-table-column prop="tot" label="可停空位"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Bike List',
  props: ['arr']
}
</script>

<style lang="scss" scoped>
::v-deep {
  .el-table td,
  .el-table th {
    text-align: center;
  }
}
</style>
