"use client";

import { getContactUsInfo } from "@/sanity/sanity-utils";
import "./style.scss";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { contactUs } from "@/types/contact";
import PageLoading from "@/components/default/loader/PageLoading";
import ImageSize from "@/utils/image-utils";
import Form from "@/components/contact/Form";
import OptImage from "@/components/commmon/OptImage";

const Contact = () => {
  const [contact, setContacts] = useState<contactUs>();

  useEffect(() => {
    const fetchContact = async () => {
      const contactData = await getContactUsInfo();
      setContacts(contactData);
    };
    fetchContact();
  }, []);
  // console.log("contactData-->", contactData.offices);

  if (!contact) {
    return <PageLoading />;
  }

  return (
    <>
      <section id="contactHero">
        <div className="titel-container">
          <h2>{contact?.title}</h2>
          <p>{contact?.subtitle}</p>
        </div>
        <div className="img-container">
          {contact?.bannerImage && (
            <>
              <OptImage image={contact.bannerImage} alt="contact hero image" />
              <div className="bg" />
            </>
          )}
        </div>
      </section>
      <section id="contact">
        <h4>{contact?.formInfo}</h4>
        <div className="form-container">
          <Form />
          <div className="info">
            <div className="address">
              <h5>Address</h5>
              {contact && <PortableText value={contact?.Address} />}
            </div>
            <div className="email">
              <h5>Email</h5>
              <p>{contact?.email}</p>
            </div>
            <div className="phone">
              <h5>Phone</h5>
              <p>{contact?.phone}</p>
            </div>
          </div>
        </div>
        <div className="offices-container" id="OurOffices">
          <div className="title">
            <h3>Our Offices</h3>
            <p>{contact?.ourOfficesSubtitle}</p>
          </div>
          <div className="grid">
            {contact?.offices.map((data, index) => (
              <div key={index} className="item">
                <h5>{data.place}</h5>
                <PortableText value={data.Address} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
