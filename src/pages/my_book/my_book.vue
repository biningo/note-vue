<template>
    <div>

        <el-row style="padding-left: 2%">
            <el-col :span="18" >
            <el-row style="margin-right: 3%">
                <el-alert

                        style="box-shadow: 0 5px 12px 0 rgba(0, 0, 0, 0.2);;margin: 1%"
                        v-for="i in 10"
                        :key="i"
                        :closable="false"
                        title="🎈成功 成功提示的文案成功提示的文案成功提示的文案 成功提示的文案成功提示的文案成功提示的文案 成功提示的文案成功提示的文案成功提示的文案 成功提示的文案成功提示的文案成功提示的文"
                        :type="i%2==0?'success':'info'"
                >

                </el-alert>
            </el-row>
            <el-row style="text-align: center">
                <el-pagination
                        :page-size="20"
                        :pager-count="11"
                        layout="prev, pager, next"
                        :total="1000">
                </el-pagination>
            </el-row>
            </el-col>


            <el-col :span="6" style="margin-top: 1%">
                <el-card shadow="hover" style="background: lightgoldenrodyellow;height: 668px">

                </el-card>
            </el-col>



        </el-row>



<el-row>
<el-row style="margin-bottom: 1%;margin-top: 2%">
    <el-divider>  <i style="font-size: 30px;" class="el-icon-collection">MyBook</i></el-divider>
</el-row>
    <el-row style="margin-right: 3%;box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2);">
        <el-col v-for="i in 10" :key="i"
                                :span="3"
                                style="padding: 1%;"
        >
            <el-badge value="在读" >
            <el-card  :body-style="{'padding':'0px'}" shadow="hover">

            <img src="https://img1.doubanio.com/view/subject/s/public/s29195878.jpg" style="height: 180px;width: 100%">

                <div style="padding: 3px;height: 40px">
                <el-link style="font-weight: bolder ;font-family: 隶书">深入理解计算机系统（原书第3版）</el-link>
                <el-link :underline="false" type="info">Randal E.Bryant</el-link>

                </div>
                <el-progress :text-inside="true"  :status="status" :percentage="percentage" ></el-progress>
            </el-card>
            </el-badge>
        </el-col>
        <el-col v-for="i in 10" :key="i+10"
                :span="3"
                style="padding: 1%;"
        >
            <el-card  :body-style="{'padding':'0px'}" shadow="hover">

                <img src="https://img1.doubanio.com/view/subject/s/public/s29195878.jpg" style="height: 180px;width: 100%">

                <div style="padding: 3px;height: 40px">
                    <el-tooltip content="深入理解计算机系统（原书第3版）深入理解计算机系统（原书第3版）深入理解计算机系统（原书第3版）" placement="top" >
                    <el-link style="font-weight: bolder ;font-family: 隶书" >深入理解计算机系统...</el-link>
                    </el-tooltip>
                        <el-link :underline="false" type="info">Randal E.Bryant</el-link>

                </div>
                <el-progress :text-inside="true"  :status="status" :percentage="percentage" ></el-progress>
            </el-card>

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


        <el-row>




        </el-row>



    </div>
</template>

<script>

    export default {
        name: "my_book",
        mounted(){

        },
        data:function () {
            return {

                percentage:100,
            }
        },

        computed:{
            status(){
                if(this.percentage<30){
                    return 'exception'
                }else if(this.percentage<100){
                    return 'warning'
                }else{
                    return 'success'
                }
            }
        }
    }
</script>

<style scoped>

</style>