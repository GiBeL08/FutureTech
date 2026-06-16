import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Перехватываем все запросы к /api и перенаправляем на бэкенд на уровне Vercel
        source: '/api/:path*',
        destination: 'https://future-techbackend-96v27nfgu-play-b-s-projects.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;