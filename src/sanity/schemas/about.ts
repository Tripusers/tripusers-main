import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const about = {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    },
    {
      name: "bannerImage",
      title: "Banner image",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
    {
      name: "aboutTitle",
      title: "About Title",
      type: "string",
    },
    {
      name: "aboutDescription",
      title: "About Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "imageOne",
      title: "About Image One",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
    {
      name: "imageTwo",
      title: "About Image Two",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
    {
      name: "imageThree",
      title: "About Image Three",
      type: "image",
      options: { hotspot: true, sources: [unsplashAssetSource] },
    },
    {
      name: "vision",
      title: "Vision",
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
          type: "string",
        },
      ],
    },
    {
      name: "mission",
      title: "Mission",
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
          type: "string",
        },
      ],
    },
    {
      name: "values",
      title: "Values",
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
          type: "string",
        },
      ],
    },
    {
      name: "join",
      title: "Join Us",
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
          type: "string",
        },
      ],
    },
    {
      name: "quote",
      title: "Quote",
      type: "string",
    },
  ],
};

export default about;
