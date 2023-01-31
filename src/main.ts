import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


const app = createApp(App)

app.use(Antd)

app.mount('#app')
