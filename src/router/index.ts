import  * as VueRouter from 'vue-router'
import Home from '@/views/home.vue'
import Login  from '@/views/login.vue'

const routes = [
    { path: '/login', component: Home },

    { path: '/', component: Login },

]

const router = VueRouter.createRouter({
    // 哈希到服务器上不会刷新空白
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

  export default router