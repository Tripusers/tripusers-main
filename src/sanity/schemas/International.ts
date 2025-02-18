import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const international = {
  name: "international",
  title: "International",
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
      name: "isTrendingHome",
      title: "Is trending on Home",
      type: "boolean",
      description:
        "Select true if this country is Trending and show it in home page, false otherwise",
      initialValue: false,
    },
    {
      name: "isTrendingHomeIndex",
      title: "Trending Home Index",
      type: "string",
      initialValue: "none",
      description: "if is trending on Home true then select index",
      options: {
        list: [
          { title: "none", value: "none" },
          { title: "index-1", value: "0" },
          { title: "index-2", value: "1" },
          { title: "index-3", value: "2" },
          { title: "index-4", value: "3" },
          { title: "index-5", value: "4" },
          { title: "index-6", value: "5" },
          { title: "index-7", value: "6" },
          { title: "index-8", value: "7" },
          { title: "index-9", value: "8" },
        ],
      },
    },
    {
      name: "isTrendingSlider",
      title: "Is trending on Slider",
      type: "boolean",
      description:
        "Select true if this country is Trending on home slider, false otherwise",
      initialValue: false,
    },
    {
      name: "bannerImages",
      title: "Country Images",
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
    {
      name: "travelTips",
      title: "Travel Tips",
      type: "object",
      fields: [
        {
          name: "isTrue",
          title: "Is true",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "cards",
          title: "Cards",
          type: "object",
          fields: [
            {
              name: "cardOne",
              title: "Card One (Visa)",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
              ],
            },
            {
              name: "cardTwo",
              title: "Card Two (Safety)",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
              ],
            },
            {
              name: "cardThree",
              title: "Card Three (Currency)",
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default international;
