<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24, offset: 0}" :lg="{span: 20, offset: 2}" :xl="{span: 12, offset: 6}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ this.id ? '编辑': '添加' }}拍卖</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
          </div>
          <el-form ref="form" :model="post"  label-width="128px" >
            <h3 style="text-align: center">基本信息</h3>
            <el-form-item label="标题*">
              <el-input v-model="post.title" style="width: 50%"></el-input>
            </el-form-item>
            <el-form-item label="封面图片*">
              <image-upload v-model="post.cover"></image-upload>
            </el-form-item>
            <el-form-item label="结束时间*">
              <el-date-picker
                v-model="post.end_at"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择结束时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="简介" style="width: 85%" class="post-summary" prop="summary">
              <el-input v-model="post.summary" type="textarea" style="width: 60%"></el-input>
            </el-form-item>

            <el-form-item label="描述" style="display: inline-block" class="post-content" prop="content">
              <quill v-model="post.content" ></quill>
            </el-form-item>

            <el-form-item label="视频" style="display: inline-block" class="post-content" prop="content">
              <video-upload v-model="post.video" ></video-upload>
            </el-form-item>

            <el-divider></el-divider>
            <h3 style="text-align: center">选择鸽子</h3>
            <el-form-item label-width="0">
              <el-row>
                <el-col :span="20" :offset="2">
                  <pigeon-list v-model="post.pigeon_list"/>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { upload, UploadFile } from 'nerio-uploader'

import Quill from "@/components/Editor/quill";
import ImageUpload from "@/components/Uploads/Image";

import {write, detail} from '@/api/auctions'
import {sellers} from '@/api/seller'
import {Message} from "element-ui";
import PigeonList from "@/views/auctions/pigeonList";
import VideoUpload from "@/components/Uploads/Video";

export default {
  name: "write",
  components: {VideoUpload, PigeonList, Quill, ImageUpload},
  data() {
    return {
      post : {
        pigeon_list: []
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
        keyword: query,
        enabled: 1
      }).then(res => this.sellers = res.data.data)
    }
  },
  computed: {
    id() {
      return this.$route.params.id
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
    min-height: 256px

.post-summary
  .ql-container
    min-height: 128px

</style>
