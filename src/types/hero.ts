import { international } from "./international";
export type hero = {
  _id: string;
  createdAt: Date;
  title: string;
  place: international;
  heroImage: {
    asset: {
      url: string;
    };
    hotspot: {
      height: number;
      width: number;
      x: number;
      y: number;
    };
    crop: {
      right: number;
      top: number;
      left: number;
      bottom: number;
    };
  };
};
