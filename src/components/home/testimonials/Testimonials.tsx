"use client";

import { AiFillStar } from "react-icons/ai";
import { BsStars } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import {
  Navigation,
  Autoplay,
  EffectFade,
  EffectCoverflow,
} from "swiper/modules";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import "swiper/css/effect-fade";
import { trending } from "@/types/trending";
import Testimonial from "@/types/testimonials";
import { getTrending, getTrendingTestimonials } from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";
import { useMediaQuery } from "react-responsive";
import OptImage from "@/components/commmon/OptImage";

function getRandomUniqueElements(array: any[], count: number) {
  // Shuffle the input array
  const shuffledArray = array.slice().sort(() => Math.random() - 0.5);

  // Ensure count does not exceed array length
  count = Math.min(count, shuffledArray.length);

  // Select unique elements
  const result = [];
  const selectedIndices = new Set();
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    if (!selectedIndices.has(randomIndex)) {
      result.push(shuffledArray[randomIndex]);
      selectedIndices.add(randomIndex);
    }
  }

  return result;
}
const Testimonials = () => {
  const [trending, setTrending] = useState<trending>();
  const [trendingTestimonial, setTrendingTestimonial] = useState<Testimonial[]>(
    []
  );

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  const fetchTrendingTestimonialData = async () => {
    const trendingTestimonialData = await getTrendingTestimonials();
    setTrendingTestimonial(getRandomUniqueElements(trendingTestimonialData, 5));
  };

  useEffect(() => {
    fetchTrendingData();
    fetchTrendingTestimonialData();
  }, []);
  //console.log("fetchTrending ->", trending);
  //console.log("fetchTrendingTestimonial ->", trendingTestimonial);

  const getStarColor = (
    rating: string | undefined,
    starIndex: number
  ): string => {
    const ratingValue = rating ? parseInt(rating.split("-")[0]) : 0;
    return starIndex < ratingValue ? "#fd8f04" : "#1d1d1f";
  };

  const isMobile = useMediaQuery({ maxWidth: 820 });
  const isTablet = useMediaQuery({ maxWidth: 1025 });
  const isMac = useMediaQuery({ maxWidth: 1400 });

  return (
    <section id="testimonials">
      <div className="title-container">
        <BsStars size={40} />
        <h2>{trending?.testimonialName}</h2>
        <p>{trending?.testimonialSubtitle}</p>
        <Link href="/testimonials">View All</Link>
      </div>
      <div className="testimonials-container">
        {trendingTestimonial.length > 0 ? (
          <Swiper
            initialSlide={0}
            effect={"coverflow"}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            loop={true}
            modules={[EffectCoverflow, Autoplay, Navigation]}
            speed={500}
            allowTouchMove={false}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: isMobile ? 300 : isTablet ? 340 : isMac ? 320 : 520,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            className="mySwiper-images swiper-container"
          >
            {trendingTestimonial.map((data, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide swiperSlide-card"
              >
                <Link href={`/testimonials/${data.slug}`}>
                  {data && data.cardImage && (
                    <OptImage
                      image={data.cardImage}
                      alt="hero background"
                      sizes="card"
                      width={500}
                    />
                  )}
                </Link>
              </SwiperSlide>
            ))}
            {trendingTestimonial.length > 0 && (
              <>
                <div className="prev" ref={prevRef}>
                  <div className="size">prev</div>
                </div>
                <div className="next" ref={nextRef}>
                  <div className="size">next</div>
                </div>
              </>
            )}
          </Swiper>
        ) : (
          <p>No data / Loading...</p>
        )}
        {trendingTestimonial.length > 0 ? (
          <Swiper
            initialSlide={0}
            effect={"fade"}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            loop={true}
            modules={[Autoplay, EffectFade, Navigation]}
            speed={500}
            allowTouchMove={false}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            className="mySwiper-content"
          >
            {trendingTestimonial.map((data, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <Link className="title" href={`/testimonials/${data.slug}`}>
                  <h3>{data?.title}</h3>
                </Link>
                <div className="hashtags">
                  {data.hashtags &&
                    data.hashtags.map((data, index) => (
                      <p key={index}>#{data.name}</p>
                    ))}
                </div>
                <p className="shortReview">{data.shortReview}</p>
                <div className="profile-container">
                  <div className="profile">
                    <div className="img-container">
                      {data.profile.image ? (
                        <OptImage
                          image={data.profile.image}
                          alt="hero background"
                          sizes="avatar"
                          width={100}
                        />
                      ) : (
                        <h5>{data.profile.name.charAt(0)}</h5>
                      )}
                    </div>
                    <div className="profile-info">
                      <h4>{data.profile.name}</h4>
                      <p>
                        {data.reviewDate
                          ? data.reviewDate.toString()
                          : "Unknown Date"}
                      </p>
                    </div>
                  </div>
                  <div className="rating-container">
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <AiFillStar
                          key={starIndex}
                          style={{
                            color: getStarColor(data.rating, starIndex),
                          }}
                        />
                      ))}
                    </div>
                    <p>Trip to {data.tripTo}</p>
                  </div>
                </div>

                <Link className="button" href={`/testimonials/${data.slug}`}>
                  Read Full Story
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p>No data / Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
