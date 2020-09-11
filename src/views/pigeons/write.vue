<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.id ? '编辑': '添加' }}鸽子</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="post"  label-width="128px" >
        <el-divider></el-divider>
        <h3>基本信息</h3>
        <el-form-item label="编号">
          <el-input v-model="post.sn" style="width: 50%"></el-input>
        </el-form-item>

        <el-form-item label="鸽舍">
          <el-select v-model="post.seller_id"
                     filterable
                     remote
                     reserve-keyword
                     placeholder="请选择"
                     :remote-method="loadSellers">
            <el-option
              v-for="item in sellers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="名称" prop="name">
          <el-input v-model="post.name" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="简介" style="width: 75%;display: inline-block" class="post-summary" prop="summary">
          <quill v-model="post.summary"></quill>
        </el-form-item>
        <el-row :gutter="20" style="width: 75%">
          <el-col :span="8">
            <el-form-item label="图片">
              <image-upload v-model="post.main_image"></image-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="血统书" >
              <image-upload v-model="post.lineage_image"></image-upload>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="血统书（中文）">
              <image-upload v-model="post.lineage_cn_image"></image-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <h3>详细信息</h3>

      </el-form>
    </el-card>
  </div>
</template>

<script>
import { upload, UploadFile } from 'nerio-uploader'

import Quill from "@/components/Editor/quill";
import ImageUpload from "@/components/Uploads/Image";

import {write, detail} from '@/api/pigeon'
import {sellers} from '@/api/seller'
import {Message} from "element-ui";

export default {
  name: "write",
  components: {Quill, ImageUpload},
  data() {
    return {
      post : {

      },
      rules: {
        name: [{ required: true, trigger: 'blur'}],
        summary: [{ required: true, trigger: 'blur'}],
        content: [{ required: true, trigger: 'blur'}],
      },
      sellers: []
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
    loadSellers(query = '') {
      sellers({
        keyword: query
      }).then(res => this.sellers = res.data.data)
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
    this.loadSellers()
  }
}
</script>

<style scoped lang="sass">
.post-summary
  .quill-editor
    height: 128px
</style>
