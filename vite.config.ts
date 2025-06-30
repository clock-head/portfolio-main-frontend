import { defineConfig, type UserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',

    css: true,
  },
  resolve: {
    alias: {
      'athena-core': '/athena-core/dist',
      'athena-core/ref': '/athena-core/dist/ref',
    },
  },
} satisfies UserConfig);
