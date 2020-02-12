<template>
    <div>
        <el-row style="padding: 1%">
            <el-col :span="2" style="padding-top: 6px">
                <el-button type="danger"  @click="ForeverDelete" class="el-icon-delete" round size="mini">清空</el-button>

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
    </div>
</template>

<script>
    export default {
        name: "TopBar",
        methods:{
            ForeverDelete(){
                this.$emit("ForeverDelete");
            }
        }
    }
</script>

<style scoped>

</style>