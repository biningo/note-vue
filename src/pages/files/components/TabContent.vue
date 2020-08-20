<template>
    <div>
        <!--面包导航-->
        <navigate ref="navigate"></navigate>
        <!--        文件列表-->
        <file-list ref="FileList" @NewTab="NewTab" ></file-list>
    </div>
</template>

<script>
    import navigate from "./navigate";
    import FileList from "./file-list"
    export default {
        name: "TabContent",
        components:{
            navigate,
            FileList
        },
        methods:{
            NewTab(ArticleInfo){
                this.$emit("NewTab",ArticleInfo)
            }
        }
    }
</script>

<style scoped>

</style>