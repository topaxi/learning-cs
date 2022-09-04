import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.join(__dirname, './index.html'),
        sw: path.join(__dirname, './sw.ts'),
      },
      output: {
        entryFileNames(assetInfo) {
          return assetInfo.name === 'sw'
            ? '[name].js'
            : 'assets/js/[name]-[hash].js'
        },
      },
    },
  },
})
