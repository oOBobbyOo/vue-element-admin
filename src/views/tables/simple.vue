<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Table {
  date: string
  name: string
  address: string
}

interface Rows {
  row: string
  rowIndex: number
}

@Component({
  name: 'SimpleTable'
})
export default class SimpleTable extends Vue {
  // 是否显示斑马纹, 默认false
  private stripe: boolean = true
  // 是否显示边框, 默认false
  private border: boolean = true
  // 表格数据
  private tableData: Table[] = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ]

  // 指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态
  private tableRowClassName({ row, rowIndex }: Rows) {
    if (rowIndex % 2 === 0) {
      return 'warning-row'
    } else {
      return 'success-row'
    }
  }
}
</script>