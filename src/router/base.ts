import { RouteRecordRaw } from "vue-router";

/**
 * 首页
 */
export const HOME_PATH = '/home';

/**
 * 首页路由配置
 */
export const HOME_ROUTE: RouteRecordRaw = {
    path: HOME_PATH,
    name: 'home',
    component: ()=> import('@/views/home.vue'),
    meta: {
        title: '首页',
        icon: 'user-outlined'
    }
}

/**
 * 登录页 
 */
export const LOGIN_PATH = '/login';

/**
 * 登录页路由配置
 */
export const LOGIN_ROUTE: RouteRecordRaw = {
    path: LOGIN_PATH,
    component: ()=> import('@/views/login.vue'),
    meta: {
        title: '登录',
        icon: ''
    }
}