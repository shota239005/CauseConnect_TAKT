import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // @ が src フォルダを指すように設定
    },
  },
  server: {
    host: '0.0.0.0', // 全てのネットワークからアクセス可能に
    port: 5173, // 変更可能
    }
  }
);
