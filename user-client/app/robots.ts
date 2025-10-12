import { METADATA_URL } from "@/shared/model";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NODE_ENV === "production";
  const siteUrl = METADATA_URL;

  // For dev deploy
  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      // Google
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: "/api/",
      },
      // Yandex
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: "/api/",
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: "/api/",
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: "/api/",
      },
      // Applebot
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: "/api/",
      },
      // Others
      {
        userAgent: "*",
        disallow: "/api/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
