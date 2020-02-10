<template>
    <div>
        <el-row  style="padding-top: 2%;padding-left: 1%;padding-right: 5%">

            <!--            目录-->
            <folder v-for="j in FolderList" :key="j.id" :folder-info="j" ></folder>
            <!--            文件-->
          <my-article v-for="j in FileList" :key="j.id" :file-info="j"></my-article>


        </el-row>
    </div>
</template>

<script>
    import Folder from "@/components/Folder";
    import MyArticle from "@/components/MyArticle";
    export default {
        name: "file-list",
        data:function () {
            return {
                FolderList:[],
                FileList:[]
            }
        },
        components:{
            Folder,
            MyArticle
        },
    }
</script>

<style scoped>

</style>