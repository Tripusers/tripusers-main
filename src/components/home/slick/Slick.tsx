import Link from "next/link";
import Slider, { CustomArrowProps } from "react-slick";

import "./style.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { Domestic } from "@/types/domestic";
import { international } from "@/types/international";
import { wildLife } from "@/types/wildlife";
import ImageSize from "@/utils/image-utils";

const Slick = ({
  data,
}: {
  data: Domestic[] | international[] | wildLife[];
}) => {
  function SampleNextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick_arrow slick_next_arrow`}
        onClick={onClick}
      >
        <BiChevronRight size={24} />
      </div>
    );
  }

  function SamplePrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} slick_arrow slick_prev_arrow`}
        onClick={onClick}
      >
        <BiChevronLeft size={24} />
      </div>
    );
  }

  const settings = {
    infinite: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div id="slick" className="slider-container">
      <Slider {...settings}>
        {data.map((item, index) => (
          <div className="slick_slide_container" key={`${item._id}-${index}`}>
            <Link href={`/domestic/${item.slug}`}>
              {item.cardImage && (
                <img
                  src={item.cardImage.asset.url}
                  alt="domestic"
                  sizes={ImageSize.cardSize}
                />
              )}
              <div className="text_container">
                <h3>{item.name}</h3>
                {"domesticPackages" in item && (
                  <p>
                    Starts from ₹{" "}
                    {item.domesticPackages.length == 0
                      ? 1500
                      : item.domesticPackages[0].price.toLocaleString("en-IN")}
                  </p>
                )}
                {"internationalPackages" in item && (
                  <p>
                    Starts from ₹{" "}
                    {item.internationalPackages.length == 0
                      ? 1500
                      : item.internationalPackages[0].price.toLocaleString(
                          "en-IN"
                        )}
                  </p>
                )}
                {"wildlifePackage" in item && (
                  <p>
                    Starts from ₹{" "}
                    {item.wildlifePackage.length == 0
                      ? 1500
                      : item.wildlifePackage[0].price.toLocaleString("en-IN")}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slick;
