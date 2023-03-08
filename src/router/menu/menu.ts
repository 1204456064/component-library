import { STORE_ROUTE } from './store';
import { RouteRecordRaw } from 'vue-router';
import { HOME_ROUTE } from '../base'
import { PAGE_ROUTE } from './page';

 const menu:Array<RouteRecordRaw> = [
    HOME_ROUTE,
    PAGE_ROUTE,
    STORE_ROUTE
]

  export { menu }