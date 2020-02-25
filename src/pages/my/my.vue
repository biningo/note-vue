<template>
    <div>

<!--        Mood   -->
        <el-row v-loading="loading1" style="padding-left: 2%">
            <el-col :span="18" >

<!--                分页-->
                <el-row style="text-align: center">
                    <el-pagination
                            :page-size="20"
                            :current-page="currentPage"
                            layout="prev, pager, next"
                            @current-change="handleCurrentChange"
                            :total="Total">
                    </el-pagination>
                </el-row>


                <!--moods数据-->
            <el-row style="margin-right: 3%">
                <el-alert

                        style="box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);;margin: 1%"
                        v-for="i in moods"
                        :key="i"
                        :closable="false"
                        :title="i.content+'     -----⏱'+i.created_at"
                        :type="GetStatusUI(i.status)"
                >

                </el-alert>
            </el-row>



            </el-col>


            <el-col :span="6" style="margin-top: 1%">
                <el-card shadow="hover" style="background: lightgoldenrodyellow;height: 665px">

                </el-card>
            </el-col>



        </el-row>


        <!--Book-->
        <el-row v-loading="loading2">
        <el-row style="margin-bottom: 1%;margin-top: 2%">
            <el-divider>  <i style="font-size: 30px;" class="el-icon-collection">MyBook</i></el-divider>
        </el-row>
            <el-row style="margin-right: 3%;box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);">
                <el-col v-for="i in books" :key="i.id"
                                        :span="3"
                                        style="padding: 1%;"
                >
                    <el-badge :value="i.status" >
                    <el-card  :body-style="{'padding':'0px'}" shadow="hover">

                    <img :src="i.img_url" style="height: 180px;width: 100%">

                        <div style="padding: 3px;height: 40px;overflow: auto">
                        <el-link style="font-weight: bolder ;font-family: 隶书">{{i.title}}</el-link>
                        <el-link :underline="false" type="info">{{i.writer}}</el-link>

                        </div>

                    </el-card>
                    </el-badge>
                </el-col>

            </el-row>

                <el-row>
                    <center>
                        <audio  autoplay="autoplay" loop="loop" preload="auto" controls="controls"
                                src="../../assets/ma.mp3">
                        </audio>
                    </center>
                </el-row>
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
            this.loading1=true;
            request({
                url:'/my/mood/get/many/1'
            }).then(resp=>{
                this.moods = resp.data.items;
                this.Total = resp.data.total;
                this.loading1=false;
            })
        },
        data:function () {
            return {
                loading1:false,
                loading2:false,
                moods:[],
                books:[],
                currentPage:1,
                Total:1,
            }
        },
        methods:{
            GetStatusUI(status){
              if (status==1){
                  return 'success'
              }  else if(status==2){
                  return 'warning'
              }else{
                  return 'info'
              }
            },
            handleCurrentChange(val){
                this.currentPage = val;
                this.loading1 = true;
                request({
                    url:'/my/mood/get/many/'+val
                }).then(resp=>{
                    this.moods = resp.data.items;
                    this.Total = resp.data.total;
                    this.loading1=false;
                })
            }
        },
        computed:{


          }

    }
</script>

<style scoped>

</style>