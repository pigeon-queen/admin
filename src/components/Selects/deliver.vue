<template>
  <div>
    <el-dialog :visible.sync="dialogV">
      <el-form ref="form"  label-width="128px" >

      <el-form-item label="快递公司*" >
        <el-select v-model="typeV"
                   filterable
                   reserve-keyword
                   placeholder="请选择">
          <el-option
            v-for="item in delivers"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单号*" >
        <el-input v-model="valueV" placeholder="请输入单号"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit()">确定</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {delivers} from "@/api/metas";

export default {
  name: "deliverSelect",
  props: {
    value: String,
    type: String,
    dialog: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      delivers: []
    }
  },
  methods: {
    loadDelivers(){
      delivers().then(res => this.delivers = res.data)
    },
    submit(){
      this.$emit('submit', this.valueV, this.typeV)
    }
  },
  mounted() {
    this.loadDelivers()
  },
  computed: {
    dialogV: {
      get(){
        return this.dialog
      },
      set(v) {
        this.$emit('update:dialog', v)
      }
    },
    typeV: {
      get(){
        return this.type
      },
      set(v) {
        this.$emit('update:type', v)
      }
    },
    valueV: {
      get(){
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  }
}
</script>

<style scoped>

</style>
