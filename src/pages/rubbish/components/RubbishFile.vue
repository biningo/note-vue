<template>
    <div>
        <el-row>
            <el-col :span="18" >
                <el-tooltip  effect="light"  placement="right">
                    <div slot="content">
                        <el-link icon="el-icon-refresh-right" @click="Recover"></el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-info"> </el-link>


                    </div>
                    <el-link style="font-weight: bolder;font-size: 17px" @click="dialogVisible=true" target="_blank"  >
                        <i class="el-icon-document" style="margin-right: 1px"></i>
                        {{FileInfo.title}}</el-link>

                </el-tooltip>
            </el-col>
            <!--                    日期-->
            <el-col  :span="4">

                <i class="el-icon-date" style="color: gainsboro">{{FileInfo.deleted_time}}</i>


            </el-col>
        </el-row>
        <!--                横线-->
        <el-row>
            <hr style=" border:0.08em solid lightgoldenrodyellow" >
        </el-row>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="90%"

        >
            {{FileInfo.mkHtml}}

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "RublishFile",
        props:["FileInfo"],
        data:function () {
            return {
                dialogVisible:false
            }
        },
        methods:{
            Recover(){
                this.$emit("Recover",this.FileInfo.id)
            }
        }
    }
</script>

<style scoped>

</style>