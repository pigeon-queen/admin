<template>
  <div class="app-container">
    <el-card class="normal-config">
      <div slot="header" class="clearfix">
        <span>{{ title }}</span>
      </div>
      <quill v-model="text"/>
      <el-button type="primary" style="margin-top: 10px" @click="submit">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import Quill from "@/components/Editor/quill/index";
import {storeMeta, getMeta} from "@/api/metas";
import {Message} from "element-ui";
export default {
  name: "userTerm",
  components: {Quill},
  mounted() {
    getMeta(this.key).then(res => {
      this.text = res.data[this.key]
    })
  },
  computed: {
    title() {
      return this.$route.meta.title
    },
    key() {
      return this.$route.meta.key
    }
  },
  data() {
    return {
      text: null
    }
  },
  methods: {
    submit() {
      let data = {}
      data[this.key] = this.text
      storeMeta(data).then(r => Message({
        message: '保存成功',
        type: 'info',
        duration: 3 * 1000
      }))
    }
  }
}
</script>

<style>

</style>
