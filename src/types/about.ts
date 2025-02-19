import { PortableTextBlock } from "sanity";
import { ImagePropsSanity } from "./imageProps";

export type About = {
  _id: string;
  createdAt: Date;
  title: string;
  subtitle: string;
  bannerImage: ImagePropsSanity;
  aboutTitle: string;
  aboutDescription: PortableTextBlock[];
  imageOne: ImagePropsSanity;
  imageTwo: ImagePropsSanity;
  imageThree: ImagePropsSanity;
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
