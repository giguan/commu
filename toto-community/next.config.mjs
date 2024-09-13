/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 빌드 시 타입 에러 무시
  },
  images: {
    domains: [
      'picsum.photos',
      'source.unsplash.com',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3095', // 필요한 경우 포트 번호도 추가
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        pathname: '/avatar/**',
      },
      {
        protocol: 'https',
        hostname: 'robohash.org',
        pathname: '/**',
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:3095/api/:path*', // 백엔드 서버로 프록시
  //     },
  //     ,
  //     {
  //       "source": "/(.*)",
  //       "destination": "/"
  //     }
  //   ];
  // },
};

export default nextConfig;