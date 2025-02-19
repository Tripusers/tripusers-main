import { PortableTextBlock } from "sanity";
import { ImagePropsSanity } from "./imageProps";

export type PrivacyPolicyAndTnc = {
  _id: string;
  createdAt: Date;
  privacyPolicyAndTnc: string;
  privacyPolicy: {
    title: string;
    updatedAt: string;
    bannerImage: ImagePropsSanity;
    content: PortableTextBlock[];
  };
  termsAndConditions: {
    title: string;
    updatedAt: string;
    bannerImage: ImagePropsSanity;
    content: PortableTextBlock[];
  };
};
