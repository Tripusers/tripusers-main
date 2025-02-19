import { PortableTextBlock } from "sanity";
import { Crop, Hotspot } from "./types";
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

export type wildlifePackage = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: {
    current: string;
  };
  place: wildLife;
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
  inclusion: PortableTextBlock[];
  aboutTheTour: PortableTextBlock[];
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

export type wildLife = {
  _id: string;
  _createdAt: Date;
  name: string;
  slug: {
    current: string;
  };
  cardImage: ImagePropsSanity;
  isTrending: boolean;
  bannerImages: ImagePropsSanity[];
  wildlifePackage: wildlifePackage[];
  mustDoThings: MustDoThings;
};
