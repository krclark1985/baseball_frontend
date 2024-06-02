import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // https://stackoverflow.com/questions/75883720/504-outdated-optimize-dep-while-using-react-vite
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }, 
  resolve: {
    alias: {
      src: path.resolve('/src'),
    },
  },
})
