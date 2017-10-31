<template>
  <el-form ref="form" :model="form" label-width="200px" style="width:80%; margin:auto">

    <el-form-item label="選擇收付銀行(Bank)">
      <el-select v-model="bank" placeholder="請選擇收付銀行">
        <el-option label="808 玉山銀行" value="808"></el-option>
        <el-option label="007 第一銀行" value="007"></el-option>
        <el-option label="001 彰化銀行" value="001"></el-option>
        <el-option label="712 中國信託" value="712"></el-option>
        <el-option label="000 測試銀行" value="000"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="收付授權碼(Auth Code)">
      <el-input v-model="auth"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Activate</el-button>
      <el-button @click="bye">Stop</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  props:{
    auth: String,
    bank: String,
    enable: Number,
  },

  methods: {
    onSubmit() {
      this.$message('Bank updated and activated');
    },
    bye() {
      this.$message('Payment canceled');
    },
  }
}
</script>
