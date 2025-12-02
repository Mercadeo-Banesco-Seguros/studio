
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
      <Card className="bg-primary text-primary-foreground rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
          <Icon className="h-8 w-8" />
        </div>
        <p className="text-sm text-primary-foreground/80">{description}</p>
        <h3 className="text-3xl font-bold my-2">{title}</h3>
        <Button asChild variant="secondary" className="mt-4 bg-white text-primary hover:bg-white/90">
          <Link href="#">{buttonText}</Link>
        </Button>
      </Card>
    );
  }

  return (
    <Card className="group relative rounded-2xl overflow-hidden shadow-lg min-h-[400px] flex flex-col justify-end">
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
      <CardContent className="relative z-10 p-6 text-white">
        {badgeText && (
          <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm">
            {BadgeIcon && <BadgeIcon className="mr-1.5 h-3 w-3" />}
            {badgeText}
          </Badge>
        )}
        <div className="absolute top-6 right-6 p-2 rounded-full bg-white/20 backdrop-blur-sm">
            <Icon className="h-4 w-4 text-white"/>
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-white/80 mt-1 mb-4">{description}</p>
        <Button asChild variant="ghost" className="p-0 h-auto text-white/80 hover:text-white hover:bg-transparent">
          <Link href="#" className="text-sm">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
