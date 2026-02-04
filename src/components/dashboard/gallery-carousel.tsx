
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Iniciativa%20Dulce%20o%20Truco%20BSV%20(2).jpg?raw=true",
  "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/IMG_20251115_120042.jpg?raw=true",
  "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Octubre%20Rosa%202025%20(3).jpg?raw=true",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=600",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600",
  "https://images.unsplash.com/photo-1506929113670-b43135c7bb20?q=80&w=600",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600",
];

export const GalleryCarousel = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        loop={true}
        loopedSlides={4}
        spaceBetween={30}
        slidesPerView="auto"
        centeredSlides={true}
        grabCursor={true}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="gallery-swiper"
      >
        {galleryImages.map((src, index) => (
          <SwiperSlide key={index} className="!w-[300px] !h-[400px]">
            <Card className="w-full h-full rounded-2xl shadow-lg">
              <CardContent className="p-0 h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
