<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24, offset: 0}" :lg="{span: 20, offset: 2}" :xl="{span: 12, offset: 6}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ this.id ? '编辑': '添加' }}鸽子</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
          </div>
          <el-form ref="form" :model="post"  label-width="64px" >
            <h3 style="text-align: center">基本信息</h3>
            <el-form-item label="编号*">
              <el-input v-model="post.sn" style="width: 50%"></el-input>
            </el-form-item>

            <el-form-item label="鸽舍*">
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

            <el-form-item label="名称*" prop="name">
              <el-input v-model="post.name" style="width: 50%"></el-input>
            </el-form-item>
            <el-form-item label="简介" style="display: inline-block" class="post-summary" prop="summary">
              <quill v-model="post.summary"></quill>
            </el-form-item>
            <el-row :gutter="0" style="margin-top: 10px">
              <el-col :span="8">
                <el-form-item label="图片*">
                  <image-upload v-model="post.main_image"></image-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="血统书*" >
                  <image-upload v-model="post.lineage_image"></image-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="血统书（中文）" label-width="128px">
                  <image-upload v-model="post.lineage_cn_image"></image-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
            <h3 style="text-align: center">详细信息</h3>
            <h4 style="text-align: center;color: grey">>特征<</h4>
            <el-row :gutter="5" >
              <el-col :span="6">
                <el-form-item label="性别">
                  <el-select v-model="post.gender"
                             placeholder="请选择">
                    <el-option key="M" value="M" label="雄性"/>
                    <el-option key="F" value="F" label="雌性"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="眼砂">
                  <el-input v-model="post.eye_sand" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="羽色" >
                  <el-input v-model="post.feather_color" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="距离级别"  label-width="76px">
                  <el-input v-model="post.distance_level" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <h4 style="text-align: center;color: grey">>整体<</h4>
            <el-row :gutter="5">
              <el-col :span="6">
                <el-form-item label="体型">
                  <el-input v-model="post.profile.body_type" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="肥瘦" >
                  <el-input v-model="post.profile.body_fit" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="体长" >
                  <el-input v-model="post.profile.body_length" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="强壮度" >
                  <el-input v-model="post.profile.body_strong" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="6">
                <el-form-item label="耻骨强度" label-width="76px">
                  <el-input v-model="post.profile.pubic_strength" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="耻骨松紧"  label-width="76px">
                  <el-input v-model="post.profile.pubic_tightness" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="活力" >
                  <el-input v-model="post.profile.vitality" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="眼睛浓度"  label-width="76px">
                  <el-input v-model="post.profile.eye_concentration" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="6">
                <el-form-item label="肌肉">
                  <el-input v-model="post.profile.muscle" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="平衡度"  label-width="64px">
                  <el-input v-model="post.profile.balance" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="背部" >
                  <el-input v-model="post.profile.back" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <h4 style="text-align: center;color: grey">>翅膀<</h4>

            <el-row :gutter="5">
              <el-col :span="6">
                <el-form-item label="育种羽">
                  <el-input v-model="post.profile.breeding_feather" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="主羽">
                  <el-input v-model="post.profile.main_feather" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="羽毛浓密度" label-width="96px">
                  <el-input v-model="post.profile.feather_density" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="羽质">
                  <el-input v-model="post.profile.feather_quality" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="5">
              <el-col :span="6">
                <el-form-item label="副羽">
                  <el-input v-model="post.profile.accessory_feather" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="翅膀柔韧度"  label-width="96px">
                  <el-input v-model="post.profile.wing_flexibility" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

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

import {write, detail} from '@/api/pigeon'
import {sellers} from '@/api/seller'
import {Message} from "element-ui";

export default {
  name: "write",
  components: {Quill, ImageUpload},
  data() {
    return {
      post : {
        profile: {}
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
