<template>
    <div>
        <el-page-header @back="goBack" content="MyMood">
        </el-page-header>
        <el-divider></el-divider>

        <el-row>

<el-row>
            <el-button size="mini" type="success" @click="dialogVisible=true">添加Mood</el-button>
    <el-button size="mini" type="danger" @click="DeleteMany">批量删除</el-button>
</el-row>


<el-row>
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
                            width="200"

                    >
                        <template slot-scope="scope">
                            {{scope.row.created_at.slice(0,16)}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            width=""
                            prop="content"
                    >

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


            <el-row>

                <el-dialog
                        title="Mood"
                        :visible.sync="dialogVisible"
                        width="50%"

                       >

                    <el-input rows="10" type="textarea" v-model="content"></el-input>
                    <el-radio v-model="status" :label="1">😁Good</el-radio>
                    <el-radio v-model="status" :label="2">😑Middle</el-radio>
                    <el-radio v-model="status" :label="3">😭Bad</el-radio>

                    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="AddMood">确 定</el-button>
  </span>
                </el-dialog>

            </el-row>


        </el-row>


    </div>
</template>

<script>
    import request from "@/network/request";
    export default {
        name: "mymood",
        mounted(){
            this.loading = true;
          request({
              url:"/my/mood/get/many/1"
          }).then(resp=>{
              this.Total = resp.data.total;
              this.tableData = resp.data.items;
              this.loading = false;
          })
        },
        data(){
            return{
                loading:false,
                content:'',
                status:0,
                tableData:[],
                dialogVisible:false,
                currentPage:1,
                Total:1,
                multipleSelection:[],
            }
        },
        methods:{
            handleCurrentChange(val){
              this.currentPage = val;
              this.loading = true;
                request({
                    url:"/my/mood/get/many/"+val
                }).then(resp=>{
                    this.Total = resp.data.total;
                    this.tableData = resp.data.items;
                    this.loading = false;
                })
            },
            goBack(){
                this.$router.push('/manage')
            },
            AddMood(){
                this.loading = true;
                request({
                    method:'post',
                    url:'/my/mood/add',
                    data:{
                        content:this.content,
                        status:this.status
                    }
                }).then(resp=>{
                    this.$message({
                        type:'success',
                        message:resp.data.msg
                    });
                    this.tableData.unshift(resp.data.data);
                    this.loading = false;
                    this.content=''
                });

               this.dialogVisible=false;
            },
            handleSelectionChange(val){
                var arr =[];
                for(var i=0;i<val.length;i++){
                    arr.push(val[i].id);
                }
                this.multipleSelection=arr;
            },
            DeleteMany(){

                request({
                    url:'/my/mood/delete/many',
                    params:{
                        ids:this.multipleSelection
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