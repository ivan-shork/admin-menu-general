import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue3 from '@vitejs/plugin-vue'
import { baseBuildConfig } from './vite.base.config'
import * as compilerSfc from '@vue/compiler-sfc'
export const viteVue2Config = defineConfig({
  plugins: [vue3(
    {
      compiler: compilerSfc
    }
  )],
  resolve: {
    alias: {
      'vue-demi': resolve(__dirname, '../node_modules/vue-demi/lib/v3/index.mjs'),
    },
  },
  build: {
    ...baseBuildConfig.build,
    outDir: resolve(__dirname, '../dist/v3')
  }
})

export default viteVue2Config
