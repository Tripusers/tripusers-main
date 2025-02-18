"use client";

import React, { useEffect, useState } from "react";
import "@/app/(client)/privacy-policy/style.scss";
import { PortableText } from "@portabletext/react";
import { PrivacyPolicyAndTnc } from "@/types/privacyPolicyAndTnc";
import { getPrivacyPolicyAndTnc } from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";

const page = () => {
  const [privacyPolicyAndTnc, setPrivacyPolicyAndTnc] =
    useState<PrivacyPolicyAndTnc>();

  const fetchPrivacyPolicyAndTnc = async () => {
    const data = await getPrivacyPolicyAndTnc();
    setPrivacyPolicyAndTnc(data);
  };
  useEffect(() => {
    fetchPrivacyPolicyAndTnc();
  }, []);

  //console.log("privacyPolicyAndTncData ->", privacyPolicyAndTnc);

  return (
    <>
      <section id="privacyPolicyHeader">
        <div className="titel-container">
          <h2>{privacyPolicyAndTnc?.termsAndConditions.title}</h2>
          <p>{privacyPolicyAndTnc?.termsAndConditions.updatedAt}</p>
        </div>
        <div className="img-container">
          {privacyPolicyAndTnc?.termsAndConditions.bannerImage && (
            <>
              <img
                src={privacyPolicyAndTnc?.termsAndConditions.bannerImage}
                alt="contact hero image"
                sizes={ImageSize.bannerSizes}
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="privacyPolicyContent">
        <h2>{privacyPolicyAndTnc?.termsAndConditions.title}</h2>
        <span>
          Last updated: {privacyPolicyAndTnc?.termsAndConditions.updatedAt}
        </span>
        {privacyPolicyAndTnc?.privacyPolicy.content && (
          <PortableText
            value={privacyPolicyAndTnc?.termsAndConditions.content}
          />
        )}
      </section>
    </>
  );
};

export default page;
