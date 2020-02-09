<template>
    <div style="padding-left: 2%">

<!--面包导航-->
        <el-row style="margin-top: 1%;">

            <el-col :span="18">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item ><a >文件夹</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a >活动管理</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a>活动列表</a></el-breadcrumb-item>
                    <el-breadcrumb-item><a>活动列表</a></el-breadcrumb-item>

                </el-breadcrumb>
            </el-col>

            <el-col :span="6">
                <el-button type="primary"  round size="mini"><i class="el-icon-folder-add" style="margin-right: 4px"></i>新建</el-button>
                <el-button type="success" round size="mini"><i class="el-icon-document-add" style="margin-right: 4px"></i>新建笔记</el-button>

            </el-col>
        </el-row>

<!--查找过滤-->
<el-row style="margin-top: 1%">

    <el-col :span="4">
        <el-input
                clearable
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
                v-model="keywords">
        </el-input>
    </el-col>
    <el-col :span="10" style="padding-left: 4%">
        <el-radio-group v-model="filter"  size="medium">
            <el-radio-button label="时间升序"></el-radio-button>

        </el-radio-group>
        <el-link :underline="false" type="info" style="margin-left: 1%;" v-show="cancel" @click="filter=null"><i  class="el-icon-circle-close"></i></el-link>


    </el-col>
<el-col :span="4">
    <el-pagination
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="100">
    </el-pagination>
</el-col>
</el-row>



<!--        文件列表-->
        <el-row  style="margin-top: 2%;padding-left: 1%;padding-right: 5%">

<!--            目录-->
            <el-row  v-for="j in 3" :key="j" >


           <folder-list></folder-list>

            </el-row>

<!--            文件-->
            <el-row v-for="j in 10" :key="j">

<file-list></file-list>
            </el-row>

        </el-row>



    </div>
</template>

<script>

    import FolderList from "@/components/Folder";
    import FileList from "@/components/Article";
    export default {

        name: "files",
        data:function () {
            return{
                keywords:"",
                filter:null,

            }
        },
        computed:{
            cancel:function () {
                return this.filter!==null
            }
        },
        components:{
            FolderList,
            FileList,
        }


    }
</script>

<style scoped>

</style>