
'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { cn } from '@/lib/utils';

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
    <div className={cn(
      "group/card relative h-full flex-1 p-6 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out bg-card shadow-lg flex flex-col justify-between",
      "peer-hover:flex-[0.5] hover:flex-[2]"
    )}>
      <div className="flex items-center gap-3 z-10">
        <Badge className={cn("transition-colors duration-300 text-xs", getBadgeClass())}>
          {item.type}
        </Badge>
        <p className="text-sm text-muted-foreground">{item.day}</p>
      </div>

      <div className="mt-4 z-10">
        <h3 className="text-2xl font-bold tracking-tight text-foreground transition-opacity duration-300 group-hover/card:opacity-100 max-w-[150px]">
          {item.name}
        </h3>
        <p className={cn(
          "text-sm text-muted-foreground mt-2 max-w-[250px] transition-all duration-300",
          "h-0 opacity-0 group-hover/card:h-auto group-hover/card:opacity-100"
        )}>
          {item.description}
        </p>
      </div>
      
      <div className={cn(
          "absolute right-1/2 top-1/2 -translate-y-1/2 h-56 w-56 transition-all duration-500 ease-in-out translate-x-1/2",
           "group-hover/card:right-8 group-hover/card:translate-x-0 group-hover/card:top-16 group-hover/card:-translate-y-0"
        )}
      >
          {item.imageUrl && (
              <Image 
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                objectFit="contain"
                data-ai-hint={item.dataAiHint || ''}
              />
          )}
      </div>

      <div className="mt-auto opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
          {/* You can add a button or more info here for the expanded state */}
      </div>
    </div>
  );
};
