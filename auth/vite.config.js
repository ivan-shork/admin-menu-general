import { defineConfig } from "vite"
import path from 'path'
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, `./dist`),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      formats: ['es', 'cjs', 'umd'],
      name: 'index',
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['axios'],
    }
  }
})