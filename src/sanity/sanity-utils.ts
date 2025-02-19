import { createClient, groq } from "next-sanity";
import clientConfig from "./config/client-config";

import { Domestic, DomesticPackages } from "../types/domestic";
import { international, internationalPackages } from "../types/international";
import { wildLife, wildlifePackage } from "../types/wildlife";
import { contactUs } from "../types/contact";
import { trending } from "../types/trending";
import { special, specialPackages } from "../types/special";
import { footer } from "../types/footer";
import { About } from "../types/about";
import { PrivacyPolicyAndTnc } from "../types/privacyPolicyAndTnc";
import Testimonial from "../types/testimonials";
import { Itinerary } from "../types/itinerary";
import { brand } from "@/types/brand";
import { hero } from "@/types/hero";
import { heroInfo } from "@/types/heroInfo";

//*------------------> Brand

export async function getBrand(): Promise<brand[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "brand"] {
      _id,
      _createdAt,
      name,
      "headerImage": headerImage.asset->url,
      "darkImage": darkImage.asset->url,
      "lightImage": lightImage.asset->url,
      "logoMark": logoMark.asset->url
    }`
  );
}

//*------------------> Hero Section

export async function getHero(): Promise<hero[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "hero"] | order(_createdAt asc) {
       _id,
      _createdAt,
      title,
      place->{name, slug},
      "heroImage":heroImage{asset->{url, _id, metadata},hotspot,crop},
    }`
  );
}

export async function getHeroInfo(): Promise<heroInfo[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "heroInfo"] | order(_createdAt asc) {
      _id,
      _createdAt,
      subtitle,
      title,
      "icon": icon.asset->url,
    }`
  );
}

//*------------------> trending

export async function getTrending(): Promise<trending> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "trending"][0]  {
      _id,
      _createdAt,
      title,
      internationalName,
      internationalSubtitle,
      internationalSliderName,
      internationalSliderSubtitle,
      domesticName,
      domesticSubtitle,
      wildlifeName,
      wildlifeSubtitle,
      specialName,
      testimonialName,
      testimonialSubtitle,
    }`
  );
}

//*------------------> International

export async function getInternational(
  page: number = 1,
  pageSize: number = 9
): Promise<{ data: international[]; totalPages: number }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "international"] | order(_createdAt asc) [$start...$end] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id, url, metadata},hotspot,crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "hotspot": hotspot,
        "crop": crop,
        "metadata": asset->metadata,
      },
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          "hotspot": hotspot,
          "crop": crop,
          "metadata": asset->metadata,
        },
        timeline,
        deal,
        price,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              "hotspot": hotspot,
              "crop": crop,
              "metadata": asset->metadata,
            }
          }
        }
      },
    }`,
    { start, end }
  );

  const totalCount = await createClient(clientConfig).fetch(
    groq`count(*[_type == "international"])`
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}
export async function getInternational_site_map(): Promise<international[]> {
  const data = await createClient(clientConfig).fetch(
    groq`*[_type== "international"] {
    name,
    "slug":slug.current,
    _createdAt
  }`
  );
  return data;
}

export async function getInternationalSlug(
  slug: string
): Promise<international> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && slug.current == $slug][0] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id, url, metadata},hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "mustDoThings": mustDoThings {
        isTrue,
        heading,
        subHeading,
        description,
        "cards": cards[] {
          title,
          "image": image{asset->{_id, url, metadata},hotspot, crop}
        }
      },
      "travelTips": travelTips {
        isTrue,
        title,
        "cards": cards {
          "cardOne": cardOne {
            title,
            description,
          },
          "cardTwo": cardTwo {
            title,
            description,
          },
          "cardThree": cardThree {
            title,
            description,
          }
        }
      },
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          "asset": asset->{_id, url, metadata},
          hotspot,
          crop,
          "metadata": asset->metadata,
        },
        timeline,
        "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
        deal,
        price,
        priceActual,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              "asset": asset->{_id, url, metadata},
              "hotspot": hotspot,
              "crop": crop,
              "metadata": asset->metadata,
            }
          }
        }
      },
    }`,
    { slug }
  );
}

