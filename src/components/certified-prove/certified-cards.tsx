/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";
import Image from "next/image";

interface CertifiedCaresProps {
  certificates: any[];
}
const CertifiedCards = ({ certificates }: CertifiedCaresProps) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      coverflowEffect={{
        rotate: 20,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      grabCursor={true}
      effect={"coverflow"}
      modules={[EffectCoverflow]}
    >
      {certificates.map((c, i) => (
        <SwiperSlide
          key={i}
          className="max-w-[80%] md:max-w-[220px] lg:max-w-[350px] mx-auto "
        >
          <Image src={c} alt="certificate" className="w-full h-auto" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CertifiedCards;
