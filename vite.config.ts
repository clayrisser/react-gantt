import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'demo',
  base: './',
  plugins: [react()],
  server: { port: 8888 },
  build: { outDir: 'dist' },
});
