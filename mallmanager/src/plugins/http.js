//插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue, options)=>{

    axios.defaults.baseURL = 'http://localhost:8888/api/'  //设置一个基础url地址，后续请求地址在此基础上进行拼接
   
    // 在请求发起之前 设置头部

    /**在请求发起之前会先来到下面的拦截器函数 */
    // 添加请求拦截器
    axios.interceptors.request.use(function(config){
        //在发请求之前做什么
        console.log(config)
        
        //判断 如果该请求不是登录请求则需要设置请求头，反之则不需要
        if(config.url !=='login'){
            const AUTH_TOKEN = localStorage.getItem('token')
            config.headers['Authorization'] = AUTH_TOKEN
        }

        return config
    },function(error){
        //对请求错误做些什么

        return Promise.reject(error)
    });

    //添加响应拦截器
    axios.interceptors.response.use(function(response){
        //对响应数据做什么

        return response
    },function(error){
        //对响应错误做些什么

        return Promise.reject(error)
    })


    // const AUTH_TOKEN = localStorage.getItem('token')
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
    // 添加实例方法
    Vue.prototype.$http = axios
}

export default MyHttpServer