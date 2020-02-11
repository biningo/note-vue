<template>
    <div style="padding-left: 2%">

<!--面包导航-->

         <navigate ref="navigate"></navigate>


<!--查找过滤-->
        <filter-nav></filter-nav>


<!--        文件列表-->
        <file-list ref="FileList"></file-list>



    </div>
</template>

<script>


    import Navigate from "@/pages/files/components/navigate";
    import FilterNav from "@/pages/files/components/filter-nav";
    import FileList from "@/pages/files/components/file-list";
    export default {

        name: "files",
        data:function () {
            return{

                file:null

            }
        },
        methods:{

        },

        components:{
            FileList,
            FilterNav,
            Navigate,

        }


    }
</script>

<style scoped>

</style>