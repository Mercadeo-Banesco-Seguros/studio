
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from 'react';
import Image from 'next/image';

export default function BibliotecaPage() {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxvZmZpY2V8ZW58MHx8fHwxNzU4NjgzODExfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="People working in an office"
                layout="fill"
                objectFit="cover"
                className="z-0 brightness-50"
                data-ai-hint="office work"
            />
            <div className="relative z-10 text-center p-8">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    Biblioteca de Gestión Documental
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-white/80">
                    Accede a todos nuestros procesos y documentos normativos con solo un clic.
                </p>
                <div className="mt-10">
                    <Button asChild size="lg" className="bg-white text-foreground hover:bg-white/90 font-semibold">
                        <Link href="https://www.appsheet.com/start/410a1959-0f25-4a71-8e93-d61b3d312d8a" target="_blank" rel="noopener noreferrer">
                            Empezar
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
