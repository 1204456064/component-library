import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // 入口文件，因为库模式不能用html页面作为入口
      entry: resolve(__dirname,'src/index.ts'),
      // 库名称
      name: 'CwComponent',
      // 打包后文件的名称
      fileName: ((format) => `cw-component.${format}.ts`),
      // 不写也可以，默认就是['es','umd']
      formats: ['es','umd']
    },
    rollupOptions: {
      external: ['vue','element-plus'],
      output: {
        globals: {
          vue: 'Vue',
          "element-plus": "ElementPlus",
        }
      }
    }
  }
})
