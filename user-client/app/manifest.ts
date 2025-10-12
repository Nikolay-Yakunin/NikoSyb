import { METADATA_URL } from "@/shared/model";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nikolay-Yakunin.",
    short_name: "N-Y.",
    description:
      "Личный сайт Full-stack разработчика Nikolay-Yakunin (Николая Якунина).",
    start_url: METADATA_URL,
    scope: METADATA_URL,
    display: "standalone",
    display_override: ["minimal-ui"],
    background_color: "#000000",
    theme_color: "#000000",
    lang: "ru",
    dir: "ltr",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    shortcuts: [
      {
        name: "Nikolay-Yakunin blog.",
        short_name: "N-Y blog.",
        url: METADATA_URL + "/blog",
        icons: [{ src: "/favicon.ico", sizes: "any" }],
      },
    ],
  };
}
