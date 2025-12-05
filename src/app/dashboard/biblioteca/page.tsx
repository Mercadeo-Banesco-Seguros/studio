
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from 'react';
import Image from 'next/image';

export default function BibliotecaPage() {
    return (
        <div className="relative w-full flex flex-col justify-center text-foreground overflow-hidden py-32">
            {/* Background Image */}
            <Image
                src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/a94e961cef35a4a47aec5afb55bb61886af9bb26/Banners%20Home.svg"
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
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                            Biblioteca de Gestión Documental
                        </h1>
                        <p className="mt-6 max-w-md text-lg text-white/80">
                            Esta sección administra y centraliza toda la documentación corporativa. Garantiza que usted acceda siempre a la versión vigente, válida y autorizada de cada documento, optimizando la eficiencia y la toma de decisiones.
                        </p>
                        <div className="mt-10">
                            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
                                <Link href="https://www.appsheet.com/start/410a1959-0f25-4a71-8e93-d61b3d312d8a" target="_blank" rel="noopener noreferrer">
                                    Empezar
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    {/* Right side image */}
                    <div className="relative h-64 md:h-[28rem] w-full">
                         <Image
                            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(50).png?raw=true"
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
