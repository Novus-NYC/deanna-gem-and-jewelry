import path from "path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Pin the workspace root: a lockfile higher up the tree otherwise confuses root inference.
  turbopack: { root: path.join(__dirname) },
  // The first build called the gallery "the case" at /collection.
  async redirects() {
    return [{ source: "/collection", destination: "/gemstones", permanent: true }]
  },
}

export default nextConfig
