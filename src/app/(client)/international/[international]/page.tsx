"use client";

import { FaWallet } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaCarAlt } from "react-icons/fa";
import { FaPlane } from "react-icons/fa";
import { FaPassport } from "react-icons/fa";
import { ImSpoonKnife } from "react-icons/im";
import { RiHotelFill, RiLandscapeFill } from "react-icons/ri";

import { use, useEffect, useRef, useState } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import Link from "next/link";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { international } from "@/types/international";
import { getInternationalSlug } from "@/sanity/sanity-utils";
import PageLoading from "@/components/default/loader/PageLoading";
import SlugForm from "@/components/slugForm/SlugForm";
import ImageSize from "@/utils/image-utils";
import iconsData from "@/utils/icons-utils";
import SaveMoney from "@/components/saveMoney/SaveMoney";

type Props = {
  params: Promise<{ international: string }>;
};

const page = ({ params }: Props) => {
  const [data, setData] = useState<international>();
  const [mobileForm, setMobileForm] = useState(false);
  const [packageName, setPackageName] = useState("");
  const { international: slug } = use(params);
  const sliderRef = useRef<Slider | null>(null);

  useEffect(() => {
    async function fetchInternationalSlug() {
      try {
        const data = await getInternationalSlug(slug);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchInternationalSlug();
  }, [slug]);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    navigator: false,
    easing: "easeInOut",
    arrows: false,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 819,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //console.log("internationalSlugData->", data);

  if (!data) {
    return <PageLoading />;
  }

  return (
    <>
      {mobileForm && (
        <SlugForm
          packageName={packageName}
          onClick={() => setMobileForm(false)}
        />
      )}
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
          {data.bannerImages.map((item, index) => (
            <SwiperSlide key={index} className="swiperSlide-card">
              <div className="bg-container">
                <div className="bg" />
                <img
                  src={item.url}
                  alt="hero background"
                  sizes={ImageSize.bannerSizes}
                  style={{
                    objectPosition: `${item.hotspot?.x * 100}% ${
                      item.hotspot?.y * 100
                    }%`,
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-container">
          <p>Your unforgettable trip</p>
          <h2>{data?.name}</h2>
        </div>
      </section>
      <section id="packages">
        <h2 className="place-title">{data.name} Packages</h2>
        <div className="packages-container">
          {data.internationalPackages.length != 0 ? (
            <>
              {data.internationalPackages.map((item, index) => (
                <div key={index} className="package">
                  <div className="package-top">
                    <div className="package-swiper-container">
                      <Swiper
                        autoplay={{
                          delay: 4000,
                          disableOnInteraction: false,
                        }}
                        navigation={true}
                        //onSlideChange={onSildeChange}
                        loop={true}
                        modules={[Navigation, Autoplay]}
                        className="mySwiper"
                        speed={500}
                        allowTouchMove={false}
                        slidesPerView={1}
                      >
                        {item.packageImages &&
                          item.packageImages.map((item, index) => (
                            <SwiperSlide
                              key={index}
                              className="swiperSlide-card"
                            >
                              <div className="bg-container">
                                <img
                                  src={item.url}
                                  alt="hero background"
                                  sizes={ImageSize.cardSize}
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                      </Swiper>
                    </div>
                    <div className="text-container">
                      <div className="title">
                        <Link href={`/international/${data.slug}/${item.slug}`}>
                          <h3>{item.title}</h3>
                        </Link>
                        <p>{item.timeline}</p>
                      </div>
                      <div className="icons">
                        {item.addOns != null && (
                          <>
                            {item.addOns.isHotels && (
                              <span>
                                <RiHotelFill />
                                <p>{iconsData.hotels}</p>
                              </span>
                            )}
                            {item.addOns.isFood && (
                              <span>
                                <ImSpoonKnife />
                                <p>{iconsData.food}</p>
                              </span>
                            )}
                            {item.addOns.isTransport && (
                              <span>
                                <FaCarAlt />
                                <p>{iconsData.transport}</p>
                              </span>
                            )}
                            {item.addOns.isFlight && (
                              <span>
                                <FaPlane />
                                <p>{iconsData.flight}</p>
                              </span>
                            )}
                            {item.addOns.isSightseeing && (
                              <span>
                                <RiLandscapeFill />
                                <p>{iconsData.sightseeing}</p>
                              </span>
                            )}
                            {item.addOns.isVisa && (
                              <span>
                                <FaPassport />
                                <p>{iconsData.visas}</p>
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="gap">
                    <div className="ticket-card-circle top" />
                    <div className="line" />
                    <div className="ticket-card-circle bottom" />
                  </div>
                  <div className="cta-container">
                    <div className="price-container">
                      <p className="deal">{item.deal}</p>
                      <div className="price">
                        <p>Starts from</p>
                        <h4>
                          ₹ {item.price.toLocaleString("en-in")}{" "}
                          {item.priceActual && (
                            <span id="actualPrice">
                              ₹ {item?.priceActual.toLocaleString("en-in")}
                            </span>
                          )}
                        </h4>
                        {item.price && item.priceActual && (
                          <SaveMoney
                            price={item?.price}
                            priceActual={item?.priceActual}
                            height="20"
                          />
                        )}
                        <p>{item.priceSubtitle}</p>
                      </div>
                    </div>
                    <div className="links">
                      <Link href={`/international/${data.slug}/${item.slug}`}>
                        View Details
                      </Link>
                      <button
                        onClick={() => {
                          setPackageName(item.title);
                          setMobileForm(true);
                        }}
                      >
                        Quick Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No Packages Found</p>
          )}
        </div>
      </section>

      {data.mustDoThings && data.mustDoThings.isTrue && (
        <section id="mustDoThings">
          <div className="left">
            <div className="text-container">
              <h3>{data.mustDoThings.subHeading}</h3>
              <h2>{data.mustDoThings.heading}</h2>
              <p>{data.mustDoThings.description}</p>
            </div>
            <div className="buttons">
              <button onClick={previous}>
                <AiOutlineLeft />
              </button>
              <button onClick={next}>
                <AiOutlineRight />
              </button>
            </div>
          </div>
          <div className="right">
            <div className="slider-container">
              <Slider {...settings} ref={sliderRef}>
                {data.mustDoThings.cards &&
                  data.mustDoThings.cards.map((item, i) => (
                    <div className="slide" key={i}>
                      <div className="card">
                        <img
                          src={item.image}
                          alt="card image"
                          sizes={ImageSize.cardSize}
                        />
                        <p>{item.title}</p>
                      </div>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </section>
      )}
      {data.travelTips && data.travelTips.isTrue && (
        <section id="travelTips">
          <h3>{data.travelTips.title}</h3>
          <div className="container">
            <div className="card">
              <FaPassport />
              <h3>{data.travelTips.cards.cardOne.title}</h3>
              <p>{data.travelTips.cards.cardOne.description}</p>
            </div>
            <div className="card">
              <AiFillSafetyCertificate />
              <h3>{data.travelTips.cards.cardTwo.title}</h3>
              <p>{data.travelTips.cards.cardTwo.description}</p>
            </div>
            <div className="card">
              <FaWallet />
              <h3>{data.travelTips.cards.cardThree.title}</h3>
              <p>{data.travelTips.cards.cardThree.description}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
