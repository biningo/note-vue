<template>
    <div
         v-loading.fullscreen.lock="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"

    >
        <el-row>
            <el-col :span="18">

                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(n) in Nav" :key="n">
                        <el-link :class="{ 'el-icon-house':n=='Home'  }" size="mini" round style="font-weight: bolder"
                                   @click="ChangeNav(n)">{{n}}
                        </el-link>
                    </el-breadcrumb-item>
                </el-breadcrumb>


            </el-col>

            <el-col :span="6">
                <el-button type="primary" round size="mini" @click="open('目录名称')"><i class="el-icon-folder-add"
                                                                                     style="margin-right: 4px"></i>新建
                </el-button>
                <el-button type="success" round size="mini" @click="open('文章名称')"><i class="el-icon-document-add"
                                                                                     style="margin-right: 4px"></i>新建笔记
                </el-button>

                <el-button type="warning" round size="mini" @click="UploadMd()"><i class="el-icon-upload2"
                                                                                   style="margin-right: 4px"></i>上传md
                </el-button>

            </el-col>
        </el-row>


        <!--        上传dig-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <el-upload
                    ref="upload"
                    :auto-upload="false"
                    :http-request="ht"
                    multiple
            >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                </el-button>
            </el-upload>
            <span slot="footer" class="dialog-footer">
    <el-button @click="CloseUpLoad">取 消</el-button>
  </span>
        </el-dialog>


    </div>
</template>

<script>

    import request from "@/network/request";

    export default {
        name: "navigate",
        data: function () {
            return {
                Nav: [],
                loading: false,
                dialogVisible: false,
            }
        },
        methods: {

            CloseUpLoad(){
                this.$parent.$refs.FileList.Total++;
                if (this.$parent.$refs.FileList.currentPage < (Math.ceil(this.$parent.$refs.FileList.Total / 13))) {
                    this.$parent.$refs.FileList.handleCurrentChange(Math.ceil(this.$parent.$refs.FileList.Total / 13))
                } else {
                    this.$parent.$refs.FileList.handleCurrentChange(this.$parent.$refs.FileList.currentPage);
                }
                this.dialogVisible = false;
            },

            ht(files) {
                this.loading = true;
                let formData = new FormData();
                formData.append(files.file.name, files.file);
                request({
                    url: '/article/upload_md',
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Folder-Title': this.Nav[this.Nav.length-1]
                    }
                    // eslint-disable-next-line no-unused-vars
                }).then(resp => {
                    this.loading = false;
                    if (resp.data.code == 200) {
                        this.$message({
                            message: resp.data.msg,
                            type: 'success'
                        });


                    } else {
                        this.$message({
                            message: resp.data.msg,
                            type: 'error'
                        })
                    }
                });


            },
            submitUpload() {

                this.$refs.upload.submit();

            },
            UploadMd() {
                this.dialogVisible = true;
            },


            open(title) {


                this.$prompt(title, '创建', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value}) => {
                    this.loading = true;
                    if (title === "目录名称") {

                        request({
                            url: "/folder/add",
                            params: {
                                title: value,
                                FatherTitle: this.Nav[this.Nav.length - 1]
                            }
                        }).then(resp => {
                            this.$message({
                                type: 'success',
                                message: resp.data.msg
                            });
                            this.loading = false;
                            this.$parent.$refs.FileList.FolderList.push(resp.data.data);
                            this.$parent.$refs.FileList.Total++;
                            if (this.$parent.$refs.FileList.FolderList.length > 13) {
                                this.$parent.$refs.FileList.handleCurrentChange(this.$parent.$refs.FileList.currentPage + 1)
                            } else {
                                this.$parent.$refs.FileList.handleCurrentChange(this.$parent.$refs.FileList.currentPage)
                            }


                        }).catch(err => {
                            this.$message({
                                type: 'success',
                                message: err
                            });
                        })


                    } else if (title === "文章名称") {
                        request({
                            method: 'post',
                            url: "/article/add",
                            data: {
                                title: value,
                                folder_title: this.Nav[this.Nav.length - 1]
                            }
                        }).then(resp => {
                            this.$message({
                                type: "success",
                                message: resp.data.msg
                            });
                            this.loading = false;
                            //注意params传递数据要与name属性一起 不能与path一起
                            this.$confirm('文件已经创建,是否前往创作?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'success'
                            }).then(() => {
                                this.$router.push({
                                    name: "write",
                                    params: {
                                        article: resp.data.data
                                    }
                                });

                            });


                            this.$parent.$refs.FileList.Total++;
                            if (this.$parent.$refs.FileList.currentPage < (Math.ceil(this.$parent.$refs.FileList.Total / 13))) {
                                this.$parent.$refs.FileList.handleCurrentChange(Math.ceil(this.$parent.$refs.FileList.Total / 13))
                            } else {
                                this.$parent.$refs.FileList.handleCurrentChange(this.$parent.$refs.FileList.currentPage);
                            }

                        }).catch(err => {
                            console.log(err)
                        })
                    }


                });


            },
            ChangeNav(title) {
                this.loading = true;
                request({
                    url: "/folder/sub_file/" + 1,
                    params: {
                        title: title,
                    }
                }).then(resp => {

                    this.$parent.$refs.FileList.AccessFolder(resp.data.Folders, resp.data.Articles, resp.data.Nav.reverse(), resp.data.Total)
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

</style>