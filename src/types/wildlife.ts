import { PortableTextBlock } from "sanity";
import { Crop, Hotspot } from "./types";

export type Cards = {
  title: string;
  image: "string";
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
  packageImages: {
    _id: string;
    url: string;
    hotspot: Hotspot;
    crop: Crop;
  }[];
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
      images: {
        _id: string;
        url: string;
      }[];
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
  cardImage: {
    asset: {
      _id: string;
      url: string;
    };
    hotspot: Hotspot;
    crop: Crop;
  };
  isTrending: boolean;
  bannerImages: {
    _id: string;
    url: string;
    hotspot: Hotspot;
    crop: Crop;
  }[];
  wildlifePackage: wildlifePackage[];
  mustDoThings: MustDoThings;
};
