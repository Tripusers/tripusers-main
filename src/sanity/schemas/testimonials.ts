import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const testimonials = {
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "title",
      title: "title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: "Review date",
      name: "reviewDate",
      type: "date",
    },
    {
      name: "tripTo",
      title: "Trip To",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "profile",
      title: "Profile",
      type: "object",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "image",
          title: "Profile Image",
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "rating",
      title: "Rating",
      type: "string",
      initialValue: "5-star",
      options: {
        list: [
          { title: "5-Star", value: "5-star" },
          { title: "4-Star", value: "4-star" },
          { title: "3-Star", value: "3-star" },
          { title: "2-Star", value: "2-star" },
          { title: "1-Star", value: "1-star" },
        ],
      },
    },
    {
      name: "shortReview",
      title: "Short Review",
      type: "string",
    },
    {
      name: "hashtags",
      title: "Hashtags",
      type: "array",
      description: "Don't add more than 5 Hashtags",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          sources: [unsplashAssetSource],
        },
      ],
      options: {
        layout: "grid",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "fullReview",
      title: "Full Review",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default testimonials;
