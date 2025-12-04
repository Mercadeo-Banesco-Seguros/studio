
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { NewCourseCard } from "@/components/dashboard/course-card";
import { mockCourses, mockActivities, mockDepartments, faqData, mockDressCodeItemsCaballeros, mockDressCodeItemsDamas, type DressCodeItem, mockPlaylist } from "@/lib/placeholder-data";
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
  FileSignature,
  Bot,
  RefreshCw,
  X,
  ClipboardList,
  Network,
  Gift,
  PartyPopper
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
import { cn } from '@/lib/utils';
import { PlaylistCard } from '@/components/dashboard/playlist-card';
import { Skeleton } from '@/components/ui/skeleton';
import { InteractiveMenuBanner } from '@/components/dashboard/interactive-menu-banner';
import { useToast } from '@/hooks/use-toast';
import { HcmCard } from '@/components/dashboard/hcm-interaction-card';


const activityHighlights = [
  { title: "Salud Física", description: "Fortalece tu cuerpo y energía.", icon: Dumbbell, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxneW18ZW58MHx8fHwxNzU5NzU4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'gym fitness' },
  { title: "Salud Mental", description: "Encuentra paz y equilibrio.", icon: HeartHandshake, imageUrl: 'https://images.unsplash.com/photo-1474418397713-7e15e4371b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZWRpdGF0aW9ufGVufDB8fHx8fDE3NTk3NTg5NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'meditation nature' },
  { title: "Eventos Especiales", description: "Celebra y conecta con el equipo.", icon: CalendarCheck, imageUrl: 'https://images.unsplash.com/photo-1519671482722-b30be252074d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxldmVudHxlbnwwfHx8fDE3NTk3NTkwMTB8MA&ixlib=rb-4.1.0&q=80&w=1080', dataAiHint: 'event celebration' },
  { title: "Formación y Cultura", description: "Crece profesional y personalmente.", icon: BookCheck, imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib29rc3xlbnwwfHx8fDE3NTk3NTkwNDB8MA&ixlib-rb-4.1.0&q=80&w=1080', dataAiHint: 'books library' }
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

// Helper function to normalize day names for comparison
const normalizeDayName = (name: string) => {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize("NFD") // Decompose accented characters
    .replace(/[\u0000-\u007f]/g, "") // Remove diacritical marks
    .replace(/[^a-z]/g, ''); // remove non-alphabetic chars
};

type AboutView = 'mision' | 'oferta' | 'pilares';

const aboutContent: Record<AboutView, { title: string; description: string; image?: string; 'data-ai-hint'?: string, pilares?: { title: string; color: string; }[] }> = {
  mision: {
    title: "Nuestra Misión",
    description: "Ser la empresa de seguros preferida del mercado, reconocida por su excelencia, calidad de servicio y compromiso con la satisfacción de nuestros clientes, intermediarios y colaboradores.",
    image: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(48).png?raw=true",
    'data-ai-hint': "target mission",
  },
  oferta: {
    title: "Nuestra Oferta de Valor",
    description: "Somos una empresa de seguros reconocida por su excelencia y calidad, orientada a satisfacer las necesidades de nuestros clientes, intermediarios y organización, brindando asesoría y protección con soluciones ágiles y oportunas.",
    image: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(47).png?raw=true",
    'data-ai-hint': "puzzle solution",
  },
  pilares: {
    title: "Nuestros Pilares",
    description: "Los 4 pilares fundamentales que sostienen nuestra cultura y guían cada una de nuestras acciones.",
    image: "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_6fia0y6fia0y6fia-Photoroom.png?raw=true",
    'data-ai-hint': "company pillars",
  },
};

const wellnessSlides = [
    {
      id: 'navidad',
      badge: 'Bienestar',
      title: (<>Explora los Próximos <br/> Eventos del Mes</>),
      imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_ka2ygrka2ygrka2y-Photoroom.png?raw=true',
      dataAiHint: 'Christmas tree illustration',
      icon: Gift
    },
    {
      id: 'eventos',
      badge: 'Eventos Especiales',
      title: (<>Descubre Actividades <br/> ideales para ti</>),
      imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_ln3mqjln3mqjln3m-Photoroom%20(1).png?raw=true',
      dataAiHint: 'party popper illustration',
      icon: PartyPopper
    },
    {
      id: 'actividades',
      badge: 'Actividades Recientes',
      title: (<>Herramientas que <br/> maximizan tu potencial</>),
      imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_tzyaoetzyaoetzya-Photoroom.png?raw=true',
      dataAiHint: 'activity award illustration',
      icon: Award
    }
];

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
  const [allMenuItems, setAllMenuItems] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [activeAboutView, setActiveAboutView] = useState<AboutView>('oferta');
  const [activeWellnessSlide, setActiveWellnessSlide] = useState(0);
  const { toast } = useToast();
  
  const [dressCodeView, setDressCodeView] = useState<'caballeros' | 'damas'>('caballeros');
  const [currentDressCode, setCurrentDressCode] = useState<DressCodeItem | null>(null);

  const dressCodeItems = useMemo(() => {
    return dressCodeView === 'caballeros' ? mockDressCodeItemsCaballeros : mockDressCodeItemsDamas;
  }, [dressCodeView]);

  const viewOrder: AboutView[] = ['mision', 'pilares', 'oferta'];
  const viewLabels: Record<AboutView, string> = {
    mision: 'Ver Misión',
    pilares: 'Ver Pilares',
    oferta: 'Ver Oferta de Valor'
  };
  

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


  const currentCourse = mockCourses[currentCourseIndex];

  const handleCycleAboutView = () => {
    const currentIndex = viewOrder.indexOf(activeAboutView);
    const nextIndex = (currentIndex + 1) % viewOrder.length;
    setActiveAboutView(viewOrder[nextIndex]);
  };
  
    const handleWellnessNav = (direction: 'prev' | 'next') => {
    setActiveWellnessSlide(prev => {
      if (direction === 'next') {
        return (prev + 1) % wellnessSlides.length;
      }
      return (prev - 1 + wellnessSlides.length) % wellnessSlides.length;
    });
  };

  useEffect(() => {
    const todayDate = new Date();
    const dayName = todayDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    setCurrentDayName(capitalizedDayName);

    const todayDressCode = dressCodeItems.find(item => item.day === capitalizedDayName);
    setCurrentDressCode(todayDressCode || dressCodeItems[0]);


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
        const menus = await getMenuItems();
        setAllMenuItems(menus);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
        setAllMenuItems([]); // Ensure it's an empty array on error
      } finally {
        setIsLoadingMenu(false);
      }
    };

    fetchMenu();

     return () => clearInterval(timerId); // Cleanup interval on component unmount
  }, [dressCodeItems]);

  useEffect(() => {
    // Update currentDressCode when view changes (caballeros/damas)
    const todayDate = new Date();
    const dayName = todayDate.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    const todayDressCode = dressCodeItems.find(item => item.day === capitalizedDayName);
    setCurrentDressCode(todayDressCode || dressCodeItems[0]);
  }, [dressCodeView, dressCodeItems]);
  
  const todaysMenus = useMemo(() => {
    const dayName = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const normalizedToday = normalizeDayName(dayName);
    return allMenuItems.filter(item => {
        const normalizedItemDay = normalizeDayName(item.day);
        return normalizedItemDay === normalizedToday;
    });
  }, [allMenuItems]);

  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-10 min-h-[calc(100vh-6rem)] relative">
                    <div className="md:col-span-7 flex flex-col justify-center py-12 md:py-24 z-10">
                        <div className="flex items-center gap-4">
                           <Badge variant="outline">{currentDayName}, {currentTime}</Badge>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mt-4 text-foreground">
                            Bienvenido al Entorno <br /> Banesco Seguros
                        </h1>
                        <p className="mt-4 max-w-md text-muted-foreground">
                            Tu espacio central para herramientas, recursos y actividades. Optimiza tu día a día y potencia tu desarrollo con nosotros.
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <Button size="default" asChild className="font-light">
                                <Link href="#">
                                    Novedades
                                </Link>
                            </Button>
                            <Button 
                                size="default" 
                                variant="outline" 
                                asChild 
                                className="font-light border-primary text-primary hover:bg-primary/10 hover:text-primary"
                            >
                                <Link href="#">
                                    Manual de Empresa
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
        <div id="about-us" className="w-full py-12 md:py-16">
          <div className="relative overflow-hidden min-h-[600px] flex items-center">
            <Image
              src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
              alt="Abstract background"
              layout="fill"
              objectFit="cover"
              data-ai-hint="abstract waves"
            />
            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10 w-full max-w-7xl mx-auto p-8 md:p-12">
              <div className="space-y-4 text-white">
                <Badge variant="outline" className="border-white text-white">
                  Acerca de Nosotros
                </Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  {aboutContent[activeAboutView].title}
                </h2>
                <p className="text-white/80 max-w-lg">
                  {aboutContent[activeAboutView].description}
                </p>
                <div className="flex items-center gap-4 pt-4">
                   <Button asChild className="bg-white text-primary hover:bg-white/90">
                      <Link href="/dashboard/mapa-clientes">Nosotros</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleCycleAboutView}
                    className="text-white/80 hover:text-white hover:bg-transparent p-0 h-auto"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {viewLabels[viewOrder[(viewOrder.indexOf(activeAboutView) + 1) % viewOrder.length]]}
                  </Button>
                </div>
              </div>
              
              <div className="relative h-[30rem] w-full group">
                {aboutContent[activeAboutView].image && (
                  <Image
                    src={aboutContent[activeAboutView].image!}
                    alt={aboutContent[activeAboutView].title}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint={aboutContent[activeAboutView]['data-ai-hint']}
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Galeria de Recuerdos Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left pl-8">
                    <p className="font-semibold text-primary uppercase tracking-wider">Nuestros Pilares</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">Galería de Recuerdos</h2>
                    <p className="mt-4 text-muted-foreground max-w-md">Revive los momentos clave y las experiencias compartidas que definen la solidez de Banesco Seguros. Esta galería celebra la excelencia, el compromiso y la trayectoria de nuestro equipo. Un testimonio visual de los logros que construimos juntos.</p>
                </div>
                 <div className="relative h-[30rem] w-full flex items-center justify-center group">
                    <Card className="absolute w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 ease-in-out -rotate-12 group-hover:rotate-[-15deg] group-hover:-translate-x-12">
                         <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx0ZWFtfGVufDB8fHx8MTc2MTE4MTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="Team photo 1" layout="fill" objectFit="cover" data-ai-hint="team picture" />
                    </Card>
                     <Card className="absolute w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 ease-in-out z-10 group-hover:scale-110">
                         <Image src="https://images.unsplash.com/photo-1529156069898-4242e48c6db7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0ZWFtfGVufDB8fHx8MTc2MTE4MTQxM3ww&ixlib-rb-4.1.0&q=80&w=1080" alt="Team photo 2" layout="fill" objectFit="cover" data-ai-hint="team success" />
                    </Card>
                     <Card className="absolute w-64 h-96 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 ease-in-out rotate-12 group-hover:rotate-[15deg] group-hover:translate-x-12">
                         <Image src="https://images.unsplash.com/photo-1600880292210-f75bb6c1c4a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx0ZWFtfGVufDB8fHx8MTc2MTE4MTQxM3ww&ixlib-rb-4.1.0&q=80&w=1080" alt="Team photo 3" layout="fill" objectFit="cover" data-ai-hint="team collaboration" />
                    </Card>
                </div>
            </div>
        </section>

        {/* Viste Seguro Section */}
        <section id="dress-code" className="w-full mt-24">
          <div className="relative min-h-[700px] w-full flex flex-col justify-end overflow-hidden">
            <Image
                src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
                alt="Fondo abstracto de vestimenta"
                layout="fill"
                objectFit="cover"
                className="z-0"
                data-ai-hint="abstract waves"
            />
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div
                  className="relative flex items-end justify-center gap-3 w-full h-[400px]"
                  onMouseLeave={() => {
                    const todayDressCode = dressCodeItems.find(item => item.day === currentDayName);
                    setCurrentDressCode(todayDressCode || dressCodeItems[0]);
                  }}
                >
                    {dressCodeItems.map(item => (
                        <div
                            key={item.id}
                            onMouseEnter={() => setCurrentDressCode(item)}
                            className={cn(
                                "relative w-full cursor-pointer transition-all duration-500 ease-in-out",
                                currentDressCode?.id === item.id 
                                    ? `h-[380px]` 
                                    : 'h-[300px] opacity-70 hover:opacity-100'
                            )}
                        >
                            <Image src={item.imageUrl} layout="fill" objectFit="contain" alt={item.title} data-ai-hint={item.dataAiHint}/>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-8 items-end text-white mt-8">
                    <div>
                        <div className="mb-4">
                            <p className="font-light text-white/80">Viste Seguro</p>
                            <h3 className="text-3xl font-bold tracking-tighter text-white">Banesco Seguros</h3>
                        </div>
                         <Button 
                            variant="outline"
                            onClick={() => {
                                toast({
                                    title: "Guía de Vestimenta",
                                    description: "Esta función se encuentra en desarrollo. ¡Pronto podrás explorar la guía completa!",
                                });
                            }}
                            className="font-light text-xs bg-white hover:bg-white/90 text-primary">
                            Explorar Guía
                        </Button>
                    </div>
                    <div className="text-left md:text-right">
                       {currentDressCode && (
                            <div>
                                <p className="font-semibold text-white/80 uppercase tracking-wider">{currentDressCode.day}</p>
                                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                                    {currentDressCode.title}
                                </h2>
                            </div>
                        )}
                        <div className="mt-4 flex gap-2 justify-start md:justify-end">
                           <Button 
                            variant="outline" 
                            onClick={() => setDressCodeView('caballeros')} 
                            className={cn(
                              "font-light text-xs", 
                              dressCodeView === 'caballeros' 
                                ? 'bg-white text-primary border-white' 
                                : 'bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white'
                            )}>
                            Caballeros
                          </Button>
                           <Button 
                            variant="outline" 
                            onClick={() => setDressCodeView('damas')} 
                            className={cn(
                              "font-light text-xs", 
                              dressCodeView === 'damas' 
                                ? 'bg-white text-purple-600 border-white' 
                                : 'bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white'
                            )}>
                            Damas
                          </Button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
        
        {/* Gestión de Vacaciones Section */}
        <div id="vacaciones" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <SectionWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="relative p-8 rounded-2xl shadow-sm flex flex-col justify-end min-h-[500px] overflow-hidden group">
                         <Image
                            src="https://4kwallpapers.com/images/wallpapers/beach-aerial-view-3840x2160-60.jpg"
                            alt="Planifica tus Próximas Vacaciones"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-black/40" />
                         <div className="relative text-white">
                            <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm font-light text-white">Capital Humano</Badge>
                            
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Planifica tus Próximas Vacaciones</h3>
                            <Button asChild variant="ghost" className="mt-4 font-light text-xs bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
                                <Link href="/dashboard/vacaciones">Gestionar</Link>
                            </Button>
                        </div>
                    </Card>
                     <Card className="relative p-8 rounded-2xl shadow-sm flex flex-col justify-end min-h-[500px] overflow-hidden group">
                         <Image
                            src="https://plus.unsplash.com/premium_photo-1678727128583-b7bb1b4763b5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZpb24lMjBkZSUyMHZpYWplfGVufDB8fDB8fHww"
                            alt="Consultar Días Disponibles"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                         />
                         <div className="absolute inset-0 bg-black/40" />
                         <div className="relative text-white">
                            <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm font-light text-white">Capital Humano</Badge>
                             <h3 className="text-2xl font-bold tracking-tight">Consultar Días Disponibles</h3>
                             <Button asChild variant="ghost" className="mt-4 font-light text-xs bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
                                <Link href="/dashboard/vacaciones">Consultar</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </SectionWrapper>
        </div>
        
        {/* Portal de Requerimientos Section */}
        <section id="requerimientos" className="w-full mt-24">
            <Card className="relative text-white overflow-hidden min-h-[500px] flex items-center justify-center">
                <Image
                    src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
                    alt="Abstract background"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                    data-ai-hint="abstract waves"
                />
                <div className="absolute inset-0 bg-transparent z-0" />
                
                <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center text-center">
                    
                    <div className={cn("transition-all duration-500", showShortcuts ? "opacity-0 scale-95" : "opacity-100 scale-100")}>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                            Visita nuestro <br /> Portal de Requerimientos
                        </h2>
                        <div className="mt-8 flex justify-center gap-4">
                           <Button asChild size="default" className="bg-white text-primary hover:bg-white/90 font-light text-xs">
                               <Link href="/dashboard/requerimientos">Acceder</Link>
                           </Button>
                           <Button variant="outline" size="default" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white font-light text-xs" onClick={() => setShowShortcuts(true)}>
                               Atajos
                           </Button>
                        </div>
                    </div>

                    <div className={cn(
                        "absolute inset-0 p-8 transition-all duration-500 flex flex-col items-center justify-center",
                        showShortcuts ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    )}>
                       <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white" onClick={() => setShowShortcuts(false)}>
                            <X className="h-4 w-4" />
                       </Button>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-center md:text-left">
                            <div>
                                <h4 className="font-bold tracking-tight mb-3 text-white">Capital Humano</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li><Link href="#" className="hover:text-white">Vacaciones</Link></li>
                                    <li><Link href="#" className="hover:text-white">Carta de Trabajo</Link></li>
                                    <li><Link href="#" className="hover:text-white">Inquietudes</Link></li>
                                    <li><Link href="#" className="hover:text-white">Solicitudes</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold tracking-tight mb-3 text-white">Comercial</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li><Link href="#" className="hover:text-white">Sistemática Comercial</Link></li>
                                    <li><Link href="#" className="hover:text-white">Mercadeo</Link></li>
                                    <li><Link href="#" className="hover:text-white">Comunicaciones</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold tracking-tight mb-3 text-white">Tecnología</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li><Link href="#" className="hover:text-white">Seguridad</Link></li>
                                    <li><Link href="#" className="hover:text-white">Actualizaciones</Link></li>
                                    <li><Link href="#" className="hover:text-white">Solicitudes</Link></li>
                                    <li><Link href="#" className="hover:text-white">Problemas</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold tracking-tight mb-3 text-white">Suscripción</h4>
                                <ul className="space-y-2 text-sm text-white/80">
                                    <li><Link href="#" className="hover:text-white">Salud</Link></li>
                                    <li><Link href="#" className="hover:text-white">Patrimonial</Link></li>
                                    <li><Link href="#" className="hover:text-white">Automóvil</Link></li>
                                    <li><Link href="#" className="hover:text-white">Personas</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </section>

        {/* Cursos Section */}
        <div id="cursos" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <SectionWrapper>
              <div className="grid lg:grid-cols-2 gap-6">
                  <div className="p-6 flex flex-col justify-center">
                      <Badge variant="outline" className="text-primary w-fit">Actívate</Badge>
                      <h2 className="text-5xl font-bold tracking-tight mt-4 text-foreground">
                        ¡Aprende algo <br/> nuevo cada día!
                      </h2>
                      <p className="mt-2 text-muted-foreground">Explora nuestros cursos y desarrolla nuevas habilidades.</p>
                      <Button asChild variant="default" className="rounded-full font-light mt-6 w-fit text-xs">
                          <Link href="/dashboard/cursos">Cursos Disponibles</Link>
                      </Button>
                  </div>
                  <NewCourseCard
                      title="Google Workspace"
                      category="Potencia tu Productividad"
                      details={["Sheets, Docs, Slides", "Aumenta tu eficiencia"]}
                      imageUrl="https://i.pinimg.com/736x/d9/82/35/d9823577cf4f4512cbb7d63d8b7057de.jpg"
                      dataAiHint="collaboration tools"
                      className="bg-secondary text-secondary-foreground min-h-[400px]"
                      imageClassName="opacity-30"
                      availability={75}
                  />
                  <NewCourseCard
                      title="Inteligencia Artificial"
                      category="El Futuro es Ahora"
                      details={["12 lecciones", "Nivel: Intermedio", "Aprende con IA"]}
                      className="bg-secondary text-secondary-foreground min-h-[400px]"
                      imageUrl="https://blogs.worldbank.org/content/dam/sites/blogs/img/detail/mgr/id4d_0.jpg"
                      dataAiHint="artificial intelligence"
                      imageClassName="opacity-30"
                      icon={Bot}
                      availability={40}
                  />
                   <NewCourseCard
                      title="Comunicaciones Efectivas"
                      category="Mejora tus Habilidades"
                      details={["Presentaciones", "Feedback", "Oratoria"]}
                      className="bg-secondary text-secondary-foreground min-h-[400px]"
                      imageUrl="https://thumbs.dreamstime.com/b/concepto-de-equipo-trabajo-educaci%C3%B3n-empresarial-internet-surfing-project-tecnolog%C3%ADa-la-informaci%C3%B3n-empresarios-reflexivos-386326178.jpg"
                      dataAiHint="public speaking"
                      imageClassName="opacity-30"
                      availability={90}
                  />
              </div>
          </SectionWrapper>
        </div>

        {/* Menus Section */}
        <div id="menu" className="mt-24">
          {isLoadingMenu ? (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionWrapper>
                <Skeleton className="h-[600px] w-full rounded-2xl" />
              </SectionWrapper>
            </div>
          ) : allMenuItems.length > 0 ? (
            <InteractiveMenuBanner menuItems={allMenuItems} />
          ) : (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionWrapper>
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <p>No hay menú disponible para hoy ({currentDayName}). Por favor, consulte el menú semanal completo.</p>
                  </CardContent>
                </Card>
              </SectionWrapper>
            </div>
          )}
        </div>

        {/* Póliza HCM Section */}
        <section id="poliza" className="w-full mt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HcmCard
                  type="info"
                  badgeText="Documentación"
                  icon={FileText}
                  title="Protocolos y Procedimientos"
                  description="Guías detalladas para la gestión de siniestros y solicitudes."
                  buttonText="Consultar"
                  imageUrl="https://media.gettyimages.com/id/1448588965/es/v%C3%ADdeo/equipo-de-negocios-tel%C3%A9fono-y-hablando-sobre-idea-sitio-web-y-estrategia-de-planificaci%C3%B3n.jpg?s=640x640&k=20&c=wkYmdkUqKON-XHA_-PHWKtzqzK14Og9ZdMHm8vICH9M="
                  data-ai-hint="documents folder"
                />
                 <HcmCard
                  type="main"
                  icon={ShieldCheck}
                  title="NUESTRA PÓLIZA HCM"
                  description="Estamos aquí para ayudarte"
                  buttonText="Acceder"
                />
                <HcmCard
                  type="info"
                  badgeText="Red de Salud"
                  badgeIcon={HeartHandshake}
                  icon={Network}
                  title="Clínicas Afiliadas"
                  description="Encuentra proveedores de servicios médicos en nuestra red nacional."
                  buttonText="Consultar"
                  imageUrl="https://t3.ftcdn.net/jpg/07/61/33/64/360_F_761336400_z0Vn5l3jVyiHhYDG2pH0SAdys3NMxOck.jpg"
                  data-ai-hint="clinic interior"
                />
              </div>
            </div>
        </section>
        
        {/* Espacio Ejecutivo Section */}
        <section id="espacio-ejecutivo" className="scroll-mt-20 w-full mt-24">
          <Card className="relative w-full overflow-hidden rounded-none bg-foreground text-primary-foreground shadow-2xl min-h-[600px] flex flex-col justify-center items-center text-center p-8 md:p-12 group">
              <Image
                  src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGVjdXRpdmV8ZW58MHx8fHwxNzU2MTM2NDg3fDA&ixlib-rb-4.1.0&q=80&w=1080"
                  alt="Equipo ejecutivo en reunión"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="executive meeting"
                  className="brightness-50 group-hover:brightness-[0.4] transition-all duration-300"
              />
              <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-5xl md:text-6xl font-extrabold">Espacio Ejecutivo</h2>
                  <p className="mt-4 max-w-xl text-primary-foreground/80">
                      Recursos, calendarios y herramientas exclusivas para la gerencia.
                  </p>
                  <Button asChild size="lg" className="mt-8 bg-white text-foreground hover:bg-white/90 font-light">
                      <Link href="/dashboard/espacio-ejecutivo">
                          Acceder Ahora <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
          </Card>
        </section>
        
        {/* New Wellness Section */}
        <div id="actividades" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <SectionWrapper>
              <div className="relative rounded-2xl shadow-sm overflow-hidden group">
                  <Image
                      src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
                      alt="Fondo abstracto de bienestar"
                      layout="fill"
                      objectFit="cover"
                      className="z-0"
                      data-ai-hint="abstract waves"
                  />
                  <div className="relative z-10 p-8 grid md:grid-cols-2 gap-8 items-center">
                      <div
                          className={cn(
                              "relative w-full max-w-lg mx-auto transition-all duration-300 ease-in-out h-[400px]"
                          )}
                      >
                          <Image
                              src={wellnessSlides[activeWellnessSlide].imageUrl}
                              alt={wellnessSlides[activeWellnessSlide].title as string}
                              layout="fill"
                              objectFit="contain"
                              data-ai-hint={wellnessSlides[activeWellnessSlide].dataAiHint}
                              key={activeWellnessSlide}
                              className="animate-in fade-in duration-500"
                          />
                      </div>
              
                      <div className="text-left">
                          <div className={cn("transition-all duration-500", "opacity-100")}>
                              <Badge variant="outline" className="text-white border-white/50 mb-4">
                                  {wellnessSlides[activeWellnessSlide].badge}
                              </Badge>
                              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 text-white">
                                  {wellnessSlides[activeWellnessSlide].title}
                              </h2>
                          </div>
                          <div className="flex items-center gap-2 mt-8">
                              {wellnessSlides.map((_, index) => (
                                  <button
                                      key={index}
                                      onClick={() => setActiveWellnessSlide(index)}
                                      className={cn(
                                          "w-1/3 h-1.5 max-w-24 rounded-full transition-colors",
                                          activeWellnessSlide === index
                                              ? "bg-white"
                                              : "bg-white/20 hover:bg-white/40"
                                      )}
                                      aria-label={`Ir a la diapositiva ${index + 1}`}
                                  />
                              ))}
                          </div>
                      </div>
                  </div>
            
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWellnessNav('prev')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 text-white/60 hover:bg-white/10 hover:text-white z-20"
                  >
                      <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleWellnessNav('next')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 text-white/60 hover:bg-white/10 hover:text-white z-20"
                  >
                      <ChevronRight className="h-6 w-6" />
                  </Button>
              </div>
          </SectionWrapper>
        </div>
      
        {/* Playlist Section */}
        <div id="playlist" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <SectionWrapper>
            <div className="flex flex-col items-center text-center mb-8">
                <div className="space-y-1">
                    <h2 className="text-3xl font-bold text-foreground tracking-tight">Nuestra Playlist Banesco Seguros</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">La banda sonora para un día de trabajo productivo y agradable. Haz clic en una playlist para escucharla.</p>
                </div>
                <Button asChild variant="secondary" className="mt-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/90 hover:text-foreground transition-colors font-light">
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
        <div id="faq" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
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
                        className="w-full justify-start gap-3 font-light"
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
    </div>
  );
}
