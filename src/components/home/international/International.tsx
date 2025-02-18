"use client";

import "@/components/home/domestic/style.scss";
import { HiLocationMarker } from "react-icons/hi";
import Link from "next/link";

import { useEffect, useState } from "react";
import { international } from "@/types/international";
import { trending } from "@/types/trending";
import { getSliderHomeInternational, getTrending } from "@/sanity/sanity-utils";
import Slick from "../slick/Slick";

const International = () => {
  const [international, seInternational] = useState<international[]>();
  const [trending, setTrending] = useState<trending>();

  useEffect(() => {
    const fetchInternational = async () => {
      const internationalData = await getSliderHomeInternational();
      seInternational(internationalData);
    };
    fetchInternational();

    const fetchTrending = async () => {
      const trendingData = await getTrending();
      setTrending(trendingData);
    };
    fetchTrending();
  }, []);

  //console.log("trending->", trending);

  return (
    <section id="trendingDomestic">
      <div className="title-container">
        <HiLocationMarker size={40} />
        <h2>{trending?.internationalSliderName}</h2>
        <p>{trending?.internationalSliderSubtitle}</p>
        <Link href="/international">View All</Link>
      </div>
      {international && <Slick data={international} />}
    </section>
  );
};

export default International;
