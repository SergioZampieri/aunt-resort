// Static export for GitHub Pages. The site is served under /<repo>/ on
// github.io, so CI sets NEXT_PUBLIC_BASE_PATH="/aunt-resort"; locally it is
// empty and everything lives at the root as before.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath,
  trailingSlash: true,
  images: { loader: "custom", loaderFile: "./app/lib/imageLoader.ts" },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  experimental: {
    optimizePackageImports: ["@mantine/hooks"],
  },
  // /ubicacion -> /contactos lives in app/ubicacion/page.tsx (a static
  // export has no server-side redirects).
};

export default nextConfig;
