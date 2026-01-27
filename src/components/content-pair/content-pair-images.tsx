/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";

import Image from "next/image";

interface ContentPairImagesProps {
  images: any[];
}
const ContentPairImages = ({ images }: ContentPairImagesProps) => {
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      autoplay={{
        delay: 2000,
      }}
      className="!flex-1 pb-28 w-full overflow-hidden"
    >
      {images.map((image, i) => (
        <SwiperSlide key={i}>
          <Image
            src={image}
            alt="image 1"
            className="w-[350px] md:w-[380px] lg:w-[450px] mx-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ContentPairImages;
