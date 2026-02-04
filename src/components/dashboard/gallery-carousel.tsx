'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const galleryImages = [
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=600",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
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
        spaceBetween={30}
        slidesPerView="auto"
        centeredSlides={true}
        grabCursor={true}
        speed={5000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        className="gallery-swiper"
      >
        {galleryImages.map((src, index) => (
          <SwiperSlide key={index}>
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
