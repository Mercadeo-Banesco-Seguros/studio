
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { 
  TrendingUp,
  UserPlus,
  UserCheck,
  FileClock,
  Calculator,
  Handshake,
  FileCheck2,
  CircleDollarSign,
  ArrowRight,
  Megaphone,
  Workflow,
  GraduationCap,
  Plus,
  Banknote,
  FileBarChart,
  Target,
  Rocket,
  Flag,
  Globe,
  Award,
  Laptop,
  Zap,
} from "lucide-react";
import { getTeamMembers, type TeamMember } from '@/ai/flows/get-team-members-flow';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


const commercialProcessSteps = [
    { number: 1, title: "Por Contactar", description: "Identificación y primer acercamiento con el cliente potencial.", icon: UserPlus },
    { number: 2, title: "Contactado", description: "Se establece comunicación y se presentan los servicios.", icon: UserCheck },
    { number: 3, title: "Esperando Recaudos", description: "Recopilación de la documentación necesaria del cliente.", icon: FileClock },
    { number: 4, title: "En Cotización", description: "Análisis de necesidades y preparación de la propuesta.", icon: Calculator },
    { number: 5, title: "En Negociación", description: "Discusión de términos, coberturas y cierre de acuerdos.", icon: Handshake },
    { number: 6, title: "Emitida", description: "Generación y entrega oficial de la póliza al cliente.", icon: FileCheck2 },
    { number: 7, title: "Cobrada", description: "Confirmación del pago y activación de la cobertura.", icon: CircleDollarSign },
];

const statsData = [
    { value: 32, prefix: "+", suffix: "", description: "Años de servicio continuo y confianza." },
    { value: 200, prefix: "+", suffix: "k", description: "Clientes que han depositado su confianza en nosotros." },
    { value: 100, prefix: "+", suffix: "", description: "Clínicas afiliadas a nuestra red a nivel nacional." },
    { value: 200, prefix: "+", suffix: "", description: "Empleados comprometidos con nuestra misión y valores." }
  ];

// --- Animation Hook ---
const useAnimatedNumber = (end: number, duration = 7000) => {
  const startValue = Math.floor(end / 2); // Start from 50% of the final value
  const [count, setCount] = useState(startValue);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = startValue;
          const endValue = end;
          if (start === endValue) {
            setCount(endValue); // Ensure final value is set if it's already there
            return;
          }

          const range = endValue - start;
          const totalFrames = Math.round(duration / (1000 / 60));
          const increment = range / totalFrames;
          
          let currentFrame = 0;
          const timer = setInterval(() => {
            currentFrame++;
            start += increment;
            setCount(Math.floor(start));
            if (currentFrame >= totalFrames) {
              setCount(endValue);
              clearInterval(timer);
            }
          }, duration / totalFrames);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration, startValue]);

  return { count, ref };
};


// --- Stat Card Component ---
const StatCard = ({ value, prefix, suffix, description }: { value: number, prefix: string, suffix: string, description: string }) => {
  const { count, ref } = useAnimatedNumber(value);
  return (
    <div ref={ref} className="md:px-8 flex-1 first:md:pl-0 last:md:pr-0">
      <p className="text-5xl lg:text-6xl font-extrabold text-primary mb-3">
        {prefix}{count}{suffix}
      </p>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">{description}</p>
    </div>
  );
};

