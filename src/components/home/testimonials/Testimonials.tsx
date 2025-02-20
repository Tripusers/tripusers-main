"use client";

import { useEffect, useState } from "react";
import CustomSlider from "./CustomSlider";
import Testimonial from "@/types/testimonials";
import { trending } from "@/types/trending";
import { getTrending, getTrendingTestimonials } from "@/sanity/sanity-utils";
import Link from "next/link";
import OptImage from "@/components/commmon/OptImage";
import "./style.scss";
import { BsStars } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

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

  const [current, setCurrent] = useState(0);

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

  const getStarColor = (
    rating: string | undefined,
    starIndex: number
  ): string => {
    const ratingValue = rating ? parseInt(rating.split("-")[0]) : 0;
    return starIndex < ratingValue ? "#fd8f04" : "#1d1d1f";
  };

  if (trendingTestimonial.length == 0) {
    return (
      <section id="Testimonials">
        <div className="title_container">
          <BsStars size={40} />
          <h2>{trending?.testimonialName}</h2>
          <p>{trending?.testimonialSubtitle}</p>
          <Link href="/testimonials">View All</Link>
        </div>
        <div className="testimonials-container">
          <p>No data / Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="Testimonials">
      <div className="title_container">
        <BsStars size={40} />
        <h2>{trending?.testimonialName}</h2>
        <p>{trending?.testimonialSubtitle}</p>
        <Link href="/testimonials">View All</Link>
      </div>
      <div className="testimonials_container">
        <div className="left">
          <CustomSlider current={current} setCurrent={setCurrent}>
            {trendingTestimonial.map((data, index) => (
              <Link
                href={`/testimonials/${data.slug}`}
                key={`${data._id}-${index}`}
              >
                {data.cardImage && (
                  <OptImage
                    image={data.cardImage}
                    alt="hero background"
                    sizes="card"
                    className="testimonial_img"
                  />
                )}
              </Link>
            ))}
          </CustomSlider>
        </div>
        <div className="right">
          <CustomSlider type="data" current={current} setCurrent={setCurrent}>
            {trendingTestimonial.map((data, index) => (
              <div className="data_container" key={`${data._id}-${index}`}>
                <Link className="title" href={`/testimonials/${data.slug}`}>
                  <h3>{data.title}</h3>
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
              </div>
            ))}
          </CustomSlider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
