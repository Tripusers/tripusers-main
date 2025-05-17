"use client";

import { getTestimonials, getTrending } from "@/sanity/sanity-utils";
import Testimonial from "@/types/testimonials";
import { useEffect, useState } from "react";
import "./style.scss";
import { trending } from "@/types/trending";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { useRouter } from "next/navigation";
import PageLoading from "@/components/default/loader/PageLoading";
import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import ImageSize from "@/utils/image-utils";
import OptImage from "@/components/commmon/OptImage";

const page = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [trending, setTrending] = useState<trending>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  const fetchTrendingData = async () => {
    const trendingData = await getTrending();
    setTrending(trendingData);
  };

  const fetchTestimonials = async (page: number) => {
    setLoading(true);
    try {
      const { data, totalPages } = await getTestimonials(page);
      setTestimonials(data);
      setLastPage(data.length > 0 ? page : lastPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching international data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, []);

  useEffect(() => {
    fetchTestimonials(currentPage);
  }, [currentPage]);

  const handleNextPage = async () => {
    const nextPage = currentPage + 1;

    try {
      const { data } = await getTestimonials(nextPage);

      if (data.length > 0) {
        setCurrentPage(nextPage);
      }

      router.push("/testimonials/#testimonialsData");
    } catch (error) {
      console.error("Error fetching testimonials data:", error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    router.push("/testimonials/#testimonialsData");
  };

  //console.log("Testimonials ->", testimonials);

  const getStarColor = (
    rating: string | undefined,
    starIndex: number
  ): string => {
    const ratingValue = rating ? parseInt(rating.split("-")[0]) : 0;
    return starIndex < ratingValue ? "#fd8f04" : "#1d1d1f";
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="testimonialsHero">
        {testimonials?.length > 0 && (
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
            {testimonials?.map((data, index) => (
              <SwiperSlide key={index} className="swiperSlide-card">
                <div className="bg-container">
                  <div className="bg" />
                  <OptImage image={data.cardImage} alt="hero background" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className="text-container">
          <p>{trending?.testimonialSubtitle}</p>
          <h2>{trending?.testimonialName}</h2>
        </div>
      </section>
      <section id="testimonialsData">
        <p className="pageNo">
          Page {currentPage} / {totalPages} {loading && <span>Loading...</span>}
        </p>
        <div className="testimonial-grid">
          {testimonials?.map((data, index) => (
            <div key={index} className="grid-item">
              <Link
                href={`/testimonials/${data.slug}`}
                className="img-container"
              >
                <OptImage
                  image={data.cardImage}
                  alt="hero background"
                  sizes="card"
                  width={500}
                />
              </Link>
              <div className="content">
                <Link className="title" href={`/testimonials/${data.slug}`}>
                  <h3>{data?.title}</h3>
                </Link>
                <div className="hashtags">
                  {data.hashtags?.map((data, index) => (
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
                      <p>{data.reviewDate.toString()}</p>
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
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {loading && <p className="pagination-loading">Loading...</p>}
          <div className="buttons">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              Previous
            </button>
            <span aria-live="polite">{currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
