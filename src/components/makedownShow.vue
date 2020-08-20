<template>
    <div>
        <mavon-editor

                :boxShadow="false"
                style="font-size: 20px"
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