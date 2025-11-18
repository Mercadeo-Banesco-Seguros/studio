
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
        "group/card relative p-6 rounded-2xl overflow-hidden transition-all duration-500 ease-in-out bg-card shadow-lg",
        "flex-1 hover:flex-grow-[1.5]"
      )}
    >
        {/* Expanded Content - Visible on hover */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 ease-in-out delay-200">
            <div>
                <div className="flex items-center gap-3">
                    <Badge className={cn("transition-colors duration-300 text-xs", getBadgeClass())}>
                        {item.type}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{item.day}</p>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground mt-4">{item.name}</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-[250px]">{item.description}</p>
            </div>
            <div className="mt-auto z-10">
                <Button variant="secondary" size="sm">
                    Ver detalles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
        
        {/* Collapsed/Default Content - Visible by default, hidden on hover */}
        <div className="w-full h-full flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out opacity-100 group-hover/card:opacity-0">
            <div className='absolute top-6 left-6 flex items-center gap-2'>
              <Badge className={cn("transition-colors duration-300 text-xs", getBadgeClass())}>
                  {item.type}
              </Badge>
              <p className="text-sm text-muted-foreground">{item.day}</p>
            </div>
            {item.imageUrl && (
                <div className="relative h-48 w-48 transition-all duration-300 ease-in-out">
                    <Image 
                        src={item.imageUrl}
                        alt={item.name}
                        layout="fill"
                        objectFit="contain"
                        data-ai-hint={item.dataAiHint || ''}
                    />
                </div>
            )}
        </div>
    </div>
  );
};
