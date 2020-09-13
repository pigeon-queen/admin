<template>
  <div>
    <el-button :class="elClass" @click="trigger">
      <i class="el-icon-plus"></i>
      <input accept="image/*" type="file" style="display: none;" ref="upload" @change="upload">
      <el-progress
        :percentage="imgProgress"
        v-if="imgUploading"
        type="circle"
        :show-text="false"
        class="image-progress"
      >
      </el-progress>
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        fit="cover" class="image-preview" v-if="url"></el-image>
    </el-button>
    <el-button circle @click="remove">
      <i class="el-icon-delete" style="color: red"></i>
    </el-button>
  </div>
</template>

<script>
import {upload, UploadFile} from 'nerio-uploader'

export default {
  name: "ImageUpload",
  props: {
    value: String,
    elClass: {
      type: String,
      default: () => 'image-upload'
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
            if (!uploadFile.isImage()) {
              return false;
            }
            if (!uploadFile.notExceeding(10 * UploadFile.MB)) {
              uploadFile.invalidFileMessage = '图片大小不能超过10M';
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
.image-upload
  width: 128px
  height: 128px
  position: relative

.image-progress
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%

.image-preview
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 100%
  height: 100%
</style>
