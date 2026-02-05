
'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star, Smile, Meh, Frown, Send } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getMenuItems } from '@/ai/flows/get-menu-items-flow';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { InteractiveMenuBanner } from '@/components/dashboard/interactive-menu-banner';
import { GalleryCarousel } from '@/components/dashboard/gallery-carousel';
import { ActivityCarousel } from '@/components/dashboard/activity-carousel';

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

type Satisfaction = 'happy' | 'neutral' | 'sad' | null;
const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

export default function BienestarPage() {
    const [selectedDay, setSelectedDay] = useState(weekDays[0]);
    const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
    const [isLoadingMenu, setIsLoadingMenu] = useState(true);
    const [satisfaction, setSatisfaction] = useState<Satisfaction>(null);
    const [comment, setComment] = useState('');
    const { toast } = useToast();
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
                                        className="object-bottom"
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
                    <Button className="mt-8 rounded-full font-light">Galería de Recuerdos</Button>
                </div>
            </section>

            {/* Feriados y Eventos Section */}
            <section className="py-12 bg-muted/30">
                <div className="container mx-auto px-4">
                    <Card className="p-8 rounded-2xl bg-transparent border-none shadow-none">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h2 className="text-6xl font-bold">Feriados y Eventos</h2>
                                <p className="mt-2 text-muted-foreground">
                                    Mantente al día con las fechas especiales del mes.
                                </p>
                                <Button asChild className="mt-6" variant="outline">
                                    <Link href="/dashboard/calendario">Calendario</Link>
                                </Button>
                            </div>
                            <div className="relative h-96">
                                <Image
                                    src="https://docs.google.com/drawings/d/e/2PACX-1vR5aZgHV3jK7mPbZmTMnqWFihBlFliaMpek4k6pdMQOhuzPgxuiONEdcH-SiVBmuOB6ir68T0bGmmYA/pub?w=1440&h=1080"
                                    alt="Feriados y Eventos"
                                    layout="fill"
                                    objectFit="contain"
                                    data-ai-hint="celebration characters"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Actividades Section */}
            <section className="bg-gradient-to-r from-[#c1e4f1] to-[#349eff]">
                <div className="container mx-auto px-4">
                    <ActivityCarousel />
                </div>
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
}
