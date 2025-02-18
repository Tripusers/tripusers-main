"use client";

import "./style.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import Slick from "../slick/Slick";
import { getTrending, getTrendingDomestic } from "@/sanity/sanity-utils";
import { type Domestic } from "@/types/domestic";
import { trending } from "@/types/trending";
import { HiLocationMarker } from "react-icons/hi";

const Domestic = () => {
  const [domestic, setDomestic] = useState<Domestic[]>([]);
  const [trending, setTrending] = useState<trending>();
  useEffect(() => {
    const fetchDomestic = async () => {
      const domesticData = await getTrendingDomestic();
      setDomestic(domesticData);
    };
    fetchDomestic();

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };
    fetchTrending();
  }, []);

  //console.log("trendingData->", trendingData);
  //console.log("domesticData->", domesticData);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending?.domesticName}</h2>
        <p>{trending?.domesticSubtitle}</p>
        <Link href="/domestic">View All</Link>
      </div>
      {domestic && <Slick data={domestic} />}
    </section>
  );
};

export default Domestic;
