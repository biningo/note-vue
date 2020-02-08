<template>
    <div style="padding-left: 1%;" >



<el-col :span="21" style="padding-right: 1%;" >

    <el-row>

            <div style="text-align: center;margin-bottom: 1%;margin-top: 1%;font-size: 30px">
                <el-input v-model="title" placeholder="标题"></el-input>
            </div>

    </el-row>
    <el-row>
        <mavon-editor style="height:700px;" v-model="mkHtml" @change="change"/>
    </el-row>
    <el-row style="text-align: center">
        <el-link type="success">感谢使用</el-link>
    </el-row>
</el-col>

<el-col  :span="3" style="padding-top: 2%">

            <!--            日期-->
            <div style="text-align: center">
                创建日期: <i class="el-icon-date" style="color: deepskyblue">2019-8-9</i>
                最近更新: <i class="el-icon-date" style="color: orange">2019-8-9</i>
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
                        :key="tag"
                        v-for="tag in dynamicTags"
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
    export default {
        name: "write",
        data:function () {
            return{
                mkText:"",
                mkHtml:"",
                title:"无标题",


                dynamicTags: ['标签一', '标签二', '标签三'],
                inputVisible: false,
                inputValue: '',


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

            handleChange(val)
            {
                // eslint-disable-next-line no-console
              console.log(val)
            },
            change(mkValue,mkHtml){
               this.mkiValue=mkValue;
                // eslint-disable-next-line no-console
               console.log(mkHtml)
            },
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
            }
        }
    }
</script>

<style scoped>

</style>