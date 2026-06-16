// frontend/proxy.ts
import { createProxyMiddleware } from 'http-proxy-middleware';

export default function proxy() {
  return {
    '/api': {
      target: 'https://future-techbackend-96v27nfgu-play-b-s-projects.vercel.app',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // Сохраняем префикс /api при пересылке на NestJS
      },
    },
  };
}