
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { CourseCard } from "@/components/dashboard/course-card";
import { ActivityCard } from "@/components/dashboard/activity-card";
import { mockCourses, mockActivities, mockDepartments, mockPlaylist, faqData, mockDressCodeItems } from "@/lib/placeholder-data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import {
  Landmark,
  UsersRound,
  Cpu,
  GitFork,
  ArrowRight,
  Plane,
  ShieldCheck,
  FileText,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sun,
  Umbrella,
  Ship,
  Bike,
  Clock,
  Hospital,
  MessageSquare,
  Phone,
  Star,
  Check,
  ArrowUpRight,
  Users,
  DollarSign,
  Megaphone,
  Settings,
  LifeBuoy,
  Mail,
  BookCheck,
  TrendingUp,
  Award,
  CalendarCheck,
  HeartHandshake,
  Dumbbell,
  Music,
  Drama,
  Music2,
  Home,
  User,
  Cog,
  Lightbulb,
  Shield,
  Handshake,
  Play,
  ChefHat,
  Briefcase,
  Scale,
  FolderKanban,
  FileSignature
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { MenuItem } from '@/ai/flows/get-menu-items-flow';
import { getMenuItems } from '@/ai/flows/get-menu-items-flow';
import { MenuItemCard } from '@/components/dashboard/menu-item-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlaylistCard } from '@/components/dashboard/playlist-card';
import { Skeleton } from '@/components/ui/skeleton';
import { DressCodeCard } from '@/components/dashboard/dress-code-card';


const pilaresData = [
    { number: "01", title: "Calidad", text: "Trabajamos para brindar mejores soluciones a nuestros clientes.", icon: Award, color: "bg-primary" },
    { number: "02", title: "Innovación", text: "Construimos una visión de futuro para nuestra organización.", icon: Lightbulb, color: "bg-secondary" },
    { number: "03", title: "Confiabilidad", text: "La cultura de servicio se enfoca en unir esfuerzos en torno a nuestros clientes.", icon: Shield, color: "bg-sky-400" },
    { number: "04", title: "Responsabilidad", text: "Cumplimos con nuestros compromisos; brindamos seguridad y confianza.", icon: Handshake, color: "bg-blue-400" },
];

const activityHighlights = [
  { title: "Salud Física", description: "Fortalece tu cuerpo y energía.", icon: Dumbbell },
  { title: "Salud Mental", description: "Encuentra paz y equilibrio.", icon: HeartHandshake },
  { title: "Eventos Especiales", description: "Celebra y conecta con el equipo.", icon: CalendarCheck },
  { title: "Formación y Cultura", description: "Crece profesional y personalmente.", icon: BookCheck }
];


const AnimatedContactButton = ({ href, type, label, number, icon: Icon, className, iconClassName }: {
  href: string;
  type: 'whatsapp' | 'phone' | 'email';
  label: string;
  number: string;
  icon: React.ElementType;
  className: string;
  iconClassName: string;
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isClicked) return;

    setIsClicked(true);

    setTimeout(() => {
      window.location.href = href;
      setTimeout(() => {
         setIsClicked(false);
      }, 300);
    }, 500);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "relative flex w-[280px] items-center justify-start rounded-full p-2 text-white shadow-lg transition-colors duration-300 hover:brightness-110 overflow-hidden h-[56px]",
        className
      )}
    >
      <div className={cn("pl-4 transition-opacity duration-200", isClicked ? "opacity-0" : "opacity-100")}>
        <p className="text-[10px]">{label}</p>
        <p className={cn("font-semibold", type === 'email' ? "text-[11px]" : "text-xs")}>{number}</p>
      </div>

      <div
        className={cn(
          "absolute top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out",
          "transform -translate-y-1/2",
          isClicked ? "left-2" : "right-2",
        )}
      >
         {isClicked ? <Check className="h-4 w-4 text-green-500" /> : <Icon className={cn("h-4 w-4", iconClassName)} />}
      </div>
    </Link>
  );
};

