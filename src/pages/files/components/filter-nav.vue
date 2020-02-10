<template>
    <div>
        <el-row style="padding-top: 1%">

            <el-col :span="4">
                <el-input
                        clearable
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="keywords">
                </el-input>
            </el-col>
            <el-col :span="10" style="padding-left: 4%">
                <el-radio-group v-model="filter"  size="medium">
                    <el-radio-button label="时间升序"></el-radio-button>

                </el-radio-group>
                <el-link :underline="false" type="info" style="margin-left: 1%;" v-show="cancel" @click="filter=null"><i  class="el-icon-circle-close"></i></el-link>


            </el-col>
            <el-col :span="4">
                <el-pagination
                        :hide-on-single-page="true"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage1"
                        :page-size="10"
                        layout="total, prev, pager, next, jumper"
                        :total="100">
                </el-pagination>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "filter",
        data:function () {
            return{
                keywords:"",
                filter:null,
            }
        },
        computed:{
            cancel:function () {
                return this.filter!==null
            }
        },
    }
</script>

<style scoped>

</style>