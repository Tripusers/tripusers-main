import { MetadataRoute } from "next";
import {
  getDomestic_site_map,
  getInternational_site_map,
  getSpecial_site_map,
  getTestimonials_site_map,
  getWildLife_site_map,
} from "../sanity/sanity-utils";

function escapeUrl(url: string): string {
  return url.replace(/&/g, "&amp;");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const get_all_domestic = await getDomestic_site_map();
  const get_all_international = await getInternational_site_map();
  const get_all_special = await getSpecial_site_map();
  const get_all_testimonials = await getTestimonials_site_map();
  const get_all_wildlife = await getWildLife_site_map();
  const all_domestic = get_all_domestic.map((v, i) => {
    return {
      url: `https://www.tripusers.com/domestic/${v.slug}`,
      lastModified: v._createdAt,
      changeFrequency: "monthly",
    } as MetadataRoute.Sitemap[0];
  });
  const all_international = get_all_international.map((v, i) => {
    return {
      url: `https://www.tripusers.com/international/${v.slug}`,
      lastModified: v._createdAt,
      changeFrequency: "monthly",
    } as MetadataRoute.Sitemap[0];
  });
  const all_special = get_all_special.map((v, i) => {
    return {
      url: `https://www.tripusers.com/special/${v.slug}`,
      lastModified: v._createdAt,
      changeFrequency: "monthly",
    } as MetadataRoute.Sitemap[0];
  });
  const all_testimonials = get_all_testimonials.map((v, i) => {
    return {
      url: `https://www.tripusers.com/testimonials/${v.slug}`,
      lastModified: v._createdAt,
      changeFrequency: "monthly",
    } as MetadataRoute.Sitemap[0];
  });
  const all_wildlife = get_all_wildlife.map((v, i) => {
    return {
      url: `https://www.tripusers.com/wild-life/${v.slug}`,
      lastModified: v._createdAt,
      changeFrequency: "monthly",
    } as MetadataRoute.Sitemap[0];
  });
  return [
    {
      url: "https://www.tripusers.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.tripusers.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://www.tripusers.com/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://www.tripusers.com/domestic",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    ...all_domestic,
    {
      url: "https://www.tripusers.com/international",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    ...all_international,
    {
      url: "https://www.tripusers.com/privacy-policy",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },

    {
      url: "https://www.tripusers.com/special",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    ...all_special,
    {
      url: escapeUrl("https://www.tripusers.com/terms-&-conditions"),
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    {
      url: "https://www.tripusers.com/testimonials",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    ...all_testimonials,
    {
      url: "https://www.tripusers.com/wild-life",
      lastModified: new Date(),
      changeFrequency: "monthly",
    },
    ...all_wildlife,
  ];
}
