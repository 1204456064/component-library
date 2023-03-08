import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Particles from 'particles.vue3'
import { createPinia } from 'pinia' 


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(Particles)



app.mount('#app')
