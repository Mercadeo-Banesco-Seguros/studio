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
      {/* Text Content */}
      <div className="z-10 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Badge className={cn("transition-colors duration-300 text-xs", getBadgeClass())}>
            {item.type}
          </Badge>
          <p className="text-sm text-muted-foreground">{item.day}</p>
        </div>

        <div className="mt-4">
          <h3 className="text-2xl font-bold tracking-tight text-foreground opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            {item.name}
          </h3>
          <p className={cn(
            "text-sm text-muted-foreground mt-2 max-w-[250px] transition-all duration-300",
            "h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100"
          )}>
            {item.description}
          </p>
        </div>
      </div>
      
      {/* Button that appears on hover */}
      <div className="mt-auto opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
          <Button variant="secondary" size="sm">
            Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
      </div>

       {/* Corner Image */}
      {item.imageUrl && (
        <div className="absolute bottom-0 right-0 h-56 w-56 opacity-0 group-hover/card:opacity-100 group-hover/card:scale-100 scale-75 transition-all duration-500 ease-in-out z-0">
          <Image 
            src={item.imageUrl}
            alt={item.name}
            layout="fill"
            objectFit="contain"
            data-ai-hint={item.dataAiHint || ''}
          />
        </div>
      )}

      {/* Collapsed State Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-300 pointer-events-none">
          <p className="font-bold text-lg text-foreground">{item.type}</p>
          <p className="text-sm text-muted-foreground">{item.day}</p>
      </div>
    </div>
  );
};
