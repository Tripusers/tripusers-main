"use client";

import { BsFillRecordCircleFill } from "react-icons/bs";
import { MdJoinFull } from "react-icons/md";
import { HiEye } from "react-icons/hi";
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import "./style.scss";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { useMediaQuery } from "react-responsive";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { About } from "@/types/about";
import { getAbout, getHeroInfo } from "@/sanity/sanity-utils";
import PageLoading from "@/components/default/loader/PageLoading";
import ImageSize from "@/utils/image-utils";
import { heroInfo } from "@/types/heroInfo";
import OptImage from "@/components/commmon/OptImage";

const page = () => {
  const isMobile = useMediaQuery({ maxWidth: 820 });

  const [aboutData, setAboutData] = useState<About>();
  const [dataInfo, setDataInfo] = useState<heroInfo[]>([]);

  const fetchAbout = async () => {
    const about = await getAbout();

    setAboutData(about);
  };

  async function fetchHeroInfo() {
    const dataInfo = await getHeroInfo();
    setDataInfo(dataInfo);
  }

  useEffect(() => {
    fetchAbout();
    fetchHeroInfo();
  }, []);

  if (!aboutData) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="aboutHero">
        <div className="titel-container">
          <h2>{aboutData?.title}</h2>
          <p>{aboutData?.subtitle}</p>
        </div>
        <div className="img-container">
          {aboutData?.bannerImage && (
            <>
              <OptImage
                image={aboutData.bannerImage}
                alt="contact hero image"
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="about">
        <div className="about-container">
          <h3>{aboutData.aboutTitle}</h3>
          {aboutData && <PortableText value={aboutData?.aboutDescription} />}
        </div>
        <div className="vision-container">
          {isMobile ? (
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
              spaceBetween={10}
            >
              <SwiperSlide className="swiperSlide-card">
                <div className="img-container">
                  <OptImage
                    image={aboutData.imageOne}
                    alt="hero background"
                    sizes="card"
                    width={500}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiperSlide-card">
                <div className="img-container">
                  <OptImage
                    image={aboutData.imageTwo}
                    alt="hero background"
                    sizes="card"
                    width={500}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiperSlide-card">
                <div className="img-container">
                  <OptImage
                    image={aboutData.imageThree}
                    alt="hero background"
                    sizes="card"
                    width={500}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          ) : (
            <div className="images-container">
              <div className="img-container">
                <OptImage
                  image={aboutData.imageOne}
                  alt="hero background"
                  sizes="card"
                />
              </div>
              <div className="img-container">
                <OptImage
                  image={aboutData.imageTwo}
                  alt="hero background"
                  sizes="card"
                />
              </div>
              <div className="img-container">
                <OptImage
                  image={aboutData.imageThree}
                  alt="hero background"
                  sizes="card"
                />
              </div>
            </div>
          )}

          <div className="grid">
            <div className="grid-item">
              <div className="title-container">
                <HiEye />
                <div className="title">
                  <h3>Vision</h3>
                  <h4>{aboutData?.vision.title}</h4>
                </div>
              </div>
              <p>{aboutData?.vision.description}</p>
            </div>
            <div className="grid-item">
              <div className="title-container">
                <BsFillRocketTakeoffFill />
                <div className="title">
                  <h3>Mission</h3>
                  <h4>{aboutData?.mission.title}</h4>
                </div>
              </div>
              <p>{aboutData?.mission.description}</p>
            </div>
            <div className="grid-item">
              <div className="title-container">
                <BsFillRecordCircleFill />
                <div className="title">
                  <h3>Values</h3>
                  <h4>{aboutData?.values.title}</h4>
                </div>
              </div>
              <p>{aboutData?.values.description}</p>
            </div>
            <div className="grid-item">
              <div className="title-container">
                <MdJoinFull />
                <div className="title">
                  <h3>Join Us</h3>
                  <h4>{aboutData?.join.title}</h4>
                </div>
              </div>
              <p>{aboutData?.join.description}</p>
            </div>
          </div>
        </div>
        <div className="quote">
          <h5>"{aboutData?.quote}"</h5>
        </div>
      </section>
      <section id="infographics">
        {dataInfo.map((item, index) => (
          <div key={index} className="info">
            <img src={item.icon} alt="icon" width={20} height={20} />
            <p>
              {item.title}
              <span>{item.subtitle}</span>
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default page;
