<template>
    <div style="padding-left: 1%;"
         v-loading.fullscreen.lock="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
         >


<!--编辑器-->
<el-col :span="21" style="padding-right: 1%;" >
    <el-row>

            <div style="text-align: center;margin-bottom: 1%;margin-top: 1%;font-size: 30px">
                <el-input v-model="article.title" placeholder="标题"></el-input>
            </div>

    </el-row>
    <el-row>
        <mavon-editor style="height:700px;" v-model="article.mkValue"
                      :ishljs="true"
                      ref="md"
                      @imgAdd="ImgAdd"
                      @imgDel="ImgDel"
                      @save="Save" />
    </el-row>
    <el-row style="text-align: center">
        <el-link type="success">感谢使用</el-link>
    </el-row>
</el-col>


<!--        编辑器侧边信息-->
<el-col  :span="3" style="padding-top: 2%">

            <!--            日期-->
            <div style="text-align: center">
                创建日期: <i class="el-icon-date" style="color: deepskyblue">{{article.created_at}}</i><br>
                最近更新: <i class="el-icon-date" style="color: orange">{{article.updated_at}}</i>
            </div>
            <el-divider></el-divider>







<!--          目录-->
            <div >
                目录:
                <el-cascader
                        filterable
                        :props="props"
                        v-model="article.dir_path"
                        :options="options"
                        @change="handleChange"
                        clearable
                ></el-cascader>


            </div>
            <el-divider></el-divider>




<!--           保存-->
            <div style="text-align: center">
                <el-button type="success" @click="FinishSave">保存文章</el-button>
            </div>
        </el-col>








    </div>
</template>

<script>


import request from "@/network/request";


    export default {
        name: "write",
        components: {},

        mounted(){
            if(this.$route.params.article) {
                this.article = this.$route.params.article;
            }

        },


        data:function () {
            return{

                loading:false,
                //目录
                options:[],
                props: {
                    checkStrictly: true,
                    lazy:true,
                    lazyLoad(node,resolve){
                        // eslint-disable-next-line no-console



                        request({
                            url:"/folder/sub_folder",
                            params:{
                                id:node.value,
                                title:node.label
                            }
                        }).then(resp=>{
                            resolve(resp.data.data);
                        });


                    }

                },




                article:{
                    id:0,
                    created_at:"0-0-0-0",
                    updated_at:"0-0-0-0",
                    deleted_at:"0-0-0-0",
                    title:"无标题",
                    dir_path:[],
                    tags:[],
                    mkValue: null,
                    folder_id:0,
                    folder_title:""
                },










            }





        },
        methods:{

            //点击保存事件
            FinishSave(){
                this.loading=true
                this.article.mkValue=this.$refs.md.$data.d_value;
                request({
                    url:"/article/update",
                    method:"post",
                    data:this.article
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });
                    this.article = resp.data.data;
                    this.loading=false
                }).catch(err=>{console.log(err)})

            },
            //编辑器
            //保存 Ctrl+S回调
            Save(mkValue){

                this.article.mkValue=mkValue;
                this.loading=true;

                request({
                    url:"/article/update",
                    method:"post",
                    data:this.article
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });
                    this.article = resp.data.data;
                    this.loading=false
                }).catch(err=>{console.log(err)})
            },

            //图片上传七牛云 图片名字唯一
            ImgAdd(pos,imgfile){
                console.log(imgfile); //防止报错
                let data = new FormData();
                data.append('img', imgfile);
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

                    this.$refs.md.$img2Url(pos,resp.data.data);
                    this.loading=false

                }).catch(err=>{
                    this.$message({
                        type:"error",
                        message:err
                    })
                })
            },

            //图片从七牛云删除
            ImgDel(file){
                this.loading=true
                request({
                    url:"/qiniu/img_delete",
                    params:{
                        img_name:file[1].name
                    }
                }).then(resp=>{
                    if(resp.data.code==500){
                        this.$message({
                            type:"error",
                            message:resp.data.msg
                        })
                    }else{
                        this.$message({
                            type:"success",
                            message:resp.data.msg
                        })
                    }

                    this.loading=false
                })
            },


            //标签回调函数
            // tag是tags内容 也就是名字
            handleClose(tag) {
                this.article.tags.splice(this.article.tags.indexOf(tag), 1);
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(() => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    if(this.article.tags==null){
                        this.article.tags = []
                    }
                    this.article.tags.push(inputValue)
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //目录
            // 改变回调函数
            handleChange(val)
            {
                // eslint-disable-next-line no-console
              console.log(val)
            },





        }
    }
</script>

<style scoped >

</style>