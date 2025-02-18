"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { international as inter } from "@/types/international";
import ImageSize from "@/utils/image-utils";

const SwiperHero = ({ data, title }: { data: inter[]; title: string }) => {
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
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="swiperSlide-card">
            <div className="bg-container">
              <div className="bg" />
              <img
                src={item.cardImage.asset.url}
                alt="hero background"
                sizes={ImageSize.bannerSizes}
                style={{
                  objectPosition: `${item.cardImage.hotspot?.x * 100}% ${
                    item.cardImage.hotspot?.y * 100
                  }%`,
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-container">
        <p>Your unforgettable trip</p>
        <h2>
          {title} <span>Trending</span>
        </h2>
      </div>
    </section>
  );
};

export default SwiperHero;
