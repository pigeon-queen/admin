<template>
  <div class="video-upload">
    <video :src="url" v-if="url"  controls="controls"></video>
    <el-progress
      :percentage="imgProgress"
      v-if="imgUploading"
      :show-text="false"
      class="video-progress"
    >
    </el-progress>
    <el-button :class="elClass" @click="trigger">
      上传
      <input accept="video/*" type="file" style="display: none;" ref="upload" @change="upload">
    </el-button>
    <el-tooltip class="item" effect="dark" content="移除" placement="top">
      <el-button circle @click="remove" v-if="url">
        <i class="el-icon-delete" style="color: red"></i>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
import {upload, UploadFile} from 'nerio-uploader'
import {Message} from "element-ui";

export default {
  name: "VideoUpload",
  props: {
    value: String,
    elClass: {
      type: String,
      default: () => 'upload-button'
    },
  },
  data() {
    return {
      uploadDriver: process.env.VUE_APP_UPLOAD_DRIVER || 'oss',
      imgProgress: -1,
      uploaded: false
    }
  },
  mounted() {
    if (this.url) {
      this.uploaded = true
    }
  },
  methods: {
    trigger() {
      this.$refs.upload.click()
    },
    upload(e) {
      this.uploaded = false
      let file = e.target.files[0]
      if (file) {
        upload(file, this.uploadDriver, {
          validate: (uploadFile) => {
            if (!uploadFile.isVideo()) {
              return false;
            }

            return true;
          },
          stsUrl: '/oss/sts',
          progress: percent => {
            console.log(this.imgProgress = percent)
          },
          chunk: true,
          chunkSize: 256 * UploadFile.KB
        }).then(file => {
          this.url = file.url.split('?', 2)[0]
          this.uploaded = true
        }).catch(error => {
          Message({
            message: error.response?.data?.message || error.message,
            type: 'error',
            duration: 5 * 1000
          })
        })
      }
    },
    remove() {
      this.url = null
    }
  },
  computed: {
    url: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    },
    imgUploading() {
      return this.imgProgress > -1 && this.imgProgress < 100
    },
  }
}
</script>

<style scoped lang="sass">
.video-upload
  width: 360px
  video
    display: block
    width: 360px
    background-color: #898995
    margin-bottom: 10px
    border-radius: 6px
  .upload-button
    margin-top: 10px
</style>
