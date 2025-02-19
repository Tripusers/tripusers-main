"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import { PortableText } from "@portabletext/react";
import { PrivacyPolicyAndTnc } from "@/types/privacyPolicyAndTnc";
import { getPrivacyPolicyAndTnc } from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";
import OptImage from "@/components/commmon/OptImage";

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
          <h2>{privacyPolicyAndTnc?.privacyPolicy.title}</h2>
          <p>{privacyPolicyAndTnc?.privacyPolicy.updatedAt}</p>
        </div>
        <div className="img-container">
          {privacyPolicyAndTnc?.privacyPolicy.bannerImage && (
            <>
              <OptImage
                image={privacyPolicyAndTnc?.privacyPolicy.bannerImage}
                alt="contact hero image"
              />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="privacyPolicyContent">
        <h2>{privacyPolicyAndTnc?.privacyPolicy.title}</h2>
        <span>
          Last updated: {privacyPolicyAndTnc?.privacyPolicy.updatedAt}
        </span>
        {privacyPolicyAndTnc?.privacyPolicy.content && (
          <PortableText value={privacyPolicyAndTnc?.privacyPolicy.content} />
        )}
      </section>
    </>
  );
};

export default page;
