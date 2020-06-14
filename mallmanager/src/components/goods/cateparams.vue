<template>
  <el-card>
    <!-- 1、面包屑 -->
    <my-bread leave1="商品管理" leave2="分类参数"></my-bread>
    <el-alert class="alert" title="只允许为第三级分类设置参数" type="error"></el-alert>
    <!-- 级联选择器 -->
    <el-form style="margin-top:20px;">
      <el-form-item label="商品分类">
        <!-- 级联选择器 -->
        <el-cascader
          expand-trigger="hover"
          clearable
          :options="options"
          v-model="selectedOptions"
          :props="defaultProp"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>

    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="1">
        <!-- 动态参数 -->
        <el-button type="danger">设置动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrDyparams" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <!-- el-tag -->
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name,tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row.attr_vals)"
                @blur="handleInputConfirm(scope.row.attr_vals)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>

          <el-table-column label="属性名称" prop="name">
            <le-tag></le-tag>
          </el-table-column>

          <el-table-column label="操作" prop="desc">
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
      </el-tab-pane>

      <el-tab-pane label="配置管理" name="2">静态参数</el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      // 级联选择器要用的数据
      options: [
        {
          cat_deleted: false,
          cat_id: 1,
          cat_level: 0,
          cat_name: "大家电",
          cat_pid: 0,
          children: [
            {
              cat_deleted: false,
              cat_id: 3,
              cat_level: 1,
              cat_name: "电视",
              cat_pid: 1,
              children: [
                {
                  cat_deleted: "",
                  cat_id: 6,
                  cat_level: "",
                  cat_name: "曲面电视",
                  cat_pid: 3
                }
              ]
            }
          ]
        },
        {
          cat_deleted: "",
          cat_id: 2,
          cat_level: "",
          cat_name: "大家电",
          cat_pid: 4,
          children: [
            {
              cat_deleted: "",
              cat_id: 4,
              cat_level: "",
              cat_name: "冰箱",
              cat_pid: 8,
              children: [
                {
                  cat_deleted: "",
                  cat_id: 8,
                  cat_level: "",
                  cat_name: "小冰箱",
                  cat_pid: 11
                }
              ]
            }
          ]
        }
      ],
      selectedOptions: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      active: "1",
      //动态参数数组
      arrDyparams: [],
      list: [],
      inputValue:'',
      inputVisible:false,
      //静态参数数组
      attrSatticparams:[]
      
    };
  },
  methods: {
    //点击X按钮
    async handleClose(attr_vals,attr_id,attr_name,tag) {
      attr_vals.splice(attr_vals.indexOf(tag), 1);

      //发送请求 删除或者增加参数
      let putData = {
        attr_name:attr_name,
        attr_sel:'many',
        attr_vals:attr_vals.join(",")

      }
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attr_id}`,putData)
      console.log(res);
      
    },
    //点击newTag按钮
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //回车 或者失去焦点时
    handleInputConfirm(attr_vals) {
      let inputValue = this.inputValue;
      if (inputValue) {
      attr_vals.push(inputValue);
      }
        this.inputVisible = false;
        this.inputValue = '';
    },

    //tabs切换触发方法
    handleClick() {
      if(this.active === "2"){
        if(this.selectedOptions.length === 3){
          //发送请求获取静态参数
          const res = this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          this.attrSatticparams = res.data.data
        }
      }
    },
    //选择三级参数触发
    async handleChange() {
      if (this.selectedOptions.length === 3) {
        //发送请求获取商品的分类动态参数
        const res = await this.$http.get(
          `categorise/${this.selectedOptions[2]}/attributes?sel=many`
        );
        console.log(res);
        this.arrDyparams = res.data.data;

        this.arrDyparams.forEach(item => {
          //item.attr_vals = item.attr_vals.trim().split(',')

          //判断attr_vals是否有值
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(",");
        });
      }
    }
  }
};
</script>
<style scoped>
.alert {
  margin-top: 20px;
}
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>