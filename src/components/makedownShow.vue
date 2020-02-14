<template>
    <div>
        <mavon-editor
                :boxShadow="false"
                previewBackground="#F0FFF0"
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
        props:['mkValue'],
    }
</script>

<style scoped>

</style>