
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
    <Swiper
      modules={[Autoplay, EffectFade]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      className="w-full"
    >
      {mockActivities.map((activity) => (
        <SwiperSlide key={activity.id}>
          <div className="grid md:grid-cols-2 gap-12 items-center text-white">
            <div className="relative h-96 w-full overflow-visible">
              <Image
                src={activity.imageUrl}
                alt={activity.title}
                layout="fill"
                objectFit="contain"
                data-ai-hint={activity.dataAiHint}
                className="object-bottom translate-y-8"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                 <Badge variant="outline" className="text-white border-white/50">{activity.location}</Badge>
                 <Badge variant="outline" className="text-white border-white/50">{activity.time}</Badge>
              </div>
              <h3 className="text-5xl font-bold">{activity.title}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
