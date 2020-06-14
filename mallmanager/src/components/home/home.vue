<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="./../../assets/logo.png" alt="无法显示图片" class="img_logo" />
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>电商后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="loginout" @click.prevent="handleSignout" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧边栏导航 -->
        <!-- 开启路由模式 -->
        <el-menu :unique-opened="true" :router="true">
          <!-- 用户管理 -->
          <el-submenu :index="' '+item1.order" v-for="(item1,index) in menus" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path" v-for="(item2,index) in item1.children" :key="index">
              <i class="el-icon-circle-check"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>


        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  //获取token
  /**
   *           <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="role">
              <i class="el-icon-circle-check"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-circle-check"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-circle-check"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-circle-check"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-circle-check"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-circle-check"></i>
              <span>选项订单列表一</span>
            </el-menu-item>
          </el-submenu>

          <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-circle-check"></i>
              <span>数据列表</span>
            </el-menu-item>
          </el-submenu>
   */
  //有token 继续渲染组件
  // 没有token 跳转到登录页
  data() {
    return {
      menus:[
        {
          id:125,
          authName:'用户管理',
          path:'users',
          order:1,
          children:[
            {
              id:110,
              authName:'用户列表',
              path:'users',
              order:null,
              children:[]
            }
          ]
        },
        {
          id:103,
          authName:'权限管理',
          path:'rights',
          order:2,
          children:[
            {
              id:110,
              authName:'角色列表',
              path:'rights',
              order:null,
              children:[]
            },
            {
              id:110,
              authName:'权限列表',
              path:'roles',
              order:null,
              children:[]
            }
          ]
        }, 
        {
          id:101,
          authName:'商品管理',
          path:'goods',
          order:3,
          children:[
            {
              id:110,
              authName:'商品列表',
              path:'goods',
              order:null,
              children:[]
            },
            {
              id:110,
              authName:'分类参数',
              path:'params',
              order:null,
              children:[]
            },
            {
              id:110,
              authName:'商品分类',
              path:'categories',
              order:null,
              children:[]
            }
          ]
        },      
        {
          id:102,
          authName:'订单管理',
          path:'orders',
          order:4,
          children:[
            {
              id:110,
              authName:'订单列表',
              path:'orders',
              order:null,
              children:[]
            }
          ]
        },
        {
          id:145,
          authName:'数据统计',
          path:'reports',
          order:5,
          children:[
                        {
              id:110,
              authName:'数据列表',
              path:'reports',
              order:null,
              children:[]
            },

          ]
        }
      ]
    };
  },

  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({
        name: "login"
      });
    }
  },
  created(){
    //this.getMenus()
  },
  methods: {
    //获取导航数据
    // async getMenus(){
    //   const res = await this.$http.get(`menus`)
    //   console.log(res);
    //   this.menus = res.data.data
      
    // },
    handleSignout() {
      // 清除token
      localStorage.clear();
      //提示
      this.$message.success("退出成功");
      //来到login组件
      this.$router.push({
        name: "login"
      });
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
/* 头部样式 */
.middle {
  text-align: center;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
.img_logo {
  width: 200px;
  height: 60px;
}
</style>