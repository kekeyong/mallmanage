<template>
  <el-card>
    <!-- 1、面包屑 -->
    <my-bread leave1="商品管理" leave2="商品列表"></my-bread>
    <!-- 提示  el-alert -->
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon></el-alert>
    <!-- 进度条 -->
    <el-steps :active="1*active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- 最外层是el-form表单 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="form"
      style="height: 400px;overflow:auto"
    >
      <el-tabs v-model="active" tab-position="left" @click="tabChange">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
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
        </el-tab-pane>

        <el-tab-pane name="2" label="商品参数">
          <!-- 商品参数处理 显示的是选择了三级分类之后的参数-->
          <el-form-item :label="item1.attr_name" v-for="(item1,i) in arrDyparams" :key="i">
            <!-- 复选框组 -->
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox :label="item2" border v-for="(item2,i) in item1.attr_vals" :key="i"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="3" label="商品属性">
          <!-- 商品属性静态参数 -->
          <el-form-item v-for="(item1,i) in arrStaticparams" :key="i" :label="item1.attr_name">
            <el-input v-model="item1.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="5" label="商品内容">
          <!-- 商品内容 -->
          <el-form-item>
            <!-- 表单元素 -->
            <el-button type="primary" @click="addGoods">点我-添加商品</el-button>
            <!-- 富文本编辑器 -->
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {quillEditor} from 'vue-quill-editor' 

export default {
  components:{
    quillEditor
  },
  data() {
    return {
      active: "1",
      //添加商品的表单数据
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
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
      //动态参数数组
      arrDyparams: [
        {
          attr_id: 3077,
          attr_name: "版式",
          attr_sel: "many",
          attr_vals: ["aa", "ee", "adsa", "adsd", "fads"],
          attr_write: "list",
          cat_id: 6,
          delete_time: null
        }
      ],
      //静态参数的数据数组
      arrStaticparams: [
        {
          attr_id: 3068,
          attr_name: "主体-商品名称",
          attr_sel: "only",
          attr_vals: "TCL电视 55A950C",
          attr_write: "manual",
          cat_id: 6,
          delete_time: null
        },
        {
          attr_id: 3068,
          attr_name: "显示曲面",
          attr_sel: "only",
          attr_vals: "是",
          attr_write: "manual",
          cat_id: 6,
          delete_time: null
        }
      ],
      headers:{
        Authorization:localStorage.getItem('token')
      }
    };
  },
  created() {
    //this.getGoodCate()
  },
  methods: {
    //添加商品 发送请求
    async addGoods(){
      //goods_cat ->分类
      this.form.goods_cat = this.selectedOptions.join(',')
      //pics=[] {pic:? 图片的临时路径}

      //动态参数数组处理
      //使用map遍历+取值 放在一个新的数组中
      //attrs [{attr_id:?,attr_value:?]
      let arr1 = this.arrDyparams.map((item)=>{
        item.attr_id
        return {attr_id:item.attr_id,attr_value:attr_vals}
      })

      //静态参数数组处理
      //使用map遍历+取值 放在一个新的数组中
      //attrs [{attr_id:?,attr_value:?]
      let arr2 = this.arrStaticparams.map((item)=>{
        item.attr_id
        return {attr_id:item.attr_id,attr_value:attr_vals}
      })

      this.form.attrs=[...arr1,...arr2]

      //发送提交表单请求
      const res = await this.$http.post(`goods`,this.form)
    },
    //图片上传相关方法
    //file形参是当前操作的图片的相关信息
    handlePreview(file){

    },
    //移除上传图片
    handleRemove(file){
      //先获取该图片的索引   findIndex()遍历，把符合条件的index返回
      let index = this.form.pics.findIndex(item=>{
        item.pics === file.response.data.tmp_path
      })

      this.form.pics.splice(index,1)
    },
    //图片上传成功
    handleSuccess(file){
      //获取图片上传的临时路径
      this.form.pics.push({
        pics:file.data.tmp_path
      
      })
    },

    //点击不同的tabs触发该方法
    async tabChange() {
      //如果点击的是第二个tab 同时三级分类要有值
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          //提示 要先选择三级分类
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
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
      } else if (this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          //提示 要先选择三级分类
          this.$message.warning("请先选择商品的三级分类");
          return;
        }

        //或去静态参数的数据
        const res = await this.$http.get(
          `categorise/${this.selectedOptions[2]}/attributes?sel=only`
        );
        console.log(res);
        this.arrStaticparams = res.data.data;
      }
    },
    handleChange() {},

    //获取三级分类的信息
    // async getGoodCate(){
    //   const res = await this.$http.get(`categories?type=3`)
    //   this.options = res.data.data
    // }
  }
};
</script>
<style>
.alert {
  margin-top: 40px;
}
.ql-editor{
  min-height: 300px;
}
</style>