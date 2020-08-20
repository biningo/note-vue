<template>
    <div>
        <el-row style="padding: 1%">
            <el-col :span="2" style="padding-top: 6px">
                <el-button type="danger"  @click="ForeverDelete" class="el-icon-delete" round size="mini">清空</el-button>

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