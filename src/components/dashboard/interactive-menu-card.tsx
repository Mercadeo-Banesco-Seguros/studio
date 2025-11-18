
'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { cn } from '@/lib/utils';

interface InteractiveMenuCardProps {
  item: MenuItem;
  isInitiallyOpen?: boolean;
}

export const InteractiveMenuCard = ({ item, isInitiallyOpen = false }: InteractiveMenuCardProps) => {
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
        "group relative h-full flex-1 p-6 rounded-2xl overflow-hidden transition-all duration-500 ease-out bg-card shadow-lg flex flex-col justify-between hover:flex-[3] peer-hover:flex-1",
        isInitiallyOpen && "flex-[3]"
      )}
    >
      <div className="flex items-center gap-3">
        <Badge className={cn("transition-all duration-500 text-xs", getBadgeClass())}>
          {item.type}
        </Badge>
        <p className={cn(
            "text-sm text-muted-foreground transition-all duration-500 opacity-100",
            "group-hover:opacity-0 group-hover:w-0",
            isInitiallyOpen && "opacity-0 w-0"
          )}
        >
          {item.day}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold tracking-tight text-foreground transition-all duration-500">
          {item.name}
        </h3>
        <p className={cn(
            "text-sm text-muted-foreground mt-2 max-w-[200px] transition-all duration-500 opacity-0 h-0",
            "group-hover:opacity-100 group-hover:h-auto",
            isInitiallyOpen && "opacity-100 h-auto"
          )}
        >
          {item.description}
        </p>
      </div>
      
      <div className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 h-48 w-48 transition-all duration-500 ease-in-out opacity-0",
          "group-hover:opacity-100 group-hover:right-[45%] group-hover:translate-x-1/2",
           isInitiallyOpen && "opacity-100 right-[45%] translate-x-1/2"
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

      <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {/* You can add a button or more info here for the expanded state */}
      </div>
    </div>
  );
};
