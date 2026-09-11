/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["@mantine/hooks"],
  },
  async redirects() {
    // /ubicacion was folded into /contactos; keep old links alive.
    return [{ source: "/ubicacion", destination: "/contactos", permanent: true }];
  },
};

export default nextConfig;
