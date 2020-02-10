<template>
    <div>
        <el-calendar v-model="time">
        </el-calendar>
    </div>
</template>

<script>
    export default {
        name: "backlog",
        data:function () {
            return{
                time:new Date()
            }
        }
    }
</script>

<style scoped>

</style>