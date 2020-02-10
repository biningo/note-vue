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
    export default {
        name: "navigate",
        methods:{
            open(title){


                this.$prompt(title, '名称', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message:value
                    });
                });



            }
        }
    }
</script>

<style scoped>

</style>