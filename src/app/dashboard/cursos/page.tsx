'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gavel, Gem, Lightbulb, ChevronLeft, ChevronRight, RefreshCw, BarChartHorizontal, TrendingUp, Users, Percent } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';


const technologies = [
  { name: 'AppSheet', iconUrl: 'https://numericoach.fr/wp-content/uploads/2024/05/image-1024x1024.png', dataAiHint: 'appsheet logo' },
  { name: 'TypeScript', iconUrl: 'https://cdn.worldvectorlogo.com/logos/typescript.svg', dataAiHint: 'typescript logo' },
  { name: 'Google Docs', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Google_Docs_logo_%282014-2020%29.svg/1481px-Google_Docs_logo_%282014-2020%29.svg.png', dataAiHint: 'google docs logo' },
  { name: 'VS Code', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png', dataAiHint: 'vs code logo' },
  { name: 'Flutter', iconUrl: 'https://cdn.worldvectorlogo.com/logos/flutter.svg', dataAiHint: 'flutter logo' },
  { name: 'Microsoft Fabric', iconUrl: 'https://www.brainsell.com/wp-content/uploads/2023/12/Fabric_final_x256.png', dataAiHint: 'microsoft fabric logo' },
  { name: 'Google Sites', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Google_Sites_2020_Logo.svg/1489px-Google_Sites_2020_Logo.svg.png', dataAiHint: 'google sites logo' },
  { name: 'Microsoft Copilot', iconUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Microsoft_Copilot_Icon.svg/1200px-Microsoft_Copilot_Icon.svg.png', dataAiHint: 'microsoft copilot logo' },
  { name: 'Gemini', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/2048px-Google_Gemini_icon_2025.svg.png', dataAiHint: 'google gemini logo' },
  { name: 'Gmail', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1024px-Gmail_icon_%282020%29.svg.png', dataAiHint: 'gmail logo' },
  { name: 'Power BI', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png', dataAiHint: 'power bi logo' },
  { name: 'Google Sheets', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Google_Sheets_2020_Logo.svg/500px-Google_Sheets_2020_Logo.svg.png', dataAiHint: 'google sheets logo' },
  { name: 'NotebookLM', iconUrl: 'https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/notebooklm.png', dataAiHint: 'notebooklm logo' },
];


const adnCourses = [
    { title: 'Código de Ética', icon: Gavel, description: 'Principios y normas que guían nuestra conducta.', href: '#' },
    { title: 'Nuestros Productos', icon: Gem, description: 'Explora el portafolio de soluciones que ofrecemos.', href: '#' },
    { title: 'Identidad Banesco Seguros', icon: Lightbulb, description: 'Conoce la esencia de nuestra marca y cómo la comunicamos.', href: '#' },
];

const trainingStats = [
    { label: "Retención de Talento", value: 94, description: "de empleados se queda si se invierte en su desarrollo." },
    { label: "Productividad", value: 25, description: "es el aumento potencial con e-learning bien aplicado." },
    { label: "Satisfacción", value: 92, description: "de los colaboradores valora la formación planificada." },
    { label: "Adopción Corporativa", value: 90, description: "de las empresas ya utilizan formación online." },
];

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
        <CardContent className="p-8 flex flex-col justify-center h-full">
            <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
            {description && (
                <p className="text-primary-foreground/80 max-w-xs mt-3">{description}</p>
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
    <div className="bg-muted/30 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
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
                <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-primary text-primary-foreground min-h-[400px] flex flex-col items-start justify-end text-left transition-transform hover:scale-105">
                    <Image
                        src="https://capacitacion.uc.cl/images/cursos/Por_qu%C3%A9_deber%C3%ADas_aprender_a_programar_en_Python.jpg"
                        alt="Cursos disponibles"
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint="business team"
                        className="brightness-50"
                    />
                    <div className="relative z-10 p-8 w-full">
                        <Badge variant="outline" className="text-white border-white/50 mb-4">Cursos Disponibles</Badge>
                        <h2 className="text-3xl font-bold">Revisar Cursos<br/>Disponibles</h2>
                        <div className="pt-8">
                           <Button asChild className="text-xs font-light">
                               <Link href="/dashboard/cursos/google-workspace">
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
                                <Image src={tech.iconUrl} alt={tech.name} layout="fill" objectFit="contain" data-ai-hint={tech.dataAiHint} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section>
            <Card className="bg-card shadow-lg rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-2">
                    <div className="bg-muted/50 p-8 md:p-12 flex flex-col justify-center items-center text-center">
                         <div className="flex items-end gap-2">
                            <div className="w-8 h-24 bg-sky-300 rounded-md" />
                            <div className="w-8 h-40 bg-blue-600 rounded-md" />
                         </div>
                        <p className="text-8xl font-extrabold text-foreground mt-4">218%</p>
                        <p className="text-muted-foreground font-medium">Aumento potencial de ingresos</p>
                    </div>
                    <div className="p-8 md:p-12">
                        <h3 className="text-sm font-semibold uppercase text-primary tracking-widest">Estadísticas de Formación</h3>
                        <h4 className="text-2xl font-bold text-foreground mt-2 mb-6">Impacto en Cifras</h4>
                        <div className="space-y-6">
                            {trainingStats.map(stat => (
                                <div key={stat.label}>
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-medium text-foreground">{stat.label}</p>
                                        <p className="text-sm font-semibold text-primary">{stat.value}%</p>
                                    </div>
                                    <Progress value={stat.value} />
                                    <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>
        </section>
        
        <section>
            <div className="flex gap-6">
                <div className="w-[30%]">
                    <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-primary text-primary-foreground min-h-[400px] flex flex-col items-start justify-end text-left transition-transform hover:scale-105">
                         <Image
                            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwaWxsYXJzfGVufDB8fHx8MTc2MzczMTk1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Nuestros Pilares"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="pillars architecture"
                            className="brightness-50"
                        />
                        <div className="relative z-10 p-8 w-full">
                            <Badge variant="outline" className="text-white border-white/50 mb-4">Nuestros Pilares</Badge>
                            <h2 className="text-3xl font-bold">Código de Ética, Productos<br/>e Identidad Corporativa</h2>
                             <div className="pt-8">
                               <Button asChild className="text-xs font-light">
                                   <Link href="#">
                                       Explorar
                                   </Link>
                               </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-[70%]">
                    <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-card min-h-[400px] flex flex-col justify-end text-left">
                        <Image 
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fHwxNzYzNzMxODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="ADN Banesco Seguros"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="business team"
                            className="brightness-50"
                        />
                        <div className="relative z-10 p-8 md:p-12">
                            <Badge variant="outline" className="text-white border-white/50 mb-4">Cultura Corporativa</Badge>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">ADN Banesco<br/>Seguros</h1>
                            <div className="pt-8">
                                <Button asChild className="text-xs font-light">
                                    <Link href="#">
                                        Conocer más
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>

      </div>
    </div>
  );
}
