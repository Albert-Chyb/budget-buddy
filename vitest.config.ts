import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    clearMocks: true,
  },
  resolve: viteConfig.resolve,
});
