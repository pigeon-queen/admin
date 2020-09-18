<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.id ? '编辑': '添加' }}展售商品</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="post"  label-width="80px" >
        <el-form-item label="类型">
          <el-select v-model="post.saleable_type"
                     filterable
                     reserve-keyword
                     placeholder="请选择" @change="post.saleable_id = 0;post.saleable = {}">
            <el-option
              v-for="item in relateTypes"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联鸽子" v-if="post.saleable_type === 'pigeon'">
          <el-button @click="loadPigeons">选择鸽子</el-button>
          <span style="padding-left: 10px">{{post.relate_title}}</span>
        </el-form-item>

        <template v-if="post.saleable_type === 'product'">
          <el-form-item label="名称*">
            <el-input style="width: 50%;" v-model="post.saleable.name"></el-input>
          </el-form-item>
          <el-form-item label="规格*">
            <el-input style="width: 50%;" v-model="post.saleable.spec"></el-input>
          </el-form-item>
          <el-form-item label="描述*" class="post-content" style="display: inline-block;">
            <quill v-model="post.saleable.description"/>
          </el-form-item>
        </template>

        <el-form-item label="封面图*">
          <image-upload v-model="post.main_image"></image-upload>
        </el-form-item>

        <el-form-item label="价格" prop="cn_name">
          <el-input type="number"  v-model="post.price" style="width: 128px"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
import Quill from "@/components/Editor/quill";

import {write, detail} from '@/api/goods'
import {pigeons} from '@/api/pigeon'
import {Message} from "element-ui";
import ImageUpload from "@/components/Uploads/Image";

export default {
  name: "write",
  components: {ImageUpload, Quill},
  data() {
    return {
      post : {
        saleable: {}
      },
      rules: {
        name: [{ required: true, trigger: 'blur'}],
        summary: [{ required: true, trigger: 'blur'}],
        content: [{ required: true, trigger: 'blur'}],
      },
      relateTypes: [
        {
          id: "pigeon",
          name: "定价鸽"
        },
        {
          id: "product",
          name: "鸽药"
        }
      ],
      pigeonList: [],
      pigeonPage: {},
      pigeonDialog: false,
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          write(this.post).then(res => {
            Message({
              message: '保存成功',
              type: 'info',
              duration: 3 * 1000
            })
            this.back()
          })
        } else {
          return false;
        }
      });
    },
    loadPigeons(params = {}){
      this.pigeonDialog = true
      params.started = 1
      params.enabled = 1
      pigeons(params).then(res => {
        this.pigeonList = res.data.data
        this.pigeonPage = res.data.meta
      })
    },
    choosePigeon(row) {
      this.post.saleable_id = row.id
      this.post.relate_title = `${row.name}(${row.sn})`
      this.pigeonDialog = false
    },
    loadPigeonPage(page){
      this.loadPigeons({page})
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },
    title() {
      return ``
    }
  },
  mounted() {
    if (this.id) {
      detail(this.id).then(res => this.post = res.data)
    }
  }
}
</script>

<style lang="sass">
.post-content
  .ql-container
    min-height: 512px

.post-summary
  .ql-container
    min-height: 128px
</style>
