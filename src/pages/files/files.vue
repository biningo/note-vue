<template>
    <div>



        <el-row style="padding-left: 1%">
            <!--                add tab-->

            <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">



                <el-tab-pane
                        v-for="(item) in editableTabs"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name"
                >

                  <tab-content @NewTab="addTab" v-if="item.title=='files'"></tab-content>

                    <div v-if="item.title!='files'" style="padding-left: 6%;padding-right: 9%">

                            <makedown-show

                                    background="#F0FFF0"
                                    :mk-value="item.content" ></makedown-show>


                    </div>
                </el-tab-pane>



            </el-tabs>

<!--            add tab-->
            <div >
                <el-button
                        size="small"
                        @click="addTab({'title':'files'})"
                >
                    add tab
                </el-button>
            </div>
        </el-row>









    </div>
</template>

<script>


    import TabContent from "./components/TabContent";
    import MakedownShow from "../../components/makedownShow";
    export default {

        name: "files",
        data:function () {
            return{

                editableTabsValue: '1',
                editableTabs: [{
                    title: 'files',
                    name: '1',
                    content: 'files'
                }],
                tabIndex: 1

            }
        },
        methods:{

            Ping(){
                console.log("Ping")
            },
            // eslint-disable-next-line no-unused-vars
            addTab(ArticleInfo) {
                console.log(ArticleInfo);
                let newTabName = ++this.tabIndex+'';
                this.editableTabs.push({
                    title: ArticleInfo.title,
                    name:newTabName,
                    content: ArticleInfo.mkValue
                });
                this.editableTabsValue = newTabName;
            },
            removeTab(targetName) {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.name !== targetName);
            }


        },

        components:{
            TabContent,
            MakedownShow
        }


    }
</script>

<style scoped>

</style>