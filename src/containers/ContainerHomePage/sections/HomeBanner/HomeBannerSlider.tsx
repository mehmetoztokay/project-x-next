"use client";

import React, { useEffect, useState } from "react";
import { BsShield } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import { IoFlashOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";

export const HomeBannerSlider = ({
  slideMessage1,
  slideMessage2,
  slideMessage3,
  slideMessage4,
}: {
  slideMessage1: string;
  slideMessage2: string;
  slideMessage3: string;
  slideMessage4: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselStyle = {
    transform: `translateY(-${currentSlide * 100}px)`,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000); // Increased interval duration from 3000ms to 5000ms

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile Slider */}
      <div className="lg:hidden h-[100px] overflow-hidden">
        <div 
          className="transition-all duration-1000 ease-in-out" // Changed duration from 500ms to 1000ms and added transition-all
          style={carouselStyle}
        >
          <div className="h-[100px] flex justify-start items-center gap-3">
            <BsShield size={35} />
            <p>{slideMessage1}</p>
          </div>
          <div className="h-[100px] flex justify-center items-center gap-3">
            <TfiWorld size={35} />
            <p>{slideMessage2}</p>
          </div>
          <div className="h-[100px] flex justify-center items-center gap-3">
            <IoFlashOutline size={35} />
            <p>{slideMessage3}</p>
          </div>
          <div className="h-[100px] flex justify-center items-center gap-3">
            <BiSupport size={35} />
            <p>{slideMessage4}</p>
          </div>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-4">
        <div className="flex items-center justify-center gap-3">
          <BsShield size={35} />
          <p>{slideMessage1}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <TfiWorld size={35} />
          <p>{slideMessage2}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <IoFlashOutline size={35} />
          <p>{slideMessage3}</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <BiSupport size={35} />
          <p>{slideMessage4}</p>
        </div>
      </div>
    </>
  );
};
