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



        </el-row>

       <el-row style="padding: 2%">
           <!--            文件-->
           <el-row v-for="j in 13" :key="j">

              <rubbish-file-list></rubbish-file-list>
           </el-row>
       </el-row>

    </div>
</template>

<script>
    import RubbishFileList from "@/pages/rubbish/components/RubbishFileList";
    export default {
        name: "rubbish",
        components: {RubbishFileList},
        data:function () {
            return{
                keywords:""
            }
        }
    }
</script>

<style scoped>

</style>