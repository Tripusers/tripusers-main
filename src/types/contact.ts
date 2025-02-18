import { PortableTextBlock } from "sanity";

export type contactUs = {
  _id: string;
  _createdAt: Date;
  title: string;
  subtitle: string;
  bannerImage: string;
  formInfo: string;
  Address: PortableTextBlock[];
  email: string;
  phone: string;

  ourOfficesSubtitle: string;
  offices: {
    place: string;
    Address: PortableTextBlock[];
  }[];
};
