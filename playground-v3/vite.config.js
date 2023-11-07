import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue3 from '@vitejs/plugin-vue'
export const viteVue2Config = defineConfig({
  plugins: [vue3()],
  resolve: {
  }
})

export default viteVue2Config
