/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.0.12', '10.139.1.141'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rsupkzzytmunljdqhgsn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
