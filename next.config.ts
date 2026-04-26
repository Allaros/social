import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
   // ============================= Оптимизация =============================
   reactStrictMode: false,
   typescript: {
      ignoreBuildErrors: true,
   },

   eslint: {
      ignoreDuringBuilds: true,
   },

   webpack: (config, { dev }) => {
      if (dev) {
         config.experiments = {
            ...config.experiments,
            lazyCompilation: true,
         };
      }
      return config;
   },
   // ============================= Оптимизация =============================
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
         },
         {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
         },
         {
            protocol: 'https',
            hostname: 'cdn.discordapp.com',
         },
         {
            protocol: 'https',
            hostname: 'wkxvyhsgbdmqbvfphdej.supabase.co',
         },
      ],
   },
};

export default nextConfig;
