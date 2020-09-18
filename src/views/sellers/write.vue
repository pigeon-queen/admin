<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.id ? '编辑': '添加' }}鸽舍</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="post"  label-width="80px" >
        <el-form-item label="英文名*" prop="name">
          <el-input v-model="post.name" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="中文名" prop="cn_name">
          <el-input v-model="post.cn_name" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="国籍" prop="cn_name">
          <el-input v-model="post.nationality" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="cn_name">
          <el-input v-model="post.region" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="荣誉" prop="cn_name">
          <el-input type="textarea" v-model="post.honor" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="主要血统" prop="cn_name">
          <el-input v-model="post.main_lineage" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="封面图*">
          <image-upload v-model="post.main_image"></image-upload>
        </el-form-item>
        <el-form-item label="简介" style="width: 85%" class="post-summary" prop="summary">
          <el-input v-model="post.summary" type="textarea" style="width: 60%"></el-input>
        </el-form-item>

        <el-form-item label="描述" style="width: 85%;display: inline-block" class="post-content" prop="content">
          <quill v-model="post.description" ></quill>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Quill from "@/components/Editor/quill";

import {write, detail} from '@/api/seller'
import {Message} from "element-ui";
import ImageUpload from "@/components/Uploads/Image";

export default {
  name: "write",
  components: {ImageUpload, Quill},
  data() {
    return {
      post : {

      },
      rules: {
        name: [{ required: true, trigger: 'blur'}],
        summary: [{ required: true, trigger: 'blur'}],
        content: [{ required: true, trigger: 'blur'}],
      }
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
