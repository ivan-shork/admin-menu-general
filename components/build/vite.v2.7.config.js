import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'
import { baseBuildConfig } from './vite.base.config'
import * as compilerSfc from 'compilerforv2'

// 此处因为@vue/compiler-sfc已经被vue3用了，必须重新别名安装和引用一个vue2版的@vue/compiler-sfc
export const viteVue2Config = defineConfig({
  plugins: [vue2({
    compiler: compilerSfc
  })],
  resolve: {
    alias: {
      'vue-demi': resolve(__dirname, '../node_modules/vue-demi/lib/v2.7/index.mjs'),
    },
  },
  build: {
    ...baseBuildConfig.build,
    outDir: resolve(__dirname, '../dist/v2.7')
  }
})

export default viteVue2Config
