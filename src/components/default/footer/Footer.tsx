"use client";

import { AiFillMail } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { CgShare } from "react-icons/cg";
import { BiPhoneCall } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import "./style.scss";
import Image from "next/image";
import Form from "./Form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndiaFlag from "../../Icons/IndiaFlag";
import { brand } from "@/types/brand";
import { getBrand, getContactUsInfo, getFooter } from "@/sanity/sanity-utils";
import { contactUs } from "@/types/contact";
import { footer } from "@/types/footer";
import ImageSize from "@/utils/image-utils";

const Footer = () => {
  const [brand, setBrand] = useState<brand[]>();
  const [contact, setContacts] = useState<contactUs>();
  const [footerData, setFooterData] = useState<footer>();

  useEffect(() => {
    const fetchBrand = async () => {
      const logoData = await getBrand();
      setBrand(logoData);
    };

    fetchBrand();
  }, []);

  useEffect(() => {
    const fetchContact = async () => {
      const contactData = await getContactUsInfo();
      setContacts(contactData);
    };
    const fetchFooter = async () => {
      const footer = await getFooter();
      setFooterData(footer);
    };
    fetchContact();
    fetchFooter();
  }, []);

  //console.log("logoData->", logoData);

  //console.log("footerData->", footerData);

  return (
    <>
      <section id="footerTop">
        <div className="location">
          <Link href="/contact" className="title">
            <MdLocationOn />
            <h4>{footerData?.location}</h4>
          </Link>
          <p>{footerData?.locationSubtitle}</p>
        </div>
        <div className="call">
          <Link
            href={`tel:${contact?.phone}`}
            target="_blank"
            className="title"
          >
            <BiPhoneCall />
            <h4>{footerData?.phone}</h4>
          </Link>
          <p>{footerData?.phoneSubtitle}</p>
        </div>
        <div className="email">
          <Link
            href={`mailto:${contact?.email}`}
            target="_blank"
            className="title"
          >
            <AiFillMail />
            <h4>{footerData?.email}</h4>
          </Link>
          <p>{footerData?.emailSubtitle}</p>
        </div>
        <div className="social">
          <div className="title">
            <CgShare />
            <h4> Connect with us</h4>
          </div>
          <div className="social-icons">
            <Link
              href={footerData?.facebook ? footerData.facebook : ""}
              target="_blank"
            >
              <BsFacebook />
            </Link>
            <Link
              href={footerData?.instagram ? footerData.instagram : ""}
              target="_blank"
            >
              <BsInstagram />
            </Link>
            <Link
              href={footerData?.twitter ? footerData.twitter : ""}
              target="_blank"
            >
              <AiFillTwitterCircle />
            </Link>
          </div>
        </div>
      </section>
      <footer>
        <ToastContainer />

        <div className="logo-container">
          {brand && brand[0].lightImage && (
            <Image
              src={brand[0].lightImage}
              alt="logo"
              fill
              sizes={ImageSize.card}
            />
          )}
        </div>
        <div className="division">
          <Form />
          <div className="links-container">
            <div className="discover">
              <h4>Discover Us</h4>
              <Link href="/domestic">India</Link>
              <Link href="/wild-life">Wildlife</Link>
              <Link href="/international">International</Link>
              <Link href="/about">About</Link>
              <Link href="/testimonials">Testimonials</Link>
            </div>
            <div className="support">
              <h4>Support</h4>
              <Link href="/contact">Contact Us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-&-conditions">Terms & Conditions</Link>
            </div>
          </div>
        </div>
        <div className="footer-footer">
          <div className="one">
            <p>
              Made in <IndiaFlag /> with <span title="Love">❤</span>
            </p>
          </div>
          <div className="two">
            <p> © 2024 Tripusers.com. All Rights Reserved.</p>
            <p>
              Design & Developed by <br />
              <span>
                <Link href="https://thecirclstudio.com/" target="_blank">
                  the circl studio
                </Link>{" "}
                &{" "}
                <Link href="https://www.webstack.in/" target="_blank">
                  webstack
                </Link>
              </span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
