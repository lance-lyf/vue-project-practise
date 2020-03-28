<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.png" alt="无法显示图片" />
          </div>
        </el-col>
        <el-col :span="20" class="middle">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <a class="login-out" href="#" @click.prevent="handleSignout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu class="el-menu-vertical-demo" :router="true">
          <!-- 1 -->
          <el-submenu :index="''+item1.order" v-for="(item1, i) in menus" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,i) in item1.children" :key="i">
              <i class="el-icon-location"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view>
              
          </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      menus: []
    }
  },  
  created(){
    this.getMenus();
  },
  methods: {
    handleSignout() {
      localStorage.clear()
      this.$message({
        message: "退出成功",
        type: "success"
      })
      this.$router.push({name:'login'})
    },
    async getMenus(){
      const res = await this.$http.get('menus')
      this.menus = res.data.data
      console.log(this.menus);
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.middle {
  text-align: center;
}
.login-out {
  text-decoration: none;
  line-height: 60px;
}
</style>