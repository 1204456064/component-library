/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const component: ReturnType<typeof defineComponent> | any;
    export default component;
}
