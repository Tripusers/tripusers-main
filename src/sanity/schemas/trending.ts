const trending = {
  name: "trending",
  title: "Trending",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "internationalName",
      title: "International Trending Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "internationalSubtitle",
      title: "International Trending Subtitle",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "internationalSliderName",
      title: "International Slider Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "internationalSliderSubtitle",
      title: "International Slider Subtitle",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "domesticName",
      title: "Domestic Trending Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "domesticSubtitle",
      title: "Domestic Trending Subtitle",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "wildlifeName",
      title: "Wildlife Trending Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "wildlifeSubtitle",
      title: "Wildlife Trending Subtitle",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "specialName",
      title: "Special Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "testimonialName",
      title: "Testimonial Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "testimonialSubtitle",
      title: "Testimonial Subtitle",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
  ],
};

export default trending;
