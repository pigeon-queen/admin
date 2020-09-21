<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>拍卖订单列表</span>
      </div>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="order_no" label="订单号"></el-table-column>
        <el-table-column prop="username" label="用户"></el-table-column>
        <el-table-column prop="title" label="拍卖"></el-table-column>
        <el-table-column prop="name" label="鸽子"></el-table-column>
        <el-table-column prop="price" label="成交价格"></el-table-column>
        <el-table-column prop="base_price" label="拍卖底价"></el-table-column>
        <el-table-column prop="status_cn" label="状态"></el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button  type="text" v-if="row.status === 1" @click="deliver(row.id)" size="small">确认发货</el-button>
            <el-button  type="text" v-if="row.status === 2" @click="deliverStatuses(row.id)" size="small">查看发货状态</el-button>
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

    <deliver-select @submit="submitDeliver" :dialog.sync="deliverDialog" v-model="post.deliver_code" :type.sync="post.deliver_type"/>

    <el-dialog :title="`订单${order.order_no}物流`" :visible.sync="deliverStatus">
      <div v-for="s in order.deliver_statuses" :key="s.time" style="margin: 26px 0">
        {{s.time}}
        {{s.status}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {orders, deliver, order} from '@/api/auctions'
import DeliverSelect from "@/components/Selects/deliver";
import {Message} from "element-ui";

export default {
  name: "AuctionOrders",
  components: {DeliverSelect},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    loadData(params = {}){
      orders(params).then(res => {
        const {data} = res
        this.list = data.data
        this.page = data.meta
      })
    },
    loadPage(i) {
      this.loadData({
        page: i
      })
    },
    deliver(id) {
      this.post.id = id
      this.deliverDialog = true
    },
    submitDeliver(){
      deliver(this.post.id, this.post).then(res => {
        Message({
          message: '保存成功',
          type: 'info',
          duration: 3 * 1000
        })
        this.deliverDialog = false
        this.loadData()
      })
    },
    deliverStatuses(id) {
      this.deliverStatus = true
      order(id).then(res => this.order = res.data)
    }
  },
  data() {
    return {
      list: [],
      deliverDialog: false,
      deliverStatus: false,
      order: {
      },
      page: {},
      post: {

      }
    };
  },
  mounted() {
    this.loadData()
  }
};
</script>

<style scoped lang="sass">
.profile
  tbody
    tr
      border: 1px solid #ccccf8
      border-top: none
      display: block
      td
        //border: 1px solid #ccccf8
        padding: 4px 12px
        width: 96px
      td:nth-child(odd)
        background-color: #cdcccc
    tr:first-child
      border-top: 1px solid #ccccf8
  thead
    tr
      border: 1px solid #ccccf8
      border-bottom: none
      display: block
      th
        padding: 4px 0
        text-align: center
        display: block
table.profile
  margin: 5px auto
  width: 512px
</style>
