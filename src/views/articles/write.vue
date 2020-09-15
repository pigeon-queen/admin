<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.id ? '编辑': '添加' }}新闻赛事</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
      </div>
      <el-form ref="form" :model="post"  label-width="80px" >
        <el-form-item label="标题*" prop="name">
          <el-input v-model="post.title" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="类型*">
          <el-select v-model="post.category_id"
                     filterable
                     reserve-keyword
                     placeholder="请选择">
            <el-option
              v-for="item in cates"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="发布时间*">
          <el-date-picker
            v-model="post.publish_at"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择发布时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="封面图*">
          <image-upload v-model="post.cover"></image-upload>
        </el-form-item>

        <el-form-item label="内容*" style="width: 85%;display: inline-block" class="post-content" prop="content">
          <quill v-model="post.content" ></quill>
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

import {write, detail, categories} from '@/api/articles'
import {Message} from "element-ui";
import ImageUpload from "@/components/Uploads/Image";

export default {
  name: "write",
  components: {ImageUpload, Quill},
  data() {
    return {
      post : {
        publish_at: new Date()
      },
      rules: {
        name: [{ required: true, trigger: 'blur'}],
        summary: [{ required: true, trigger: 'blur'}],
        content: [{ required: true, trigger: 'blur'}],
      },
      cates: []
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
    categories().then(res => this.cates = res.data)
  }
}
</script>

<style lang="sass">
.post-content
  .ql-container
    min-height: 512px

</style>
