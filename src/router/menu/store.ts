import { RouteRecordRaw } from 'vue-router';
export const STORE_ROUTE: RouteRecordRaw = {
    path: '/store-demo',
    name: 'store-demo',
    redirect:'/store-demo/store',
    meta: {
        title: 'StoreDemo',
        icon: 'user-outlined'
    },
    children: [
        {
            path: '/store-demo/store',
            name: 'store',
            component: () => import('@/views/store/index.vue'),
            meta: {
                icon: 'user-outlined',
                title: 'Store',
            }
        }
    ]
}