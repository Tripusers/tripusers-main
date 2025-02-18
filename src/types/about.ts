import { PortableTextBlock } from "sanity";

export type About = {
  _id: string;
  createdAt: Date;
  title: string;
  subtitle: string;
  bannerImage: string;
  aboutTitle: string;
  aboutDescription: PortableTextBlock[];
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  vision: {
    title: string;
    description: string;
  };
  mission: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    description: string;
  };
  join: {
    title: string;
    description: string;
  };
  quote: string;
};
