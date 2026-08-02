import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // Exclude Office files from the watcher to prevent EBUSY crashes on Windows
      ignored: ['**/*.docx', '**/*.xlsx', '**/*.pptx', '**/*.doc'],
    },
  },
});
