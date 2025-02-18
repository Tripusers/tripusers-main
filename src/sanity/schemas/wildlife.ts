import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const wildlife = {
  name: "wildlife",
  title: "Wild life",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "cardImage",
      title: "Card Image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "isTrending",
      title: "Is trending",
      type: "boolean",
      description: "Select true if this country is Trending, false otherwise",
      initialValue: false,
    },
    {
      name: "bannerImages",
      title: "Banner Images",
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
      name: "mustDoThings",
      title: "Must do things",
      type: "object",
      fields: [
        {
          name: "isTrue",
          title: "Is true",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "subHeading",
          title: "Sub Heading",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "image",
                  title: "Image",
                  type: "image",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default wildlife;
