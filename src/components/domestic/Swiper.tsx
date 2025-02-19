"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Domestic } from "@/types/domestic";
import ImageSize from "@/utils/image-utils";

const SwiperHero = ({ data, title }: { data: Domestic[]; title: string }) => {
  return (
    <section id="internationalSlugHero">
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        //navigation={true}
        //onSlideChange={onSildeChange}
        loop={true}
        modules={[EffectFade, Navigation, Autoplay]}
        className="mySwiper"
        speed={500}
        allowTouchMove={false}
        slidesPerView={1}
        spaceBetween={10}
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
            <div className="bg-container">
              <div className="bg" />
              {item.cardImage && (
                <img
                  src={item.cardImage.asset.url}
                  alt="hero background"
                  sizes={ImageSize.card}
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-container">
        <p>Your unforgettable trip</p>
        <h2>{title}</h2>
      </div>
    </section>
  );
};

export default SwiperHero;
