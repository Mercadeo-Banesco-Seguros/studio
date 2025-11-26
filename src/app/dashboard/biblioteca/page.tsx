
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from 'react';
import Image from 'next/image';

export default function BibliotecaPage() {
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center bg-[#f0f0f0] text-foreground overflow-hidden">
            {/* Grid background */}
            <div 
                className="absolute inset-0 z-0" 
                style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                }}
            />

            <div className="container mx-auto px-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left side content */}
                    <div className="text-left">
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-neutral-800 leading-tight">
                            Biblioteca de Gestión Documental
                        </h1>
                        <p className="mt-6 max-w-md text-lg text-neutral-600">
                            Esta sección administra y centraliza toda la documentación corporativa. Garantiza que usted acceda siempre a la versión vigente, válida y autorizada de cada documento, optimizando la eficiencia y la toma de decisiones.
                        </p>
                        <div className="mt-10">
                            <Button asChild size="lg" className="bg-neutral-800 text-white hover:bg-neutral-700 font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
                                <Link href="https://www.appsheet.com/start/410a1959-0f25-4a71-8e93-d61b3d312d8a" target="_blank" rel="noopener noreferrer">
                                    Empezar
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                    {/* Right side image */}
                    <div className="relative h-64 md:h-96 w-full">
                         <Image
                            src="https://images.unsplash.com/photo-1695423588926-820f44c4245c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxhYnN0cmFjdCUyMHdoaXRlJTIwM2R8ZW58MHx8fHwxNzYzOTg1MTA5fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
