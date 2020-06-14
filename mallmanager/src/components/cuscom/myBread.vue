<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{leave1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{leave2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
  name:'my-bread',
  //
  props:['leave1','leave2'],
  data(){
    return{

    }
  }
}
</script>