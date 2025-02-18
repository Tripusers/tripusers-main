import { PortableTextBlock } from "sanity";

export type PrivacyPolicyAndTnc = {
  _id: string;
  createdAt: Date;
  privacyPolicyAndTnc: string;
  privacyPolicy: {
    title: string;
    updatedAt: string;
    bannerImage: string;
    content: PortableTextBlock[];
  };
  termsAndConditions: {
    title: string;
    updatedAt: string;
    bannerImage: string;
    content: PortableTextBlock[];
  };
};
