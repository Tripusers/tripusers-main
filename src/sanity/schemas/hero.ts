import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const hero = {
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "place",
      title: "Place",
      type: "reference",
      to: [{ type: "international" }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "heroImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default hero;
