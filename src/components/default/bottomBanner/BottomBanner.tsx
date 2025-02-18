"use client";

import { useEffect, useState } from "react";
import "./style.scss";
import CustomiseForm from "../../forms/CustomiseForm";
import { footer } from "@/types/footer";
import { getBottomBanner } from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";

const BottomBanner = () => {
  const [data, setData] = useState<footer>();
  const [mobileForm, setMobileForm] = useState(false);

  const fetchBanner = async () => {
    const response = await getBottomBanner();
    setData(response);
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  //console.log("data->", data);

  if (!data) {
    return null;
  }

  return (
    <section id="bottomBanner">
      {mobileForm && <CustomiseForm onClick={() => setMobileForm(false)} />}
      <div className="container">
        <div className="top">
          <h3>{data.bottomBanner.headline}</h3>
          <p>{data.bottomBanner.description}</p>
          <button onClick={() => setMobileForm(true)}>Send Enquiry</button>
        </div>
        <div className="bottom">
          <div className="img-cont">
            <img
              src={data.bottomBanner.image}
              alt="banner image"
              sizes={ImageSize.cardSize}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomBanner;
