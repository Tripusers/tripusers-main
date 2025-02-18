import { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tripusers.com",
    short_name: "Trip users",
    start_url: "/",
    display: "standalone",
    icons: [
      {
        src: "/favicon.ico",
        type: "image/x-icon",
        purpose: "any",
        sizes: "48x48",
      },
    ],
  };
}