const timelineData = [
  {
    decade: "1990s",
    title: "El Nacimiento y los Fundamentos",
    events: [
      {
        year: "1993",
        title: "Fundación y Establecimiento",
        description: "La compañía obtuvo la autorización para constituirse y realizó su Registro Mercantil, iniciando formalmente sus operaciones como parte del naciente grupo financiero Banesco.",
        icon: Flag,
      },
      {
        year: "1994-1999",
        title: "Construcción de la Cartera Inicial",
        description: "Durante la última mitad de la década, la compañía se enfocó en establecer sus productos básicos (como seguros de automóviles, vida y patrimoniales) y en construir una red de clientes y de comercialización sólida.",
        icon: Target,
      },
    ]
  },
  {
    decade: "2000s",
    title: "Crecimiento y Expansión",
    events: [
      {
        year: "2004-2006",
        title: "Aceleración del Crecimiento",
        description: "Banesco Seguros ingresó a una fase de crecimiento acelerado, reportando aumentos de primas muy superiores a los del promedio del sector, lo que marcó su ascenso en el mercado.",
        icon: Rocket,
      },
      {
        year: "2007",
        title: "Consolidación en el Top 10",
        description: "Gracias a su crecimiento sostenido, la compañía se afianzó de manera constante entre las 10 principales aseguradoras de Venezuela por el volumen de primas cobradas.",
        icon: Award,
      },
      {
        year: "2008",
        title: "Expansión Regional a Panamá",
        description: "Siguiendo la estrategia de internacionalización del grupo, se estableció Banesco Seguros en Panamá, siendo su primer paso para diversificar sus mercados fuera de Venezuela.",
        icon: Globe,
      },
      {
        year: "2009",
        title: "Posicionamiento Histórico",
        description: "La empresa alcanzó una posición de liderazgo importante, ubicándose como la sexta aseguradora más grande del mercado venezolano.",
        icon: TrendingUp,
      },
    ]
  },
  {
    decade: "2010s",
    title: "Internacionalización y Digitalización",
    events: [
      {
        year: "2013",
        title: "Expansión a República Dominicana",
        description: "La compañía continuó su crecimiento internacional con el inicio de operaciones en República Dominicana, ampliando su alcance en el Caribe.",
        icon: Globe,
      },
      {
        year: "2014",
        title: "Lanzamiento de Servicios Digitales",
        description: "Se implementaron plataformas como Banesco Seguros Online, permitiendo a los clientes realizar autogestión de trámites, consultas y reportes de siniestros de manera más eficiente.",
        icon: Laptop,
      },
    ]
  },
  {
    decade: "2020s",
    title: "Optimización y Adaptación",
    events: [
      {
        year: "2020-Presente",
        title: "Enfoque en Optimización Tecnológica",
        description: "Se ha puesto énfasis en la modernización de la infraestructura tecnológica, la automatización de procesos internos y la búsqueda de eficiencias operativas para mejorar la atención y reducir costos.",
        icon: Zap,
      },
      {
        year: "2020-Presente",
        title: "Adaptación a Nuevas Tendencias",
        description: "La compañía ha trabajado en ajustar y desarrollar su oferta de productos para cubrir nuevos riesgos asociados al contexto actual, como la necesidad de mayor cobertura de salud y ciberseguridad.",
        icon: Workflow,
      },
    ]
  }
];


