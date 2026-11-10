import path from "path"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Pin the workspace root: a lockfile higher up the tree otherwise confuses root inference.
  turbopack: { root: path.join(__dirname) },
}

export default nextConfig