export async function getInternationalPackagesSlug(
  slug: string
): Promise<internationalPackages> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "internationalPackages" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      place->{name, slug},
      "packageImages": packageImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      timeline,
      "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
      deal,
      price,
      priceActual,
      priceSubtitle,
      aboutTheTour,
      inclusion,
      exclusion,
      "itinerary": itinerary[] {
        "title": title,
        "day": day,
        "description": description,
        "content": content[] {
          "title": title,
          "description": description,
          "images": images[] {
            "_id": asset->_id,
            "url": asset->url,
            "asset": asset->{_id, url, metadata},
            hotspot,
            crop,
            "metadata": asset->metadata,
          }
        }
      },
    }`,
    { slug }
  );
}

export async function getTrendingHomeInternational(
  isTrendingHomeIndex: string
): Promise<international[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && isTrendingHome == true && isTrendingHomeIndex == $isTrendingHomeIndex] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id,url,metadata}, hotspot, crop},
      isTrending,
      isTrendingHome,
      isTrendingHomeIndex,
      isTrendingSlider,
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`,
    { isTrendingHomeIndex }
  );
}

export async function getSliderHomeInternational(): Promise<international[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && isTrendingSlider == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id, url, metadata}, hotspot, crop},
      isTrending,
      isTrendingHome,
      isTrendingSlider,
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`
  );
}

export async function getTrendingInternational(): Promise<international[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "international" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id, url, metadata}, hotspot, crop},
      isTrending,
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`
  );
}

//*------------------> Domestic

export async function getDomestic(
  page: number = 1,
  pageSize: number = 9
): Promise<{ data: Domestic[]; totalPages: number }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "domestic" ] | order(_createdAt asc)[$start...$end] {
      _id,
      _createdAt,
      name,
      isTrending,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id, url, metadata}, hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "domesticPackages": *[_type == "domesticPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          hotspot,
          crop,
          "metadata": asset->metadata,
        },
        timeline,
        deal,
        price,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              hotspot,
              crop,
              "metadata": asset->metadata,
            }
          }
        }
      },
    }`,
    { start, end }
  );

  const totalCount = await createClient(clientConfig).fetch(
    groq`count(*[_type == "domestic"])`
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}

export async function getDomestic_site_map(): Promise<Domestic[]> {
  const data = await createClient(clientConfig).fetch(
    groq`*[_type== "domestic"] {
    name,
    "slug":slug.current,
    _createdAt
  }`
  );
  return data;
}

export async function getDomesticSlug(slug: string): Promise<Domestic> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domestic" && slug.current == $slug][0]  {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id, url, metadata}, hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "asset": asset->{_id, url, metadata},
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "mustDoThings": mustDoThings {
        isTrue,
        heading,
        subHeading,
        description,
        "cards": cards[] {
          title,
          "image": image{asset->{_id, url, metadata}, hotspot, crop}
        }
      },
      "domesticPackages": *[_type == "domesticPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          "asset": asset->{_id, url, metadata},
          hotspot,
          crop,
          "metadata": asset->metadata,
        },
        timeline,
        "addOns": addOns {
          isHotels,
          isFood,
          isTransport,
          isFlight,
          isSightseeing,
          isVisa,
        },
        deal,
        price,
        priceActual,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              hotspot,
              crop,
              "metadata": asset->metadata,
            }
          }
        }
      },
    }`,
    { slug }
  );
}

