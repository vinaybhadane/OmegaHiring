import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://careers.abhyasmitra.in";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/contact", "/privacy", "/terms", "/refund"],
        disallow: [
          "/dashboard",
          "/profile",
          "/success",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}