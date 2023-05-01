/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/600x400/**',
      },
    ],
  },

 

  experimental: {
    appDir: true,
  },
  // images: {
  //   domains: ['placehold.co'],
  // },
}

// 600x400/000000/FFFFFF.png) 


module.exports = nextConfig
