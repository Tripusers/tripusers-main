"use client";

import { AiFillCloseCircle } from "react-icons/ai";
import "./style.scss";
import FormImage from "../Icons/FormImage";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DatePickerInput from "../default/datepicker";
import CountryPhoneCodeSelector from "../default/phone";
import { brand } from "@/types/brand";
import { useSuccessPop } from "@/providers/SuccessPop";
import { getBrand } from "@/sanity/sanity-utils";
import ImageSize from "@/utils/image-utils";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z
    .string()
    .min(10)
    .regex(/^.*\+\d{10,15}$/, {
      message: "The phone number is not valid; a country code is required.",
    }),
  date: z.string(),
  guest: z.string().min(0),
  message: z.string().min(1),
});

interface props {
  onClick?: () => void;
}

type formFields = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guest: number;
  message: string;
};

//type formFields = z.infer<typeof schema>;

const CustomiseForm = ({ onClick }: props) => {
  const [brandData, setBrandData] = useState<brand[]>([]);
  const { changeState, setText } = useSuccessPop();
  const CustomiseFormRef = useRef<HTMLElement | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    getValues,
    setValue,
  } = useForm<formFields>();
  //console.log(errors);
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmitForm: SubmitHandler<formFields> = (data) => {
    const error = schema.safeParse(data);
    if (!error.success) {
      error.error.issues.map((v: any) => {
        //console.log(v);

        setError(v.path[0], { message: v.message });
      });
    } else {
      setIsSubmit(true);
      fetch(
        `${process.env.NEXT_PUBLIC_FORM_APP_SCRIPT_URL}?action=addEnquiries`,
        {
          method: "POST",
          body: JSON.stringify({
            ...error.data,
          }),
        }
      )
        .then(async (response) => {
          if (response.ok) {
            console.log("Data successfully submitted!");
            await fetch("/api/sendEmail", {
              method: "POST",
              body: JSON.stringify({
                data: error.data,
                type: "customizeYourTrip",
                senderEmail: error.data.email,
              }),
            }).then((response) => {
              if (response.ok) {
                //toastEmail();
              }
            });
            //toastSuccess();
            setText("Your enquiry has been sent successfully!");
            changeState(true);
            reset();
            if (onClick) onClick();
          } else {
            console.error("Failed to submit data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        })
        .finally(() => {
          setIsSubmit(false);
        });
      //console.log(data);
    }
  };
  useEffect(() => {
    const boxClose = (e: any) => {
      if (!formContainerRef.current?.contains(e.target)) {
        if (typeof onClick !== "undefined") onClick();
      }
    };
    document.addEventListener("mousedown", boxClose);
    return () => {
      document.removeEventListener("mousedown", boxClose);
    };
  }, []);

  useEffect(() => {
    async function fetchBrand() {
      const brand = await getBrand();
      setBrandData(brand);
    }
    fetchBrand();
  }, []);

  return (
    <section id="CustomiseForm" ref={CustomiseFormRef}>
      <div className="form-container" ref={formContainerRef}>
        <div className="title-container">
          <Link href="/" className="logo-mark">
            <Image
              src={brandData[0]?.logoMark}
              alt="tripusers.com logo"
              fill
              sizes={ImageSize.card}
            />
          </Link>
          <h2>Customise your trip</h2>
          <button onClick={onClick}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>

        <div className="form-main">
          <div className="left">
            <FormImage fill="#fa0001" />
          </div>
          <div className="right">
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <p style={{ color: "tomato" }}>{errors.name.message}</p>
              )}
              <input
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!value.includes("@")) {
                      return "Email must include @";
                    }
                    return true;
                  },
                })}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p style={{ color: "tomato" }}>{errors.email.message}</p>
              )}
              <div title="Phone No with country code">
                <CountryPhoneCodeSelector
                  {...register("phone", {
                    required: "Phone No is required",
                    minLength: {
                      value: 10,
                      message:
                        "Phone number must be at least 10 digits, and a country code is required.",
                    },
                  })}
                  setValue={setValue}
                />
              </div>
              {errors.phone && (
                <p style={{ color: "tomato" }}>{errors.phone.message}</p>
              )}
              <div className="data-container">
                <DatePickerInput
                  {...register("date")}
                  type={"text"}
                  placeholder="Travel Date"
                  setValue={setValue}
                />
                {/* <input
                  {...register("date")}
                  type={"text"}
                  placeholder="Travel Date"
                /> */}
                <input
                  {...register("guest")}
                  type="number"
                  min={0}
                  placeholder="No. of guests"
                />
              </div>
              <textarea
                {...register("message", {
                  required: "Message is required",
                })}
                placeholder="Tell us where you would like to go?"
                rows={5}
              />
              {errors.message && (
                <p style={{ color: "tomato" }}>{errors.message.message}</p>
              )}

              <button type="submit" disabled={isSubmit}>
                {isSubmit ? "Loading..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomiseForm;
