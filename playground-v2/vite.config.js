import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'

export const viteVue2Config = defineConfig({
  plugins: [vue2()],
  server: {
    port: 2000,
  },
  resolve: {
  }
})

export default viteVue2Config
