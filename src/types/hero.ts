import { ImagePropsSanity } from "./imageProps";
import { international } from "./international";
export type hero = {
  _id: string;
  createdAt: Date;
  title: string;
  place: international;
  heroImage: ImagePropsSanity;
};
