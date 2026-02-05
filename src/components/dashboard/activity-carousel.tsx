'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { mockActivities } from '@/lib/placeholder-data';
import 'swiper/css';
import 'swiper/css/effect-fade';

export const ActivityCarousel = () => {
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden min-h-[450px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        loop={true}
        spaceBetween={30}
        centeredSlides={true}
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        className="h-full w-full"
      >
        {mockActivities.map((activity) => (
          <SwiperSlide key={activity.id}>
            <div className="relative h-full w-full">
              <Image
                src={activity.imageUrl}
                alt={activity.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint={activity.dataAiHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs bg-white/20 backdrop-blur-sm">{activity.location}</Badge>
                    {/* The time is not consistently available in the data, so I'll omit it for now to avoid showing incorrect info */}
                </div>
                <h3 className="text-4xl font-bold mt-2">{activity.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
