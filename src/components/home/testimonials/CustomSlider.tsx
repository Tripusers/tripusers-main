import { useCallback, useState, useEffect } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "./customSlider.scss";

interface CustomSliderProps {
  children: React.ReactNode[];
  autoSlide?: boolean;
  slideInterval?: number;
  current?: number;
  setCurrent?: (index: number) => void;
  hoverPause?: boolean;
  type?: "image" | "data";
}

const CustomSlider = ({
  children = [],
  autoSlide = false,
  slideInterval = 3000,
  current: externalCurrent,
  setCurrent: externalSetCurrent,
  hoverPause = false,
  type = "image",
}: CustomSliderProps) => {
  const [internalCurrent, setInternalCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const current = externalCurrent ?? internalCurrent;
  const setCurrent = externalSetCurrent ?? setInternalCurrent;

  const goToSlide = useCallback(
    (i: number) => {
      let newIndex = i;

      if (i < 0) {
        newIndex = children.length - 1;
      } else if (i >= children.length) {
        newIndex = 0;
      }

      setCurrent(newIndex);
    },
    [children.length, setCurrent]
  );

  useEffect(() => {
    if (!autoSlide || isPaused) return;

    const slideTimer = setInterval(() => {
      goToSlide(current + 1);
    }, slideInterval);

    return () => clearInterval(slideTimer);
  }, [autoSlide, current, goToSlide, isPaused, slideInterval]);

  const prevSlide = current - 1 < 0 ? children.length - 1 : current - 1;
  const nextSlide = current + 1 > children.length - 1 ? 0 : current + 1;

  console.log("current->", current);

  return (
    <div
      className="carousel_container"
      onMouseEnter={() => hoverPause && setIsPaused(true)}
      onMouseLeave={() => hoverPause && setIsPaused(false)}
    >
      <ul
        className={`carousel_slider ${type === "data" ? "is_data_slider" : ""}`}
        style={{
          aspectRatio: type === "image" ? "1" : "auto",
        }}
      >
        {children.map((slide, i) => (
          <li
            className={`carousel_card
              ${type === "data" ? "is_data_card" : ""}
              ${current === i ? "is_active" : ""}
              ${i === prevSlide ? "is_left" : ""}
              ${i === nextSlide ? "is_right" : ""}`}
            key={`card-${i}`}
          >
            {slide}
          </li>
        ))}
      </ul>
      {type === "image" && (
        <div className="carousel_controls">
          <button
            className="carousel_btn is_prev"
            onClick={() => goToSlide(current - 1)}
          >
            <BiChevronLeft size={24} />
          </button>
          <button
            className="carousel_btn is_next"
            onClick={() => goToSlide(current + 1)}
          >
            <BiChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomSlider;
