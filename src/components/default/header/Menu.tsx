"use client";

import { CgArrowTopRight } from "react-icons/cg";
import Link from "next/link";
import { BiMenu } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Search from "./Search";
import CustomiseForm from "../../forms/CustomiseForm";
import {
  getDomestic,
  getInternational,
  getWildLife,
} from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";

interface props {
  logo: string;
}

const links = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const Menu = (logo: props) => {
  const isMobile = useMediaQuery({ maxWidth: 820 });
  const navRef = useRef<HTMLElement | null>(null);
  const menuOpenButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const logoMarkRef = useRef<HTMLAnchorElement | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [mobileForm, setMobileForm] = useState(false);
  const handleCloseMenu = () => {
    gsap.to(navRef.current, {
      right: "-100%",
      ease: "power1.inOut",
    });
  };

  useGSAP(() => {
    menuOpenButtonRef.current?.addEventListener("click", () => {
      gsap.to(navRef.current, {
        right: 0,
        ease: "power1.inOut",
      });

      gsap.fromTo(
        ".link",
        {
          x: 400,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          ease: "power1.inOut",
          delay: 0.2,
          stagger: 0.1,
        }
      );

      let mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        gsap.to(navRef.current, {
          right: 0,
          ease: "power1.inOut",
        });
      });
    });

    menuCloseButtonRef.current?.addEventListener("click", () => {
      handleCloseMenu();
    });

    linksRef.current?.addEventListener("click", () => {
      handleCloseMenu();
    });

    logoMarkRef.current?.addEventListener("click", () => {
      handleCloseMenu();
    });

    const dropdownClose = (e: any) => {
      if (!navRef.current?.contains(e.target)) {
        handleCloseMenu();
      }
    };

    document.addEventListener("mousedown", dropdownClose);

    return () => {
      document.removeEventListener("mousedown", dropdownClose);
    };
  });
  useEffect(() => {
    (async () => {
      setData([
        ...(await getInternational()).data,
        ...(await getDomestic()).data,
        ...(await getWildLife()).data,
      ]);
    })();
  }, []);
  return (
    <div id="menu">
      {isMobile ? (
        <div>
          <button ref={menuOpenButtonRef}>
            <BiMenu size={40} />
          </button>

          <nav ref={navRef}>
            {mobileForm && (
              <CustomiseForm onClick={() => setMobileForm(false)} />
            )}
            <div className="logo-container">
              <Link href="/" className="logo-mark" ref={logoMarkRef}>
                <Image
                  src={logo.logo}
                  alt="tripusers.com logo"
                  fill
                  sizes={ImageSize.cardSize}
                />
              </Link>
              <button ref={menuCloseButtonRef}>
                <AiFillCloseCircle size={40} />
              </button>
            </div>
            <div className="search-container">
              <Search data={data} closeMenu={handleCloseMenu} />
            </div>

            <div className="links" ref={linksRef}>
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  ref={linkRef}
                  className="link"
                >
                  {link.title}
                  <CgArrowTopRight size={30} />
                </Link>
              ))}
            </div>

            <button onClick={() => setMobileForm(true)} className="formButton">
              Customise your trip
            </button>
            <Link href="tel:+918888800696" target="_blank" className="tel">
              <BiPhoneCall size={20} />
              +91 88888 00696
            </Link>
          </nav>
        </div>
      ) : (
        <div className="ipad-menu">
          {mobileForm && <CustomiseForm onClick={() => setMobileForm(false)} />}
          <div className="search-container">
            <Search data={data} />
          </div>
          <button onClick={() => setMobileForm(true)} className="formButton">
            Customise your trip
          </button>
          <button className="menu-button" ref={menuOpenButtonRef}>
            <BiMenu size={40} />
          </button>

          <nav ref={navRef}>
            <div className="logo-container">
              <Link href="/" className="logo-mark" ref={logoMarkRef}>
                <Image
                  src={logo.logo}
                  alt="tripusers.com logo"
                  fill
                  sizes={ImageSize.cardSize}
                />
              </Link>
              <button className="menu-close-button" ref={menuCloseButtonRef}>
                <AiFillCloseCircle size={40} />
              </button>
            </div>

            <div className="links" ref={linksRef}>
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  ref={linkRef}
                  className="link"
                >
                  {link.title}
                  <CgArrowTopRight size={30} />
                </Link>
              ))}
            </div>

            <Link href="tel:+918888800696" target="_blank" className="tel">
              <BiPhoneCall size={20} />
              +91 88888 00696
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Menu), { ssr: false });
