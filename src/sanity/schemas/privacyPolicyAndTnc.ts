import { unsplashAssetSource } from "sanity-plugin-asset-source-unsplash";

const privacyPolicyAndTnc = {
  name: "privacyPolicyAndTnc",
  title: "Privacy Policy & TNC",
  type: "document",
  fields: [
    {
      name: "privacyPolicyAndTnc",
      title: "Privacy Policy & TNC",
      type: "string",
    },
    {
      name: "privacyPolicy",
      title: "Privacy Policy",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "updatedAt",
          title: "Updated At",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "bannerImage",
          title: "Banner image",
          type: "image",
          options: { hotspot: true, sources: [unsplashAssetSource] },
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
    {
      name: "termsAndConditions",
      title: "Terms & Conditions",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "updatedAt",
          title: "Updated At",
          type: "string",
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: "bannerImage",
          title: "Banner image",
          type: "image",
          options: { hotspot: true, sources: [unsplashAssetSource] },
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
  ],
};

export default privacyPolicyAndTnc;