const iconMap: { [key: string]: React.ElementType } = {
  rh: Users,
  it: Cpu,
  finanzas: DollarSign,
  marketing: Megaphone,
  operaciones: Settings,
  vacaciones: Plane,
  hcm: ShieldCheck,
  servicios: LifeBuoy
};

const departmentGridConfig = [
  { 
    id: 'rh', 
    className: "bg-neutral-800 text-white row-span-2 col-span-2", 
    title: "Recursos Humanos", 
    description: "Constancias, recibos y más." 
  },
  { 
    id: 'it', 
    className: "bg-sky-500 text-white col-span-1", 
    title: "Soporte TI", 
    description: "Equipos y software." 
  },
  { 
    id: 'servicios', 
    className: "bg-amber-400 text-neutral-900 col-span-1", 
    title: "Servicios Generales", 
    description: "Mantenimiento." 
  },
  { 
    id: 'hcm', 
    className: "bg-lime-400 text-neutral-900 col-span-2", 
    title: "Póliza HCM", 
    description: "Consultas y reembolsos." 
  }
];

// Helper function to normalize day names for comparison
const normalizeDayName = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
};


export default function DashboardPage() {
  const dressCodeScrollRef = useRef<HTMLDivElement>(null);
  const [currentDayName, setCurrentDayName] = useState('');
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [heroImage, setHeroImage] = useState({
    src: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(32).png?raw=true",
    hint: "sun behind cloud"
  });
  const [heroGradient, setHeroGradient] = useState("from-[#84a9ff] to-[#f5f8ff]");
  const [activeFaqCategory, setActiveFaqCategory] = useState<'General' | 'Soporte' | 'Otros'>('General');
  const [todaysMenus, setTodaysMenus] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);

  const faqCategories = [
    { id: 'General', label: 'General', icon: Home },
    { id: 'Soporte', label: 'Soporte', icon: User },
    { id: 'Otros', label: 'Otros', icon: Cog },
  ];
  
  const handleCourseChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentCourseIndex((prevIndex) => (prevIndex + 1) % mockCourses.length);
    } else {
      setCurrentCourseIndex((prevIndex) => (prevIndex - 1 + mockCourses.length) % mockCourses.length);
    }
  };

  const handleDressCodeScroll = (direction: 'left' | 'right') => {
    const viewport = dressCodeScrollRef.current?.querySelector<HTMLDivElement>('[data-radix-scroll-area-viewport]');
    if (viewport) {
      const scrollAmount = 344; // w-80 (320px) + space-x-6 (24px)
      viewport.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMenuChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentMenuIndex((prevIndex) => (prevIndex + 1) % todaysMenus.length);
    } else {
      setCurrentMenuIndex((prevIndex) => (prevIndex - 1 + todaysMenus.length) % todaysMenus.length);
    }
  };


  const currentCourse = mockCourses[currentCourseIndex];
  
  useEffect(() => {
    const todayDate = new Date();
    const dayName = todayDate.toLocaleDateString('es-ES', { weekday: 'long' });
    setCurrentDayName(dayName.charAt(0).toUpperCase() + dayName.slice(1));

    const updateTimeAndAssets = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));

      const currentHour = now.getHours();
      const timeInMinutes = currentHour * 60 + now.getMinutes();
      
      const morningStart = 5 * 60; // 5:00 AM
      const afternoonStart = 14 * 60 + 30; // 2:30 PM
      const nightStart = 17 * 60 + 30; // 5:30 PM

      if (timeInMinutes >= morningStart && timeInMinutes < afternoonStart) {
        setHeroImage({
          src: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(32).png?raw=true",
          hint: "sun behind cloud"
        });
        setHeroGradient("from-[#84a9ff] to-[#f5f8ff]");
      } else if (timeInMinutes >= afternoonStart && timeInMinutes < nightStart) {
        setHeroImage({
          src: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_rjwsk7rjwsk7rjws-Photoroom.png?raw=true",
          hint: "sun setting"
        });
        setHeroGradient("from-[#e66074] to-[#ffe1a4]");
      } else {
        setHeroImage({
          src: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_gkqyk1gkqyk1gkqy-Photoroom.png?raw=true",
          hint: "moon and stars"
        });
        setHeroGradient("from-[#001f6a] to-[#6895fd]");
      }
    };
    
    updateTimeAndAssets();
    const timerId = setInterval(updateTimeAndAssets, 60000); // Update every minute
    
    const fetchMenu = async () => {
      setIsLoadingMenu(true);
      try {
        const allMenus = await getMenuItems();
        const todayDate = new Date();
        const dayName = todayDate.toLocaleDateString('es-ES', { weekday: 'long' });
        const normalizedToday = normalizeDayName(dayName);
        const menusForToday = allMenus.filter(item => normalizeDayName(item.day) === normalizedToday);
        setTodaysMenus(menusForToday);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
        setTodaysMenus([]); // Ensure it's an empty array on error
      } finally {
        setIsLoadingMenu(false);
      }
    };

    fetchMenu();

     return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, []);

  const currentMenu = todaysMenus[currentMenuIndex];

  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-10 min-h-[calc(100vh-6rem)] relative">
                    <div className="md:col-span-7 flex flex-col justify-center py-12 md:py-24 px-4 sm:px-6 lg:px-8 z-10">
                        <div className="flex items-center gap-4">
                           <Badge variant="outline">Portal Interno</Badge>
                           <Badge variant="default">{currentTime}</Badge>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-4 text-foreground">
                            Bienvenido al Entorno <br /> Banesco Seguros
                        </h1>
                        <p className="mt-4 max-w-md text-muted-foreground">
                            Tu espacio central para herramientas, recursos y actividades. Optimiza tu día a día y potencia tu desarrollo con nosotros.
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <Button size="lg" asChild>
                                <Link href="#requerimientos">
                                    Comenzar
                                </Link>
                            </Button>
                            <Button size="lg" variant="ghost" asChild>
                                <Link href="/dashboard/bienestar">
                                    <Play className="h-4 w-4 mr-2 fill-current" />
                                    Ver Actividades
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className={cn("md:col-span-3 hidden md:flex items-center justify-center relative bg-gradient-to-br", heroGradient)}></div>

                    <div className="hidden md:flex absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 items-center justify-center pointer-events-none">
                        <div className="relative w-[500px] h-[500px]">
                           <Image
                            src={heroImage.src}
                            alt={heroImage.hint}
                            layout="fill"
                            objectFit="contain"
                            className="z-10"
                            data-ai-hint={heroImage.hint}
                            key={heroImage.src}
                            quality={100}
                           />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Mision y Valores Section */}
        <SectionWrapper>
          <div className="grid md:grid-cols-2 gap-16 items-center md:pl-8 lg:pl-20">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                Nuestra Oferta de Valor
              </h2>
              <p className="text-muted-foreground max-w-lg">
                Somos una empresa de seguros reconocida por su excelencia y calidad, orientada a satisfacer las necesidades de nuestros clientes, intermediarios y organización, brindando asesoría y protección con soluciones ágiles y oportunas.
              </p>
              <p className="font-semibold text-foreground">
                ¡Cumplimos lo que prometemos!
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/dashboard/mapa-clientes">Conocer más</Link>
                </Button>
              </div>
            </div>
            <div className="relative grid grid-cols-2 grid-rows-2 gap-4 h-[500px]">
              <div className="col-span-1 row-span-2 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1599351234741-727bff276c9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxidXNzaW5lc3xlbnwwfHx8fDE3NTI2MDU4MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Equipo de Banesco Seguros"
                      width={400}
                      height={600}
                      className="w-full h-full object-cover"
                      data-ai-hint="team meeting"
                  />
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1529180979161-06b8b6d6f2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8ZmFtaWx5fGVufDB8fHx8MTc1MjYwNTY2Nnww&ixlib.rb-4.1.0&q=80&w=1080"
                      alt="Cliente satisfecho"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint="happy client"
                  />
              </div>
              <div className="col-span-1 row-span-1 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                      src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjYXJ8ZW58MHx8fHwxNzU0MzMzNjcxfDA&ixlib.rb-4.1.0&q=80&w=1080"
                      alt="Oficina de Banesco"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      data-ai-hint="car"
                  />
              </div>
            </div>
          </div>
        </SectionWrapper>
        
        {/* Portal de Requerimientos Section */}
        <section id="requerimientos" className="w-full">
            <div className="bg-[#63a5Fa] text-white relative py-24">
                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                        Visita nuestro <br /> Portal de Requerimientos
                    </h2>
                    <div className="flex justify-center gap-4">
                        <Button asChild size="sm" className="text-xs h-9 px-4 bg-white text-[#63a5Fa] hover:bg-white/90">
                           <Link href="/dashboard/requerimientos">Acceder</Link>
                        </Button>
                        <Button asChild variant="outline" size="sm" className="text-xs h-9 px-4 bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
                            <Link href="#requerimientos-atajos">Atajos</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div id="requerimientos-atajos" className="bg-muted/50 py-16">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div>
                          <h4 className="font-semibold mb-3 text-foreground">Capital Humano</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                              <li><Link href="#" className="hover:text-primary">Vacaciones</Link></li>
                              <li><Link href="#" className="hover:text-primary">Carta de Trabajo</Link></li>
                              <li><Link href="#" className="hover:text-primary">Inquietudes</Link></li>
                              <li><Link href="#" className="hover:text-primary">Solicitudes</Link></li>
                          </ul>
                      </div>
                      <div>
                          <h4 className="font-semibold mb-3 text-foreground">Comercial</h4>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                              <li><Link href="#" className="hover:text-primary">Sistemática Comercial</Link></li>
                              <li><Link href="#" className="hover:text-primary">Mercadeo</Link></li>
                              <li><Link href="#" className="hover:text-primary">Comunicaciones</Link></li>
                          </ul>
                      </div>
                     <div>
                        <h4 className="font-semibold mb-3 text-foreground">Tecnología</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Seguridad</Link></li>
                            <li><Link href="#" className="hover:text-primary">Actualizaciones</Link></li>
                            <li><Link href="#" className="hover:text-primary">Solicitudes</Link></li>
                            <li><Link href="#" className="hover:text-primary">Problemas</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3 text-foreground">Suscripción</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary">Salud</Link></li>
                            <li><Link href="#" className="hover:text-primary">Patrimonial</Link></li>
                            <li><Link href="#" className="hover:text-primary">Automóvil</Link></li>
                            <li><Link href="#" className="hover:text-primary">Personas</Link></li>
                        </ul>
                    </div>
                  </div>
                </div>
            </div>
        </section>


        {/* Menus Section */}
        <div id="menu">
             <SectionWrapper className="min-h-screen flex flex-col justify-center">
                <div className="grid md:grid-cols-12 items-center gap-8 md:gap-16">
                    <div className="md:col-span-5 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                         <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_87kjuj87kjuj87kj-Photoroom.png?raw=true" alt="Chef Hat" width={180} height={180} className="mb-4" />
                        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Menú del Comedor</h2>
                        <p className="mt-4 text-muted-foreground max-w-md text-sm">
                           Revise la oferta gastronómica completa preparada para hoy. Encontrará el plato principal, las alternativas del día y las opciones de postre, garantizando siempre una alimentación balanceada.
                        </p>
                    </div>
                    <div className="md:col-span-7 flex flex-col justify-center items-center">
                        {isLoadingMenu ? (
                            <Skeleton className="h-[450px] w-full rounded-2xl" />
                        ) : todaysMenus.length > 0 && currentMenu ? (
                            <div className="relative">
                                <MenuItemCard item={currentMenu} isCurrentDay={true} />
                                {todaysMenus.length > 1 && (
                                    <>
                                        <Button variant="outline" size="icon" className="absolute top-1/2 -translate-y-1/2 -left-5 h-10 w-10 rounded-full shadow-md" onClick={() => handleMenuChange('prev')}>
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="absolute top-1/2 -translate-y-1/2 -right-5 h-10 w-10 rounded-full shadow-md" onClick={() => handleMenuChange('next')}>
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Card className="col-span-full">
                                <CardContent className="p-8 text-center text-muted-foreground">
                                    <p>No hay menú disponible para hoy ({currentDayName}). Por favor, consulte el menú semanal completo.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </SectionWrapper>
        </div>
      
        {/* Gestión de Vacaciones Section */}
        <div id="vacaciones">
            <SectionWrapper>
            <Card className="bg-card shadow-lg rounded-2xl overflow-hidden min-h-[700px] flex flex-col md:flex-row">
                {/* Left Panel */}
                <div className="w-full md:w-2/3 relative min-h-[400px] md:min-h-full">
                <Image
                    src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOXx8QkVBQ0h8ZW58MHx8fHwxNzUyNTA3OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Playa tropical para representar vacaciones"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="beach vacation"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-12 text-white pointer-events-none">
                    <h2 className="text-5xl font-extrabold leading-tight">¡Gestiona tus Próximas Vacaciones!</h2>
                    <p className="mt-4 max-w-md text-white/90">
                    Planifica tu viaje con las mejores recomendaciones y gestiona tus solicitudes de forma sencilla.
                    </p>
                    <Button asChild className="mt-6 w-fit pointer-events-auto">
                    <Link href="/dashboard/vacaciones">Explorar</Link>
                    </Button>
                </div>
                </div>

                {/* Right Panel */}
                <div className="w-full md:w-1/3 bg-background p-8 flex flex-col">
                <div className="space-y-4 my-auto">
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                        src="https://images.unsplash.com/photo-1615317779547-2078d82c549a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwbGFuZXxlbnwwfHx8fDE3NTI1MDYxMTN8MA&ixlib.rb-4.1.0&q=80&w=1080"
                        alt="Solicitudes de vacaciones"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="plane"
                        className="group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                        <h4 className="font-bold text-lg">Mis Solicitudes</h4>
                        <p className="text-xs">Consulta el estado de tus solicitudes de vacaciones.</p>
                    </div>
                    </div>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                        src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNHx8cGxhbmV8ZW58MHx8fHwxNzUyNTA2MTEzfDA&ixlib.rb-4.1.0&q=80&w=1080"
                        alt="Fechas Disponibles"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="plane"
                        className="group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                        <h4 className="font-bold text-lg">Fechas Disponibles</h4>
                        <p className="text-xs">Consulta el calendario y planifica tu próximo viaje.</p>
                    </div>
                    </div>
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden group">
                    <Image
                        src="https://images.unsplash.com/photo-1534396579421-7c278108bf83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzYWx0byUyMGFuZ2VsfGVufDB8fHx8MTc1MjU4NzIxMHww&ixlib.rb-4.1.0&q=80&w=1080"
                        alt="Recomendaciones de viaje"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="travel guide"
                        className="group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none">
                        <h4 className="font-bold text-lg">Recomendaciones</h4>
                        <p className="text-xs">Descubre destinos y consejos para tu próximo viaje.</p>
                    </div>
                    </div>
                </div>
                </div>
            </Card>
            </SectionWrapper>
        </div>
        
        {/* Cursos Section */}
        <div id="cursos">
            <SectionWrapper className="overflow-hidden bg-primary rounded-2xl shadow-sm text-primary-foreground">
            <div className="grid md:grid-cols-2 gap-8 min-h-[600px]">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="space-y-4">
                    <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                        Cursos <br />
                        <span className="text-primary-foreground font-bold opacity-80">Disponibles</span>
                    </h2>
                    <p className="text-primary-foreground/80 mb-4 max-w-lg">
                        {currentCourse.description}
                    </p>
                    </div>
                </div>
                <Button asChild size="lg" variant="secondary" className="w-fit mt-4 bg-white/20 text-white backdrop-blur-sm">
                    <Link href="/dashboard/bienestar#cursos">
                    Explorar Cursos
                    </Link>
                </Button>
                </div>
                <div className="relative min-h-[400px] md:min-h-full">
                <Image
                    src={currentCourse.imageUrl}
                    alt={currentCourse.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={currentCourse.dataAiHint}
                    className="brightness-90"
                    key={currentCourse.id}
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <Card className="w-full max-w-sm bg-background/80 backdrop-blur-lg shadow-2xl rounded-xl">
                            <CardHeader>
                            <div className="flex justify-between items-center">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                <Star className="h-3 w-3" /> {currentCourse.category}
                                </Badge>
                                <div className="flex gap-1">
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleCourseChange('prev')}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleCourseChange('next')}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <CardTitle className="text-lg pt-2">{currentCourse.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground h-10 text-ellipsis overflow-hidden">{currentCourse.description}</p>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground"><Award className="h-4 w-4 text-primary" /><span>Certificado</span></div>
                                    <div className="font-medium text-foreground">Sí</div>
                            </div>
                            <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground"><Clock className="h-4 w-4 text-primary" /><span>Duración</span></div>
                                    <div className="font-medium text-foreground">{currentCourse.duration}</div>
                            </div>
                            </CardContent>
                            <CardContent>
                            <Button asChild className="w-full">
                                <Link href={`/dashboard/cursos/${currentCourse.id}`}>Más Información</Link>
                            </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            </SectionWrapper>
        </div>

        {/* Dress Code Section */}
        <div id="dress-code">
          <SectionWrapper>
            <Card className="relative overflow-hidden rounded-2xl shadow-lg min-h-[500px] flex flex-col md:flex-row">
              <Image
                src="https://images.unsplash.com/photo-1614631446501-abcf76949eca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjbG9zZXQlMjBmYXNoaW9ufGVufDB8fHx8MTc1ODIxNzIzOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modelo con ropa moderna"
                layout="fill"
                objectFit="cover"
                data-ai-hint="closet fashion"
                className="brightness-90"
              />
              
              <div className="relative z-10 p-8 md:p-12 text-white flex flex-col justify-between w-full md:w-1/2">
                <div>
                    <p className="text-sm uppercase tracking-wider text-white/80">Viste Seguro</p>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2">Banesco Seguros</h2>
                </div>
                <div>
                    <p className="mt-4 max-w-sm text-white/90">
                    Conoce nuestros códigos de vestimenta para cada ocasión y proyecta la mejor imagen.
                    </p>
                    <Button asChild variant="secondary" className="mt-6 bg-white/90 text-foreground hover:bg-white">
                    <Link href="/dashboard/bienestar#dress-code">Explorar Guía</Link>
                    </Button>
                </div>
                </div>
                <div className="relative z-10 p-8 md:p-12 w-full md:w-1/2 flex items-center">
                    <div ref={dressCodeScrollRef} className="w-full">
                        <ScrollArea>
                            <div className="flex w-max space-x-6 pb-4">
                            {mockDressCodeItems.map((item) => (
                                <DressCodeCard key={item.id} item={item} />
                            ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="invisible" />
                        </ScrollArea>
                    </div>
                     <div className="absolute right-4 bottom-4 flex gap-2">
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/20 text-white backdrop-blur-sm" onClick={() => handleDressCodeScroll('left')}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white/20 text-white backdrop-blur-sm" onClick={() => handleDressCodeScroll('right')}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
          </SectionWrapper>
        </div>

        {/* Póliza HCM Section */}
        <div id="poliza">
            <SectionWrapper>
            <Card className="overflow-hidden bg-card shadow-lg border-none">
                <div className="grid md:grid-cols-2">
                <div className="p-12 flex flex-col justify-center">
                    <p className="text-sm font-semibold text-primary mb-2 uppercase tracking-wider">Estamos aquí para ayudarte en caso de emergencia</p>
                    <h2 className="text-4xl font-extrabold text-foreground leading-tight mb-4">
                    NUESTRA <span className="text-primary font-extrabold">PÓLIZA HCM</span>
                    </h2>
                    <p className="text-muted-foreground mb-8">
                    ¿Busca información detallada sobre su cobertura o necesita asistencia? Navegue por nuestras opciones o contáctenos directamente.
                    </p>
                    <div className="space-y-4">
                    <AnimatedContactButton 
                        href="https://wa.me/584141234567"
                        type="whatsapp"
                        label="WhatsApp"
                        number="+58 414 123 4567"
                        icon={MessageSquare}
                        className="bg-primary"
                        iconClassName="text-primary"
                    />
                    <AnimatedContactButton 
                        href="tel:+582125011111"
                        type="phone"
                        label="Teléfono"
                        number="+58 212 501 1111"
                        icon={Phone}
                        className="bg-secondary"
                        iconClassName="text-secondary"
                    />
                    <AnimatedContactButton 
                        href="mailto:asistencia@banescoseguros.com"
                        type="email"
                        label="Correo Electrónico"
                        number="asistencia@banescoseguros.com"
                        icon={Mail}
                        className="bg-accent"
                        iconClassName="text-accent-foreground"
                    />
                    </div>
                </div>
                <div className="bg-muted/50 p-12 flex items-center">
                    <div className="w-full grid grid-cols-2 gap-8">
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1429305336325-b84ace7eba3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzdGFyc3xlbnwwfHx8fDE3NTI1OTk5ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Beneficios" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="stars" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Beneficios</h4>
                            <p className="text-xs mt-1 text-white/90">Descubra todas sus ventajas.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1651069381046-8db0c209a5e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8c3Vuc2hhZGV8ZW58MHx8fHwxNzUyNjAwMzQ4fDA&ixlib.rb-4.1.0&q=80&w=1080" alt="Cobertura" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="security protection" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Cobertura</h4>
                            <p className="text-xs mt-1 text-white/90">Conozca el alcance de su póliza.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1601588243681-2fa6a06300d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8TUVESUNBTCUyMENFTlRFUnxlbnwwfHx8fDE3NTI1MDU1MjB8MA&ixlib.rb-4.1.0&q=80&w=1080" alt="Centros de Atención" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="hospital building" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Centros de Atención</h4>
                            <p className="text-xs mt-1 text-white/90">Encuentre la clínica más cercana.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                        <Card className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <Image src="https://images.unsplash.com/photo-1502101872923-d48509bff386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzdGFpcnN8ZW58MHx8fHwxNzUyNjAwMzk4fDA&ixlib.rb-4.1.0&q=80&w=1080" alt="Protocolos" layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="process diagram" />
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center text-white pointer-events-none">
                            <h4 className="text-xl font-bold">Protocolos</h4>
                            <p className="text-xs mt-1 text-white/90">Siga los pasos para cada caso.</p>
                            <Button variant="secondary" size="sm" className="mt-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm pointer-events-auto">
                            Consultar
                            </Button>
                        </div>
                        </Card>
                    </div>
                </div>
                </div>
            </Card>
            </SectionWrapper>
        </div>

        {/* Espacio Ejecutivo Section */}
        <div id="espacio-ejecutivo" className="scroll-mt-20">
            <SectionWrapper>
                <Card className="relative w-full overflow-hidden rounded-2xl bg-foreground text-primary-foreground shadow-2xl min-h-[400px] flex flex-col justify-center items-center text-center p-8 md:p-12 group">
                <Image
                    src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGVjdXRpdmV8ZW58MHx8fHwxNzU2MTM2NDg3fDA&ixlib.rb-4.1.0&q=80&w=1080"
                    alt="Equipo ejecutivo en reunión"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="executive meeting"
                    className="brightness-50 group-hover:brightness-[0.4] transition-all duration-300"
                />
                <div className="relative z-10 flex flex-col items-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold">Espacio Ejecutivo</h2>
                    <p className="mt-4 max-w-xl text-primary-foreground/80">
                        Recursos, calendarios y herramientas exclusivas para la gerencia.
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-white text-foreground hover:bg-white/90">
                        <Link href="/dashboard/espacio-ejecutivo">
                            Acceder Ahora <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                </Card>
            </SectionWrapper>
        </div>


        {/* Actividades Section */}
        <div id="actividades">
            <SectionWrapper>
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-sm">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                    Explore Nuestras Actividades de Bienestar
                    </h2>
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-muted-foreground mb-6">
                    Descubra un mundo de bienestar con nuestras actividades exclusivas, diseñadas para apoyar su salud física y mental en cada etapa de la vida.
                    </p>
                    <div className="flex flex-wrap gap-3">
                    <Button asChild variant="default" size="lg">
                        <Link href="/dashboard/bienestar">Ver Todas las Actividades</Link>
                    </Button>
                    </div>
                </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activityHighlights.map((activity, index) => (
                    <Card 
                    key={index} 
                    className={cn(
                        "border-0 p-6 rounded-xl flex flex-col items-start gap-4 text-left transition-colors",
                        index === 0 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50"
                    )}
                    >
                    <div className={cn(
                        "p-3 rounded-full",
                        index === 0 ? "bg-primary-foreground/10 text-primary-foreground" : "bg-primary/10 text-primary"
                    )}>
                        <activity.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                        <h3 className={cn(
                        "font-semibold",
                        index === 0 ? "text-primary-foreground" : "text-foreground"
                        )}>{activity.title}</h3>
                        <p className={cn(
                        "text-sm",
                        index === 0 ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>{activity.description}</p>
                    </div>
                    </Card>
                ))}
                </div>
            </div>
            </SectionWrapper>
        </div>
      
        {/* Playlist Section */}
        <div id="playlist">
            <SectionWrapper>
            <div className="flex flex-col items-center text-center mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Nuestra Playlist Banesco Seguros</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">La banda sonora para un día de trabajo productivo y agradable. Haz clic en una playlist para escucharla.</p>
                </div>
                <Button asChild variant="secondary" className="mt-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/90 hover:text-foreground transition-colors">
                    <Link href="/dashboard/playlist">
                    Playlists
                    </Link>
                </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockPlaylist.map(item => (
                    <PlaylistCard key={item.id} item={item} />
                ))}
                </div>
            </SectionWrapper>
        </div>
        
        {/* FAQ Section */}
        <div id="faq">
            <SectionWrapper>
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-4">
                <div>
                    <p className="font-semibold text-primary uppercase tracking-wider">¿Tienes Dudas?</p>
                    <h2 className="text-3xl font-bold text-foreground tracking-tight mt-1">Preguntas Frecuentes</h2>
                </div>
                <div className="space-y-2">
                    {faqCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <Button
                        key={cat.id}
                        variant={activeFaqCategory === cat.id ? "secondary" : "ghost"}
                        className="w-full justify-start gap-3"
                        onClick={() => setActiveFaqCategory(cat.id as any)}
                        >
                        <Icon className="h-4 w-4" />
                        <span>{cat.label}</span>
                        </Button>
                    )
                    })}
                </div>
                </div>
                <div className="md:col-span-2">
                <Accordion type="single" collapsible className="w-full space-y-3" defaultValue={faqData.find(faq => faq.category === activeFaqCategory)?.id}>
                    {faqData.filter(faq => faq.category === activeFaqCategory).map((faq) => (
                    <AccordionItem value={faq.id} key={faq.id} className="bg-muted/50 border-0 rounded-lg">
                        <AccordionTrigger className="p-4 text-left font-semibold text-base hover:no-underline">
                        {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-muted-foreground">
                        {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                    ))}
                </Accordion>
                </div>
            </div>
            </SectionWrapper>
        </div>

        {/* Pilares Section */}
        <div id="pilares">
            <SectionWrapper>
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="flex items-center justify-center">
                <span className="text-[250px] font-black text-primary/10 leading-none">4</span>
                <span className="text-7xl font-bold text-foreground -ml-4" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    PILARES
                </span>
                </div>
                
                <div className="space-y-4">
                {pilaresData.map((pilar, index) => {
                    const Icon = pilar.icon;
                    return (
                    <div 
                        key={pilar.number}
                        className={cn("group p-6 rounded-2xl transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105", pilar.color)}
                    >
                        <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-white/20 text-white text-lg font-bold">
                            {pilar.number}
                        </div>
                        <div className="text-white">
                            <h3 className="text-lg font-bold mb-1">{pilar.title}</h3>
                            <p className="text-sm opacity-90">{pilar.text}</p>
                        </div>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>
            </SectionWrapper>
        </div>
    </div>
  );

    











