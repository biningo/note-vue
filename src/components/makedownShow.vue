<template>
    <div style="">
        <mavon-editor

                :boxShadow="false"

                :previewBackground="background"
                :value="mkValue"
                :subfield = "false"
                :defaultOpen = "'preview'"
                :toolbarsFlag = "false"
                :editable="false"

        ></mavon-editor>
    </div>
</template>

<script>
    export default {
        name: "makedownShow",
        props:['mkValue','background'],
    }
</script>

<style scoped>

</style>