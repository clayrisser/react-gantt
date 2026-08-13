import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.tsx' },
  format: ['esm', 'cjs'],
  outDir: 'lib',
  dts: true,
  sourcemap: true,
  clean: true,
  target: 'es2020',
});
