<template>
    <div>

        <el-row style="padding-left: 1%;border-left: 2px solid red">


<el-collapse>
    <el-collapse-item title="标签过滤">
            <el-checkbox-group v-model="filter"  size   ="medium">
                <el-link :underline="false" type="info" style="margin-right: 1%;" v-show="cancel" @click="filter=[]"><i  class="el-icon-circle-close"></i></el-link>

                <el-checkbox-button  v-for="j in 10"  :key="j" :label="'标签'+j"></el-checkbox-button>


                </el-checkbox-group>
    </el-collapse-item>
</el-collapse>





        </el-row>

        <el-row style="padding: 1%">
            <file v-for="j in 12" :key="j"></file>
        </el-row>


        <el-row>
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
    import File from "@/components/MyArticle";
    export default {
        data:function(){
            return{
                filter:[],

            }
        },
        name: "tag",
        components: {File},
        computed:{
            cancel:function () {
                return this.filter.length!==0
            }
        },
    }
</script>

<style scoped>

</style>