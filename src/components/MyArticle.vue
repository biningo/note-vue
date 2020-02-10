<template>
    <div>

        <el-row>
            <el-col :span="16" >
                <el-tooltip  effect="light"  placement="right">

                    <div slot="content">
                        <el-link icon="el-icon-edit"></el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-info"> </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-delete"></el-link>


                    </div>
                    <el-link style="font-weight: bolder;font-size: 15px" @click="dialogVisible=true" target="_blank"  >
                        <i class="el-icon-document" style="margin-right: 1px"></i>
                      {{FileInfo.title}}</el-link>
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


        <el-dialog
                :title="ArticleInfo.title"
                :visible.sync="dialogVisible"
                width="90%"

        >
            <span>
                {{ArticleInfo.MkHtml}}
            </span>

        </el-dialog>


    </div>




</template>

<script>

    export default {
        name: "MyArticle",
        props:["ArticleInfo"],
        data:function(){
            return{
                dialogVisible:false
            }
        },
        methods: {

        }

    }
</script>

<style scoped>

</style>