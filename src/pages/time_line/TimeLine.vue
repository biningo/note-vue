<template>

    <div


    >

        <el-row style="margin-top: 1%;padding-left: 5%">

              <el-button @click="dialogVisible=true" type="success" round size="mini"><i class="el-icon-edit"></i>写日记</el-button>


        </el-row>

        <div
                v-loading="loading"
                element-loading-text="加载中"
                element-loading-spinner="el-icon-loading"
        >
<!--        写心情-->
        <el-drawer
                element-loading-spinner="el-icon-loading"
                v-loading="loading2"
                element-loading-text="发表中"
                style="padding: 4%"
                :visible.sync="dialogVisible"
                size="80%"
                direction="ttb"
                @close="Close"
        >
            <div style="padding: 1%">
                <el-button type="success" @click="FinishSave(id)">发表</el-button>
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
        <el-col :span="21">
        <el-timeline style="margin-left: 2%">
            <el-timeline-item  v-for="(v,index) in TimeLines"  :key="v.id" :timestamp="'Biningo      '+v.created_at.slice(0,16)" placement="top"  >



                       <makedown-show
                               style="border-top: #E4E7ED 2px solid"
                               background="#ffffff"
                               :mk-value="v.mkValue"></makedown-show>


                <el-link  @clikc="Edit(index)" type="primary" icon="el-icon-edit" style="margin-right: 1%">编辑</el-link>
                <el-link  @click="Delete(index)" type="primary" icon="el-icon-delet" style="margin-right: 1%">删除</el-link>

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
                loading2:false,
                loading:false,
                dialogVisible:false,
                currentPage:1,
                Total:1,
                mkValue:"",
                id:null,
                index:null,
                TimeLines:[]

            }
        },
        methods:{

            Edit(index){
                this.dialogVisible=true
                this.id =this.TimeLines[index].id
                this.mkValue = this.TimeLines[index].mkValue
                this.index = index
            },


            Delete(index){

                request({
                    url:'/time_line/delete',
                    params:{
                        id:this.TimeLines[index].id
                    }
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });


                    this.TimeLines.splice(index,1)
                    this.Total--;
                    if(this.Total%10===0){
                        this.handleCurrentChange(this.currentPage-1)
                    }

                })

            },

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


            FinishSave(id){
                var url="/time_line/update";
                if(id==null)
                    url="/time_line/add";

                this.mkValue = this.$refs.md.$data.d_value;
                this.loading2=true;
                request({
                    url:url,
                    method:"post",
                    data:{
                        username:"biningo",
                        mkValue:this.mkValue,
                        id:id
                    }
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });
                    if(id==null){
                        this.handleCurrentChange(1)

                    }else{
                        this.TimeLines[this.index] = resp.data.data
                    }
                    this.dialogVisible = false;
                    this.mkValue="";
                    this.id=null
                    this.index = null
                    this.loading2 = false
                }).catch(err=>{console.log(err)})

            },
            Close(){
                this.id=null
                this.index = null
            }





        }
    }
</script>

<style scoped>

</style>