import type { MetadataRoute } from "next";
//git not update
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["*"],
        disallow: ["/admin", "/studio"],
      },
    ],
    sitemap: "https://www.tripusers.com/sitemap.xml",
  };
}
