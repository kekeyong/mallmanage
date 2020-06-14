<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread leave1="权限管理" leave2="权限列表"></my-bread>
    <el-row class="addrolebtn">
      <el-col>
        <el-button type="info">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table height="400px" :data="rolelist" style="width: 100%">
      <!-- 展开行 -->
      <el-table-column type="expand" label width="50">
        <template slot-scope="scope">
          <el-row v-for="(item1,i) in scope.row.children" :key="i">
            <!-- 一级权限 -->
            <el-col :span="4">
              <el-tag
                @close="deleRight(scope.row,item1.id)"
                type="success"
                closable
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>

            <el-col :span="20">
              <el-row v-for="(item2,i) in item1.children" :key="i">
                <!-- 二级权限 -->
                <el-col :span="4">
                  <el-tag
                    @close="deleRight(scope.row,item2.id)"
                    type="info"
                    closable
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <el-col :span="20">
                  <!-- 三级权限 -->
                  <el-tag
                    @close="deleRight(scope.row,item3.id)"
                    type="warning"
                    closable
                    v-for="(item3,i) in item2.children"
                    :key="i"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 无权限的提示 -->
          <span v-if="scope.row.children.length === 0">未分配权限</span>
        </template>
      </el-table-column>

      <el-table-column type="index" label="#" width="150"></el-table-column>

      <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>

      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>

      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
            @click="showSetRightDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改权限的对话框 -->
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
      <!-- 树形结构 -->
      <!-- 
        data->数据源[]
        show-checkbox -> 选择框
        node-key 每个节点的唯一标识，通常是data数据源中key名id
        default-expanded-keys 默认展开[要展开的节点的id] 使用default-expand-all也可以展开所有节点
        default-checked-keys【要选择节点的id】
        props 配置项{label,children}
        label 节点的文字标题和children节点的子节点
        值都来源于data绑定的数据源中的该数据的key名 ‘label’和‘children’
       -->
      <el-tree
        ref="tree"
        :data="treelist"
        show-checkbox
        node-key="id"
        :default-expanded-keys='arrexpand' 
        :default-checked-keys="arrcheck"
        :props="defaultProps">
      </el-tree>
      
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
      rolelist: [
        {
          children: [
            {
              authName: "商品管理",
              children: [
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                },
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                },
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                }
              ],
              id: "",
              path: ""
            },
            {
              authName: "商品管理",
              children: [
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                },
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                },
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                }
              ],
              id: "",
              path: ""
            },
            {
              authName: "商品管理",
              children: [
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                },
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                },
                {
                  authName: "商品列表",
                  children: [
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    },
                    {
                      authName: "添加商品",
                      id: "",
                      path: ""
                    }
                  ],
                  id: "",
                  path: ""
                }
              ],
              id: "",
              path: ""
            }
          ],
          id: "30",
          roleDesc: "技术负责人",
          roleName: "主管"
        },
        {
          children: "",
          id: "31",
          roleDesc: "测试角色描述",
          roleName: "测试角色"
        },
        {
          children: "",
          id: "31",
          roleDesc: "测试角色2描述",
          roleName: "测试角色2"
        },
        {
          children: "",
          id: "34",
          roleDesc: "超级管理员",
          roleName: "超级管理员"
        },
        { children: "", id: "30", roleDesc: "技术负责人", roleName: "主管" }
      ],

      //树形结构的数据
      treelist:[
        {
          id:101, 
          authName:'商品管理', 
          path:'goods', 
          pid:0, 
          children:[
            {
              id:104, 
              authName:'商品列表', 
              path:'goods', 
              pid:101, 
              children:[
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }
              ]
            },
                        {
              id:104, 
              authName:'商品列表', 
              path:'goods', 
              pid:101, 
              children:[
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }
              ]
            },
            {
              id:104, 
              authName:'商品列表', 
              path:'goods', 
              pid:101, 
              children:[
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }
              ]
            },
            {
              id:104, 
              authName:'商品列表', 
              path:'goods', 
              pid:101, 
              children:[
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }, 
                {
                  id:'',
                  authName:'添加商品',
                  path:'',
                  pid:'104'

                }
              ]
            }
          ]
        }
      ],
      defaultProps:{
        label:'authName',
        children:'children'
      },
      arrexpand:[],
      arrcheck:[],
      dialogFormVisibleRight: false,
      currRoleId:[] //当前角色id
    };
  },
  created() {
    //this.getRolelist();
  },
  methods: {
    //获取数据
    async getRolelist() {
      const res = this.$http.get(`roles`);
      console.log(res);
      this.rolelist = res.data.data;
    },

    //取消权限(删除权限)
    async deleRight(role, rightId) {
      // roleId 当前角色的id
      // rightId 要删除的权限id
      const res = await this.$http.delete(`roles/${roleId}/right/${rightId}`);
      console.log(res);

      //删除成功，返回200状态码 和 剩余角色的权限
      role.children = res.data.data; //将剩余角色赋值给children

      this.getRolelist();
    },
    //权限修改分配， 打开树形对话框
    async showSetRightDia(role) {
      
      console.log(role);
      
      //当前角色id 给currRoleId赋值
      this.currRoleId = role.id



      this.dialogFormVisibleRight = true;  //放在请求后面 这里是用来做测试

      // const res = await this.$http.get(`right/tree`)
      // console.log(res);
      // this.treelist = res.data.data

      //把所有权限的id放在一个数组中
      var arrtemp1 = []
      this.treelist.forEach((item1)=>{
        //一级权限id
        arrtemp1.push(item1.id)
        //二级权限id
        item1.children.forEach(item2=>{
          arrtemp1.push(item2.id)
          //三级权限id
          item2.children.forEach(item3=>{
            arrtemp1.push(item3.id)
          })
        })
      })
      console.log(arrtemp1);
      this.arrexpand = arrtemp1


      //获取当前角色的权限id
      let arrtemp2 = []
      //一级权限id
      role.children.forEach(item1 =>{
        //arrtemp2.push(item1.id)

        //二级权限id
        item1.children.forEach(item2 =>{
          //arrtemp2.push(item2.id)

          //三级权限id
          item2.children.forEach(item3 =>{
            arrtemp2.push(item3.id)
          })
        })

      })
      console.log(arrtemp2);
      
      this.arrcheck = arrtemp2
      
    },

    //发起请求修改权限
    /**
     * roleId 当前要修改权限的角色id
     * rids 树形节点中 所有全选和半选的label的id[]
     * 获取全选的id的数组 arr1 getCheckedKeys()
     * 
     * 获取半选的id的数据 arr2 getHalfCheckedKeys()
     * 
     */
    async setRoleRight(){  
      //获取全选的id的数组 arr1 getCheckedKeys()
      //1、给要操作的dom元素设置ref属性值
      //2、this.refs.ref属性值.js方法名
      var arr1 = this.$refs.tree.getCheckedKeys()
      //获取半选的id的数据 arr2 getHalfCheckedKeys()
      var arr2 = this.$refs.tree.getHalfCheckedKeys()
      //两个数组合并
      let arr = [...arr1,...arr2]

      console.log(arr);
      
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')}) 
      console.log(res);
      //更新视图
      this.getRolelist()
      //关闭对话框
      this.dialogFormVisibleRight = false
      
    }
  },

};
</script>
<style>
.addrolebtn {
  margin-top: 20px;
}
</style>