<template>
    <div  style="padding-top: 1%;">
        <el-row>
        <el-col :span="18">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item ><a >文件夹</a></el-breadcrumb-item>
                <el-breadcrumb-item><a >活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item><a>活动列表</a></el-breadcrumb-item>
                <el-breadcrumb-item><a>活动列表</a></el-breadcrumb-item>

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
        methods:{
            open(title){


                this.$prompt(title, '创建', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {

                    if (title==="目录名称"){

                        request({
                            url:"/folder/add",
                            params:{
                                title:value
                            }
                        }).then(resp=>{
                            this.$message({
                                type: 'success',
                                message:resp.data.msg
                            });

                            this.$parent.$refs.FileList.FolderList.push(resp.data.data)

                        }).catch(err=>{
                            this.$message({
                                type: 'success',
                                message:err
                            });
                        })


                    }


                });



            }
        }
    }
</script>

<style scoped>

</style>