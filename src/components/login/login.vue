<template>
  <div class="login-wrap">
    <el-form label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin" class="login-btn" type="primary">提交</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {   
      const res = await this.$http.post("login", this.formdata);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status == 200) {
        //登录成功
        localStorage.setItem('token',data.token)
        this.$router.push({ name: "home" });
        this.$message({
          message: "登录成功",
          type: "success"
        });
      } else {
        this.$message.error("登录失败");
      }
    }
  }
};
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>