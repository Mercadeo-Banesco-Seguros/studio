
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { NewCourseCard } from "@/components/dashboard/course-card";
import { mockCourses, mockActivities, mockDepartments, mockPlaylist, faqData, mockDressCodeItemsCaballeros, mockDressCodeItemsDamas, type DressCodeItem } from "@/lib/placeholder-data";
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
import { InteractiveMenuBanner } from '@/components/dashboard/interactive-menu-banner';
import { useToast } from '@/hooks/use-toast';
import { HcmInteractionCard } from '@/components/dashboard/hcm-interaction-card';


const pilaresData = [
    { number: "01", title: "Calidad", text: "Trabajamos para brindar mejores soluciones a nuestros clientes.", icon: Award, color: "bg-primary" },
    { number: "02", title: "Innovación", text: "Construimos una visión de futuro para nuestra organización.", icon: Lightbulb, color: "bg-secondary" },
    { number: "03", title: "Confiabilidad", text: "La cultura de servicio se enfoca en unir esfuerzos en torno a nuestros clientes.", icon: Shield, color: "bg-blue-400" },
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
    .replace(/[\u0000-\u007f]/g, "") // Remove diacritical marks
    .replace(/[^a-z]/g, ''); // remove non-alphabetic chars
};

const AvailabilityRing = ({ percentage }: { percentage: number }) => {
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-32 h-32 flex-shrink-0">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="hsla(var(--primary-foreground), 0.2)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="hsl(var(--primary-foreground))"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-sm text-primary-foreground">
        Cupos
      </span>
    </div>
  );
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
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isMissionView, setIsMissionView] = useState(true);
  const { toast } = useToast();
  
  const [dressCodeView, setDressCodeView] = useState<'caballeros' | 'damas'>('caballeros');
  const [selectedDressCode, setSelectedDressCode] = useState<DressCodeItem>(mockDressCodeItemsCaballeros[0]);
  
  const dressCodeItems = dressCodeView === 'caballeros' ? mockDressCodeItemsCaballeros : mockDressCodeItemsDamas;

  useEffect(() => {
    setSelectedDressCode(dressCodeItems[0]);
  }, [dressCodeView, dressCodeItems]);

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
        
        const menusForToday = allMenus.filter(item => {
            const normalizedItemDay = normalizeDayName(item.day);
            return normalizedItemDay === normalizedToday;
        });
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

  return (
    <div className="bg-background">
        
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-10 min-h-[calc(100vh-6rem)] relative">
                    <div className="md:col-span-7 flex flex-col justify-center py-12 md:py-24 z-10">
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
                            <Button size="default" asChild className="font-light">
                                <Link href="/dashboard/bienestar">
                                    Bienestar
                                </Link>
                            </Button>
                             <Button size="default" variant="secondary" asChild className="font-light">
                                <Link href="#">
                                    Novedades
                                </Link>
                            </Button>
                            <Button size="default" variant="default" className="bg-accent text-primary-foreground font-normal" asChild>
                                <Link href="/dashboard/cursos">
                                    Actívate
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
        <div className="w-full py-12 md:py-16 bg-card">
          <div className="relative overflow-hidden min-h-[600px] flex items-center">
              <Image
                  src="https://images.unsplash.com/photo-1636955816868-fcb881e57954?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvbmRvJTIwYWJzdHJhY3RvJTIwYmxhbmNvfGVufDB8fDB8fHww"
                  alt="Abstract background"
                  layout="fill"
                  objectFit="cover"
                  className="opacity-50"
                  data-ai-hint="abstract background"
              />
              <div className="grid md:grid-cols-2 gap-16 items-center relative z-10 w-full max-w-7xl mx-auto p-8 md:p-12">
                  <div className="space-y-4">
                      <Badge 
                          variant="outline" 
                           style={isMissionView 
                              ? { borderColor: 'hsl(var(--secondary))', color: 'hsl(var(--secondary))' } 
                              : { borderColor: '#543db8', color: '#543db8' }}
                      >
                          Acerca de Nosotros
                      </Badge>
                      <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                          {isMissionView ? "Nuestra Misión" : "Nuestra Oferta de Valor"}
                      </h2>
                      <p className="text-muted-foreground max-w-lg">
                          {isMissionView 
                              ? "Ser la empresa de seguros preferida del mercado, reconocida por su excelencia, calidad de servicio y compromiso con la satisfacción de nuestros clientes, intermediarios y colaboradores."
                              : "Somos una empresa de seguros reconocida por su excelencia y calidad, orientada a satisfacer las necesidades de nuestros clientes, intermediarios y organización, brindando asesoría y protección con soluciones ágiles y oportunas."
                          }
                      </p>
                      <div className="flex gap-4 pt-4">
                           <Button 
                              asChild 
                              className={cn(
                                "font-light hover:opacity-90 text-primary-foreground",
                                isMissionView ? "bg-secondary hover:bg-secondary/90" : "bg-[#543db8] hover:bg-[#543db8]/90"
                              )}
                          >
                              <Link href="/dashboard/mapa-clientes">Nosotros</Link>
                          </Button>
                          <Button variant="ghost" onClick={() => setIsMissionView(!isMissionView)} className="text-muted-foreground hover:text-foreground">
                              <RefreshCw className={cn("mr-2 h-4 w-4", isMissionView && "rotate-180 transition-transform")}/>
                              {isMissionView ? "Ver Oferta de Valor" : "Ver Misión"}
                          </Button>
                      </div>
                  </div>
                  <div className={cn("relative h-96 w-full transition-all duration-500", !isMissionView ? 'md:ml-auto' : '')}>
                      <Image
                          src={isMissionView ? "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(48).png?raw=true" : "https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(47).png?raw=true"}
                          alt={isMissionView ? "Ilustración de misión" : "Ilustración de oferta de valor"}
                          layout="fill"
                          objectFit="contain"
                          data-ai-hint={isMissionView ? "target mission" : "puzzle solution"}
                          className={cn(
                              "transition-all duration-500", 
                              !isMissionView && "object-right"
                          )}
                      />
                  </div>
              </div>
          </div>
        </div>
        
        {/* Menus Section */}
        <div id="menu" className="mt-24">
          {isLoadingMenu ? (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <SectionWrapper>
                <Skeleton className="h-[600px] w-full rounded-2xl" />
              </SectionWrapper>
            </div>
          ) : todaysMenus.length > 0 ? (
            <InteractiveMenuBanner menuItems={todaysMenus} />
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
      
        {/* Gestión de Vacaciones Section */}
        <div id="vacaciones" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <SectionWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[400px] flex items-center">
                        <div className="absolute inset-0 z-0">
                            <Image
                                src="https://t4.ftcdn.net/jpg/07/03/27/69/360_F_703276967_OHrK7gd6yEZXCacTra9UbjwXo5EaKN86.jpg"
                                alt="Paisaje de playa"
                                layout="fill"
                                objectFit="cover"
                                className="brightness-75"
                                data-ai-hint="beach landscape"
                            />
                             <div className="absolute inset-0 bg-blue-900/30"></div>
                        </div>
                        <div className="relative z-10 p-8 md:p-12 text-white w-full md:w-2/3 flex flex-col justify-center">
                            <Badge variant="outline" className="text-white border-white/80 w-fit bg-white/10 backdrop-blur-sm mb-4">Capital Humano</Badge>
                            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">
                                <span className="font-light">Gestiona tus</span> <br /> <span className="font-bold">Próximas Vacaciones</span>
                            </h3>
                            <p className="mt-4 max-w-sm text-white/90">
                                Planifica tu viaje y gestiona tus solicitudes.
                            </p>
                            <Button asChild className="mt-6 font-light rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-fit">
                                <Link href="/dashboard/vacaciones">Gestionar Solicitudes</Link>
                            </Button>
                        </div>
                    </Card>
                    <Card className="relative rounded-2xl overflow-hidden group min-h-[400px]">
                         <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
                        <Image
                            src="https://img.itmastersmag.com/wp-content/uploads/2024/06/04135631/gestion-documental.jpg"
                            alt="Consultar Solicitudes"
                            layout="fill"
                            objectFit="cover"
                            className="z-0 brightness-75 group-hover:brightness-60 transition-all"
                            data-ai-hint="desk calendar"
                        />
                        <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                            <Badge variant="outline" className="text-white border-white/80 w-fit bg-white/10 backdrop-blur-sm mb-4">Nueva Sección</Badge>
                            <h4 className="text-2xl font-bold tracking-tight">Visita la Biblioteca Documental</h4>
                             <p className="text-sm mt-1 text-white/80">Encuentra manuales, guías y recursos.</p>
                            <div className="flex justify-end w-full mt-4">
                                <Button asChild variant="default" className="rounded-full font-light text-xs">
                                    <Link href="/dashboard/biblioteca-digital">Explorar</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Card className="relative rounded-2xl overflow-hidden group min-h-[400px]">
                       <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
                       <Image
                            src="https://img.freepik.com/foto-gratis/concepto-exito-fiesta-celebracion-equipo-negocios_53876-47029.jpg?semt=ais_hybrid&w=740&q=80"
                            alt="Eventos de este mes"
                            layout="fill"
                            objectFit="cover"
                            className="z-0 brightness-75"
                            data-ai-hint="celebration party"
                        />
                        <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
                            <Badge variant="outline" className="text-white border-white/80 w-fit bg-white/10 backdrop-blur-sm mb-4">Bienestar</Badge>
                            <h4 className="text-2xl font-bold">Eventos de este mes</h4>
                            <p className="text-sm mt-1 text-white/80">Descubre los próximos eventos y actividades.</p>
                            <div className="flex justify-end w-full mt-4">
                                <Button asChild variant="default" className="rounded-full font-light text-xs">
                                    <Link href="/dashboard/bienestar#actividades">Explorar</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </SectionWrapper>
        </div>
        
        {/* Portal de Requerimientos Section */}
        <section id="requerimientos" className="w-full mt-24">
            <Card className="relative text-white overflow-hidden min-h-[500px] flex items-center justify-center">
                <Image
                    src="https://images.unsplash.com/photo-1724405143873-cdaa5cac918e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXp1bCUyMGNsYXJvJTIwYWJzdHJhY3RvfGVufDB8fDB8fHww"
                    alt="Abstract background"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                    data-ai-hint="abstract waves"
                />
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center text-center">
                    
                    <div className={cn("transition-all duration-500", showShortcuts ? "opacity-0 scale-95" : "opacity-100 scale-100")}>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
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
                      imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjollaborationfGVufDB8fHx8MTc2NDA5Nzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
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
                      imageUrl="https://images.unsplash.com/photo-1677756119517-756a188d2d94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxBSSUyMGJyYWlufGVufDB8fHx8MTc2NDA5ODAwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
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
                      imageUrl="https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwcmVzZW50YXRpb258ZW58MHx8fHwxNzU0MzM2OTA2fDA&ixlib-rb-4.1.0&q=80&w=1080"
                      dataAiHint="public speaking"
                      imageClassName="opacity-30"
                      availability={90}
                  />
              </div>
          </SectionWrapper>
        </div>


        {/* Dress Code Section */}
        <section id="dress-code" className="w-full mt-24">
            <div className="relative min-h-[600px] w-full flex flex-col justify-center overflow-hidden">
                {dressCodeView === 'caballeros' ? (
                    <>
                        <Image
                            src="https://wallpapers.com/images/hd/blue-hd-1920-x-1080-background-6alqcc8fvs6o6s2t.jpg"
                            alt="Fondo abstracto de vestimenta"
                            layout="fill"
                            objectFit="cover"
                            className="z-0 transition-all duration-500"
                            data-ai-hint="abstract texture"
                        />
                        <div className="absolute inset-0 z-0 transition-all duration-500 bg-blue-900/50"></div>
                    </>
                ) : (
                    <div className="absolute inset-0 z-0 transition-all duration-500 bg-gradient-to-br from-purple-300 to-purple-500"></div>
                )}


                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center h-full text-white container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex flex-col justify-between h-full space-y-4 text-center md:text-left py-12">
                        <div>
                            <p className="font-semibold text-white/80 uppercase tracking-wider">{selectedDressCode.day}</p>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                                {selectedDressCode.title}
                            </h2>
                            <p className="mt-2 text-white/80 max-w-sm mx-auto md:mx-0">{selectedDressCode.description}</p>
                        </div>
                        <div>
                            <p className="font-light text-white/80">Viste Seguro</p>
                             <h3 className="text-3xl font-bold tracking-tighter">Banesco Seguros</h3>
                            <div className="mt-4 flex gap-2">
                              <Button asChild className={cn("font-light bg-white/90 hover:bg-white", dressCodeView === 'damas' ? 'text-purple-600' : 'text-primary')}>
                                  <Link href="#">Explorar Guía</Link>
                              </Button>
                              <Button variant="outline" onClick={() => setDressCodeView('caballeros')} className={cn("font-light", dressCodeView === 'caballeros' ? 'bg-white text-primary' : 'bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white')}>
                                Caballeros
                              </Button>
                               <Button variant="outline" onClick={() => setDressCodeView('damas')} className={cn("font-light", dressCodeView === 'damas' ? 'bg-white text-purple-600' : 'bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white')}>
                                Damas
                              </Button>
                            </div>
                        </div>
                    </div>
                     <div className="relative h-full flex flex-col justify-end">
                        <div className="grid grid-cols-5 gap-6 items-end flex-grow">
                            {dressCodeItems.map(item => (
                                <div 
                                    key={item.id} 
                                    className={cn(
                                        "relative w-full cursor-pointer transition-all duration-300 transform",
                                        dressCodeView === 'damas' ? 'h-[32rem]' : 'h-[34rem]',
                                        selectedDressCode.id === item.id 
                                            ? `opacity-100 ${dressCodeView === 'damas' ? 'scale-125' : 'scale-150'}` 
                                            : 'opacity-50 scale-90 hover:opacity-75 hover:scale-95'
                                    )}
                                    onClick={() => setSelectedDressCode(item)}
                                >
                                    <Image src={item.imageUrl} layout="fill" objectFit="contain" alt={item.title} data-ai-hint={item.dataAiHint}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Póliza HCM Section */}
        <section id="poliza" className="w-full mt-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <HcmInteractionCard />
            </div>
        </section>

        {/* Espacio Ejecutivo Section */}
        <section id="espacio-ejecutivo" className="scroll-mt-20 w-full mt-24">
          <Card className="relative w-full overflow-hidden rounded-none bg-foreground text-primary-foreground shadow-2xl min-h-[400px] flex flex-col justify-center items-center text-center p-8 md:p-12 group">
              <Image
                  src="https://images.unsplash.com/photo-1610374792793-f016b77ca51a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxleGVjdXRpdmV8ZW58MHx8fHwxNzU2MTM2NDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
                  <Button asChild size="lg" className="mt-8 bg-white text-foreground hover:bg-white/90 font-light">
                      <Link href="/dashboard/espacio-ejecutivo">
                          Acceder Ahora <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                  </Button>
              </div>
          </Card>
        </section>


        {/* Actividades Section */}
        <div id="actividades" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
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
                    <Button asChild variant="default" size="lg" className="font-light">
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

        {/* Pilares Section */}
        <div id="pilares" className="container mx-auto px-4 sm:px-6 lg:px-8 mt-24">
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
}
