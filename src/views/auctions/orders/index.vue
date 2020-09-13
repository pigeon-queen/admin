<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>拍卖订单列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpWrite()">添加</el-button>
      </div>
      <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="sn" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="seller_name" label="鸽舍"></el-table-column>
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
    <el-dialog :visible.sync="dialog" >
      <template slot="title">
        <div style="font-size: 26px">{{ detail.name }}</div>
        <small style="color: grey">{{detail.sn}}</small>
      </template>
      <small v-html="detail.summary"></small>
      <br>
      <br>
      <table class="profile"  cellspacing="0" cellpadding="0">
        <thead>
        <tr><th style="text-align: center" rowspan="2"> 特征</th></tr>
        </thead>
        <tbody>
        <tr>
          <td>眼砂</td>
          <td>{{ detail.eye_sand }}</td>
          <td>羽色</td>
          <td>{{ detail.feather_color }}</td>
        </tr>
        <tr>
          <td>眼砂</td>
          <td>{{ detail.distance_level }}</td>
        </tr>
        </tbody>
      </table>

      <table class="profile"  cellspacing="0" cellpadding="0">
        <thead>
        <tr><th style="text-align: center" rowspan="2"> 整体</th></tr>
        </thead>
        <tbody>
        <tr>
          <td>体型</td>
          <td>{{ detail.profile.body_type }}</td>
          <td>肥瘦</td>
          <td>{{ detail.profile.body_fit }}</td>
        </tr>
        <tr>
          <td>体长</td>
          <td>{{ detail.profile.body_length }}</td>
          <td>强壮度</td>
          <td>{{ detail.profile.body_strong }}</td>
        </tr>
        <tr>
          <td>耻骨强度</td>
          <td>{{ detail.profile.pubic_strength }}</td>
          <td>耻骨松紧</td>
          <td>{{ detail.profile.pubic_tightness }}</td>
        </tr>
        <tr>
          <td>活力</td>
          <td>{{ detail.profile.vitality }}</td>
          <td>眼睛浓度</td>
          <td>{{ detail.profile.eye_concentration }}</td>
        </tr>
        <tr>
          <td>肌肉</td>
          <td>{{ detail.profile.muscle }}</td>
          <td>平衡度</td>
          <td>{{ detail.profile.balance }}</td>
        </tr>
        <tr>
          <td>背部</td>
          <td>{{ detail.profile.back }}</td>
        </tr>
        </tbody>
      </table>

      <table class="profile"  cellspacing="0" cellpadding="0">
        <thead>
        <tr><th style="text-align: center" rowspan="2"> 翅膀</th></tr>
        </thead>
        <tbody>
        <tr>
          <td>育种羽</td>
          <td>{{ detail.profile.breeding_feather }}</td>
          <td>主羽</td>
          <td>{{ detail.profile.main_feather }}</td>
        </tr>
        <tr>
          <td>羽毛浓密度</td>
          <td>{{ detail.profile.feather_density }}</td>
          <td>羽质</td>
          <td>{{ detail.profile.feather_quality }}</td>
        </tr>
        <tr>
          <td>副羽</td>
          <td>{{ detail.profile.accessory_feather }}</td>
          <td>翅膀柔韧度</td>
          <td>{{ detail.profile.wing_flexibility }}</td>
        </tr>
        </tbody>
      </table>
      <img :src="detail.main_image" />
      <img :src="detail.lineage_image" />
    </el-dialog>
  </div>
</template>

<script>
import {pigeons, detail, edit} from '@/api/pigeon'

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
      this.$router.push(`/auctions/write/${id}`)
    },
    loadData(params = {}){
      pigeons(params).then(res => {
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
        profile: {}
      },
      page: {}
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
