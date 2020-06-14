<template>
  <el-card>
    <my-bread leave1="数据统计" leave2="数据报表"></my-bread>

    <div id="main" style="width:600px;height:400px;"></div>
  </el-card>
</template>
<script>
var echarts = require("echarts")
export default {
  data(){
    return{
      
    }
  },
  created(){
    
  },
  mounted(){
    this.useEchart()
  },
  methods:{
    useEchart(){

      //先请求数据
      const res = this.$http.get(`reports/type/1`)
      console.log(res);
      let option2 = res.data.data
      //init
      var myChart = echarts.init(document.getElementById('main'))
      //option
      let option1 = {
        title:{
          text:"堆叠区域图"
        },
        tooltip:{
          trigger:"axis",
          axisPointer:{
            type:"cross",
            label:{
              backgroundColor:"#6a7985"
            }
          }
        },

        toolbox:{
          feature:{
            saveAsImage:{}
          }
        },
        grid:{
          left:"3%",
          right:"4%",
          bottom:"3%",
          containLabel:true

        }

      }

      let option = {...option1,...option2}
      //setOption
      myChart.setOptin(option)
    }
  }
}
</script>