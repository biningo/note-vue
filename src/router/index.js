import VueRouter from "vue-router";
import Vue from 'vue'


Vue.use(VueRouter);

const routes=[
        {
          path:'/',
          redirect:'/files'
        },
        {
                name:"files",
                path:"/files",
                component:()=>import("../pages/files/files.vue")
        },
        {
                name:"write",
                path:"/write",
                component:()=>import("../pages/write/write.vue")
        },

        {
                name:"rubbish",
                path:"/rubbish",
                component:()=>import("../pages/rubbish/rubbish.vue")
        },
        {
                name:"tag",
                path:"/tag",
                component:()=>import("../pages/tag/tag.vue")
        },
        {
                name:"manage",
                path:"/manage",
                component:()=>import("../pages/manage/manage.vue")
        }



];

const router=new VueRouter({
        routes,
        mode:'history'
});


export default router;