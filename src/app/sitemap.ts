import type { MetadataRoute } from "next"
import { site } from "@/lib/site"

const routes = ["", "/gemstones", "/custom", "/about", "/contact"]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: r === "/gemstones" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }))
}
