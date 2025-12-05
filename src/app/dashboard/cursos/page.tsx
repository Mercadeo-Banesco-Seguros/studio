'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookCopy, Building, ChevronRight, DraftingCompass, History, Award, Rss, Code, Bot, BarChart, GraduationCap, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

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
            <Card className="rounded-2xl shadow-lg overflow-hidden bg-card">
                 <div className="grid md:grid-cols-2 items-center">
                    <div className="p-8 md:p-12">
                        <p className="font-semibold text-primary">Plataforma Educativa</p>
                        <h2 className="text-3xl font-bold text-foreground mt-2">Crece con nuestra selección de cursos</h2>
                        <p className="text-muted-foreground mt-4">
                            Accede a una biblioteca curada de cursos en línea de las mejores plataformas del mundo para potenciar tu desarrollo profesional.
                        </p>
                        <Button asChild className="mt-6 rounded-full" size="lg">
                            <Link href="#">
                                Comenzar ahora <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                    <div className="relative h-64 md:h-full min-h-[300px]">
                        <Image 
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxlLWxlYXJuaW5nfGVufDB8fHx8MTc1NDQxMzg5MHww&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="E-learning"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="e-learning development"
                        />
                    </div>
                 </div>
            </Card>
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
