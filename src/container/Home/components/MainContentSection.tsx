"use client";
import React, { useState } from "react";
import { Heading, Img } from "@/components";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { trackEvent } from "@/lib/fbPixel";

export default function MainContentSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_no: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_WEB_URL;

    if (!url) {
      toast.error(
        "API URL not configured. Please check environment variables.",
        {
          position: "top-center",
        }
      );
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("Name", formData.name);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Mobile_No", formData.mobile_no);
    formDataToSend.append("Timestamp", new Date().toISOString());

    try {
      const response = await axios.post(url, formDataToSend.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      setIsSubmitting(false);

      if (response.data.includes("Data Submitted Successfully..")) {
        toast.success("Your information has been added!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({ name: "", email: "", mobile_no: "" });
      } else {
        toast.error("Failed to add your information. Please try again.", {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error(
        `An error occurred: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
    }
  };

  const handleClick = () => {
    trackEvent("Demo_Booking_Event", {
      content_name: "Free Demo Enrollment",
      source: "enrollment_section",
      method: "calendly",
    });

    window.location.href = `${process.env.NEXT_PUBLIC_CALENDLY_APPOINTMENT_BOOK_URL}`;
  };

  return (
    <div
      id="contact"
      className="relative h-[700px] bg-black-900 self-stretch md:h-auto"
    >
      <div className="h-full w-full rounded-[30px] bg-amber-a400 md:flex md:flex-col-reverse md:items-center md:pb-0 overflow-hidden">
        {/* image section */}
        <div>
          <Img
            src="OBJECTS.svg"
            width={100}
            height={100}
            alt="Teaching1one"
            className="absolute left-0 bottom-0 w-[63%] md:static md:w-[100%] md:mx-auto md:mt-6"
          />
        </div>

        {/* form section */}
        <div className="absolute bottom-0 right-0 top-0 z-[52] mt-10 lg:mt-28  bg-gradient-to-r from-white to-yellow-400 flex h-max w-[62%] flex-col  gap-[30px] px-[38px] py-[92px] md:static md:w-full md:items-center md:px-0 md:py-8  lg:py-0 sm:p-5">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-6"
          >
            <div className="flex lg:justify-end justify-center">
              <div className="flex w-[70%] flex-col items-center lg:w-[45%] lg:mr-20 md:w-[90%]">
                <Heading
                  as="h2"
                  className="sm:text-[25px] md:text-[19.5px] mb-6 uppercase lg:text-[35px] font-semibold leading-[131%] !text-black-900_02"
                >
                  Book Your Free Demo
                </Heading>
                <div className="text-black-900 leading-[162.5%] w-full text-center lg:text-start font-bold">
                  Every chess legend started with a single move.
                </div>
                <div className="relative mt-[10px] w-[96%] sm:text-center leading-[162.5%] !text-black-900_bf lg:w-full">
                  At KwinBee, we believe in nurturing potential from day one.
                  Whether you're chasing titles or just discovering the board,
                  our expert coaches are here to guide every step. Your journey
                  begins now — make your first move count.
                </div>
                <div className="mt-4 w-full lg:text-start text-center text-[13px] !text-black-900 font-medium">
                  ✓ Free first class &nbsp;·&nbsp; ✓ No card required &nbsp;·&nbsp; ✓ Instant booking
                </div>
              </div>
            </div>
            {/* book appointment button */}
            <div
              className="w-full lg:w-[65%] flex justify-center lg:justify-end mt-10 cursor-pointer items-center"
              onClick={handleClick}
            >
              <button className="min-w-[220px] bg-black-900 text-white-a700 rounded-[32px] border-[2px] border-solid border-black-900 px-[40px] py-4 font-bold text-[18px] tracking-[0.5px] hover:bg-black-900_01 transition-colors">
                Book Free Demo Class →
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Container - placed outside the form */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
