import { RouteRecordRaw } from 'vue-router';
import { HOME_ROUTE } from '../base'
import { PAGE_ROUTE } from './page';

 const menu:Array<RouteRecordRaw> = [
    HOME_ROUTE,
    PAGE_ROUTE
]

  export { menu }