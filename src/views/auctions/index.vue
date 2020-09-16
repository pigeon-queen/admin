<template>
  <div :class="home ? undefined : 'app-container'">
    <el-card class="box-card">
      <div slot="header" class="clearfix" v-if="home">
        <span>进行中的拍卖</span>
      </div>
      <div slot="header" class="clearfix" v-else>
        <span>拍卖列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpWrite()">添加</el-button>
      </div>

      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column min-width="200px" prop="title" label="标题"></el-table-column>
        <el-table-column prop="end_at" label="结束时间"></el-table-column>
        <el-table-column prop="disabled" label="启用" v-if="!home" width="96">
         <template slot-scope="scope">
           <el-switch
             v-model="scope.row.enabled" @change="switchDisable(scope.row)">
           </el-switch>
         </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="jumpWrite(scope.row.id)" v-if="!home">编辑</el-button>
            <el-button @click="loadPrices(scope.row.id)" type="text" size="small">竞标记录</el-button>
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
    <el-dialog :visible.sync="dialog" :title="detail.title">
      <small>结束时间：{{detail.end_at}}</small>

      <small v-html="detail.summary"></small>
      <br>
      <br>
      <div v-html="detail.content"></div>
      <el-row :gutter="20">
        <el-col :span="6" :key="pigeon.id" v-for="pigeon in detail.pigeon_list">
          <el-card>
            <oss-image v-model="pigeon.main_image" :width="128" style="width: 100%" alt=""/>
            <small style="color: grey">{{pigeon.sn}}</small>
            <p>{{pigeon.name}}</p>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog :visible.sync="priceDialog" title="竞标记录">
      <el-table :data="prices" style="width: 100%" size="small">
        <el-table-column prop="username" label="用户"></el-table-column>
        <el-table-column prop="price" label="出价"></el-table-column>
        <el-table-column prop="pigeon" min-width="256" label="鸽子"></el-table-column>
        <el-table-column prop="created_at" label="出价时间"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {auctions, detail, edit, prices} from "@/api/auctions";
import OssImage from "@/components/OssImg/index";

export default {
  name: "Auctions",
  props: {
    home: {
      type: Boolean,
      default: () => false
    }
  },
  components: {OssImage},
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
      this.$router.push(`/auctions/write/${id}`)
    },
    loadData(params = {}){
      if (this.home) {
        params.started = 1
        params.enabled = 1
      }
      auctions(params).then(res => {
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
    loadPrices(id) {
      this.priceDialog = true;
      prices(id).then(res => this.prices = res.data)
    }
  },
  data() {
    return {
      list: [],
      dialog: false,
      detail: {
        profile: {}
      },
      page: {},
      prices: [],
      priceDialog: false
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
