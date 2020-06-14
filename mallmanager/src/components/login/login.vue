<template>
  <div class="login-wrap">
    <el-form 
    class="login-form"
    :label-position="top" 
    label-width="80px" 
    :model="formdata">
    <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button class="login-button" type="primary" @click.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
    data(){
        return{
            top:'top',
           formdata:{
               username:'',
               password:''
           } 
        }
    },
    methods:{
        handleLogin(){

                    this.$router.push({
                        name:'home'
                    })

 localStorage.setItem('token',"1231231231")
            // //发送登录请求
            // this.$http.post('login',this.formdata)
            // .then(res=>{
            //     console.log(res)

            // //对象的解构赋值
            //     const {
            //         data,
            //         meta:{msg,status}
            //     } = res.data

            //     if(status == 200){

            //         //登陆成功 保存 token 值
            //         localStorage.setItem('token',data.token)
            //         //登录成功 路由跳转  (编程式导航)
            //         this.$router.push({
            //             name:'home'
            //         })
            //         //提示成功信息
            //         this.$message.success('登录成功');
            //     }else{
            //         this.$message.error('用户名或者密码错误');
            //     }

            // }).catch(err=>{
            //     console.log(err)
            // })
        }


        /**用 async await 
        
        async handleLogin(){

            //发送登录请求
        const res = await this.$http.post('login',this.formdata)
           
                console.log(res)

            //对象的解构赋值
                const {
                    data,
                    meta:{msg,status}
                } = res.data

                if(status == 200){
                    //登录成功 路由跳转  (编程式导航)
                    this.$router.push({
                        path:'/home'
                    })
                    //提示成功信息
                    this.$message.success('登录成功');
                }else{
                    this.$message.error('用户名或者密码错误');
                }
        }
        */
    }

};
</script>
<style>
    .login-wrap{
        height: 100%;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form{
        background-color: #fff;
        width: 400px;
        border-radius: 5px;
        padding: 30px;
    }
    .login-wrap .login-button{
        width: 100%;
    }

</style>