export default function NosotrosPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoadingTeam(true);
      try {
        const members = await getTeamMembers();
        setTeamMembers(members);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setIsLoadingTeam(false);
      }
    };
    fetchMembers();
  }, []);

  const serviceCategories = [
    {
      title: "Gerencia Comercial",
      description: "Planes estratégicos de ventas que se alinean con tus objetivos.",
      href: "/dashboard/objetivos",
      icon: TrendingUp,
      highlighted: true,
    },
    {
      title: "Mercadeo",
      description: "Guía experta para optimizar el rendimiento de tus campañas.",
      href: "/dashboard/mercadeo",
      icon: Megaphone,
    },
    {
      title: "Suscripción",
      description: "Soluciones tecnológicas innovadoras para mejorar la eficiencia.",
      href: "/dashboard/suscripcion",
      icon: FileCheck2,
    },
    {
      title: "Actuarial",
      description: "Análisis y modelos para la evaluación de riesgos y la fijación de tarifas.",
      href: "/dashboard/actuarial",
      icon: FileBarChart,
    },
     {
      title: "Procesos",
      description: "Optimiza los flujos de trabajo para una mayor eficiencia operativa.",
      href: "/dashboard/procesos",
      icon: Workflow,
    },
    {
      title: "Capital Humano",
      description: "Potencia el talento y fomenta un ambiente laboral de excelencia.",
      href: "/dashboard/capital-humano",
      icon: GraduationCap,
    },
    {
      title: "Finanzas",
      description: "Gestión y análisis de los recursos financieros de la compañía.",
      href: "#",
      icon: Banknote,
    },
  ];
  
  const iconBgColors = [
    'bg-blue-100', 'bg-blue-200', 'bg-sky-200', 'bg-sky-300', 
    'bg-sky-400', 'bg-sky-500', 'bg-blue-600', 'bg-blue-700', 
    'bg-primary/90', 'bg-primary'
  ];

  return (
    <div className="bg-background">
      <div className="space-y-12">

        <section className="relative h-[600px] w-full group">
          <Link href="/dashboard/objetivos-smart" className="absolute inset-0 z-10" aria-label="Explorar desafíos estratégicos" />
          <Image 
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb21wYW55fGVufDB8fHx8MTc1MDkwMzI3Nnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Visión de la empresa"
            layout="fill"
            objectFit="cover"
            data-ai-hint="business vision"
            className="brightness-50 group-hover:brightness-[0.4] transition-all"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="container mx-auto absolute inset-0 flex flex-col justify-center items-start text-white p-12 z-20 pointer-events-none">
            <h2 className="text-4xl md:text-6xl font-extrabold max-w-2xl leading-tight">Nuestra Visión para el 2025</h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
             <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center text-sm font-semibold">
                Explorar Desafíos Estratégicos <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-lg font-semibold text-primary">Proceso</p>
              <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2">
                Nuestra Sistemática Comercial
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {commercialProcessSteps.map(step => (
                <div key={step.number} className="text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary">
                      <step.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-foreground">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-16">
              <p className="text-lg font-semibold text-primary">Resultados</p>
              <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2">
                Nuestra Trayectoria en Cifras
              </h3>
              <p className="mt-6 text-muted-foreground text-base leading-relaxed max-w-2xl">
                Con más de tres décadas en el mercado, hemos consolidado una trayectoria de solidez, crecimiento y confianza. Nuestros números reflejan el compromiso con nuestros clientes, aliados y colaboradores, impulsando el bienestar en Venezuela.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:divide-x md:divide-border/70 space-y-8 md:space-y-0 text-center md:text-left">
              {statsData.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <p className="text-lg font-semibold text-primary">Historia</p>
                    <h3 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mt-2">
                        Un Viaje a Través del Tiempo
                    </h3>
                    <p className="mt-6 text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto">
                        Desde nuestra fundación hasta hoy, hemos evolucionado para adaptarnos a los nuevos tiempos, manteniendo siempre nuestro compromiso con la excelencia y la innovación.
                    </p>
                </div>

                <div className="relative w-full h-[250px]">
                    <ScrollArea className="w-full h-full pb-8">
                        <div className="flex items-center gap-4 w-max px-4 h-full">
                            {timelineData.flatMap((decade, decadeIndex) => 
                                decade.events.map((event, eventIndex) => {
                                    const overallIndex = timelineData.slice(0, decadeIndex).reduce((acc, d) => acc + d.events.length, 0) + eventIndex;
                                    return (
                                        <div key={event.title} className="w-80 flex-shrink-0">
                                            <div className="flex items-center mb-4">
                                                <div className="text-4xl font-bold text-foreground opacity-30 mr-4">
                                                    {String(overallIndex + 1).padStart(2, '0')}
                                                </div>
                                                <div className="h-px flex-grow bg-border"></div>
                                            </div>
                                            <h4 className="font-bold text-lg mb-2">{event.title}</h4>
                                            <p className="text-sm text-muted-foreground">{event.description}</p>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </section>
        
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1 bg-primary text-primary-foreground p-8 flex flex-col justify-center rounded-2xl aspect-square lg:aspect-[6/7]">
                    <CardHeader className="p-0">
                        <CardTitle className="text-3xl font-bold">Nuestro fantástico equipo</CardTitle>
                        <CardDescription className="text-primary-foreground/80 mt-3">
                            Estas personas trabajan para hacer nuestro producto el mejor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 mt-auto pt-6">
                        <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
                            <Link href="/dashboard/equipo">
                                Ver todo el equipo
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {isLoadingTeam ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="flex flex-col aspect-square lg:aspect-[6/7]">
                           <Skeleton className="w-full aspect-square rounded-2xl mb-4" />
                           <Skeleton className="h-5 w-3/4 mb-2" />
                           <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))
                ) : (
                    teamMembers.slice(0, 6).map((employee, index) => (
                        <div key={`${employee.Correo}-${index}`} className="group flex flex-col aspect-square lg:aspect-[6/7]">
                            <div className="relative w-full aspect-square overflow-hidden mb-4 bg-muted rounded-2xl">
                                <Image
                                src={employee.ImageUrl || 'https://images.unsplash.com/photo-1596367407372-96cb88503db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxCTEFOQ098ZW58MHx8fHwxNzU3MzYzNTMxfDA&ixlib=rb-4.1.0&q=80&w=1080'}
                                alt={`Portrait of ${employee.Nombre}`}
                                layout="fill"
                                objectFit="cover"
                                data-ai-hint="person portrait"
                                className="transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold text-foreground">{employee.Nombre}</h3>
                                    <p className="text-xs text-muted-foreground">{employee.Cargo}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted">
                                    <Plus className="h-4 w-4" />
                                </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 lg:gap-24 items-center">
              
              <div className="mb-12 lg:mb-0">
                <Badge variant="outline" className="mb-4">ÁREAS</Badge>
                <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                  Seguimiento de Nuestros Objetivos
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
                  Enfocados en tus necesidades, cada dashboard ofrece soluciones y estrategias para asegurar un crecimiento sostenido.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {serviceCategories.map((category) => (
                  <Link href={category.href} key={category.title} className="block group">
                    <Card className={cn(
                        "h-full p-6 rounded-2xl border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                        category.highlighted 
                          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                          : "bg-card hover:bg-muted/50"
                      )}
                    >
                      <div className={cn(
                          "flex items-center justify-center h-12 w-12 rounded-xl mb-6",
                          category.highlighted ? "bg-white/20" : "bg-primary/10"
                        )}
                      >
                        <category.icon className={cn(
                          "h-6 w-6",
                          category.highlighted ? "text-primary-foreground" : "text-primary"
                        )} />
                      </div>
                      <h3 className="font-bold text-lg mb-2">
                        {category.title}
                      </h3>
                      <p className={cn(
                        "text-sm leading-relaxed",
                        category.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {category.description}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

    