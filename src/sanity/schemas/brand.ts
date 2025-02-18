const brand = {
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "logoMark",
      title: "Logo Mark",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "darkImage",
      title: "Dark Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "lightImage",
      title: "Light Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
};

export default brand;
