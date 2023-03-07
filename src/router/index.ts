import { RouteRecordRaw } from 'vue-router';
import  * as VueRouter from 'vue-router'
import {LOGIN_ROUTE } from './base'
import { menu } from './menu/menu'

 const routes:Array<RouteRecordRaw> = [
    {
      path: '/',
      name: '/',
      component: () => import('@/layout/index.vue'),
      // redirect: '/home',
      meta: {
          icon: 'el-icon-setting',
          title: 'INDEX',
      },
      children: menu,
    },
    LOGIN_ROUTE
]

const router = VueRouter.createRouter({
    // 哈希到服务器上不会刷新空白
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })

  export default router

  export { routes }