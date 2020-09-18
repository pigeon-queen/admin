<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>展售商品列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpWrite()">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="id" label="类型">
          <template slot-scope="{row}">
            <span v-if="row.saleable_type === 'product'">鸽药</span>
            <span v-if="row.saleable_type === 'pigeon'">定价鸽</span>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="名称">
          <template slot-scope="{row}">
            <span v-if="row.saleable_type === 'product'">{{ row.saleable.name }}</span>
            <span v-if="row.saleable_type === 'pigeon'">{{ row.saleable.name }}({{ row.saleable.sn }})</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="售价"></el-table-column>
        <el-table-column prop="read_count" label="点击量"></el-table-column>
        <el-table-column prop="disabled" label="启用">
         <template slot-scope="scope">
           <el-switch
             v-model="scope.row.enabled" @change="switchDisable(scope.row)">
           </el-switch>
         </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="jumpWrite(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="page.total"
        layout="prev, pager, next"
        :total="page.total"
        :page-size="page.per_page"
        :current-page="page.current_page"
        @current-change="loadPage">
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="dialog" title="">
      <img :src="detail.main_image" alt="">
      <br>
      <br>
    </el-dialog>
  </div>
</template>

<script>
import {goods, detail, edit} from '@/api/goods'

export default {
  name: "Goods",
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleClick(id){
      this.dialog = true
      detail(id).then(res => this.detail = res.data)
    },
    switchDisable(row) {
      edit(row.id, {
        enabled: row.enabled
      })
    },
    jumpWrite(id = ''){
      this.$router.push(`/goods/write/${id}`)
    },
    loadData(params = {}){
      goods(params).then(res => {
        const {data} = res
        this.list = data.data
        this.page = data.meta
      })
    },
    loadPage(i) {
      this.loadData({
        page: i
      })
    }
  },
  data() {
    return {
      list: [],
      dialog: false,
      detail: {

      },
      page: {}
    };
  },
  mounted() {
    this.loadData()
  }
};
</script>
