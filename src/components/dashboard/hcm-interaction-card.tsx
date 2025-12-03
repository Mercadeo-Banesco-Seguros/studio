
'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface HcmCardProps {
  type: 'main' | 'info';
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  badgeText?: string;
  badgeIcon?: LucideIcon;
  imageUrl?: string;
  dataAiHint?: string;
}

export const HcmCard = ({ 
    type, 
    icon: Icon, 
    title, 
    description, 
    buttonText, 
    badgeText, 
    badgeIcon: BadgeIcon,
    imageUrl, 
    dataAiHint 
}: HcmCardProps) => {

  if (type === 'main') {
    return (
      <Card className="bg-primary text-primary-foreground rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-8 min-h-[550px]">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8" />
        </div>
        <p className="text-sm text-primary-foreground/80">{description}</p>
        <h3 className="text-4xl md:text-5xl font-bold my-2">{title}</h3>
        <div className="flex gap-4 mt-4">
          <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90 font-light">
            <Link href="#">{buttonText}</Link>
          </Button>
          <Button asChild variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white font-light">
            <Link href="#">Contacto</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group relative rounded-2xl overflow-hidden shadow-lg min-h-[550px] flex flex-col justify-between">
      {imageUrl && (
        <Image 
          src={imageUrl} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint={dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/50"></div>
      <CardContent className="relative z-10 p-6 text-white flex flex-col h-full">
        <div className="flex justify-between items-start">
            {badgeText && (
            <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm">
                {BadgeIcon && <BadgeIcon className="mr-1.5 h-3 w-3" />}
                {badgeText}
            </Badge>
            )}
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm ml-auto">
                <Icon className="h-4 w-4 text-white"/>
            </div>
        </div>
        <div className="mt-auto">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-white/80 mt-1 mb-4">{description}</p>
            <Button asChild variant="ghost" className="font-light text-xs bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
              <Link href="#">
                  {buttonText}
              </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
