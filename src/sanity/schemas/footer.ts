const footer = {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "location",
      title: "Location Title",
      type: "string",
    },
    {
      name: "locationSubtitle",
      title: "Location Subtitle",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone Title",
      type: "string",
    },
    {
      name: "phoneSubtitle",
      title: "Phone Subtitle",
      type: "string",
    },
    {
      name: "email",
      title: "Email Title",
      type: "string",
    },
    {
      name: "emailSubtitle",
      title: "Email Subtitle",
      type: "string",
    },
    {
      name: "facebook",
      title: "Facebook Link",
      type: "string",
    },
    {
      name: "instagram",
      title: "Instagram Link",
      type: "string",
    },
    {
      name: "twitter",
      title: "Twitter Link",
      type: "string",
    },
    {
      name: "bottomBanner",
      title: "Bottom Banner",
      type: "object",
      fields: [
        {
          name: "headline",
          title: "Headline",
          type: "string",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "image",
          title: "Image",
          type: "image",
        },
      ],
    },
  ],
};

export default footer;
