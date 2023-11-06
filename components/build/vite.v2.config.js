import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import { baseBuildConfig } from './vite.base.config'

export const viteVue2Config = defineConfig({
  plugins: [vue2(), ScriptSetup({})],
  resolve: {
    alias: {
      'vue-demi': resolve(__dirname, '../node_modules/vue-demi/lib/v2/index.mjs'),
    },
  },
  build: {
    ...baseBuildConfig.build,
    outDir: resolve(__dirname, '../dist/v2')
  }
})

export default viteVue2Config
