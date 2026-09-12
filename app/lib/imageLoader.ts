// Static export has no image optimiser; this loader only prefixes the GitHub
// Pages base path so `<Image src="/images/...">` keeps working under /<repo>/.
export default function imageLoader({ src }: { src: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return src.startsWith("/") ? `${base}${src}` : src;
}
