
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { ArrowRight, Gavel, Gem, Lightbulb, ChevronLeft, ChevronRight, RefreshCw, BarChartHorizontal, TrendingUp, Users, Percent, Target, Scaling, Goal, Sparkles, Timer, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';


const technologies = [
  { name: 'AppSheet', iconUrl: 'https://numericoach.fr/wp-content/uploads/2024/05/image-1024x1024.png', 'data-ai-hint': 'appsheet logo' },
  { name: 'TypeScript', iconUrl: 'https://cdn.worldvectorlogo.com/logos/typescript.svg', 'data-ai-hint': 'typescript logo' },
  { name: 'Google Docs', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png', 'data-ai-hint': 'google docs logo' },
  { name: 'VS Code', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png', 'data-ai-hint': 'vs code logo' },
  { name: 'Flutter', iconUrl: 'https://cdn.worldvectorlogo.com/logos/flutter.svg', 'data-ai-hint': 'flutter logo' },
  { name: 'Microsoft Fabric', iconUrl: 'https://www.brainsell.com/wp-content/uploads/2023/12/Fabric_final_x256.png', 'data-ai-hint': 'microsoft fabric logo' },
  { name: 'Google Sites', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Google_Sites_2020_Logo.svg/1489px-Google_Sites_2020_Logo.svg.png', 'data-ai-hint': 'google sites logo' },
  { name: 'Microsoft Copilot', iconUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/copilot-color.png', 'data-ai-hint': 'microsoft copilot logo' },
  { name: 'Gemini', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/2048px-Google_Gemini_icon_2025.svg.png', 'data-ai-hint': 'google gemini logo' },
  { name: 'Gmail', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png', 'data-ai-hint': 'gmail logo' },
  { name: 'Power BI', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png', 'data-ai-hint': 'power bi logo' },
  { name: 'Google Sheets', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Google_Sheets_2020_Logo.svg/500px-Google_Sheets_2020_Logo.svg.png', 'data-ai-hint': 'google sheets logo' },
  { name: 'NotebookLM', iconUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/notebooklm.png', 'data-ai-hint': 'notebooklm logo' },
];

const trainingStats = [
    { title: "Crecimiento", value: 250, description: "El e-learning corporativo crecerá >250% para 2026 y puede mejorar la productividad hasta un 25%.", isTrend: true, trendData: [{v:0},{v:50},{v:80},{v:150},{v:200},{v:250}] },
    { title: "Satisfacción", value: 92, description: "de los empleados valora los programas de formación bien planificados.", color: "hsl(var(--primary))", remainingColor: "#f0f0f0" },
    { title: "Adopción", value: 90, description: "de las empresas usan formación online como herramienta clave de capacitación.", color: "hsl(var(--primary))", remainingColor: "#f0f0-f0" },
];

const jobsData = {
    net: 45,
    chartData: [
        { name: 'Creados', value: 130, color: '#FFFFFF' },
        { name: 'Perdidos', value: 85, color: 'hsl(var(--primary))' },
    ]
};


const AnimatedNumber = ({ value, duration = 4000 }: { value: number, duration?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = value;
                    if (start === end) return;

                    const range = end - start;
                    let stepTime = Math.abs(Math.floor(duration / range));
                    if (range === 0) stepTime = duration;

                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start >= end) {
                            setCount(end); // Ensure it ends exactly on the value
                            clearInterval(timer);
                        }
                    }, stepTime);
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
    }, [value, duration]);

    return <span ref={ref}>{count}</span>;
};


interface AdnCardProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    href?: string;
    isTitleCard?: boolean;
    className?: string;
}

const AdnCard = ({ title, description, icon: Icon, href = '#', isTitleCard = false, className }: AdnCardProps) => {
    
    const cardContent = isTitleCard ? (
      <CardContent className="p-6 flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {description && (
                <p className="text-primary-foreground/80 max-w-xs mt-2 text-sm">{description}</p>
            )}
        </CardContent>
    ) : (
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            {Icon && (
                <div className="p-3 rounded-lg bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
            )}
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
        </CardContent>
    );
    
    const cardClasses = cn(
        "h-full rounded-2xl shadow-sm transition-all",
        isTitleCard 
            ? "bg-primary text-primary-foreground shadow-lg"
            : "bg-card/50 backdrop-blur-sm border-white/10 hover:shadow-lg hover:-translate-y-1",
        className
    );

    if (isTitleCard) {
        return <Card className={cardClasses}>{cardContent}</Card>;
    }

    return (
        <Link href={href} className="group block h-full">
            <Card className={cardClasses}>
                {cardContent}
            </Card>
        </Link>
    );
};


export default function CursosPage() {

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="p-4 sm:p-8 space-y-12">
        <div className="max-w-7xl mx-auto space-y-12">
            <section>
              <div className="flex gap-6">
                <div className="w-[70%]">
                  <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-primary text-primary-foreground min-h-[500px] flex flex-col justify-end text-left">
                    <Image
                      src="https://images.unsplash.com/photo-1681127910416-f18e60b0ba1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8RE5BfGVufDB8fHx8MTc2NTM4MDMwMnww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="ADN Banesco Seguros"
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="business team"
                      className="brightness-50"
                    />
                    <div className="relative z-10 p-8 md:p-12">
                      <Badge variant="outline" className="text-white border-white/50 mb-4">Cultura Corporativa</Badge>
                      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">ADN Banesco<br/>Seguros</h1>
                       <p className="mt-4 max-w-xl text-primary-foreground/80">Conoce los principios que nos guían y forman la base de nuestra organización.</p>
                      <div className="pt-8">
                        <Button asChild className="text-xs font-light bg-primary text-primary-foreground hover:bg-primary/90">
                          <Link href="#">
                            Conocer más
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
                <div className="w-[30%] flex flex-col gap-6">
                    <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-card flex-1 flex flex-col text-left transition-transform hover:scale-105">
                        <Image
                            src="https://wallpapers.com/images/featured/azul-claro-2iuzyh711jo9bmgo.jpg"
                            alt="Código de Ética"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="code ethics"
                        />
                        <div className="absolute inset-0 bg-blue-900/40" />
                        <div className="relative z-10 p-6 w-full flex flex-col h-full justify-between">
                            <div>
                                <Badge variant="outline" className="text-white border-white/50 mb-2">Principios y Valores</Badge>
                                <h2 className="text-3xl font-bold text-white">Código de Ética</h2>
                            </div>
                            <div className="mt-auto">
                                <Button asChild className="text-xs font-light bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Link href="#">Explorar</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                    <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-card flex-1 flex flex-col text-left transition-transform hover:scale-105">
                        <Image
                            src="https://plus.unsplash.com/premium_photo-1701856761166-0a751ba4da2a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
                            alt="Nuestros Productos"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="insurance products"
                        />
                        <div className="absolute inset-0 bg-blue-900/40" />
                        <div className="relative z-10 p-6 w-full flex flex-col h-full justify-between">
                            <div>
                                <Badge variant="outline" className="text-white border-white/50 mb-2">Soluciones y Cobertura</Badge>
                                <h2 className="text-3xl font-bold text-white">Nuestros Productos</h2>
                            </div>
                            <div className="mt-auto">
                                <Button asChild className="text-xs font-light bg-primary text-primary-foreground hover:bg-primary/90">
                                    <Link href="#">Conocer más</Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
              </div>
            </section>
        </div>
      </div>

        <section className="w-full bg-primary text-primary-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">Estadísticas Clave</Badge>
                <h2 className="text-4xl font-bold mt-4">El Impacto de la Formación Corporativa</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {trainingStats.map((stat, index) => {
                  const data = [
                    { name: 'A', value: stat.value, color: '#FFFFFF' },
                    { name: 'B', value: (stat.isTrend ? 250 : 100) - stat.value, color: 'hsl(var(--primary))' },
                  ];
                  return (
                    <div key={index} className="flex items-center gap-6">
                      <div className="w-28 h-28 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                          {stat.isTrend ? (
                             <AreaChart data={stat.trendData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <defs>
                                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="v" stroke="#FFFFFF" strokeWidth={2} fill="url(#trendGradient)" />
                            </AreaChart>
                          ) : (
                            <PieChart>
                                <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={50}
                                startAngle={90}
                                endAngle={450}
                                paddingAngle={0}
                                dataKey="value"
                                isAnimationActive={true}
                                animationDuration={4000}
                                >
                                    <Cell key="cell-0" fill={data[0].color} stroke={data[0].color} />
                                    <Cell key="cell-1" fill={data[1].color} stroke={data[1].color}/>
                                </Pie>
                            </PieChart>
                          )}
                        </ResponsiveContainer>
                      </div>
                      <div>
                        <h3 className="text-xl">
                          <span className="text-5xl font-bold"><AnimatedNumber value={stat.value} />%</span>
                          <span className="font-normal ml-2">{stat.title}</span>
                        </h3>
                        <p className="text-primary-foreground/80 text-sm mt-1">{stat.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    <div className="flex items-center gap-6">
                        <div className="w-28 h-28 flex-shrink-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[{v:0},{v:50},{v:100},{v:150},{v:200},{v:218}]} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                                <defs>
                                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <Area type="monotone" dataKey="v" stroke="#FFFFFF" strokeWidth={2} fill="url(#incomeGradient)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        </div>
                        <div>
                        <h3 className="text-xl">
                            <span className="text-5xl font-bold"><AnimatedNumber value={218} />%</span>
                            <span className="font-normal ml-2">Ingresos</span>
                        </h3>
                        <p className="text-primary-foreground/80 text-sm mt-1">Las empresas con formación integral tienen un 218% más de ingresos por empleado.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <div className="w-28 h-28 flex-shrink-0 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                    data={jobsData.chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={35}
                                    outerRadius={50}
                                    startAngle={90}
                                    endAngle={450}
                                    paddingAngle={0}
                                    dataKey="value"
                                    isAnimationActive={true}
                                    animationDuration={4000}
                                    >
                                        <Cell key="cell-0" fill={jobsData.chartData[0].color} stroke={jobsData.chartData[0].color} />
                                        <Cell key="cell-1" fill={jobsData.chartData[1].color} stroke={jobsData.chartData[1].color}/>
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div>
                            <h3 className="text-xl">
                                <span className="text-5xl font-bold">+<AnimatedNumber value={jobsData.net} />M</span>
                                <span className="font-normal ml-2">Empleos</span>
                            </h3>
                            <p className="text-primary-foreground/80 text-sm mt-1">La formación crea 130M de empleos vs. 85M perdidos por automatización.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-28 h-28 flex-shrink-0">
                           <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                               <Pie
                                 data={[{ value: 80, color: '#FFFFFF' }, { value: 20, color: 'hsl(var(--primary))' }]}
                                 cx="50%"
                                 cy="50%"
                                 innerRadius={35}
                                 outerRadius={50}
                                 startAngle={90}
                                 endAngle={450}
                                 paddingAngle={0}
                                 dataKey="value"
                                 isAnimationActive={true}
                                 animationDuration={4000}
                               >
                                 <Cell key="cell-0" fill={'#FFFFFF'} stroke={'#FFFFFF'} />
                                 <Cell key="cell-1" fill={'hsl(var(--primary))'} stroke={'hsl(var(--primary))'} />
                               </Pie>
                             </PieChart>
                           </ResponsiveContainer>
                        </div>
                        <div>
                        <h3 className="text-xl">
                            <span className="text-5xl font-bold"><AnimatedNumber value={80} />%</span>
                            <span className="font-normal ml-2">Liderazgo</span>
                        </h3>
                        <p className="text-primary-foreground/80 text-sm mt-1">de las empresas invierte en programas de desarrollo de liderazgo para 2025.</p>
                        </div>
                    </div>
              </div>
            </div>
        </section>
        
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-12 mt-12">
            <section>
              <div className="flex gap-6">
                 <div className="w-[70%]">
                  <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-card min-h-[400px] flex flex-col justify-end text-left">
                    <Image 
                      src="https://www.shutterstock.com/image-photo/concentrated-young-female-student-engaged-600nw-2458397479.jpg"
                      alt="E-learning"
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="e-learning development"
                      className="brightness-50"
                    />
                    <div className="relative z-10 p-8 md:p-12">
                        <Badge variant="outline" className="text-white border-white/50 mb-4">Cursos Disponibles</Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Visita Nuestra<br/> Academia Banesco Seguros</h1>
                        <div className="pt-8">
                            <Button asChild className="text-xs font-light">
                                <Link href="#">
                                    Acceder
                                </Link>
                            </Button>
                        </div>
                    </div>
                  </Card>
                </div>
                 <div className="w-[30%]">
                  <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-card min-h-[400px] flex flex-col justify-end text-left">
                    <Image 
                      src="https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8bGFwdG9wfGVufDB8fHx8MTc2NTM3OTM2Mnww&ixlib-rb-4.1.0&q=80&w=1080"
                      alt="Revisar Cursos"
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint="e-learning development"
                      className="brightness-50"
                    />
                    <div className="relative z-10 p-8 md:p-12">
                        <Badge variant="outline" className="text-white border-white/50 mb-4">Revisar</Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Nuestros Cursos <br/> Disponibles</h1>
                        <div className="pt-8">
                            <Button asChild className="text-xs font-light">
                                <Link href="#">
                                    Acceder
                                </Link>
                            </Button>
                        </div>
                    </div>
                  </Card>
                </div>
              </div>
            </section>
            <section>
                <h3 className="text-center text-xl text-foreground mb-6">
                    <span className="font-bold">Domina</span> las herramientas del <span className="font-bold">futuro</span>
                </h3>
                <div
                    className="relative w-full overflow-hidden"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    }}
                >
                    <div className="animate-scroll flex gap-16 py-8">
                        {[...technologies, ...technologies].map((tech, index) => (
                            <div key={`${tech.name}-${index}`} className="flex-shrink-0">
                                <div className={cn("relative h-16 w-16 transition-all hover:scale-110", tech.name === 'Power BI' && 'w-20')}>
                                    <Image src={tech.iconUrl} alt={tech.name} layout="fill" objectFit="contain" data-ai-hint={tech['data-ai-hint']} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>

    </div>
  );
}






