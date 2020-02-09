<template>
    <div>

        <el-row style="margin-top: 1%;padding-left: 1%">

              <el-button type="success" round size="mini"><i class="el-icon-edit"></i>写心情</el-button>


        </el-row>

<el-row style="margin-top: 1%;padding-left: 1%">
        <el-col :span="18">
        <el-timeline>
            <el-timeline-item style="margin-bottom: 3%" v-for="j in 2"  :key="j" timestamp="2018/4/12" placement="top"  color="deepskyblue">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>Biningo
                <el-card>
                    <h4>更新 Github 模板</h4>
                    <el-image  :preview-src-list="['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']"
                               src="https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"></el-image>


                </el-card>
            </el-timeline-item>
            <el-timeline-item style="margin-bottom: 3%" v-for="j in 5"  :key="j" timestamp="2018/4/12" placement="top"  color="deepskyblue">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>Biningo
                <el-card>
                    <h4>更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板更新 Github 模板</h4>


                </el-card>
            </el-timeline-item>

        </el-timeline>
        </el-col>
</el-row>


<!--        分页-->
        <el-row >

            <el-pagination
                    :hide-on-single-page="true"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="100">
            </el-pagination>

        </el-row>

    </div>
</template>

<script>
    export default {
        name: "TimeLine"
    }
</script>

<style scoped>

</style>