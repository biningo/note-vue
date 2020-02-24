<template>
    <div>

        <el-col :span="6" >
            <div @click="Link('article')">
            <el-card style="margin: 1%;background: honeydew" shadow="hover" >Article</el-card>
            </div>
        </el-col>


        <el-col :span="6"  >
            <div @click="Link('my_book')">
            <el-card style="margin: 1%;background: honeydew" shadow="hover" >MyBook</el-card>
            </div>


        </el-col>


        <el-col :span="6"  >
            <div @click="Link('my_mood')">
                <el-card style="margin: 1%;background: honeydew" shadow="hover" >MyMood</el-card>
            </div>


        </el-col>
    </div>
</template>

<script>
    export default {
        name: "home",
        methods:{
            Link(path){

                this.$router.push("/manage/"+path)
            }
        }
    }
</script>

<style scoped>

</style>