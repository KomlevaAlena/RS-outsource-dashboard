import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/Dashboard-app/',
  
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    },
    assetsInlineLimit: 4096,
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        charset: false
      }
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  
  server: {
    port: 3000,
    open: true
  }
})