/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos'],
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