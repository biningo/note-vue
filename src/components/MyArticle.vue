<template>
    <div  v-loading.fullscreen.lock="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"

    >

        <el-row>
            <el-col :span="16" >
                <el-tooltip  effect="light"  placement="right">

                    <div slot="content">
                        <el-link icon="el-icon-edit" @click="Edit"></el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-info"> </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-delete" @click="DeleteArticle"></el-link>


                    </div>
                    <el-link style="font-weight: bolder;font-size: 15px" @click="GetArticleInfo(ArticleInfo.id)" target="_blank"  >
                        <i class="el-icon-document" style="margin-right: 1px"></i>
                      {{ArticleInfo.title}}</el-link>
                </el-tooltip>

            </el-col>
            <!--                    日期-->
            <el-col  :span="4">

                <i class="el-icon-date" style="color: gainsboro" >{{ArticleInfo.updated_at}}</i>


            </el-col>
        </el-row>
        <!--                横线-->
        <el-row>
            <hr style=" border:0.08em solid lightgoldenrodyellow" >
        </el-row>



<!--文章展示-->
        <el-drawer
                :title="articleDetail.title"
                :visible.sync="dialogVisible"
                size="auto"
                direction="ttb"
                style="overflow: auto"
        >
<div style="">
            <makedown-show
                    background="#F0FFF0"
                    :mk-value="articleDetail.mkValue" ></makedown-show>
</div>
        </el-drawer>





    </div>




</template>

<script>

    import request from "@/network/request";
    import MakedownShow from "@/components/makedownShow";

    export default {
        name: "MyArticle",
        components: {MakedownShow},
        props:["ArticleInfo"],
        data:function(){
            return{
                articleDetail:{
                  mkValue:'',
                  title:'',
                    id:0,
                },
                dialogVisible:false,
                articleView:null,
                loading:false,
            }
        },
        methods: {
            GetArticleInfo(id){
                this.loading = true;

                request({
                    url:'/article/get/'+id
                }).then(resp=>{
                    this.articleDetail  = resp.data;
                    this.loading = false;
                    this.dialogVisible=true;
                })
            },
            DeleteArticle(){
                this.loading=true;
                request({
                    method:'get',
                    url:"/article/delete",
                    params:{
                        id:this.ArticleInfo.id
                    }

                }).then(resp=>{
                    this.$message({
                        type:'success',
                        message:resp.data.msg
                    });

                    this.$emit('DeleteArticle',resp.data.data);
                    this.loading=false
                });
            },


            Edit(){
                this.loading=true;
                //注意 axios是异步请求
                request({
                    url:"/article/edit",
                    method:"post",
                    data:this.ArticleInfo
                }).then(resp=>{
                    this.articleView= resp.data.data;

                    this.$router.push({
                        name:"write",
                        params:{
                            article:this.articleView
                        }
                    });
                    this.loading=false

                });


            }

        }

    }
</script>

<style scoped>

</style>