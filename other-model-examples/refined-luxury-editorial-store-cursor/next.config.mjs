/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Temporary media is served from public/media as plain files; remote shots can be
    // added here when the owner's own photography is uploaded.
    remotePatterns: [],
  },
}

export default nextConfig