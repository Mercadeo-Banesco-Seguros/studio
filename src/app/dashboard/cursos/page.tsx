
'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const newSectionCards = [
  {
    title: 'Cursos Regulatorios',
    description: 'Mantente al día con las normativas y procedimientos esenciales para tu rol en la organización.',
    imageUrl: 'https://i.pinimg.com/1200x/bd/19/e1/bd19e102540dfdb7526b069d007e2853.jpg',
  },
  {
    title: 'ADN Banesco Seguros',
    description: 'Conoce nuestra historia, valores y la cultura que nos define como organización.',
    imageUrl: 'https://i.pinimg.com/736x/c8/9d/7f/c89d7fbfae8c8a487220b7a8efe5d3af.jpg',
  },
  {
    title: 'Nuestros Productos',
    description: 'Explora en detalle nuestro portafolio de productos y los beneficios que ofrecemos a nuestros clientes.',
    imageUrl: 'https://i.pinimg.com/736x/af/01/88/af01887c1e43f95d84e68ed40ffb5e90.jpg',
  },
  {
    title: 'Nuestra Marca',
    description: 'Aprende a aplicar correctamente nuestra identidad de marca en todas tus comunicaciones.',
    imageUrl: 'https://i.pinimg.com/736x/22/3f/96/223f965de36b48c42d7898aad5944094.jpg',
  },
];

const CategoryCard = ({
  title,
  description,
  imageUrl,
  bgColor,
  textColor,
  label,
  className,
  imageClassName,
  isLightCard,
  href,
}: {
  title: string;
  description: string;
  imageUrl?: string;
  bgColor: string;
  textColor: string;
  label: string;
  className?: string;
  imageClassName?: string;
  isLightCard?: boolean;
  href?: string;
}) => {
  const CardContentComponent = (
    <Card className={cn(
      "relative rounded-2xl overflow-hidden shadow-lg p-6 flex flex-col justify-between transition-transform hover:scale-[1.02]",
      bgColor,
      textColor,
      className
    )}>
      <div className="relative z-10">
        <Badge variant="secondary" className={cn(
          "mb-2",
          isLightCard ? "bg-neutral-500 text-white" : "bg-white/20 text-white backdrop-blur-sm"
        )}>{label}</Badge>
        <h3 className="flex items-center text-2xl font-bold tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-xs max-w-xs">{description}</p>
      </div>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={250}
          height={250}
          quality={100}
          className={cn("absolute z-0 object-contain", imageClassName)}
        />
      )}
    </Card>
  );

  if (href) {
    return <Link href={href}>{CardContentComponent}</Link>;
  }

  return CardContentComponent;
};

export default function CursosPage() {
  return (
    <div className="bg-muted min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Existing Courses Section */}
        <div>
            <h1 className="text-5xl font-extrabold tracking-tight">
              Donde potencias el talento <br /> que impulsa tu carrera
            </h1>
            <p className="mt-4 text-sm text-muted-foreground max-w-lg">
              Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <CategoryCard
            title="Google Workspace"
            description="Domina las herramientas de Google. Cursos de Sheets, Slides, y más para potenciar tu productividad y colaboración."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(15).png?raw=true"
            bgColor="bg-blue-100"
            textColor="text-blue-900"
            label="Educativo"
            className="min-h-[250px]"
            imageClassName="w-[150px] h-[150px] bottom-0 right-4"
            isLightCard={true}
            href="/dashboard/cursos/google-workspace"
          />

          <CategoryCard
            title="Comunicaciones"
            description="Aprende a desarrollar habilidades de comunicación más eficientes, para expresar ideas con claridad y transmitir mensajes de forma efectiva."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(13).png?raw=true"
            bgColor="bg-indigo-500"
            textColor="text-white"
            label="Cursos"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="Inteligencia Artificial"
            description="Descubre cómo la IA está transformando el mundo de los seguros y aprende a utilizarla en tu día a día."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(12).png?raw=true"
            bgColor="bg-card"
            textColor="text-card-foreground"
            label="Educativo"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
            isLightCard={true}
          />

          <CategoryCard
            title="Organización"
            description="Mejora tu productividad con cursos sobre gestión del tiempo, planificación y métodos de organización personal."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(14).png?raw=true"
            bgColor="bg-purple-200"
            textColor="text-purple-900"
            label="Información"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
            isLightCard={true}
          />

          <CategoryCard
            title="Herramientas Digitales"
            description="Explora y domina las herramientas digitales que optimizan nuestros procesos y mejoran la experiencia del cliente."
            imageUrl="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(16).png?raw=true"
            bgColor="bg-sky-400"
            textColor="text-white"
            label="Cursos"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="Cursos Regulatorios"
            description="Mantente al día con las normativas y procedimientos esenciales para tu rol en la organización."
            imageUrl="https://i.pinimg.com/1200x/bd/19/e1/bd19e102540dfdb7526b069d007e2853.jpg"
            bgColor="bg-rose-500"
            textColor="text-white"
            label="Regulatorio"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

          <CategoryCard
            title="ADN Banesco Seguros"
            description="Conoce nuestra historia, valores y la cultura que nos define como organización."
            imageUrl="https://i.pinimg.com/736x/c8/9d/7f/c89d7fbfae8c8a487220b7a8efe5d3af.jpg"
            bgColor="bg-amber-100"
            textColor="text-amber-900"
            label="Cultura"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
            isLightCard={true}
          />
          
          <CategoryCard
            title="Nuestros Productos"
            description="Explora en detalle nuestro portafolio de productos y los beneficios que ofrecemos a nuestros clientes."
            imageUrl="https://i.pinimg.com/736x/af/01/88/af01887c1e43f95d84e68ed40ffb5e90.jpg"
            bgColor="bg-teal-500"
            textColor="text-white"
            label="Productos"
            className="min-h-[250px]"
            imageClassName="w-[180px] h-[180px] bottom-4 right-4"
          />

        </div>
      </div>
    </div>
  );
}
