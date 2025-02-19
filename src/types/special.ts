import { PortableTextBlock } from "sanity";
import { ImagePropsSanity } from "./imageProps";

export type Cards = {
  title: string;
  image: ImagePropsSanity;
};

export type MustDoThings = {
  isTrue: boolean;
  heading: string;
  subHeading: string;
  description: string;
  cards: Cards[];
};

export type specialPackages = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: {
    current: string;
  };
  category: special;
  place: string;
  packageImages: ImagePropsSanity[];
  timeline: string;
  addOns: {
    isHotels: boolean;
    isFood: boolean;
    isTransport: boolean;
    isFlight: boolean;
    isSightseeing: boolean;
    isVisa: boolean;
  };
  deal: string;
  price: number;
  priceActual: number;
  priceSubtitle: string;
  aboutTheTour: PortableTextBlock[];
  inclusion: PortableTextBlock[];
  exclusion: PortableTextBlock[];
  itinerary: {
    title: string;
    day: number;
    description: PortableTextBlock[];
    content: {
      title: string;
      description: PortableTextBlock[];
      images: ImagePropsSanity[];
    }[];
  }[];
};

export type special = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: {
    current: string;
  };
  cardImage: ImagePropsSanity;
  cardTitle: string;
  cardSubtitle: string;
  bannerImages: ImagePropsSanity[];
  specialPackages: specialPackages[];
  mustDoThings: MustDoThings;
};
