'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface InteractiveMenuBannerProps {
  menuItems: MenuItem[];
}

export const InteractiveMenuBanner = ({ menuItems }: InteractiveMenuBannerProps) => {
  const [selectedType, setSelectedType] = useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
  const [isAnimating, setIsAnimating] = useState(false);

  const selectedMenuItem = useMemo(() => {
    return menuItems.find(item => item.type === selectedType) || null;
  }, [menuItems, selectedType]);

  const classicMenu = useMemo(() => menuItems.find(item => item.type === 'Clásico'), [menuItems]);
  const dietaMenu = useMemo(() => menuItems.find(item => item.type === 'Dieta'), [menuItems]);
  const ejecutivoMenu = useMemo(() => menuItems.find(item => item.type === 'Ejecutivo'), [menuItems]);
  
  const handleThumbnailClick = (type: 'Clásico' | 'Dieta' | 'Ejecutivo') => {
    if (type !== selectedType) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedType(type);
        setIsAnimating(false);
      }, 300); // Duration of the fade-out animation
    }
  };

  const handleNext = () => {
    const types: ('Clásico' | 'Dieta' | 'Ejecutivo')[] = ['Clásico', 'Dieta', 'Ejecutivo'];
    const currentIndex = types.indexOf(selectedType);
    const nextIndex = (currentIndex + 1) % types.length;
    handleThumbnailClick(types[nextIndex]);
  };
  
  const backgroundImages = {
    Clásico: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8d2hpdGV8ZW58MHx8fHwxNzYzNjc0MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    Dieta: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8d2hpdGV8ZW58MHx8fHwxNzYzNjc0MTMzfDA&ixlib-rb-4.1.0&q=80&w=1080',
    Ejecutivo: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8d2hpdGV8ZW58MHx8fHwxNzYzNjc0MTMzfDA&ixlib-rb-4.1.0&q=80&w=1080',
  };


  if (!menuItems || menuItems.length === 0) {
    return null; // Don't render anything if there's no menu
  }

  return (
    <section className="relative w-full bg-primary text-primary-foreground overflow-hidden shadow-2xl min-h-[500px] flex items-center">
        {backgroundImages[selectedType] && (
            <Image
                key={selectedType}
                src={backgroundImages[selectedType]}
                alt={`Fondo para menú ${selectedType}`}
                layout="fill"
                objectFit="cover"
                className={cn("absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none", isAnimating ? "opacity-50" : "opacity-100")}
                data-ai-hint="food background"
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent pointer-events-none z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Main Image */}
          <div className="relative h-80 w-full transform -translate-y-4 md:translate-y-0">
             {selectedMenuItem && selectedMenuItem.imageUrl && (
              <div className={cn("transition-opacity duration-300", isAnimating ? "opacity-0" : "opacity-100")}>
                <Image
                    src={selectedMenuItem.imageUrl}
                    alt={selectedMenuItem.name}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint={selectedMenuItem.dataAiHint || 'food plate'}
                />
              </div>
            )}
          </div>

          {/* Right Side: Details & Thumbnails */}
          <div className="relative">
            {selectedMenuItem && (
                <div className={cn("transition-opacity duration-300 text-white", isAnimating ? "opacity-0" : "opacity-100")}>
                    <p className="text-sm font-light text-white/80 mb-2">Menú {selectedMenuItem.type.toLowerCase()}</p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">{selectedMenuItem.name}</h2>
                    <p className="text-sm text-white/80 max-w-sm mb-8">{selectedMenuItem.description}</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button asChild variant="secondary" className="bg-white/90 text-primary hover:bg-white font-light rounded-full">
                    <Link href="/dashboard/bienestar#menu">
                        Menú Semanal
                    </Link>
                </Button>
                
                {/* Thumbnails */}
                <div className="flex items-center gap-3">
                  {[classicMenu, dietaMenu, ejecutivoMenu].map(menu => {
                    if (!menu || !menu.imageUrl) return null;
                    const isSelected = selectedType === menu.type;
                    return (
                      <button
                        key={menu.id}
                        onClick={() => handleThumbnailClick(menu.type)}
                        className={cn(
                          "relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ease-in-out transform hover:scale-105",
                          isSelected ? "border-white shadow-2xl scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <Image
                          src={menu.imageUrl}
                          alt={`Thumbnail of ${menu.name}`}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={menu.dataAiHint || 'food plate'}
                        />
                      </button>
                    )
                  })}
                </div>
            </div>

            <Button size="icon" variant="ghost" className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 text-white/50 hover:bg-white/10 hover:text-white" onClick={handleNext}>
                <ChevronRight className="h-6 w-6"/>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