export async function getDomesticPackagesSlug(
  slug: string
): Promise<DomesticPackages> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domesticPackages" && slug.current == $slug][0]  {
     _id,
      _createdAt,
      title,
      "slug": slug.current,
      place->{name, slug},
      "packageImages": packageImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      timeline,
      "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
      deal,
      price,
      priceActual,
      priceSubtitle,
      aboutTheTour,
      inclusion,
      exclusion,
      "itinerary": itinerary[] {
        "title": title,
        "day": day,
        "description": description,
        "content": content[] {
          "title": title,
          "description": description,
          "images": images[] {
            "_id": asset->_id,
            "url": asset->url,
            "asset": asset->{_id, url, metadata},
            hotspot,
            crop,
            "metadata": asset->metadata,
          }
        }
      },
    }`,
    { slug }
  );
}

export async function getTrendingDomestic(): Promise<Domestic[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "domestic" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      isTrending,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      "domesticPackages": *[_type == "domesticPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`
  );
}

//*------------------> Wild Life

export async function getWildLife(
  page: number = 1,
  pageSize: number = 9
): Promise<{ data: wildLife[]; totalPages: number }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "wildlife"] | order(_createdAt asc)[$start...$end]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "wildlifePackage": *[_type == "WildLifePackage" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          hotspot,
          crop,
          "metadata": asset->metadata,
        },
        timeline,
        deal,
        price,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              hotspot,
              crop,
              "metadata": asset->metadata,
            }
          }
        }
      },
    }`,
    { start, end }
  );

  const totalCount = await createClient(clientConfig).fetch(
    groq`count(*[_type == "wildlife"])`
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}
export async function getWildLife_site_map(): Promise<wildLife[]> {
  const data = await createClient(clientConfig).fetch(
    groq`*[_type== "wildlife"] {
    name,
    "slug":slug.current,
    _createdAt
  }`
  );
  return data;
}

export async function getWildLifeSlug(slug: string): Promise<wildLife> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildlife" && slug.current == $slug][0]  {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "wildlifePackage": *[_type == "wildLifePackage" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          "asset": asset->{_id, url, metadata},
          hotspot,
          crop,
          "metadata": asset->metadata,
        },
        timeline,
        "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
        deal,
        price,
        priceActual,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              "asset": asset->{_id, url, metadata},
              hotspot,
              crop,
              "metadata": asset->metadata,
            }
          }
        }
      },
    }`,
    { slug }
  );
}

export async function getWildlifePackagesSlug(
  slug: string
): Promise<wildlifePackage> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildLifePackage" && slug.current == $slug][0]  {
    _id,
      _createdAt,
      title,
      "slug": slug.current,
      place->{name, slug},
      "packageImages": packageImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      timeline,
      "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
      deal,
      price,
      priceActual,
      priceSubtitle,
      aboutTheTour,
      inclusion,
      exclusion,
      "itinerary": itinerary[] {
        "title": title,
        "day": day,
        "description": description,
        "content": content[] {
          "title": title,
          "description": description,
          "images": images[] {
            "_id": asset->_id,
            "url": asset->url,
            "asset": asset->{_id, url, metadata},
            hotspot,
            crop,
            "metadata": asset->metadata,
          }
        }
      },
    }`,
    { slug }
  );
}

export async function getTrendingWildLife(): Promise<wildLife[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "wildlife" && isTrending == true] | order(_createdAt asc) {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      "wildlifePackage": *[_type == "wildLifePackage" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`
  );
}

//*---------------------> special

export async function getSpecial(): Promise<special[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "special"] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url, _id, metadata}, hotspot, crop},
      cardTitle,
      cardSubtitle,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
    }`
  );
}
export async function getSpecial_site_map(): Promise<special[]> {
  const data = await createClient(clientConfig).fetch(
    groq`*[_type== "special"] {
    name,
    "slug":slug.current,
    _createdAt
  }`
  );
  return data;
}

export async function getSpecialSlug(slug: string): Promise<special> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "special" && slug.current == $slug][0] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url, metadata, _id}, hotspot, crop},
      cardTitle,
      cardSubtitle,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "mustDoThings": mustDoThings {
        isTrue,
        heading,
        subHeading,
        description,
        "cards": cards[] {
          title,
          "image": image{asset->{url, _id, metadata}, hotspot, crop}
        }
      },
      "specialPackages": *[_type == "specialPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        place,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
          "asset": asset->{_id, url, metadata},
          hotspot,
          crop,
          "metadata": asset->metadata,
        },
        timeline,
        "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
        deal,
        price,
        priceActual,
        priceSubtitle,
        aboutTheTour,
        inclusion,
        exclusion,
        "itinerary": itinerary[] {
          "title": title,
          "day": day,
          "description": description,
          "content": content[] {
            "title": title,
            "description": description,
            "images": images[] {
              "_id": asset->_id,
              "url": asset->url,
              "asset": asset->{_id, url, metadata},
              hotspot,
              crop,
              "metadata": asset->metadata,
            }
          }
        }
      }
    }`,
    { slug }
  );
}

