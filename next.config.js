/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { 
    baseUrl: "https://fastkart-frontend-rest.vercel.app/", 
    URL: "https://api.liranovawebapi.shinewell.in/api",
    storageURL:"https://api.liranovawebapi.shinewell.in",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.liranovawebapi.shinewell.in",
      },
      { 
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "liranovawebapi.shinewell.in",
      },
      {
        protocol: "http",
        hostname: "laravel.pixelstrap.net/fastkart",
      },
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net/fastkart",
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'seeklogo.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'wikipedia.org',
      },
      {
        protocol: 'https',
        hostname: 'developer.apple.com',
      },
    ],
  },
};

module.exports = nextConfig;
