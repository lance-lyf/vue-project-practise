<template>
  <el-card>
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table max-height="600px" :data="roleList" style="width: 100%">
      <el-table-column type="expand" label="#" width="180">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                closable
                type="success"
                @close="deleteRight(scope.row,item1.id)"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    closable
                    type="danger"
                    @close="deleteRight(scope.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    v-for="(item3,i) in item2.children"
                    :key="i"
                    @close="deleteRight(scope.row,item3.id)"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :plain="true"
            icon="el-icon-edit"
            @click="showEditUserDia(scope.row)"
            circle
          ></el-button>
          <el-button
            size="mini"
            type="success"
            :plain="true"
            icon="el-icon-check"
            @click="showSetRightDia(scope.row)"
            circle
          ></el-button>
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
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="arrcheck"
        :props="defaultProps"
      ></el-tree>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
        <el-button type="primary" @click="setRoleRight">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roleList: [],
      treelist: [],
      arrcheck: [],
      roleId: '',
      dialogFormVisibleRight: false,
      arrexpand: [],
      defaultProps: {
        label: "authName",
        children: "children"
      }
    };
  },
  created() {
    this.getRolelist();
  },
  methods: {
    async getRolelist() {
      const res = await this.$http.get("roles");
      this.roleList = res.data.data;
    },
    async showSetRightDia(role) {
      this.roleId= role.id;
      let tempArr2 = [];
      role.children.forEach(element1 => {
        // tempArr2.push(element1.id);
        element1.children.forEach(element2 => {
          // tempArr2.push(element2.id);
          element2.children.forEach(element3 => {
             tempArr2.push(element3.id);
          });
        });
      });
      this.arrcheck = tempArr2;
      const res = await this.$http.get("rights/tree");
      this.treelist = res.data.data;
      this.dialogFormVisibleRight = true;
    },
    async deleteRight(role, rightId) {
      const res = await this.$http.delete(
        "roles/" + role.id + "/rights/" + rightId
      );
      role.children = res.data.data;
    },
    async setRoleRight(){
      let arr1 = this.$refs.tree.getCheckedKeys();
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      let arr = [...arr1,...arr2];
      this.dialogFormVisibleRight = false;
      const res = await this.$http.post('roles/'+this.roleId+'/rights',{
        rids:arr.join(',')
      })
       this.getRolelist();
    }
  }
};
</script>

<style>
.addrolebtn {
  margin-top: 20px;
}
</style>