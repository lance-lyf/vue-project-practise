<template>
  <el-card class="box-card">
    <el-breadcrumb class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col class="search-mgtop">
        <el-input
          placeholder="请输入内容"
          v-model="query"
          class="seach-input"
          clearable
          @clear="getUserList"
        >
          <el-button slot="append" @click="searchUser" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" @click="dialogFormVisibleAdd=true">添加用户</el-button>
        <!-- add userlist dialog -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
          <el-form :model="form">
            <el-form-item label="用户名" label-width="100px">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密　码" label-width="100px">
              <el-input v-model="form.password" type="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮　箱" label-width="100px">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电　话" label-width="100px">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="addUserData">确 定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
    <el-table max-height="200px" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
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
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :plain="true"
            icon="el-icon-edit"
            @click="showEditUserDia(scope.row.id)"
            circle
          ></el-button>
          <el-button size="mini" type="success" :plain="true" icon="el-icon-check" circle></el-button>
          <el-button
            size="mini"
            type="danger"
            :plain="true"
            icon="el-icon-delete"
            @click="showDeleUserMsBox(scope.row.id)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- edit userlist dialog -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px" :disabled="true">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮　箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电　话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleEdit = false" >确 定</el-button>
      </div>
    </el-dialog>
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
      total: -1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
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
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
      console.log(`当前页: ${val}`);
    },
    searchUser() {
      this.getUserList();
    },
    async addUserData() {
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post("users", {
        username: this.form.username,
        password: this.form.password,
        email: this.form.email,
        mobile: this.form.mobile
      });
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        //1,提示成功
        this.$message.success(msg);
        //2,更新视图
        this.getUserList();
        //3,清空文本框
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = "";
          }
        }
      } else {
        this.$message.warning(msg);
      }
    },
    showDeleUserMsBox(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete("users/" + id);
          if (res.status == 200) {
            this.getUserList();
            this.pagenum = 1;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    showEditUserDia(id){
      this.dialogFormVisibleEdit = true;
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