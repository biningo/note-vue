<template>
    <div >
        <el-row  v-loading="loading"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"

                 style="padding-left: 1%;padding-right: 5%">


<el-row style="margin-left: 80%;">
            <el-pagination

                    :hide-on-single-page="false"
                    layout="prev, pager, next"
                    :total="Total"
                    :page-size="13"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
            >
            </el-pagination>


</el-row>
            <!--            目录-->
            <folder  @AccessFolder="AccessFolder" @DeleteFolder="DeleteFolder" v-for="j in FolderList" :key="j.id" :folder-info="j"></folder>
            <!--            文件-->
            <my-article v-for="j in ArticleList" :key="j.id"  @DeleteArticle="DeleteArticle" :article-info="j"></my-article>

            <center v-if="(FolderList.length==0) && (ArticleList.length==0)" >
                <i class="el-icon-edit" style="margin-top: 10%;font-size: 50px;"></i>
                <span style="font-family: 楷体;font-size: 30px"> 空空如也</span>
            </center>


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
                Nav:[],
                currentPage:1,
                Total:1,
                currentTitle:"Home"

            }
        },

        mounted() {
            this.loading=true;
            request({
                url:"/folder/current"
            }).then(resp=>{
                this.Nav = resp.data.data
                this.Nav = this.Nav.reverse()
                this.currentTitle = this.Nav[this.Nav.length-1]


                request({
                    url:"/folder/sub_file/"+1,
                    params:{
                        title:this.currentTitle
                    }
                }).then(resp=>{
                    this.FolderList=resp.data.Folders;
                    this.ArticleList=resp.data.Articles;
                    if(this.FolderList==null){this.FolderList=[]}
                    if(this.ArticleList==null){this.ArticleList=[]}
                    this.loading=false;
                    this.Nav = resp.data.Nav
                    this.Total = Number(resp.data.Total)

                    this.$parent.$refs.navigate.$data.Nav=resp.data.Nav.reverse()

                    this.loading=false
                }).catch(err=>{console.log(err)});


            });





        },
        methods:{
            DeleteFolder(id) {
                for(var i=0;i<this.FolderList.length;i++){
                    if(this.FolderList[i].id==id){
                        this.FolderList.splice(i,1)
                    }
                }


                this.Total--;
                if(this.Total%13===0){
                    this.$parent.$refs.FileList.handleCurrentChange(Math.floor(this.$parent.$refs.FileList.Total/13))
                }

            },

            DeleteArticle(id){
                for(var i=0;i<this.ArticleList.length;i++){
                    if(this.ArticleList[i].id==id){
                        this.ArticleList.splice(i,1)
                    }
                }

                this.Total--;
                if(this.Total%13===0){
                    this.$parent.$refs.FileList.handleCurrentChange(Math.floor(this.$parent.$refs.FileList.Total/13))
                }

            },

            AccessFolder(FolderList,ArticleList,nav,total){
                this.FolderList=FolderList;
                this.ArticleList=ArticleList;
                this.Nav = nav;
                this.$parent.$refs.navigate.Nav=nav;
                this.Total = Number(total);
                this.currentPage = 1


            },
            handleCurrentChange(val){
                this.currentPage = val
                this.loading = true
                request({
                    url:"/folder/sub_file/"+this.currentPage,
                    params: {
                        title:this.Nav[this.Nav.length-1]
                    }
                }).then(resp=>{
                    this.FolderList = resp.data.Folders
                    this.ArticleList = resp.data.Articles
                    this.loading = false
                })

            }
        },
        computed:{
        },
        components: {
            Folder,
            MyArticle
        },
    }
</script>

<style scoped>

</style>