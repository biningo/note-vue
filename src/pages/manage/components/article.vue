<template>
    <div>
        <el-page-header @back="goBack" content="Article">
        </el-page-header>
        <el-divider></el-divider>

        <el-row>
<el-button type="danger" @click="DeleteAll" size="mini">批量删除</el-button>
            <el-button  size="mini">批量下载</el-button>
            <el-table
                    v-loading="loading"
                    @selection-change="handleSelectionChange"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="ID"
                        prop="id"
                        width="60"
                >

                </el-table-column>
                <el-table-column
                        label="日期"
                        width="100"
                        prop="updated_at"
                >
                </el-table-column>
                <el-table-column
                        width="">
                    <template slot-scope="scope">
                        <el-link @click="ShowArticle(scope.row)">{{scope.row.title}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                        width="">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="DownLoad(scope.row)">下载</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="Total"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
            >
            </el-pagination>
        </el-row>


        <el-drawer
                :title="ArticleInfo.title"
                :visible.sync="dialogVisible"
                size="auto"
                direction="ttb"
                style="overflow-y: auto;width: 60%"
        >
            <div style="">
                <makedown-show
                        background="#F0FFF0"
                        :mk-value="ArticleInfo.mkValue" ></makedown-show>
            </div>
        </el-drawer>

    </div>
</template>

<script>
    import request from "@/network/request";
    import makedownShow from "@/components/makedownShow";
    export default {
        components:{makedownShow},
        mounted(){
            this.loading = true;
            request({
                url:'/article/many/1',
            }).then(resp=>{
                this.tableData = resp.data.items;
                this.Total = resp.data.total;
                this.loading = false;
            })
        },
        name: "article",
        data:function(){
          return{
              loading:false,
              currentPage:1,
              Total:1,
              multipleSelection:[],
              keywords:'',
              tableData:[],
              ArticleInfo:{
                  title:"",
                  mkValue:"",
                  id:null
              },
              dialogVisible:false,
          }
        },
        methods:{
            handleCurrentChange(val){
                this.currentPage = val
                this.loading = true;
                request({
                    url:'/article/many/'+val,
                }).then(resp=>{
                    this.tableData = resp.data.items;
                    this.Total = resp.data.total;
                    this.loading = false;
                })
            },
            goBack(){
                this.$router.push('/manage');
            },
            handleSelectionChange(val) {
                var arr =[];
                for(var i=0;i<val.length;i++){
                    arr.push(val[i].id);
                }
                this.multipleSelection=arr;
            },
            DownLoad(val){
                this.loading = true;
                request({
                    url:'/article/download/'+val.id,
                    responseType: 'blob' // 表明返回服务器返回的数据类型
                }).then(res=>{

                    const blob = new Blob([res.data]);
                    const fileName = val.title+'.md';
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a');
                        elink.download = fileName;
                        elink.style.display = 'none';
                        elink.href = URL.createObjectURL(blob);
                        document.body.appendChild(elink);
                        elink.click();
                        URL.revokeObjectURL(elink.href); // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }

                    this.loading = false;
                })
            },
            ShowArticle(val){
                request({
                    url:"/article/get/"+val.id
                }).then(resp=>{
                    this.ArticleInfo = resp.data

                });
                this.dialogVisible =  true
            },
            DeleteAll(){

                request({
                    url:"/article/delete/many",
                    params:{
                        "items":this.multipleSelection,
                    }
                }).then(resp=>{
                    this.$message({
                        type:"success",
                        message:resp.data.msg
                    });
                    location.reload()
                })
            }

        }
    }
</script>

<style scoped>

</style>