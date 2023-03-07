import { RouteRecordRaw } from 'vue-router';
export const PAGE_ROUTE: RouteRecordRaw = {
    path: '/page-demo',
    name: 'page-demo',
    // component: ()=> import('@/views/index.vue'),
    redirect:'/page-demo/page',
    meta: {
        title: 'PageDemo',
        icon: 'user-outlined'
    },
    children: [
        {
            path: '/page-demo/page',
            name: 'page',
            component: () => import('@/views/page/index.vue'),
            meta: {
                icon: 'user-outlined',
                title: 'Page',
            }
        }
    ]
}