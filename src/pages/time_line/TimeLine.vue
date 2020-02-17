<template>

    <div

            v-loading="loading"
         element-loading-text="发表中"
         element-loading-spinner="el-icon-loading"
    >

        <el-row style="margin-top: 1%;padding-left: 5%">

              <el-button @click="dialogVisible=true" type="success" round size="mini"><i class="el-icon-edit"></i>写日记</el-button>


        </el-row>

<!--        写心情-->
        <el-drawer

                style="padding: 4%"
                :visible.sync="dialogVisible"
                size="80%"
                direction="ttb"

        >
            <div style="padding: 1%">
                <el-button type="success" @click="FinishSave">发表</el-button>
            </div>
            <div style="padding-left: 2%;padding-right: 2%;">
            <mavon-editor
                     @imgAdd="ImgAdd"
                     @imgDel="ImgDel"
                     v-model="mkValue"
                          ref="md"

            />
            </div>

        </el-drawer>



<el-row style="margin-top: 1%;padding-left: 1%">
        <el-col :span="20">
        <el-timeline>
            <el-timeline-item style="margin-bottom: 3%;" v-for="v in TimeLines"  :key="v.id" :timestamp="v.created_at.slice(0,16)" placement="top"  color="deepskyblue">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>Biningo
                   <el-card >
                       <makedown-show
                               background="#ffffff"
                               :mk-value="v.mkValue"></makedown-show>

                   </el-card>
            </el-timeline-item>

        </el-timeline>
        </el-col>
</el-row>


<!--        分页-->
        <el-row >

            <el-pagination
                    :hide-on-single-page="true"

                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="Total">
            </el-pagination>

        </el-row>

    </div>
</template>

<script>
    import request from "@/network/request";
    import MakedownShow from "@/components/makedownShow";
    // import MakedownShow from "@/components/makedownShow";
    export default {
        name: "TimeLine",
        components: {MakedownShow},
        mounted(){

            this.loading = true;
            request({
                url:"/time_line/all/"+this.currentPage,
            }).then(resp=>{
                this.Total = resp.data.total;
                this.TimeLines = resp.data.items;
                this.loading = false
            });

        },
        data:function () {
            return {

                loading:false,
                dialogVisible:false,
                currentPage:1,
                Total:1,
                mkValue:"",

                TimeLines:[]

            }
        },
        methods:{


            //图片上传七牛云 图片名字唯一
            ImgAdd(pos,imgfile){
                console.log(imgfile); //防止报错
                let data = new FormData();
                data.append('img', imgfile);
                this.loading=true;
                request({
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    method: 'post',
                    url:"/qiniu/img_upload",
                    data:data
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });

                    this.$refs.md.$img2Url(pos,resp.data.data);
                    this.loading=false

                }).catch(err=>{
                    this.$message({
                        type:"error",
                        message:err
                    })
                })
            },

            //图片从七牛云删除
            ImgDel(file){
                this.loading=true;
                request({
                    url:"/qiniu/img_delete",
                    params:{
                        img_name:file[1].name
                    }
                }).then(resp=>{
                    if(resp.data.code==500){
                        this.$message({
                            type:"error",
                            message:resp.data.msg
                        })
                    }else{
                        this.$message({
                            type:"success",
                            message:resp.data.msg
                        })
                    }

                    this.loading=false
                })
            },

            FinishSave(){
                this.loading=true;
                this.mkValue = this.$refs.md.$data.d_value
                request({
                    url:"/time_line/add",
                    method:"post",
                    data:{
                        username:"biningo",
                        mkValue:this.mkValue
                    }
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });

                    this.handleCurrentChange(1);
                    this.dialogVisible = false
                    this.mkValue=""
                }).catch(err=>{console.log(err)})

            },


            handleCurrentChange(val) {

                this.currentPage = val;
                this.loading = true;
                request({
                    url:"/time_line/all/"+this.currentPage,
                }).then(resp=>{
                    this.Total = resp.data.total;
                    this.TimeLines = resp.data.items;
                    this.loading = false
                })
            },


        }
    }
</script>

<style scoped>

</style>