const heroInfo = {
  name: "heroInfo",
  title: "Hero Info",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon",
      type: "image",
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default heroInfo;
