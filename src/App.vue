<template>
  <div id="app">

<!--      顶部导航-->
      <el-row >

          <el-menu  mode="horizontal" >

            <el-menu-item >
                都说你眼中开倾世桃花，却如何一夕桃花雨下。

            </el-menu-item>

            <el-menu-item style="padding-left: 60%" >
                <el-dropdown @command="Link">
      <span class="el-dropdown-link">
         <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>

      </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item >admin</el-dropdown-item>
                        <el-dropdown-item command="manage" ><i class="el-icon-s-tools"></i>管理</el-dropdown-item>
                        <el-dropdown-item >退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-menu-item>
              <el-menu-item  >关于</el-menu-item>
              <el-menu-item><i class="el-icon-more"></i></el-menu-item>
          </el-menu>



      </el-row>

      <el-row style="margin-bottom: 1%">

<!--          侧边导航-->
        <el-col :span="1">


            <el-menu :default-active="navIndex" class="el-menu-vertical-demo"  :collapse="true">
                <el-menu-item index="write" @click="Link('write')">
                    <i class="el-icon-edit"></i>
                    <span slot="title" >写笔记</span>
                </el-menu-item>

                <el-menu-item index="backlog" @click="Link('backlog')">
                    <i class="el-icon-alarm-clock"></i>
                    <span slot="title">待办</span>
                </el-menu-item>


                <el-menu-item index="files" @click="Link('files')">
                    <i class="el-icon-folder-opened"></i>
                    <span slot="title">文件夹</span>
                </el-menu-item>


                <el-menu-item index="tag" @click="Link('tag')">
                    <i class="el-icon-collection-tag"></i>
                    <span slot="title">标签</span>
                </el-menu-item>

                <el-menu-item index="manage" @click="Link('manage')"><i class="el-icon-s-tools"></i><span slot="title">管理</span> </el-menu-item>

                <el-menu-item index="rubbish" @click="Link('rubbish')">
                    <i class="el-icon-delete"></i>
                    <span slot="title">回收站</span>
                </el-menu-item>

                <el-menu-item index="timeline" @click="Link('timeline')">
                    <i class="el-icon-sunny"></i>
                    <span slot="title">时间轴</span>
                </el-menu-item>


            </el-menu>


<!--            <div class="card">-->
<!--                 <div>-->
<!--                    <span>打破企业间壁垒，提供便捷的接入方式，实现不企业，不同品牌、不同类型间的家电的数据互联互通和数据协同</span>-->
<!--                </div>-->
<!--            </div>-->

        </el-col>


<!--         页面-->
          <el-col :span="23" >


              <router-view></router-view>


          </el-col>

      </el-row>



  </div>
</template>

<script>


export default {
  name: 'app',
  data() {
       return{
           rate:null
       }
    },
  methods:{

      Link(path){
          this.$router.push("/"+path)
      }

  },
    computed:{
        navIndex() {
            return this.$route.name;
        }
    }



}
</script>

<style>


    .card{

        background-color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 4px;
        display: inline-block;
        margin-right: 4%;
        margin-top: 20%;
        vertical-align: top;
    }
    .card span {
        font-size: 12px;
        color: deepskyblue;
        display: block;
        letter-spacing: 2px;
        padding: 30px 20px;
    }


</style>
