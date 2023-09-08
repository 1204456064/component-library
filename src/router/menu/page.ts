import { RouteRecordRaw } from 'vue-router';
export const PAGE_ROUTE: RouteRecordRaw = {
    path: '/page-demo',
    name: 'page-demo',
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
        },
        {
            path: '/page-demo/table',
            name: 'table',
            component: () => import('@/views/table/index.vue'),
            meta: {
                icon: 'user-outlined',
                title: 'table',
            }
        },
        {
            path: '/page-demo/nb-table',
            name: 'nb-table',
            component: () => import('@/views/table/nb-table.vue'),
            meta: {
                icon: 'user-outlined',
                title: 'nb-table',
            }
        },
        {
            path: '/page-demo/preview',
            name: 'preview',
            component: () => import('@/views/preview/index.vue'),
            meta: {
                icon: 'user-outlined',
                title: 'preview',
            }
        }
    ]
}