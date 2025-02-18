"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import { Domestic } from "@/types/domestic";
import ImageSize from "@/utils/image-utils";

const SwiperContainer = ({ data }: { data: Domestic[] }) => {
  //console.log("data->", data[5].wildlifePackage);

  return (
    <div className="india-swiper">
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        speed={500}
        allowTouchMove={false}
        slidesPerView={1}
        breakpoints={{
          820: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1025: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="swiperSlide-card">
            <Link href={`/domestic/${item.slug}`} key={index}>
              {item.cardImage && (
                <img
                  src={item.cardImage.asset.url}
                  alt="hero background"
                  sizes={ImageSize.cardSize}
                />
              )}

              <div className="text-container">
                <h3>{item.name}</h3>
                {item.domesticPackages && (
                  <p>
                    Starts from ₹{" "}
                    {item.domesticPackages.length == 0
                      ? 1500
                      : item.domesticPackages[0].price.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperContainer;
