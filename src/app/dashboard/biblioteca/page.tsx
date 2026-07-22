
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from 'react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import imageData from '@/app/lib/placeholder-images.json';

export default function BibliotecaPage() {
    const bannerUrl = imageData.images.find(img => img.id === 'banner-waves')?.url || '';
    const shapesUrl = imageData.images.find(img => img.id === 'biblioteca-3d')?.url || '';

    return (
        <div className="relative w-full flex flex-col justify-center text-foreground overflow-hidden py-32">
            {/* Background Image */}
            <Image
                src={bannerUrl}
                alt="Fondo abstracto de ondas"
                layout="fill"
                objectFit="cover"
                className="z-0"
                data-ai-hint="abstract waves"
                quality={100}
            />
            <div className="absolute inset-0 bg-blue-900/40 z-0" />

            <div className="container mx-auto px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left side content */}
                    <div className="text-left">
                        <Badge variant="outline" className="mb-4 border-white text-white">
                            Impulsado por la Unidad de Procesos
                        </Badge>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Biblioteca de Gestión Documental
                        </h1>
                        <p className="mt-6 max-w-md text-base text-white/80">
                            Esta sección administra y centraliza toda la documentación corporativa. Garantiza que usted acceda siempre a la versión vigente, válida y autorizada de cada documento, optimizando la eficiencia y la toma de decisiones.
                        </p>
                        <div className="mt-10">
                            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-light text-xs rounded-full">
                                <Link href="https://www.appsheet.com/start/ce842c69-2210-4519-b586-a0ec8733dcdb" target="_blank" rel="noopener noreferrer">
                                    Empezar
                                </Link>
                            </Button>
                        </div>
                    </div>
                    {/* Right side image */}
                    <div className="relative h-64 md:h-[28rem] w-full">
                         <Image
                            src={shapesUrl}
                            alt="Abstract 3D shapes"
                            layout="fill"
                            objectFit="contain"
                            data-ai-hint="abstract 3d"
                            className="drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
