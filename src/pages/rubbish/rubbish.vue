<template>
    <div>

        <el-row style="padding: 1%">
            <el-col :span="2">
                <el-button type="danger"  class="el-icon-delete" round size="mini">清空</el-button>

            </el-col>
            <el-col :span="4">
                <el-input
                        clearable
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search"
                        v-model="keywords">
                </el-input>
            </el-col>
            <el-col :span="4" style="margin-left: 1%">
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

       <el-row style="padding: 2%">
           <!--            文件-->
           <el-row v-for="j in 13" :key="j">

              <rublish-file-list></rublish-file-list>
           </el-row>
       </el-row>

    </div>
</template>

<script>
    import RublishFileList from "@/pages/rubbish/components/RublishFileList";
    export default {
        name: "rubbish",
        components: {RublishFileList},
        data:function () {
            return{
                keywords:""
            }
        }
    }
</script>

<style scoped>

</style>