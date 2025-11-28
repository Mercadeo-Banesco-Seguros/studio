
'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Users, FileText } from 'lucide-react';
import Link from 'next/link';

export const HcmInteractionCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative w-full max-w-4xl mx-auto h-64 rounded-2xl cursor-pointer transition-all duration-500 ease-in-out transform-style-3d"
        >
            {/* Front Card (Emergency) */}
            <div className={cn(
                "absolute inset-0 w-full h-full bg-destructive text-destructive-foreground rounded-2xl flex items-center justify-center transition-transform duration-500 ease-in-out backface-hidden",
                isHovered && "rotate-y-180"
            )}>
                <h2 className="text-4xl font-black tracking-wider">EN CASO DE EMERGENCIA</h2>
            </div>

            {/* Back Card (Options) */}
            <div className={cn(
                "absolute inset-0 w-full h-full bg-primary text-primary-foreground rounded-2xl flex items-center justify-around p-8 transition-transform duration-500 ease-in-out backface-hidden rotate-y-180",
                isHovered ? "rotate-y-0" : ""
            )}>
                <div className="flex flex-col md:flex-row items-center justify-around w-full gap-8">
                     {/* Contacto Section */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h3 className="text-2xl font-bold">Contacto</h3>
                        <div className="flex gap-3">
                            <Button asChild variant="secondary" size="icon" className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30">
                                <Link href="mailto:asistencia@banescoseguros.com"><Mail className="h-6 w-6" /></Link>
                            </Button>
                            <Button asChild variant="secondary" size="icon" className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30">
                                <Link href="tel:+582125011111"><Phone className="h-6 w-6" /></Link>
                            </Button>
                        </div>
                    </div>

                     {/* Opciones Section */}
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h3 className="text-2xl font-bold">Opciones</h3>
                        <div className="flex gap-3">
                            <Button variant="secondary" className="rounded-full bg-white/20 hover:bg-white/30 h-12 px-6 text-xs font-light">
                                <Users className="mr-2 h-4 w-4" />
                                Beneficios
                            </Button>
                            <Button variant="secondary" className="rounded-full bg-white/20 hover:bg-white/30 h-12 px-6 text-xs font-light">
                                <FileText className="mr-2 h-4 w-4" />
                                Cobertura
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Add this to your globals.css to handle the 3D flipping
/*
@layer utilities {
  .transform-style-3d {
    transform-style: preserve-3d;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
   .rotate-y-0 {
    transform: rotateY(0deg);
  }
  .backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }
}
*/

