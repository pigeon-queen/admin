<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="{span: 24, offset: 0}" :lg="{span: 20, offset: 2}" :xl="{span: 12, offset: 6}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ this.id ? '编辑' : '添加' }}广告</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="back">返回</el-button>
          </div>
          <el-form ref="form" :model="post" label-width="96px">

            <el-form-item label="标题*" prop="name">
              <el-input v-model="post.title" style="width: 50%"></el-input>
            </el-form-item>
            <el-form-item label="位置">
              <el-select v-model="post.position"
                         filterable
                         reserve-keyword
                         placeholder="请选择">
                <el-option
                  v-for="item in positions"
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
            <el-form-item label="图片*">
              <image-upload v-model="post.image"></image-upload>
            </el-form-item>

            <el-form-item label="关联">
              <el-select v-model="post.relate_type"
                         filterable
                         reserve-keyword
                         placeholder="请选择" @change="post.relate_id = 0;post.relate_title = ''">
                <el-option
                  v-for="item in relateTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>

            </el-form-item>

            <el-form-item label="关联拍卖" v-if="post.relate_type === 'auction'">
              <el-button @click="loadAuctions">选择拍卖</el-button>
              <span style="padding-left: 10px">{{post.relate_title}}</span>
            </el-form-item>

            <el-form-item label="关联新闻赛事" v-if="post.relate_type === 'article'">
              <el-button @click="loadArticles">选择新闻赛事</el-button>
              <span style="padding-left: 10px">{{post.relate_title}}</span>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submit()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="auctionDialog">
      <el-table ref="listTable" v-loading="loading" :data="auctionList" style="width: 100%" border>
        <el-table-column prop="title" label="名称" min-width="128"></el-table-column>
        <el-table-column prop="end_at" label="结束时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button @click="chooseAuction(row)" type="primary" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="auctionPage.total"
        layout="prev, pager, next"
        :total="auctionPage.total"
        :page-size="auctionPage.per_page"
        :current-page="auctionPage.current_page"
        @current-change="loadAuctionPage">
      </el-pagination>
    </el-dialog>

    <el-dialog :visible.sync="articleDialog">
      <el-table ref="listTable" v-loading="loading" :data="articleList" style="width: 100%" border>
        <el-table-column prop="title" label="名称" min-width="128"></el-table-column>
        <el-table-column prop="category" label="类型"></el-table-column>
        <el-table-column prop="publish_at" label="发布时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="{row}">
            <el-button @click="chooseArticle(row)" type="primary" size="small">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="articlePage.total"
        layout="prev, pager, next"
        :total="articlePage.total"
        :page-size="articlePage.per_page"
        :current-page="articlePage.current_page"
        @current-change="loadArticlePage">
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import Quill from "@/components/Editor/quill";

import {write, detail} from '@/api/banners'
import {auctions} from '@/api/auctions'
import {articles} from '@/api/articles'
import {Message} from "element-ui";
import ImageUpload from "@/components/Uploads/Image";

export default {
  name: "write",
  components: {ImageUpload, Quill},
  data() {
    return {
      post: {
        publish_at: new Date(),
        relate_type: 'none',
        position: 0
      },
      rules: {
        name: [{required: true, trigger: 'blur'}],
        summary: [{required: true, trigger: 'blur'}],
        content: [{required: true, trigger: 'blur'}],
      },
      relateTypes: [
        {
          id: "none",
          name: "无关联"
        },
        {
          id: "auction",
          name: "拍卖"
        },
        {
          id: "article",
          name: "新闻赛事"
        },
      ],
      positions: [
        {
          id: 0,
          name: "顶部滚动图"
        },
        {
          id: 1,
          name: "首页广告"
        },
      ],
      auctionDialog: false,
      auctionList : [],
      checkedAuction: {},
      auctionPage: {},

      articleDialog: false,
      articleList : [],
      checkedArticle: {},
      articlePage: {}
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
    loadAuctions(params = {}) {
      this.auctionDialog = true
      params.started = 1
      params.enabled = 1
      auctions(params).then(res => {
        this.auctionList = res.data.data
        this.auctionPage = res.data.meta
      })
    },
    chooseAuction(row) {
      this.checkedAuction = row
      this.post.relate_id = row.id
      this.post.relate_title = row.title
      this.auctionDialog = false
    },
    loadAuctionPage(page) {
      this.loadAuctions({page: page})
    },
    loadArticles(params = {}) {
      this.articleDialog = true
      params.published = 1
      params.enabled = 1
      articles(params).then(res => {
        this.articleList = res.data.data
        this.articlePage = res.data.meta
      })
    },
    chooseArticle(row) {
      this.checkedArticle = row
      this.post.relate_id = row.id
      this.articleDialog = false
      this.post.relate_title = row.title
    },
    loadArticlePage(page) {
      this.loadArticles({page: page})
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

</style>
