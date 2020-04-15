<template>
    <div  v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"

    >



        <el-row>


            <el-col :span="16" >
                <el-tooltip  effect="light"  placement="right">
                    <div slot="content">


                        <el-link icon="el-icon-edit" @click="dialogVisible=true"></el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-info"> </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-delete" @click="Delete"></el-link>


                    </div>




                    <el-link style="font-size: 17px"  @click="AccessFolder"  >
                        <i class="el-icon-folder" style="margin-right: 1px"></i>
                        {{FolderInfo.title}}</el-link>
                </el-tooltip>
            </el-col>

<!--            编辑框-->
            <el-dialog
                    title="修改"
                    :visible.sync="dialogVisible"
                    width="30%"
            >
                <el-input v-model="FolderInfo.title"></el-input>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Update">确 定</el-button>
  </span>
            </el-dialog>
            <!--                    日期-->
            <el-col  :span="4">

                <i class="el-icon-date" style="color: gainsboro">{{FolderInfo.updated_at.slice(0,16)}}</i>


            </el-col>
        </el-row>


        <!--                横线-->
        <el-row>
            <hr style=" border:0.08em solid lightgoldenrodyellow" >
        </el-row>

    </div>
</template>

<script>
    import request from "@/network/request";

    export default {
        name: "Folder",
        props:["FolderInfo"],
        data:function () {
            return{
                loading:false,
                dialogVisible:false
            }
        },
        methods:{
            Delete(){
                this.loading=true;
                request({
                    url:"/folder/delete",
                    params:this.FolderInfo
                }).then(resp=>{
                    this.$message({
                        type: 'success',
                        message:resp.data.msg
                    });

                    this.$emit('DeleteFolder',resp.data.data);
                    this.loading=false;



                })
            },
            Update(){
                this.loading=true;
                request({
                    url:"/folder/update",
                    params: this.FolderInfo
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:"修改成功: "+this.FolderInfo.title
                    });
                    console.log(resp.status);  //防止报错
                    this.loading=false;
                    this.dialogVisible=false
                })
            },
            AccessFolder(){
                this.loading=true;
                request({
                    url:"/folder/sub_file/"+1,
                    params:{
                        title:this.FolderInfo.title,
                    }
                }).then(resp=>{
                    this.$emit("AccessFolder",resp.data.Folders,resp.data.Articles,resp.data.Nav.reverse(),resp.data.Total)
                    this.loading=false;
                })
            }
        }


    }
</script>

<style scoped>

</style>