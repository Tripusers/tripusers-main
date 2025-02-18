"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import { international } from "@/types/international";
import ImageSize from "@/utils/image-utils";

const SwiperContainer = ({ data }: { data: international[] }) => {
  //console.log("data->", data[0].wildlifePackage);

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
        modules={[EffectFade, Navigation, Autoplay]}
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
            <Link href={`/international/${item.slug}`} key={index}>
              {item.cardImage && (
                <img
                  src={item.cardImage.asset.url}
                  alt="hero background"
                  sizes={ImageSize.cardSize}
                />
              )}

              <div className="text-container">
                <h3>{item.name}</h3>
                {item.internationalPackages && (
                  <p>
                    Starts from ₹{" "}
                    {item.internationalPackages.length == 0
                      ? 1500
                      : item.internationalPackages[0].price.toLocaleString(
                          "en-IN"
                        )}
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
