'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface InteractiveMenuCardProps {
  item: MenuItem;
}

export const InteractiveMenuCard = ({ item }: InteractiveMenuCardProps) => {
  const getBadgeClass = () => {
    switch (item.type) {
      case 'Clásico':
        return 'bg-menu-clasico text-white';
      case 'Dieta':
        return 'bg-menu-dieta text-white';
      case 'Ejecutivo':
        return 'bg-menu-ejecutivo text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
      className={cn(
        "group/card relative h-full flex-1 p-6 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out bg-card shadow-lg flex flex-col justify-between",
        "hover:flex-grow-[8]" // The hovered card expands
      )}
    >
      {/* Background Image */}
      {item.imageUrl && (
        <Image 
          src={item.imageUrl}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={item.dataAiHint || ''}
          className="absolute inset-0 z-0 opacity-20 group-hover/card:opacity-100 transition-opacity duration-500"
        />
      )}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />


      {/* Text Content */}
      <div className="z-10 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Badge className={cn("transition-colors duration-300 text-xs group-hover/card:bg-white/20 group-hover/card:text-white group-hover/card:backdrop-blur-sm", getBadgeClass())}>
            {item.type}
          </Badge>
          <p className="text-sm text-muted-foreground group-hover/card:text-white/80">{item.day}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover/card:text-white transition-colors duration-300">
            {item.name}
          </h3>
          <p className={cn(
            "text-sm text-muted-foreground group-hover/card:text-white/90 mt-2 max-w-[250px] transition-all duration-300",
            "h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100"
          )}>
            {item.description}
          </p>
        </div>
      </div>
      
      {/* Button that appears on hover */}
      <div className="mt-auto opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
          <Button variant="secondary" size="sm" className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
            Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>
    </div>
  );
};
