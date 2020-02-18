<template>
    <div

    >

      <top-bar @ForeverDelete="ForeverDelete"></top-bar>



<el-row style="padding: 2%"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
>
           <!--            文件-->
              <rubbish-file  @Recover="Recover" v-for="f in ArticleList" :key="f.id" :file-info="f"></rubbish-file>


    <center v-if="ArticleList.length==0" >
        <i class="el-icon-edit" style="margin-top: 10%;font-size: 50px;"></i>
        <span style="font-family: 楷体;font-size: 30px"> 空空如也</span>
    </center>


</el-row>

    </div>
</template>

<script>
    import RubbishFile from "@/pages/rubbish/components/RubbishFile";
    import TopBar from "@/pages/rubbish/components/TopBar";
    import request from "@/network/request";
    export default {
        name: "rubbish",
        components: {TopBar, RubbishFile},

        mounted(){
            this.loading=true;
            request({
                url:"/article/rubbish",
            }).then(resp=>{
                this.ArticleList=resp.data.items;
                if(this.ArticleList==null){this.ArticleList=[]}
                this.Count = resp.data.total;
                this.loading=false
            })


        },

        data:function () {
            return{
                loading:false,
                keywords:"",
                ArticleList:[],
                Count:0
            }
        },
        methods:{
            Recover(id) {
                this.loading=true
                request({
                    url:"/article/recover",
                    params:{
                        id:id
                    }
                }).then(resp=>{

                    if (resp.data.code==500){
                        this.$message({
                            type:"warning",
                            message:resp.data.msg
                        })

                    } else{
                        this.$message({
                            type:"success",
                            message:resp.data.msg
                        });

                        for(var i=0;i<this.ArticleList.length;i++){
                            if(this.ArticleList[i].id==id){
                                this.ArticleList.splice(i,1)
                            }
                        }

                    }

                    this.loading=false



                })
            },


            ForeverDelete() {
                this.loading=true;
                request({
                    url:"/article/delete_forever"
                }).then(resp=>{
                        this.$message({
                            type:"success",
                            message:resp.data.msg
                        })

                    this.ArticleList=[]
                    this.loading=false
                })
            }

        }
    }
</script>

<style scoped>

</style>