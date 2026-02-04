
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Smile, Meh, Frown, Send } from "lucide-react";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockActivities } from "@/lib/placeholder-data";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EventHighlightCard, type EventHighlightProps } from '@/components/dashboard/event-highlight-card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getMenuItems } from '@/ai/flows/get-menu-items-flow';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvents } from '@/contexts/events-context';
import { format, getMonth, getYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { InteractiveMenuBanner } from '@/components/dashboard/interactive-menu-banner';
import { GalleryCarousel } from '@/components/dashboard/gallery-carousel';

// Palabras clave para detectar eventos especiales
const ESPECIAL_KEYWORDS = ['día de', 'feriado', 'conmemorativo', 'aniversario', 'independencia', 'mujer', 'trabajador', 'resistencia', 'navidad', 'noche buena', 'festivo', 'resultados anuales', 'carnavales', 'santo', 'semana santa', 'pascua', 'halloween', 'batalla', 'natalicio', 'año nuevo', 'fin de año'];

const normalizeDayName = (name: string) => {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

type Satisfaction = 'happy' | 'neutral' | 'sad' | null;
const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const slides = [
  {
    id: 1,
    title: (<>Un Espacio para <br /> Tu Bienestar Integral</>),
    imageUrl: "https://docs.google.com/drawings/d/e/2PACX-1vQUatlqD-MuBeilitACo34_2DfwkJSZF4g0k7aHwRISIv-GSuHyJANfJhuDCnxiWq8x_XAFtGykl6p8/pub?w=1440&h=1080",
    dataAiHint: "wellness character",
    gradient: "bg-gradient-to-r from-[#c1e4f1] to-[#349eff]",
    textOrder: 'md:order-2',
    imageOrder: 'md:order-1',
  },
  {
    id: 2,
    title: (<>Recursos que Impulsan <br/> tu Crecimiento</>),
    imageUrl: "https://docs.google.com/drawings/d/e/2PACX-1vSS12ZF_8XD1Aip8eGtiaomWKIDFlwtIt1UD5cVNXfmJHmzFCQ1B_ivy-CXG1q-Cihi3rATsWtrG5-4/pub?w=960&h=720",
    dataAiHint: "growth character",
    gradient: "bg-gradient-to-l from-[#c1e4f1] to-[#349eff]",
    textOrder: 'md:order-1',
    imageOrder: 'md:order-2',
  }
];

/**
 * SOLUCIÓN AL PROBLEMA DEL ÁRBOL:
 * Esta función ahora valida el mes para evitar errores de keywords.
 */
const getEventImage = (title: string): { imageUrl: string; dataAiHint: string } => {
    const lowerTitle = title.toLowerCase();
    const currentMonth = new Date().getMonth(); // 0 = Enero, 1 = Febrero...

    // 1. CARNAVAL (Solo si es Febrero o el título lo dice)
    if (lowerTitle.includes('carnaval') || lowerTitle.includes('carnavales')) {
        return { 
            // CAMBIADO: Usamos una imagen de celebración real, no la del árbol (zb4d...)
            imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_zb4dnhzb4dnhzb4d-Photoroom.png?raw=true", 
            dataAiHint: "carnival celebration" 
        };
    }

    // 2. NAVIDAD (BLOQUEADO: Solo se muestra en Diciembre - Mes 11)
    if ((lowerTitle.includes('navidad') || lowerTitle.includes('noche buena')) && currentMonth === 11) {
        return { 
            imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_ka2ygrka2ygrka2y-Photoroom.png?raw=true',
            dataAiHint: 'Christmas tree' 
        };
    }

    // 3. OTROS EVENTOS
    if (lowerTitle.includes('independencia')) {
        return { imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_wr32ivwr32ivwr32-Photoroom.png?raw=true", dataAiHint: "independence day" };
    }
    if (lowerTitle.includes('pascua') || lowerTitle.includes('semana santa')) {
        return { imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_juve0ejuve0ejuve-Photoroom.png?raw=true", dataAiHint: "easter celebration" };
    }
    if (lowerTitle.includes('halloween')) {
        return { imageUrl: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(59).png?raw=true", dataAiHint: "halloween pumpkin" };
    }
    
    // FALLBACK: Imagen de bienestar genérica para cualquier otro caso
    return { 
        imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000", 
        dataAiHint: "general celebration" 
    };
};

export default function BienestarPage() {
    const [selectedDay, setSelectedDay] = useState(weekDays[0]);
    const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
    const [isLoadingMenu, setIsLoadingMenu] = useState(true);
    const { allEvents } = useEvents();
    const [importantEvents, setImportantEvents] = useState<EventHighlightProps[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const [satisfaction, setSatisfaction] = useState<Satisfaction>(null);
    const [comment, setComment] = useState('');
    const { toast } = useToast();
    const activitiesScrollRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const today = new Date();
        const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
        const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        setSelectedDay(weekDays.includes(capitalizedDay) ? capitalizedDay : 'Lunes');
        
        const fetchMenu = async () => {
          setIsLoadingMenu(true);
          try {
            const items = await getMenuItems();
            setAllMenuItems(items);
          } catch (error) {
            console.error("Failed to fetch menu", error);
          } finally {
            setIsLoadingMenu(false);
          }
        };
        fetchMenu();
    }, []);

    useEffect(() => {
        if (allEvents.length > 0) {
            setIsLoadingEvents(true);
            const now = new Date();
            const currentMonth = getMonth(now);
            const currentYear = getYear(now);

            const eventsToShow = allEvents
                .filter(event => {
                    const eventMonth = getMonth(event.date);
                    const eventYear = getYear(event.date);
                    const isSpecial = ESPECIAL_KEYWORDS.some(kw => event.title.toLowerCase().includes(kw));
                    return eventYear === currentYear && eventMonth === currentMonth && isSpecial;
                })
                .sort((a, b) => a.date.getTime() - b.date.getTime());

            const formatted = eventsToShow.slice(0, 2).map(event => {
              const { imageUrl, dataAiHint } = getEventImage(event.title);
              return {
                title: event.title,
                date: format(event.date, "d 'de' MMMM", { locale: es }),
                description: event.description || `Evento especial programado para el ${format(event.date, "d 'de' MMMM", { locale: es })}.`,
                imageUrl,
                dataAiHint
              };
            });

            setImportantEvents(formatted);
            setIsLoadingEvents(false);
        }
    }, [allEvents]);

    const handleActivitiesScroll = (direction: 'left' | 'right') => {
        const viewport = activitiesScrollRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
        if (viewport) {
            const scrollAmount = viewport.offsetWidth;
            viewport.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    const handleFeedbackSubmit = () => {
        if (!satisfaction || !comment.trim()) {
            toast({ title: "Atención", description: "Completa la calificación y el comentario.", variant: "destructive" });
            return;
        }
        toast({ title: "¡Gracias!", description: "Tu opinión ha sido enviada." });
        setSatisfaction(null);
        setComment('');
    };

    return (
        <div className="bg-background text-foreground">
            {/* HERO */}
            <section className="relative h-[600px] w-full text-foreground overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={cn(
                            'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
                            slide.gradient,
                            activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        )}
                    >
                        <div className="container mx-auto px-4 h-full grid md:grid-cols-2 items-center">
                            <div className={cn("text-left", slide.textOrder)}>
                                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">{slide.title}</h1>
                            </div>
                            <div className={cn("relative h-full w-full hidden md:flex items-end justify-center", slide.imageOrder)}>
                                <div className="relative w-full h-[500px]">
                                    <Image
                                        src={slide.imageUrl}
                                        alt={slide.dataAiHint || 'Hero Image'}
                                        layout="fill"
                                        objectFit="contain"
                                        data-ai-hint={slide.dataAiHint}
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* GALERÍA */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <GalleryCarousel />
                    <Button className="mt-8">Galería de Recuerdos</Button>
                </div>
            </section>

            {/* EVENTOS */}
            <section className="py-24 bg-muted/50">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        {isLoadingEvents ? (
                            <Skeleton className="h-96 w-full rounded-2xl col-span-2" />
                        ) : importantEvents.length > 0 ? (
                            importantEvents.map((ev, i) => <EventHighlightCard key={i} {...ev} />)
                        ) : (
                            <Card className="col-span-2 p-8 text-center"><Star className="mx-auto mb-4 opacity-20" />Sin eventos este mes</Card>
                        )}
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold">Feriados y Eventos</h2>
                        <p className="mt-4 text-muted-foreground">Mantente al día con las fechas especiales del mes.</p>
                        <Button asChild className="mt-6" variant="outline"><Link href="/dashboard/calendario">Ver Calendario</Link></Button>
                    </div>
                </div>
            </section>

            {/* ACTIVIDADES */}
            <section id="explorar-actividades" className="py-24 container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <Badge>Bienestar</Badge>
                        <h2 className="text-4xl font-bold mt-2">Nuestras Actividades</h2>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleActivitiesScroll('left')}><ChevronLeft /></Button>
                        <Button variant="outline" size="icon" onClick={() => handleActivitiesScroll('right')}><ChevronRight /></Button>
                    </div>
                </div>
                <ScrollArea ref={activitiesScrollRef}>
                    <div className="flex space-x-6 pb-6">
                        {mockActivities.map(act => <ActivityCard key={act.id} activity={act} />)}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </section>

            {/* MENÚ */}
            <section id="menu" className="py-24 bg-muted/30">
                {isLoadingMenu ? <Skeleton className="h-96 container mx-auto" /> : (
                    <InteractiveMenuBanner 
                        menuItems={allMenuItems} 
                        selectedDay={selectedDay} 
                        onDayChange={setSelectedDay} 
                        showDayFilter 
                    />
                )}
            </section>

            {/* FEEDBACK */}
            <section className="py-24 container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center bg-card rounded-3xl overflow-hidden shadow-xl">
                    <div className="h-[500px] relative">
                        <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(55).png?raw=true" alt="Feedback" layout="fill" objectFit="cover" />
                    </div>
                    <div className="p-8">
                        <h2 className="text-3xl font-bold mb-4">¿Cómo podemos mejorar?</h2>
                        <div className="flex gap-4 mb-6">
                            {(['happy', 'neutral', 'sad'] as Satisfaction[]).map(type => (
                                <Button 
                                    key={type} 
                                    variant="ghost" 
                                    className={cn("h-16 w-16 rounded-full", satisfaction === type && "bg-primary/10 scale-110")}
                                    onClick={() => setSatisfaction(type)}
                                >
                                    {type === 'happy' && <Smile className={cn(satisfaction === type && "text-green-500")} />}
                                    {type === 'neutral' && <Meh className={cn(satisfaction === type && "text-yellow-500")} />}
                                    {type === 'sad' && <Frown className={cn(satisfaction === type && "text-red-500")} />}
                                </Button>
                            ))}
                        </div>
                        <Textarea placeholder="Cuéntanos más..." value={comment} onChange={e => setComment(e.target.value)} className="mb-4" />
                        <Button className="w-full" onClick={handleFeedbackSubmit}>Enviar Feedback <Send className="ml-2 h-4 w-4" /></Button>
                    </div>
                </div>
            </section>
        </div>
    );

    