export async function getSpecialPackagesSlug(
  slug: string
): Promise<specialPackages> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "specialPackages" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      place,
      category->{name, slug},
      "packageImages": packageImages[] {
        "_id": asset->_id,
        "url": asset->url,
        "asset": asset->{_id, url, metadata},
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      timeline,
      "addOns": addOns {
         isHotels,
         isFood,
         isTransport,
         isFlight,
         isSightseeing,
         isVisa,
       },
      deal,
      price,
      priceActual,
      priceSubtitle,
      aboutTheTour,
      inclusion,
      exclusion,
      "itinerary": itinerary[] {
        "title": title,
        "day": day,
        "description": description,
        "content": content[] {
          "title": title,
          "description": description,
          "images": images[] {
            "_id": asset->_id,
            "url": asset->url,
            "asset": asset->{_id, url, metadata},
            hotspot,
            crop,
            "metadata": asset->metadata,
          }
        }
      }
    }`,
    { slug }
  );
}

//* ---------------------> Testimonials

export async function getTrendingTestimonials(): Promise<Testimonial[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "testimonials"] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      "cardImage": cardImage{asset->{_id,url, metadata}, hotspot, crop},
      reviewDate,
      shortReview,
      tripTo,
      "hashtags": hashtags[] {
        name,
      },
      "profile": profile {
        name,
        "image": image{asset->{_id, url, metadata}, hotspot, crop},
      },
      rating,
    }`
  );
}

export async function getTestimonials(
  page: number = 1,
  pageSize: number = 6
): Promise<{ data: Testimonial[]; totalPages: number }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "testimonials"] | order(_createdAt asc)[$start...$end] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      reviewDate,
      tripTo,
      "hashtags": hashtags[] {
        name,
      },
      "cardImage": cardImage{asset->{_id, url, metadata},hotspot,crop},    
      "profile": profile {
        name,
        "image": image{asset->{_id, url, metadata},hotspot,crop},
      },
      rating,
      shortReview,

    }`,
    { start, end }
  );

  const totalCount = await createClient(clientConfig).fetch(
    groq`count(*[_type == "testimonials"])`
  );

  const totalPages = Math.ceil(totalCount / pageSize);

  return { data, totalPages };
}

export async function getTestimonials_site_map(): Promise<Testimonial[]> {
  const data = await createClient(clientConfig).fetch(
    groq`*[_type== "testimonials"] {
    name,
    "slug":slug.current,
    _createdAt
  }`
  );
  return data;
}

export async function getTestimonialSlug(slug: string): Promise<Testimonial> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "testimonials" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      reviewDate,
      tripTo,
      "hashtags": hashtags[] {
        name,
      },
      "cardImage": cardImage{asset->{_id, url, metadata},hotspot, crop},    
      "profile": profile {
        name,
        "image": image{asset->{_id, url, metadata},hotspot, crop},
      },
      rating,
      shortReview,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      fullReview,
    }`,
    { slug }
  );
}

//* ---------------------> about

