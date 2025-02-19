"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { wildLife } from "@/types/wildlife";
import ImageSize from "@/utils/image-utils";
import OptImage from "../commmon/OptImage";

const SwiperHero = ({ data, title }: { data: wildLife[]; title: string }) => {
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
              <OptImage image={item.cardImage} alt="hero background" />
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
