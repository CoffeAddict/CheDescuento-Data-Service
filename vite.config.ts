import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'node16',
    outDir: 'dist',
    lib: {
      entry: './api/fetchData.ts',
      formats: ['cjs'],
    },
    rollupOptions: {
      external: ['fs', 'path'],
    },
  },
})