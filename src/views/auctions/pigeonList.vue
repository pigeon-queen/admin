<template>
  <div>
    <el-card shadow="never">
      <el-table :data="selected" v-loading="loading" style="width: 100%" size="small">
        <el-table-column prop="sn" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="seller_name" label="鸽舍"></el-table-column>
        <el-table-column min-width="96px" label="拍卖底价">
          <template slot-scope="{row}">
            <el-input placeholder="请输入拍卖底价" v-model="row.base_price" size="small" />
          </template>
        </el-table-column>
        <el-table-column min-width="96px" label="最低加价">
          <template slot-scope="{row}">
            <el-input placeholder="请输入最低加价"  v-model="row.markup_price" size="small" />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button type="text" size="small" style="color: red" @click="remove(row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button @click="openList" style="margin-top: 12px">选择</el-button>
    </el-card>

    <el-dialog :visible.sync="open" title="选择鸽子">
      <el-input prefix-icon="el-icon-search" placeholder="输入关键字搜索" v-model="query" @input="search" style="margin-bottom: 12px"></el-input>
      <el-table ref="listTable" v-loading="loading" :data="list" style="width: 100%" border @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="sn" label="编号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="seller_name" label="鸽舍"></el-table-column>
      </el-table>

      <el-button type="primary" style="margin-top: 12px" @click="open = false">确定</el-button>

    </el-dialog>
  </div>
</template>

<script>
import {pigeons} from "@/api/pigeon";

import {functions} from 'nerio-js-utils'
const {standby} = functions

export default {
  name: "pigeonList",
  props: {
    value: Array
  },
  data() {
    return {
      open: false,
      list: [],
      page: {},
      query: '',
      loading: false,
      loaded : false,
      selectedItems: []
    }
  },
  methods: {
    openList() {
      this.open = true
      this.loaded || this.loadData()
    },
    loadData(params = {}){
      params.enabled = 1
      params.per_page = 100
      this.loading = true
      pigeons(params).then(res => {
        const {data} = res
        this.list = data.data
        this.page = data.meta
        this.loading = false
        this.loaded = true
        setTimeout(() => {
          this.selected.forEach(row => {
            this.list.forEach(item => {
              if (item.id === row.id) {
                this.add(item)
              }
            })
          })
        }, 100)
      })
    },
    loadPage(i) {
      this.loadData({
        page: i,
      })
    },
    handleSelectionChange(data) {
      this.selectedItems = data
      if (this.selected.length === 0 ) {
        this.selected = data
      } else {
        let ids = this.selected.map(s => s.id)

        data.forEach(i => {
          if (ids.indexOf(i.id) < 0) {
            this.selected.push(i)
          }
        })
      }
    },
    search() {
        standby(() => {
          this.loadData({
            keyword: this.query
          })
        }, 300)
    },
    remove(row) {
      let index = this.selected.indexOf(row)
      this.selected.splice(index, 1)
      this.$refs.listTable.toggleRowSelection(row, false)
    },
    add(row) {
      this.$refs.listTable.toggleRowSelection(row)
    }
  },
  mounted() {
  },
  computed: {
    selected: {
      set(v) {
        this.$emit('input', v)
      },
      get() {
        return this.value
      }
    }
  }
}
</script>

<style scoped>

</style>
