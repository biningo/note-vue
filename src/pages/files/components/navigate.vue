<template>
    <div  style="padding-top: 1%;"
          v-loading.fullscreen.lock="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"

    >
        <el-row>
        <el-col :span="18">

            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(n) in Nav" :key="n"> <el-button :class="{ 'el-icon-house':n=='Home'  }" size="mini" round  style="font-weight: bolder" @click="ChangeNav(n)">{{n}}</el-button></el-breadcrumb-item>
            </el-breadcrumb>



        </el-col>

        <el-col :span="6">
            <el-button type="primary"  round size="mini" @click="open('目录名称')"><i class="el-icon-folder-add" style="margin-right: 4px"></i>新建</el-button>
            <el-button type="success" round size="mini" @click="open('文章名称')"><i class="el-icon-document-add" style="margin-right: 4px"></i>新建笔记</el-button>

        </el-col>
        </el-row>
    </div>
</template>

<script>

    import request from "@/network/request";
    export default {
        name: "navigate",
        data:function(){
          return{
              Nav:[],
              loading:false
          }
        },
        methods:{
            open(title){


                this.$prompt(title, '创建', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.loading=true;
                    if (title==="目录名称"){

                        request({
                            url:"/folder/add",
                            params:{
                                title:value,
                                FolderTitle:this.Nav[this.Nav.length-1]
                            }
                        }).then(resp=>{
                            this.$message({
                                type: 'success',
                                message:resp.data.msg
                            });
                            this.loading=false;
                            this.$parent.$refs.FileList.FolderList.push(resp.data.data)


                        }).catch(err=>{
                            this.$message({
                                type: 'success',
                                message:err
                            });
                        })


                    }
                    else if (title==="文章名称"){
                        request({
                            method:'post',
                            url:"/article/add",
                            data:{
                                title:value,
                                folder_title:this.Nav[this.Nav.length-1]

                            }
                        }).then(resp=>{
                                this.$message({
                                    type:"success",
                                    message:resp.data.msg
                                });
                                this.loading=false;
                                //注意params传递数据要与name属性一起 不能与path一起
                            this.$router.push({
                                name:"write",
                                params:{
                                   article:resp.data.data
                                }
                            })

                        }).catch(err=>{console.log(err)})
                    }

                    this.$parent.$refs.FileList.Total++
                    if(this.$parent.$refs.FileList.currentPage<(Math.ceil(this.$parent.$refs.FileList.Total/13))){
                        this.$parent.$refs.FileList.handleCurrentChange(Math.ceil(this.$parent.$refs.FileList.Total/13))
                    }

                });



            },
            ChangeNav(title){
                this.loading=true;
                request({
                    url:"/folder/sub_file/"+1,
                    params:{
                        title:title,
                    }
                }).then(resp=>{

                   this.$parent.$refs.FileList.AccessFolder(resp.data.Folders,resp.data.Articles,resp.data.Nav.reverse(),resp.data.Total)
                   this.loading=false
                })
            }
        }
    }
</script>

<style scoped>

</style>