<template>
    <div>


        <!--Book-->
        <el-row v-loading="loading2" style="padding: 2%">



            <el-col v-for="i in books" :key="i.id"
                    :span="3"
                    style="padding: 1%;margin-right: 8px"
            >
                <el-badge :value="i.status"   :type="GetTypeUI(i.status)">
                    <el-card  :body-style="{'padding':'0px'}" shadow="hover">

                        <img :src="i.img_url" style="height: 180px;width: 100%">

                        <div style="padding: 3px;height: 40px;overflow: auto">
                            <el-link style="font-weight: bolder ;font-family: 隶书">{{i.title}}</el-link>
                            <el-link :underline="false" type="info">{{i.writer}}</el-link>

                        </div>

                    </el-card>
                </el-badge>
            </el-col>

            <center v-if="books.length==0" >
                <i class="el-icon-edit" style="margin-top: 10%;font-size: 50px;"></i>
                <span style="font-family: 楷体;font-size: 30px"> 空空如也</span>
            </center>


        </el-row>






    </div>
</template>

<script>
import request from "@/network/request";
    export default {
        name: "my",
        mounted(){
            this.loading2=true;
            request({
              url:'/my/book/get/all',
            }).then(resp=>{
                this.books = resp.data.items;
                this.loading2=false
            });


        },
        data:function () {
            return {
                loading2:false,
                books:[],
            }
        },
        methods:{
            GetTypeUI(status){
                console.log(status)
                switch (status) {
                    case "a在读":
                        return "primary";
                    case "b想读":
                        return "danger";
                    case "c读过":
                        return "success";
                }
            },
            GetStatusUI(status){
              if (status==1){
                  return 'success'
              }  else if(status==2){
                  return 'warning'
              }else{
                  return 'info'
              }
            },

        },
        computed:{


          }

    }
</script>

<style scoped>

</style>