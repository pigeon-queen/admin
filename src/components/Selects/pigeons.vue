<template>
 <div>
   <slot name="button">
     <el-button @click="loadPigeons">{{ title }}</el-button>
     <span style="padding-left: 10px">{{relate_title}}</span>
     <el-button circle style="margin-left: 10px" @click="remove" v-if="id">
       <i class="el-icon-delete" style="color: red">

       </i>
     </el-button>
   </slot>
   <el-dialog :visible.sync="pigeonDialog">
     <el-table ref="listTable" :data="pigeonList" style="width: 100%" border>
       <el-table-column prop="name" label="名称" min-width="128"></el-table-column>
       <el-table-column prop="sn" label="环号" min-width="128"></el-table-column>
       <el-table-column fixed="right" label="操作" width="100">
         <template slot-scope="{row}">
           <el-button @click="choosePigeon(row)" type="primary" size="small">选择</el-button>
         </template>
       </el-table-column>
     </el-table>

     <el-pagination
       v-if="pigeonPage.total"
       layout="prev, pager, next"
       :total="pigeonPage.total"
       :page-size="pigeonPage.per_page"
       :current-page="pigeonPage.current_page"
       @current-change="loadPigeonPage">
     </el-pagination>
   </el-dialog>
 </div>
</template>

<script>
import {pigeons} from "@/api/pigeon";

export default {
  name: "pigeonsSelect",
  props: {
    value: Number,
    hint: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => '选择鸽子'
    },
    query: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      pigeonList: [],
      pigeonPage: {},
      pigeonDialog: false,
    }
  },
  methods: {
    loadPigeons(params = {}) {
      this.pigeonDialog = true
      params = Object.assign(this.query, {
        enabled: 1
      })
      pigeons(params).then(res => {
        this.pigeonList = res.data.data
        this.pigeonPage = res.data.meta
      })
    },
    choosePigeon(row) {
      this.id = row.id
      this.relate_title = `${row.name}(${row.sn})`
      this.$emit('selected', row)
      this.pigeonDialog = false
    },
    loadPigeonPage(page) {
      this.loadPigeons({page})
    },
    remove() {
      this.id = null
      this.relate_title = ''
    }
  },
  computed: {
    id: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    relate_title: {
      get() {
        return this.hint
      },
      set(v) {
        this.$emit('update:hint', v)
      }
    }
  }
}
</script>

<style scoped>

</style>
