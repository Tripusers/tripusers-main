import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const ContactPage = {
  name: "contactUs",
  title: "Contact us",
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
      name: "formInfo",
      title: "Form Title",
      type: "string",
    },
    {
      name: "Address",
      title: "Address",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },

    {
      name: "ourOfficesSubtitle",
      title: "Subtitle in our office section",
      type: "string",
    },

    {
      name: "offices",
      title: "Offices Address",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "place",
              title: "Place",
              type: "string",
            },
            {
              name: "Address",
              title: "Full Address",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
};
export default ContactPage;
