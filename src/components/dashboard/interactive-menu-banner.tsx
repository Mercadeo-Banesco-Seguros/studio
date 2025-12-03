
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

const normalizeDayName = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
    .replace(/[^a-z]/g, ''); // remove non-alphabetic chars
};

export const InteractiveMenuBanner = ({ menuItems }: InteractiveMenuBannerProps) => {
  const [selectedType, setSelectedType] = useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentDayName, setCurrentDayName] = useState('');
  
  useEffect(() => {
    const dayName = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const normalizedToday = normalizeDayName(dayName);
    setCurrentDayName(normalizedToday);

    // Find the classic menu for today to set as default if available
    const todaysClassicMenu = menuItems.find(item => {
        const normalizedItemDay = normalizeDayName(item.day);
        return normalizedItemDay === normalizedToday && item.type === 'Clásico';
    });

    if (todaysClassicMenu) {
        setSelectedType('Clásico');
    } else {
        // Fallback to the first available menu type for today
        const firstAvailableMenu = menuItems.find(item => {
            const normalizedItemDay = normalizeDayName(item.day);
            return normalizedItemDay === normalizedToday;
        });
        if(firstAvailableMenu) {
            setSelectedType(firstAvailableMenu.type);
        } else {
            // If no menu for today, default to classic
            setSelectedType('Clásico');
        }
    }
  }, [menuItems]);

  const selectedMenuItem = useMemo(() => {
    return menuItems.find(item => {
        const normalizedItemDay = normalizeDayName(item.day);
        return normalizedItemDay === currentDayName && item.type === selectedType;
    }) || menuItems.find(item => item.type === selectedType) || null; // Fallback to first available of type
  }, [menuItems, selectedType, currentDayName]);

  const getThumbnailMenu = (type: 'Clásico' | 'Dieta' | 'Ejecutivo') => {
    // Prioritize today's menu for the thumbnail
    const todaysMenu = menuItems.find(item => {
      const normalizedItemDay = normalizeDayName(item.day);
      return normalizedItemDay === currentDayName && item.type === type;
    });
    // Fallback to the first available menu of that type
    return todaysMenu || menuItems.find(item => item.type === type) || null;
  };
  
  const classicMenu = useMemo(() => getThumbnailMenu('Clásico'), [menuItems, currentDayName]);
  const dietaMenu = useMemo(() => getThumbnailMenu('Dieta'), [menuItems, currentDayName]);
  const ejecutivoMenu = useMemo(() => getThumbnailMenu('Ejecutivo'), [menuItems, currentDayName]);
  
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
  
  if (!menuItems || menuItems.length === 0) {
    return null; // Don't render anything if there's no menu
  }

  return (
    <section className="relative w-full bg-primary text-primary-foreground overflow-hidden min-h-[600px] flex items-center">
        <Image
            key={selectedType}
            src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
            alt={`Fondo para menú ${selectedType}`}
            layout="fill"
            objectFit="cover"
            className={cn("absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none", isAnimating ? "opacity-50" : "opacity-100")}
            data-ai-hint="abstract waves"
        />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Main Image */}
          <div className="relative h-96 w-full transform -translate-y-4 md:translate-y-0">
             {selectedMenuItem && selectedMenuItem.imageUrl && (
              <div className={cn("transition-opacity duration-300 w-full h-full", isAnimating ? "opacity-0" : "opacity-100")}>
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
                <Button asChild variant="default" className="bg-white text-primary hover:bg-white/90 font-light rounded-full text-xs">
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
