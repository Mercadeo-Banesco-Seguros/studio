'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users, BrainCircuit, ToyBrick, Mail, Briefcase, ChevronLeft, ChevronRight, Star, Smile, Meh, Frown, Send, Gift, PartyPopper, Award, MapPin, Clock, Utensils } from "lucide-react";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockActivities } from "@/lib/placeholder-data";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { EventHighlightCard, type EventHighlightProps } from '@/components/dashboard/event-highlight-card';
import type { LucideIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { getMenuItems } from '@/ai/flows/get-menu-items-flow';
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEvents } from '@/contexts/events-context';
import { format, getMonth, getYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { InteractiveMenuCard } from '@/components/dashboard/interactive-menu-card';
import { InteractiveMenuBanner } from '@/components/dashboard/interactive-menu-banner';

const ESPECIAL_KEYWORDS = ['día de', 'feriado', 'conmemorativo', 'aniversario', 'independencia', 'mujer', 'trabajador', 'resistencia', 'navidad', 'noche buena', 'festivo', 'resultados anuales', 'carnavales', 'santo', 'batalla', 'natalicio', 'año nuevo', 'fin de año'];

const normalizeDayName = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0000-\u007f]/g, ""); 
};

type Satisfaction = 'happy' | 'neutral' | 'sad' | null;

const weekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

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

    useEffect(() => {
        const today = new Date();
        const dayName = today.toLocaleDateString('es-ES', { weekday: 'long' });
        const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        if (weekDays.includes(capitalizedDay)) {
            setSelectedDay(capitalizedDay);
        } else {
            setSelectedDay('Lunes'); // Default to Monday if it's weekend
        }
        
        const fetchMenu = async () => {
          setIsLoadingMenu(true);
          try {
            const items = await getMenuItems();
            setAllMenuItems(items);
          } catch (error) {
            console.error("Failed to fetch menu items", error);
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

            const specialEventsThisMonth = allEvents
                .filter(event => {
                    const eventMonth = getMonth(event.date);
                    const eventYear = getYear(event.date);
                    const isSpecial = ESPECIAL_KEYWORDS.some(kw => event.title.toLowerCase().includes(kw));
                    return eventYear === currentYear && eventMonth === currentMonth && isSpecial;
                })
                .sort((a, b) => a.date.getTime() - b.date.getTime());

            const formattedEvents = specialEventsThisMonth.slice(0, 2).map(event => {
              const isChristmas = event.title.toLowerCase().includes('navidad');
              return {
                title: event.title,
                date: format(event.date, "d 'de' MMMM", { locale: es }),
                description: event.description || `Un evento especial programado para el ${format(event.date, "PPP", { locale: es })}.`,
                imageUrl: isChristmas 
                    ? "https://cdn.shopify.com/s/files/1/0411/7381/1350/files/origen_del_arbol_de_navidad_-_alblanc1.jpg?v=1637495190"
                    : "https://images.unsplash.com/photo-1601276174812-63280a55656e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxkZXNjYW5zb3xlbnwwfHx8fDE3NjU0ODc0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
                dataAiHint: isChristmas ? "christmas tree" : "celebration event"
            }});

            setImportantEvents(formattedEvents);
            setIsLoadingEvents(false);
        } else {
            setIsLoadingEvents(true);
            setTimeout(() => { 
                if(allEvents.length === 0) setIsLoadingEvents(false);
            }, 1500);
        }
    }, [allEvents]);
    
    const handleActivitiesScroll = (direction: 'left' | 'right') => {
        const viewport = activitiesScrollRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
        if (viewport) {
            const scrollAmount = viewport.offsetWidth;
            viewport.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    
    const handleFeedbackSubmit = () => {
        if (!satisfaction) {
            toast({
                title: "Calificación requerida",
                description: "Por favor, selecciona una opción de satisfacción.",
                variant: "destructive",
            });
            return;
        }
        if (!comment.trim()) {
             toast({
                title: "Comentario requerido",
                description: "Por favor, escribe tu sugerencia o comentario.",
                variant: "destructive",
            });
            return;
        }
        
        toast({
            title: "¡Gracias por tu opinión!",
            description: "Hemos recibido tu comentario y lo tendremos en cuenta.",
        });

        setSatisfaction(null);
        setComment('');
    };

    const filteredMenuItems = useMemo(() => {
        return allMenuItems.filter(item => normalizeDayName(item.day) === normalizeDayName(selectedDay));
    }, [allMenuItems, selectedDay]);

  return (
    <div className="bg-background text-foreground">
      
      {/* Hero Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-br from-accent to-secondary text-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Badge variant="outline" className="mb-4 border-white/50 text-white">Banesco Seguros</Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Un Espacio para <br /> Tu Bienestar Integral
            </h1>
            <p className="mt-4 text-white/80 max-w-md">
              Creamos oportunidades para que puedas construir un estilo de vida saludable y equilibrado, fomentando tanto tu desarrollo personal como profesional.
            </p>
             <Button asChild size="lg" className="mt-8 font-light bg-white text-primary hover:bg-white/90">
              <Link href="#explorar-actividades">
                Explorar Actividades
              </Link>
            </Button>
          </div>
           <div className="relative h-[32rem] w-full rounded-2xl overflow-hidden group">
              <Image
                  src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(56).png?raw=true"
                  alt="Persona practicando yoga al aire libre"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="person doing yoga"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-4">
              {isLoadingEvents ? (
                <>
                  <Skeleton className="h-96 w-full rounded-2xl" />
                  <Skeleton className="h-96 w-full rounded-2xl" />
                </>
              ) : importantEvents.length > 1 ? (
                <>
                  <EventHighlightCard {...importantEvents[0]} />
                  <EventHighlightCard {...importantEvents[1]} />
                </>
              ) : (
                <Card className="col-span-2 flex flex-col items-center justify-center text-center text-muted-foreground p-8 bg-background rounded-2xl min-h-[384px]">
                  <Star className="h-12 w-12 mb-4 text-primary/50" />
                  <h3 className="text-xl font-semibold text-foreground">Calendario al día</h3>
                  <p className="max-w-md mt-2">No hay más eventos especiales para mostrar este mes. ¡Visita el calendario completo para ver todo lo que viene!</p>
                </Card>
              )}
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Feriados de este Mes
              </h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Mantente al día con las celebraciones y fechas especiales que tenemos en Banesco Seguros.
              </p>
              <Button asChild size="lg" className="mt-8 font-light" variant="default">
                <Link href="/dashboard/calendario">
                  Ver Calendario Completo
                </Link>
              </Button>
            </div>
        </div>
      </section>
      
      {/* Galería de Recuerdos Section */}
      <section className="py-12 sm:py-16 text-primary-foreground relative overflow-hidden">
        <Image
          src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
          alt="Abstract background"
          layout="fill"
          objectFit="cover"
          className="z-0"
          data-ai-hint="abstract waves"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 mb-4">Actividades Corporativas</Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Galería de Recuerdos
          </h2>
           <div className="relative h-[22rem] w-full flex items-center justify-center group">
              <Card className="absolute w-80 h-56 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 ease-in-out group-hover:rotate-0 group-hover:translate-x-0 group-hover:scale-90 -rotate-15 -translate-x-60">
                  <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Iniciativa%20Dulce%20o%20Truco%20BSV%20(2).jpg?raw=true" alt="Team photo 1" layout="fill" objectFit="cover" data-ai-hint="team picture" quality={100} unoptimized />
              </Card>
              <Card className="absolute w-96 h-64 rounded-2xl overflow-hidden shadow-2xl transform z-10 scale-110 group-hover:scale-90 transition-transform duration-500 ease-in-out">
                  <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Octubre%20Rosa%202025%20(3).jpg?raw=true" alt="Team photo 2" layout="fill" objectFit="cover" data-ai-hint="team success" quality={100} unoptimized />
              </Card>
              <Card className="absolute w-80 h-56 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 ease-in-out group-hover:rotate-0 group-hover:translate-x-0 group-hover:scale-90 rotate-15 translate-x-60">
                  <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Semana%20Huella.%20Mural.%202025%20(2).jpg?raw=true" alt="Team photo 3" layout="fill" objectFit="cover" data-ai-hint="team collaboration" quality={100} unoptimized />
              </Card>
          </div>
        </div>
      </section>

      {/* Activities Section */}
        <div id="explorar-actividades" className="scroll-mt-20 py-24 sm:py-32">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <Badge variant="outline">Actividades</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Explora Nuestras Actividades</h2>
                        <p className="mt-2 text-muted-foreground max-w-2xl">
                            Sumérgete en un mundo de bienestar y desarrollo con nuestras actividades diseñadas para ti.
                        </p>
                    </div>
                     <div className="hidden md:flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleActivitiesScroll('left')}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full" onClick={() => handleActivitiesScroll('right')}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                 <div ref={activitiesScrollRef}>
                    <ScrollArea>
                        <div className="flex w-max space-x-6 pb-4">
                            {mockActivities.map((activity) => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </div>
      
      {/* Menu Section */}
      <div id="menu" className="scroll-mt-20">
          {isLoadingMenu ? (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Skeleton className="h-[600px] w-full rounded-2xl" />
            </div>
          ) : allMenuItems.length > 0 ? (
            <InteractiveMenuBanner 
                menuItems={allMenuItems} 
                selectedDay={selectedDay}
                onDayChange={setSelectedDay}
                showDayFilter={true}
            />
          ) : (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <p>No hay menú disponible para hoy. Por favor, consulte el menú semanal completo.</p>
                  </CardContent>
                </Card>
            </div>
          )}
        </div>

      {/* Feedback Section */}
      <div id="empezar" className="scroll-mt-20 py-24 sm:py-32">
        <div className="container mx-auto px-4">
           <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative rounded-2xl overflow-hidden h-[700px]">
                     <Image
                        src="https://cdn.connectamericas.com/sites/default/files/ThinkstockPhotos-508454788.jpg"
                        alt="Persona sonriendo"
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                        data-ai-hint="happy person"
                    />
                    <div className="absolute inset-0 bg-blue-900/40"></div>
                </div>
                <div>
                    <Badge>Feedback</Badge>
                    <h2 className="text-3xl font-bold tracking-tight mt-2">Tu Opinión Nos Importa</h2>
                    <p className="text-muted-foreground mt-4">
                        Tu opinión es importante. Déjanos tus sugerencias, comentarios o califica tu satisfacción con nuestros servicios de bienestar.
                    </p>
                    <Card className="mt-8 p-6 shadow-lg">
                      <CardHeader className="text-center p-0">
                        <CardTitle className="font-bold text-xl">¿Cómo calificarías tu experiencia?</CardTitle>
                        <CardDescription className="text-sm mt-1">Selecciona una opción y déjanos tu comentario.</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0 mt-6 space-y-6">
                        <div className="flex justify-center gap-4">
                            <Button variant="ghost" size="icon" className={cn("h-14 w-14 rounded-full transition-all", satisfaction === 'happy' && 'bg-green-100 scale-110')} onClick={() => setSatisfaction('happy')}>
                                <Smile className={cn("h-7 w-7 text-muted-foreground", satisfaction === 'happy' && 'text-green-500')} />
                            </Button>
                            <Button variant="ghost" size="icon" className={cn("h-14 w-14 rounded-full transition-all", satisfaction === 'neutral' && 'bg-amber-100 scale-110')} onClick={() => setSatisfaction('neutral')}>
                                <Meh className={cn("h-7 w-7 text-muted-foreground", satisfaction === 'neutral' && 'text-amber-500')} />
                            </Button>
                            <Button variant="ghost" size="icon" className={cn("h-14 w-14 rounded-full transition-all", satisfaction === 'sad' && 'bg-red-100 scale-110')} onClick={() => setSatisfaction('sad')}>
                                <Frown className={cn("h-7 w-7 text-muted-foreground", satisfaction === 'sad' && 'text-red-500')} />
                            </Button>
                        </div>
                        <Textarea 
                            placeholder="Escribe tu comentario o sugerencia aquí..." 
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button size="lg" className="w-full" onClick={handleFeedbackSubmit}>
                            Enviar Opinión <Send className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
