import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Particles from 'particles.vue3'
import { createPinia } from 'pinia' 
import { createPersistedState } from 'pinia-plugin-persistedstate';

const app = createApp(App)


const pinia = createPinia()
pinia.use(createPersistedState({
    serializer: { 
      // 指定参数序列化器
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    }
}));
app.use(pinia)
app.use(router)
app.use(Antd)
app.use(Particles)



app.mount('#app')
