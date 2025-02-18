"use client";

import "./style.scss";
import Image from "next/image";
import Link from "next/link";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import { getBrand } from "@/sanity/sanity-utils";
import { brand } from "@/types/brand";
import ImageSize from "@/utils/image-utils";

const Header = () => {
  const [brandData, setBrandData] = useState<brand[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    async function fetchBrand() {
      const brand = await getBrand();
      setBrandData(brand);
    }
    fetchBrand();
  }, []);

  const handleScroll = () => {
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? "scrolled" : ""}>
      <Link href="/" className="logo-container">
        {brandData[0]?.darkImage && brandData[0]?.headerImage && (
          <Image
            src={
              isScrolled ? brandData[0]?.darkImage : brandData[0]?.headerImage
            }
            alt="tripusers.com logo"
            fill
            sizes={ImageSize.cardSize}
          />
        )}
      </Link>
      {brandData[0]?.logoMark && <Menu logo={brandData[0]?.logoMark} />}
    </header>
  );
};

export default Header;
