<template>
    <div>
        <el-page-header @back="goBack" content="MyBook">
        </el-page-header>
        <el-divider></el-divider>

        <el-row>


<el-button size="mini" type="success" @click="dialogVisible=true">添加书籍</el-button>
            <el-table
                    v-loading="loading"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">

                <el-table-column
                        label="ID"
                        prop="id"
                        width="60"
                >

                </el-table-column>
                <el-table-column
                        label="更新时间"
                        width="100"

                >
                    <template slot-scope="scope">
                        <el-link >{{scope.row.updated_at.slice(0,10)}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        label="图书"
                        width="500">
                    <template slot-scope="scope">
                        <el-link >{{scope.row.title}}【{{scope.row.writer}}】</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        label="图片"
                        width="300"
                        >
                    <template slot-scope="scope">
                        <el-link :href="scope.row.img_url"  >{{scope.row.img_url}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        label="状态"
                        width="300">
                    <template slot-scope="scope">
                        <el-radio v-model="scope.row.status" label="在读">在读</el-radio>
                        <el-radio v-model="scope.row.status" label="想读">想读</el-radio>
                        <el-radio v-model="scope.row.status" label="读完">读完</el-radio>
                    </template>
                </el-table-column>


                <el-table-column
                        label="操作"
                        width="">
                    <template slot-scope="scope">
                       <el-button size="mini" type="danger" @click="Delete(scope.row)">删除</el-button>
                        <el-button size="mini" type="primary" @click="Update(scope.row)">保存修改</el-button>
                    </template>
                </el-table-column>


            </el-table>


        </el-row>

        <el-dialog
                v-loading="loading"
                title="Book"
                :visible.sync="dialogVisible"
                width="50%"

        >

            Title:<el-input v-model="book.title"></el-input>
            Writer:<el-input v-model="book.writer"></el-input>
            Status:
            <el-radio v-model="book.status" label="在读">在读</el-radio>
            <el-radio v-model="book.status" label="想读">想读</el-radio>
            <el-radio v-model="book.status" label="读完">读完</el-radio>

            <el-upload
                    class="avatar-uploader"

                    :show-file-list="false"
                   :before-upload="UploadImg"
                    >
                <img v-if="book.img_url" :src="book.img_url" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddBook">确 定</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import request from "@/network/request";
    export default {
        name: "mybook",
        mounted(){
            this.loading = true;
          request({
              url:"/my/book/get/all"
          }).then(resp=>{
              this.tableData = resp.data.items;
              this.Total  = resp.data.total;
              this.loading = false;
          })
        },
        data(){
            return{
                loading:false,
                UploadUrl:'http://localhost:8080/qiniu/img_upload',
                book:{
                    title:'',
                    writer:'',
                    img_url:'',
                    status:'想读',
                },
                tableData:[],
                Total:0,
                dialogVisible:false
            }
        },
        methods:{
            goBack(){
                this.$router.push('/manage');
            },
            Delete(val){
                this.loading = true
                request({
                    url:'/my/book/delete/'+val.id
                }).then(resp=>{
                    this.$message({
                        type:'success',
                        message:resp.data.msg
                    });
                    this.loading = false
                });
                location.reload()
            },
            Update(val){
                this.loading = true;
                request({
                    method:'post',
                    url:'/my/book/update',
                    data:val
                }).then(resp=>{
                    this.$message({
                        type:'success',
                        message:resp.data.msg
                    });
                    this.loading = false;
                })
            },
           UploadImg(file){
               let data = new FormData();
               data.append('img', file);
               this.loading=true;
               request({
                   headers: {
                       'Content-Type': 'multipart/form-data'
                   },
                   method: 'post',
                   url:"/qiniu/img_upload",
                   data:data
               }).then(resp=>{
                   this.$message({
                       type:"success",
                       message:resp.data.msg
                   });

                   this.book.img_url = resp.data.data;
                   this.loading=false

               })


           },
            AddBook(){
                this.loading = true;
                request({
                    method:'post',
                    url:'/my/book/add',
                    data:this.book
                }).then(resp=>{
                    this.tableData.unshift(resp.data.data);
                    this.book={
                        title:'',
                        writer:'',
                        img_url:'',
                        status:'想读',
                    };
                    this.dialogVisible=false;
                    this.loading = false;
                })
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>