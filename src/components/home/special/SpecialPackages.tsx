"use client";

import { BsBookmarkStarFill } from "react-icons/bs";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

import { useEffect, useState } from "react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { special } from "@/types/special";
import { trending } from "@/types/trending";
import { getSpecial, getTrending } from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";

const SpecialPackages = () => {
  const [specialData, setSpecialData] = useState<special[]>();
  const [trending, setTrending] = useState<trending>();
  const fetchSpecial = async () => {
    const data = await getSpecial();
    setSpecialData(data);
  };

  const fetchTrending = async () => {
    const data = await getTrending();
    setTrending(data);
  };

  useEffect(() => {
    fetchSpecial();
    fetchTrending();
  }, []);

  //console.log("specialData->", specialData);

  return (
    <section id="specialPackages">
      {specialData && (
        <>
          <div className="title-container">
            <BsBookmarkStarFill />
            <h2>{trending?.specialName}</h2>
          </div>
          <Swiper
            effect={"coverflow"}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            navigation={true}
            loop={true}
            modules={[Navigation, Autoplay, EffectCoverflow]}
            className="mySwiper"
            speed={1000}
            allowTouchMove={false}
            slidesPerView={1}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 5,
              modifier: 1,
              slideShadows: true,
            }}
          >
            {specialData.map((item, index) => (
              <SwiperSlide key={item._id} className="swiperSlide-card">
                <Link href={`/special/${item.slug}`} className="bg-container">
                  <img
                    src={item.cardImage}
                    alt="hero background"
                    sizes={ImageSize.bannerSizes}
                  />
                  {item.cardTitle && item.cardSubtitle && (
                    <div className="text-container">
                      <div className="title">
                        <h2>{item.cardTitle}</h2>
                        <p>{item.cardSubtitle}</p>
                      </div>
                      <p className="learn_more">Learn More</p>
                    </div>
                  )}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
};

export default SpecialPackages;
