"use client";

import "@/components/home/domestic/style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";
import { useEffect, useState } from "react";
import { wildLife } from "@/types/wildlife";
import { trending } from "@/types/trending";
import { getTrending, getTrendingWildLife } from "@/sanity/sanity-utils";
import Slick from "../slick/Slick";

const WildLife = () => {
  const [wildlife, setWildlife] = useState<wildLife[]>();
  const [trending, setTrending] = useState<trending>();

  useEffect(() => {
    const fetchDomestic = async () => {
      const wildLifeData = await getTrendingWildLife();
      setWildlife(wildLifeData);
    };
    fetchDomestic();

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };
    fetchTrending();
  }, []);

  //console.log("domesticData->", wildLifeData[0].wildlifePackage);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending?.wildlifeName}</h2>
        <p>{trending?.wildlifeSubtitle}</p>
        <Link href="/wild-life">View All</Link>
      </div>
      {wildlife && <Slick data={wildlife} />}
    </section>
  );
};

export default WildLife;
