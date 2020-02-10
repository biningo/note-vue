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
                    <el-link style="font-size: 17px"    >
                        <i class="el-icon-folder" style="margin-right: 1px"></i>
                        {{FolderInfo.title}}</el-link>
                </el-tooltip>
            </el-col>

            <!--                    日期-->
            <el-col  :span="4">

                <i class="el-icon-date" style="color: gainsboro">{{FolderInfo.updated_at}}</i>


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
        name: "FolderList",
        props:["FolderInfo"],
        data:function () {
            return{}
        }

    }
</script>

<style scoped>

</style>