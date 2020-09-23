<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户列表</span>
      </div>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户名" min-width="100"></el-table-column>
        <el-table-column prop="mobile" label="手机"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
    <el-dialog :visible.sync="dialog" :title="detail.username">
      <div>真实姓名: {{detail.name}} </div>
      <div>固定电话: {{detail.phone}} </div>
      <div>手机: {{detail.mobile}} </div>
      <div>Email: {{detail.email}} </div>
      <div>QQ: {{detail.qq}} </div>
      <div>邮政编码: {{detail.postcode}} </div>
      <div>详细地址: {{detail.address}} </div>
      <div>接鸽地点: {{detail.receive_address}} </div>
      <div>接鸽人: {{detail.receiver}} </div>
      <div>血统书接受地址: {{detail.lineage_address}} </div>
      <div>血统书收件人: {{detail.lineage_receiver}} </div>
      <div>保证金: {{detail.balance}} </div>
    </el-dialog>
  </div>
</template>

<script>
import {accounts} from '@/api/accounts'

export default {
  name: "Accounts",
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleClick(row){
      this.dialog = true
      this.detail = row
    },
    loadData(params = {}){
      accounts(params).then(res => {
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