export async function getAbout(): Promise<About> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "about"][0]{
      _id,
      _createdAt,
      title,
      subtitle,
      "bannerImage":bannerImage{asset->{_id, url, metadata}, hotspot, crop},
      aboutTitle,
      aboutDescription,
      "imageOne": imageOne{asset->{_id, url, metadata}, hotspot, crop},
      "imageTwo": imageTwo{asset->{_id, url, metadata}, hotspot, crop},
      "imageThree": imageThree{asset->{_id, url, metadata}, hotspot, crop},
      "vision": vision {
        title,
        description,  
      },
      "mission": mission {
        title,
        description,  
      },
      "values": values {
        title,
        description,  
      },
      "join": join {
        title,
        description,  
      },
      quote,
    }`
  );
}

//* ---------------------> contact us

export async function getContactUsInfo(): Promise<contactUs> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "contactUs"][0]{
     _id,
      _createdAt,
      title,
      subtitle,
      "bannerImage":bannerImage{asset->{_id, url, metadata}, hotspot, crop},
      formInfo,
      Address,
      email,
      phone,
      ourOfficesSubtitle,
      "offices":offices[]{
        "Address":Address,
        "place":place
      }
    }`
  );
}

//* ---------------------> footer

export async function getFooter(): Promise<footer> {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'footer'][0]{
      _id,
      _createdAt,
      title,
      location,
      locationSubtitle,
      phone,
      phoneSubtitle,
      email,
      emailSubtitle,
      facebook,
      instagram,
      twitter,
    }`
  );
}

export async function getBottomBanner(): Promise<footer> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "footer"][0]{
      _id,
      _createdAt,
      "bottomBanner": bottomBanner {
        headline,
        description,
        "image": image{asset->{_id, url, metadata}, hotspot, crop}
      }
    }`
  );
}
//* ---------------------> Privacy Policy And Tnc

export async function getPrivacyPolicyAndTnc(): Promise<PrivacyPolicyAndTnc> {
  return createClient(clientConfig).fetch(
    groq`*[_type == 'privacyPolicyAndTnc'][0]{
      _id,
      _createdAt,
      privacyPolicyAndTnc,
      "privacyPolicy": privacyPolicy {
        title,
        updatedAt,
        "bannerImage":bannerImage{asset->{_id, url, metadata}, hotspot, crop},
        content,
      },
      "termsAndConditions": termsAndConditions {
        title,
        updatedAt,
        "bannerImage":bannerImage{asset->{_id, url, metadata}, hotspot, crop},
        content,
      },
    }`
  );
}

//* ---------------------> Itinerary

export async function getItinerary(): Promise<Itinerary[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "clientItinerarys"] {
      _id,
      _createdAt,
      title,
      clientName,
      clientNumber,
      tripTo,
      date,
      deal,
      adults,
      children,
      infant,
      "cardImage": cardImage{asset->{_id, url, metadata}, hotspot, crop},
      days,
      nights,
      itineraryTitle,
      activities,
      hotels,
      price,
      priceActual,
      "coverImages": coverImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      "placeImages": placeImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
        "metadata": asset->metadata,
      },
      inclusion,
      "itinerary": itinerary[] {
        title,
        day,
        date,
        description,
        "activaties": activaties[] {
          title,
          duration,
          ticketIncluded,
          "images": images[] {
            "_id": asset->_id,
            "url": asset->url,
            hotspot,
            crop,
            "metadata": asset->metadata,
          },
          description,
          experiences {
            title,
            "images": images[] {
              "image": image{asset->{_id, url, metadata}, hotspot, crop},
              caption,
            }
          }
        },
        stay {
          title,
          startsAt,
          endsAt,
          endDate,
          duration,
          isNight,
          stayDetails {
            title,
            subTitle,
            "rooms": rooms[] {
              room,
              roomDetails,
            },
            inclusions {
              isBreakfastIncluded,
              isLunchIncluded,
              isDinnerIncluded,
            }
          }
        }
      },
      exclusion,
      notes,
      fareBreakup {
        perAdult,
        perChild,
        perInfant,
        tax,
        taxAmount,
      }
    }`
  );
}
