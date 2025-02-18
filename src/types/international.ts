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

export type Card = {
  title: string;
  description: "string";
};

export type TravelTips = {
  isTrue: boolean;
  title: string;

  cards: {
    cardOne: Card;
    cardTwo: Card;
    cardThree: Card;
  };
};



export type CardImageHotspot = Hotspot;

export type internationalPackages = {
  _id: string;
  _createdAt: Date;
  title: string;
  slug: {
    current: string;
  };
  place: international;
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
      images: {
        _id: string;
        url: string;
      }[];
    }[];
  }[];
};

export type international = {
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
  cardImageHotspot: CardImageHotspot;
  isTrending: boolean;
  isTrendingHome: boolean;
  isTrendingHomeIndex: string;
  isTrendingSlider: boolean;
  bannerImages: {
    _id: string;
    url: string;
    hotspot: Hotspot;
    crop: Crop;
  }[];
  internationalPackages: internationalPackages[];
  mustDoThings: MustDoThings;
  travelTips: TravelTips;
};
