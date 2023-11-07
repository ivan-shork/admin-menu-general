import { defineConfig } from 'vite'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'

export const viteVue2Config = defineConfig({
  plugins: [vue2()],
  server: {
    port: 3000,
  },
  resolve: {
  }
})

export default viteVue2Config
