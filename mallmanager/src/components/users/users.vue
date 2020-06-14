<template>
  <el-card class="box-card">
    <!-- 1、面包屑 -->

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2、搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadUserList"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="inputSerach"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3、表格 -->
    <el-table height="400px" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="80"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>

      <el-table-column prop="create_time" label="创建时间">
        <!-- 如果单元格内显示的内容不是字符串（文本），需要给被显示的内容外层包裹一个template -->
        <!-- 
              template内部要用数据，需要设置slot-scope属性
              该属性的属性值是要用数据的数据源

              比如：slot-scope的属性值其实就是el-table绑定的数据 userlist
              userlist.row->数组中的每个对象
        -->
        <template slot-scope="scope">{{scope.row.create_time|fmtdate}}</template>
      </el-table-column>

      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeMgState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleUserMsgBox(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showSetUserRoleDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <!-- 
        1、@size-change:每页显示条数变化时触发
        2、@current-change:当前页改变时触发
        3、:current-page  设置当前页是第几页
        4、:page-sizes:[2,4,6,8]每页显示多少条数据
        5、page-size  设置每页显示多少条
        6、total 数据总数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密 码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电 话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="AddUser">确 定</el-button>
      </div>
    </el-dialog>

    <!--点击编辑 弹出的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="*用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮 箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电 话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" style="color:green;">
          {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option :label="item.roleName" :value="item.id" v-for="(item,index) in roles_test" :key="index"></el-option>
          </el-select>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      //表格绑定数据
      userlist: [],
      //分页相关的数据
      total: 18,
      pagenum: 1,
      pagesize: 2,

      /**
       * username:'admin'
       * email:'admin@qq.com
       * mobile:'15078453124'
       * create_time:1234324
       * mg_state:true
       * id:500
       * role_name:'主管'
       */
      tableData: [
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: true,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: false,
          id: 500,
          role_name: "主管"
        },
        {
          username: "admin",
          email: "admin@qq.com",
          mobile: "15078453124",
          create_time: 1234324,
          mg_state: true,
          id: 500,
          role_name: "主管"
        }
      ],

      //添加对话框的属性
      dialogFormVisibleAdd: false,
      //添加用户表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "100px",

      //编辑对话框的属性值 显示或隐藏
      dialogFormVisibleEdit: false,

      currUserId: "",
      //分配角色对话框属性值
      dialogFormVisibleRol:false,
      currRoleId:"",
      currUsername:'',
      //保存所有的角色数据
      roles:[],

      //测试数据
      roles_test:[
        {id:30,roleName:'主管',roleDesc:'技术负责人'},
        {id:31,roleName:'测试角色',roleDesc:'测试角色'},
        {id:34,roleName:'测试角色2',roleDesc:'测试角色2'},
        {id:39,roleName:'超级管理员',roleDesc:'超级管理员'},
        {id:40,roleName:'test'}
      ]
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //分配或修改用户角色 发送请求
    async setRole(){
      
      const res = await this.$http.put(`users/${this.currUserId}/role`,{
        rid:this.currRoleId
      })
      console.log(res);

      this.dialogFormVisibleRol = false
      
    },
    //分配用户角色 -打开对话框
    async showSetUserRoleDia(user) {
      this.currUsername = user.username
      //打开对话框给currUserId赋值
      this.currUserId = user.id
      this.dialogFormVisibleRol = true
      //获取所有的角色
      const res1 = await this.$http.get('roles')
      console.log(res1);
      this.roles = res1.data.data
      //获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      console.log(res)
      this.currRoleId = res.data.data.rid

      this.currUsername = user.username

      

    },
    //修改用户状态
    async changeMgState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(res);
    },
    //编辑用户 -发送请求
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      console.log(res);
      this.dialogFormVisibleEdit = false;
      this.getUserList();
    },
    //编辑用户 显示对话框
    showEditUserDia(user) {
      console.log(user);
      this.form = user;
      this.dialogFormVisibleEdit = true;
    },
    //点击删除按钮 弹出一个消息盒子
    showDeleUserMsgBox(userId) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //发送删除请求
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);

          if (res.data.meta.status == 200) {
            //更新视图 请求
            this.pagenum = 1; //默认视图更新时显示第一页数据
            this.getUserList();
            //提示
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
    //点击确定添加用户 异步写法 async await
    async AddUser() {
      //关闭对话框
      this.dialogFormVisibleAdd = false;
      //发送post请求
      const res = await this.$http.post("users", this.form);
      console.log(res);

      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status == 201) {
        this.$message.success(msg);
        //更新视图
        this.getUserList();
        //清空对话框内容(文本框)
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    //显示对话框
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    //清空搜索框从新获取数据
    loadUserList() {
      this.getUserList();
    },
    //搜索用户
    searchUser() {
      console.log("222");
      //点击搜索发请求
      this.getUserList();
    },
    //分页的相关方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);

      this.pagesize = val; //每页显示多少条数据
      this.pagenum = 1; // 从第一页显示
      //重新获取数据
      this.getUserList();
    },

    //切换页码触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    //获取用户列表的请求
    getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      //设置请求头 Authorization字段，提供token令牌
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
        )
        .then(res => {
          //query,pagenum,pagesize
          console.log(res);
          const {
            meta: { status, msg },
            data: { users, total }
          } = res.data;

          if (status == 200) {
            //1、给表格数据赋值
            this.userlist = users;
            //2、给total赋值
            this.total = total;
            //3、提示
            this.$message.success(msg);
          } else {
            //提示
            this.$message.warning(msg);
          }
        });
    }
  }
};
</script>
<style>
.box-card {
  height: 100%;
}
.inputSerach {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>