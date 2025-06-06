import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignora todos los errores de ESLint durante el build
  },
  webpack: (config) => {
    // Ignorar advertencias sobre case-sensitivity
    config.ignoreWarnings = [
      { module: /node_modules\/next/ },
      { message: /There are multiple modules with names that only differ in casing/ }
    ];
    return config;
  }
};

export default nextConfig;
