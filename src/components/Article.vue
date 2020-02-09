<template>
    <div>

        <el-row>
            <el-col :span="16" >
                <el-tooltip  effect="light"  placement="right">
                    <div slot="content">
                        <el-link icon="el-icon-edit"></el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-info"> </el-link>
                        <el-divider direction="vertical"></el-divider>
                        <el-link class="el-icon-delete"></el-link>


                    </div>
                    <el-link style="font-weight: bolder;font-size: 15px" href="https://element.eleme.io" target="_blank"  >
                        <i class="el-icon-document" style="margin-right: 1px"></i>
                        默认链接</el-link>
                </el-tooltip>
            </el-col>
            <!--                    日期-->
            <el-col  :span="4">

                <i class="el-icon-date" style="color: gainsboro">2019-8-9</i>


            </el-col>
        </el-row>
        <!--                横线-->
        <el-row>
            <hr style=" border:0.08em solid lightgoldenrodyellow" >
        </el-row>

    </div>
</template>

<script>
    export default {
        name: "FileList"
    }
</script>

<style scoped>

</style>