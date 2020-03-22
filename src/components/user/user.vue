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
      <el-table-column prop="role_name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="create_time" label="创建时间">
        <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template>
          <el-button size="mini" type="primary" plain="true" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" type="success" plain="true" icon="el-icon-check" circle></el-button>
          <el-button size="mini" type="danger" plain="true" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
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
      tableData: [],
      total: -1
      //分页
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        "users?query=" +
          this.query +
          "&pagenum=" +
          this.pagenum +
          "&pagesize=" +
          this.pagesize
      );
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        //1.给表格数据赋值
        this.tableData = users;
        //2.给total赋值
        this.total = total;
        //3.提示
        this.$message.success(msg);
        //提示
      } else {
        this.$message.warning(msg);
      }
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