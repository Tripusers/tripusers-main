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
      "heroImage":heroImage{asset->{url},hotspot,crop},
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
): Promise<{ data: international[]; totalPages: number; }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "international"] | order(_createdAt asc) [$start...$end] {
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url},hotspot,crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
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
      "cardImage": cardImage{asset->{url},hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
      },
      "mustDoThings": mustDoThings {
        isTrue,
        heading,
        subHeading,
        description,
        "cards": cards[] {
          title,
          "image": image.asset->url
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
      "cardImage": cardImage{asset->{url}, hotspot, crop},
      "cardImageHotspot": cardImage.hotspot{
        width,
        height,
        x,
        y,
      },
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
      "cardImage": cardImage{asset->{url}, hotspot, crop},
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
      "cardImage": cardImage{asset->{url}, hotspot, crop},
      isTrending,
      "internationalPackages": *[_type == "internationalPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        price,
      },
    }`,
  );
}

//*------------------> Domestic

export async function getDomestic(
  page: number = 1,
  pageSize: number = 9
): Promise<{ data: Domestic[]; totalPages: number; }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "domestic" ] | order(_createdAt asc)[$start...$end] {
      _id,
      _createdAt,
      name,
      isTrending,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url}, hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "domesticPackages": *[_type == "domesticPackages" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
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
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
      },
      "mustDoThings": mustDoThings {
        isTrue,
        heading,
        subHeading,
        description,
        "cards": cards[] {
          title,
          "image": image.asset->url
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
      "cardImage": cardImage{asset->{url}, hotspot, crop},
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
): Promise<{ data: wildLife[]; totalPages: number; }> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const data = await createClient(clientConfig).fetch(
    groq`*[_type == "wildlife"] | order(_createdAt asc)[$start...$end]{
      _id,
      _createdAt,
      name,
      "slug": slug.current,
      "cardImage": cardImage{asset->{url}, hotspot, crop},
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
      },
      "wildlifePackage": *[_type == "WildLifePackage" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
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
      "cardImage": cardImage.asset->url,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
      },
      "wildlifePackage": *[_type == "wildLifePackage" && references(^._id)] {
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        "packageImages": packageImages[] {
          "_id": asset->_id,
          "url": asset->url,
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
        hotspot,
        crop,
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
      "cardImage": cardImage{asset->{url}, hotspot, crop},
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
      "cardImage": cardImage.asset->url,
      cardTitle,
      cardSubtitle,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
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
      "cardImage": cardImage.asset->url,
      cardTitle,
      cardSubtitle,
      "bannerImages": bannerImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
      },
      "mustDoThings": mustDoThings {
        isTrue,
        heading,
        subHeading,
        description,
        "cards": cards[] {
          title,
          "image": image.asset->url
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
        hotspot,
        crop,
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
      "cardImage": cardImage{asset->{url}, hotspot, crop},
      reviewDate,
      shortReview,
      tripTo,
      "hashtags": hashtags[] {
        name,
      },
      "profile": profile {
        name,
        "image": image.asset->url,
      },
      rating,
    }`
  );
}

export async function getTestimonials(
  page: number = 1,
  pageSize: number = 6
): Promise<{ data: Testimonial[]; totalPages: number; }> {
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
      "cardImage": cardImage{asset->{url},hotspot,crop},    
      "profile": profile {
        name,
        "image": image.asset->url,
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
      "cardImage": cardImage{asset->{url},hotspot, crop},    
      "profile": profile {
        name,
        "image": image.asset->url,
      },
      rating,
      shortReview,
      "images": images[] {
        "_id": asset->_id,
        "url": asset->url,
        "hotspot": hotspot,
        "crop": crop,
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
      "bannerImage":bannerImage.asset->url,
      aboutTitle,
      aboutDescription,
      "imageOne": imageOne.asset->url,
      "imageTwo": imageTwo.asset->url,
      "imageThree": imageThree.asset->url,
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
      "bannerImage":bannerImage.asset->url,
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
        "image": image.asset->url
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
        "bannerImage":bannerImage.asset->url,
        content,
      },
      "termsAndConditions": termsAndConditions {
        title,
        updatedAt,
        "bannerImage":bannerImage.asset->url,
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
      "cardImage": cardImage{asset->{url, _id}, hotspot, crop},
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
      },
      "placeImages": placeImages[] {
        "_id": asset->_id,
        "url": asset->url,
        hotspot,
        crop,
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
          },
          description,
          experiences {
            title,
            "images": images[] {
              "image": image{asset->{url, _id}, hotspot, crop},
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
