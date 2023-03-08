import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src')
    }
  },
  build: {
    // lib: {
    //   // 入口文件，因为库模式不能用html页面作为入口
    //   entry: resolve(__dirname,'src/index.ts'),
    //   // 库名称
    //   name: 'CwComponent',
    //   // 打包后文件的名称
    //   fileName: ((format) => `cw-component.${format}.ts`),
    //   // 不写也可以，默认就是['es','umd']
    //   formats: ['es','umd']
    // },
    rollupOptions: {
      external: ['vue','ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue',
          "ant-design-vue": "AntDesignvue"
        }
      }
    }
  }
})
