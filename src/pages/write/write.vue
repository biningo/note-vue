<template>
    <div style="padding-left: 1%;" >


<!--编辑器-->
<el-col :span="21" style="padding-right: 1%;" >
    <el-row>

            <div style="text-align: center;margin-bottom: 1%;margin-top: 1%;font-size: 30px">
                <el-input v-model="article.title" placeholder="标题"></el-input>
            </div>

    </el-row>
    <el-row>
        <mavon-editor style="height:700px;" v-model="article.mkValue"
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
                        v-model="categoryPath"
                        :options="options"
                        @change="handleChange"
                        clearable
                ></el-cascader>


            </div>
            <el-divider></el-divider>

            <!--            标签-->
            <div style="text-align: center">
                <el-tag
                        :key="tag.id"
                        v-for="tag in article.tags"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)">
                    {{tag}}
                </el-tag>
                <el-input
                        class="input-new-tag"
                        v-if="inputVisible"
                        v-model="inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm"
                        @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </div>
            <el-divider></el-divider>


<!--           保存-->
            <div style="text-align: center">
                <el-button type="success" >保存文章</el-button>
            </div>
        </el-col>

    </div>
</template>

<script>


import request from "@/network/request";

    export default {
        name: "write",
        mounted(){



            if(this.$route.params.article){
                this.article=this.$route.params.article;
            }
        },


        data:function () {
            return{

                article:{
                    id:null,
                    created_at:"0-0-0-0",
                    updated_at:"0-0-0-0",
                    title:"无标题",
                    folder_id:null,
                    tags:[],
                    mkValue: null,
                    mkHtml:null
                },





                //标签
                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',

                //目录
                categoryPath:[],
                options: [
                    {
                    value: {name:"你好",id:1},
                    label: '指南',
                    },
                    {
                        value: '2',
                        label: '指南',
                    },
                    {
                        value: '3',
                        label: '指南',
                    }




                ],
                props: {
                    checkStrictly: true,
                    lazy:true,
                    lazyLoad(node,resolve){
                        // eslint-disable-next-line no-console
                        console.log(node);


                            const nodes = [
                                {
                                    value: '2',
                                    label: '2',
                                    leaf:true,
                                },
                                {
                                    value: '4',
                                    label: '4',
                                }
                            ]

                            resolve(nodes);

                    }

                }


            }





        },
        methods:{

            //编辑器
            Save(mkValue,mkHtml){
                this.mkHtml=mkHtml;

               //request update
            },
            ImgAdd(pos,imgfile){
                console.log(imgfile);
                let data = new FormData();
                data.append('img', imgfile);
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
                    this.$refs

                }).catch(err=>{
                    this.$message({
                        type:"error",
                        message:err
                    })
                })






            },
            ImgDel(file){
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
                })
            },


            //标签
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
                    this.dynamicTags.push(inputValue);
                }
                this.inputVisible = false;
                this.inputValue = '';
            },

            //目录
            handleChange(val)
            {
                // eslint-disable-next-line no-console
              console.log(val)
            },





        }
    }
</script>

<style scoped>

</style>