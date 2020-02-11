<template>
    <div >
        <el-row  v-loading="loading" style="padding-top: 2%;padding-left: 1%;padding-right: 5%">

            <!--            目录-->
            <folder  @AccessFolder="AccessFolder" @Delete="Delete" v-for="j in FolderList" :key="j.id" :folder-info="j"></folder>
            <!--            文件-->
            <my-article v-for="j in ArticleList" :key="j.id" :article-info="j"></my-article>


        </el-row>
    </div>
</template>

<script>
    import Folder from "@/components/Folder";
    import MyArticle from "@/components/MyArticle";
    import request from "@/network/request";

    export default {
        name: "file-list",
        data: function () {
            return {
                loading:false,
                FolderList: [],
                ArticleList: [],
                Nav:[]
            }
        },
        mounted() {
            this.loading=true;
            request({
                url:"/folder/sub_file/"+1,
                params:{
                    title:"Home"
                }
            }).then(resp=>{
                this.FolderList=resp.data.Folders;
                this.ArticleList=resp.data.Articles;
                this.loading=false;
                this.$parent.$refs.navigate.$data.Nav=resp.data.Nav.reverse()


            }).catch(err=>{console.log(err)});
            console.log("OK")
        },
        methods:{
            Delete(id) {
                for(var i=0;i<this.FolderList.length;i++){
                    if(this.FolderList[i].id==id){
                        this.FolderList.splice(i,1)
                    }
                }
            },

            AccessFolder(FolderList,nav){
                this.FolderList=FolderList;
                this.$parent.$refs.navigate.Nav=nav;

            }
        },
        components: {
            Folder,
            MyArticle
        },
    }
</script>

<style scoped>

</style>