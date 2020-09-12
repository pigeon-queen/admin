<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>鸽舍列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpWrite()">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="disabled" label="启用">
         <template slot-scope="scope">
           <el-switch
             v-model="scope.row.enabled" @change="switchDisable(scope.row)">
           </el-switch>
         </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
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
    <el-dialog :visible.sync="dialog" :title="detail.name">
      <img :src="detail.main_image" alt="">
      <small v-html="detail.summary"></small>
      <br>
      <br>
      <div v-html="detail.description"></div>
    </el-dialog>
  </div>
</template>

<script>
import {sellers, detail, edit} from '@/api/seller'

export default {
  name: "Sellers",
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
      this.$router.push(`/sellers/write/${id}`)
    },
    loadData(params = {}){
      sellers(params).then(res => {
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
