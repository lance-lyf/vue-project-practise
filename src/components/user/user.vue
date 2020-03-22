<template>
  <el-card class="box-card">
    <el-breadcrumb class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col class="search-mgtop">
        <el-input placeholder="请输入内容" v-model="query" class="seach-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="邮箱"></el-table-column>
      <el-table-column prop="address" label="电话"></el-table-column>
      <el-table-column prop="address" label="创建时间"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      tableData: [
       
      ]
    };
  },
  created(){
      this.getUserList()
  },
  methods: {
      async getUserList(){
          const AUTH_TOKEN = localStorage.getItem('token')
          this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
          const res = await this.$http.get('users?query='+this.query+'&pagenum='+this.pagenum+'&pagesize='+this.pagesize)
      }
  }
};
</script>

<style>
.seach-input {
  width: 200px;
}
.search-mgtop {
  margin-top: 20px;
}
.box-card {
  height: 100%;
}
</style>