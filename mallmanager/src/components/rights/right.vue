<template>
  <!-- 1、面包屑 -->
  <el-card>
    <my-bread leave1="权限管理" leave2="权限列表"></my-bread>

    <!-- 表格 -->
    <el-table :data="rightList" border style="width: 100%;margin-top:40px;" height="400px">
      <el-table-column type="index" prop="date" label="#" width="100"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>


      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      rightList: [
        {
          authName: "商品管理",
          path: "goods",
          level: "0"
        },
        {
          authName: "订单管理",
          path: "orders",
          level: "0"
        },
        {
          authName: "商品列表",
          path: "goods",
          level: "1"
        },
                {
          authName: "添加商品",
          path: "goods",
          level: "2"
        },
        {
          authName: "权限管理",
          path: "rights",
          level: "0"
        },
        {
          authName: "订单列表",
          path: "orders",
          level: "1"
        },
                {
          authName: "用户列表",
          path: "users",
          level: "1"
        },
                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        },                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        },                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        },                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        },                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        },                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        },                {
          authName: "用户角色",
          path: "roles",
          level: "1"
        }
      ]
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      // const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = this.$http.get(`right/list`);
      console.log(res);
      this.rightList = res.data.data;
    }
  }
};
</script>