'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, History, Award, Rss, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const technologies = [
  { name: 'Google Workspace', iconUrl: 'https://cdn.worldvectorlogo.com/logos/google-workspace-2.svg', dataAiHint: 'google workspace logo' },
  { name: 'Microsoft 365', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', dataAiHint: 'microsoft logo' },
  { name: 'Python', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg', dataAiHint: 'python logo' },
  { name: 'RStudio', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/91/RStudio-logo-ball.svg', dataAiHint: 'rstudio logo' },
  { name: 'Copilot', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Microsoft_Copilot_Logo.svg', dataAiHint: 'copilot logo' },
];

const adnCourses = [
    { title: 'Nuestra Historia', icon: History, description: 'Conoce los hitos que han forjado nuestra identidad y éxito.', href: '#' },
    { title: 'Nuestros Valores', icon: Award, description: 'Los principios que guían cada una de nuestras acciones y decisiones.', href: '#' },
    { title: 'Visión Cliente Céntrico', icon: Rss, description: 'Estrategias para poner al cliente en el centro de todo lo que hacemos.', href: '#' },
    { title: 'Cultura de Alto Desempeño', icon: CheckCircle, description: 'Fomenta la excelencia y el rendimiento superior en tu equipo.', href: '#' },
];

interface AdnCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
}

const AdnCard = ({ title, description, icon: Icon, href }: AdnCardProps) => (
    <Link href={href} className="group">
        <Card className="h-full rounded-2xl shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </Link>
);


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
                    <Badge variant="outline" className="text-white border-white/50 mb-4">Academia Banesco Seguros</Badge>
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
                 <Card className="relative rounded-2xl shadow-lg overflow-hidden bg-primary text-primary-foreground min-h-[400px] flex flex-col justify-end text-left transition-transform hover:scale-105">
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
            <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Domina las herramientas del futuro</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-4">
                {technologies.map(tech => (
                    <div key={tech.name} className="relative h-10 w-28 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                        <Image src={tech.iconUrl} alt={tech.name} layout="fill" objectFit="contain" data-ai-hint={tech.dataAiHint} />
                    </div>
                ))}
            </div>
        </section>
        
        <section>
            <div className="space-y-2 mb-8">
                <h2 className="text-3xl font-bold text-foreground tracking-tight">ADN Banesco Seguros</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Fortalece tus competencias y conoce a fondo la cultura que nos impulsa a ser líderes en el mercado.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {adnCourses.map(course => (
                    <AdnCard key={course.title} {...course} />
                ))}
            </div>
        </section>

      </div>
    </div>
  );
}
