
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Phone, MessageSquare as WhatsAppIcon, Mail, Laptop, Users, Globe, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface HcmCardProps {
  type: 'main' | 'info';
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  badgeText?: string;
  badgeIcon?: LucideIcon;
  imageUrl?: string;
  dataAiHint?: string;
  href?: string;
}

const contactInfo = {
    atencionMedica: {
        title: "Atención Médica",
        icon: Building,
        items: [
            { label: "Línea gratuita", value: "0800-836.36.33", href: "tel:08008363633" },
            { label: "Teléfono local", value: "0212-822.12.50", href: "tel:02128221250" },
            { label: "Teléfono local", value: "0212-313.55.67", href: "tel:02123135567" },
        ]
    },
    centroContacto: {
        title: "Centro de Contacto (24H)",
        icon: Phone,
        items: [
            { label: "Teléfono", value: "0500-7258300", href: "tel:05007258300" },
        ]
    },
    mensajeria: {
        title: "Mensajería Instantánea",
        icon: WhatsAppIcon,
        items: [
            { label: "WhatsApp", value: "0424-CONTIGO", href: "https://wa.me/584242668446" },
        ]
    },
    gestionDigital: {
        title: "Gestión Digital",
        icon: Laptop,
        items: [
            { label: "Portal Autogestión", value: "Banesco SegurOnline", href: "#" },
            { label: "Redes Sociales", value: "@banescoseguros", href: "#" },
        ]
    }
}


export const HcmCard = ({ 
    type, 
    icon: Icon, 
    title, 
    description, 
    buttonText, 
    badgeText, 
    badgeIcon: BadgeIcon,
    imageUrl, 
    dataAiHint,
    href = "#"
}: HcmCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);

  if (type === 'main') {
    return (
        <div className="relative [perspective:1000px] min-h-[550px] w-full">
            <div className={cn("relative w-full h-full transform-style-3d transition-transform duration-700", isFlipped ? "rotate-y-180" : "")}>
                {/* Front of the card */}
                <div className="absolute w-full h-full backface-hidden">
                    <Card className="bg-primary text-primary-foreground rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-8 h-full">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                            <Icon className="h-8 w-8" />
                        </div>
                        <p className="text-sm text-primary-foreground/80">{description}</p>
                        <h3 className="text-4xl md:text-5xl font-bold my-2">{title}</h3>
                        <div className="flex gap-4 mt-4">
                            <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90 font-light">
                                <Link href="/dashboard/hcm">{buttonText}</Link>
                            </Button>
                            <Button onClick={() => setIsFlipped(true)} variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white font-light">
                                Contacto
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                     <Card className="bg-primary text-primary-foreground rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 h-full">
                        <div className='absolute top-6 left-6 text-left'>
                            <h3 className="text-xl font-bold">Contacto de Emergencia</h3>
                            <p className="text-primary-foreground/80 text-xs max-w-xs">Comunícate con nosotros para reportar siniestros o solicitar atención médica inmediata.</p>
                        </div>
                        
                        <div className="w-full max-w-md space-y-4 pt-16">
                            {Object.values(contactInfo).map((category) => {
                                const CategoryIcon = category.icon;
                                return (
                                <div key={category.title} className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center">
                                       <CategoryIcon className="h-4 w-4" />
                                    </div>
                                    <div className='text-left'>
                                        <p className="font-semibold text-sm">{category.title}</p>
                                        <div className='text-xs text-primary-foreground/80 space-y-0.5'>
                                            {category.items.map(item => (
                                                <a key={item.value} href={item.href} target="_blank" rel="noopener noreferrer" className="block hover:text-white transition-colors">
                                                    {item.label}: <span className='font-medium'>{item.value}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )})}
                        </div>
                        
                        <Button onClick={() => setIsFlipped(false)} variant="ghost" className="mt-8 text-white hover:text-white hover:bg-white/10 absolute bottom-6">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
  }

  return (
    <Card className="group relative rounded-2xl overflow-hidden shadow-lg min-h-[550px] flex flex-col justify-between">
      {imageUrl && (
        <Image 
          src={imageUrl} 
          alt={title} 
          layout="fill" 
          objectFit="cover" 
          data-ai-hint={dataAiHint}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/50"></div>
      <CardContent className="relative z-10 p-6 text-white flex flex-col h-full">
        <div className="flex justify-between items-start">
            {badgeText && (
            <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-sm">
                {BadgeIcon && <BadgeIcon className="mr-1.5 h-3 w-3" />}
                {badgeText}
            </Badge>
            )}
            <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm ml-auto">
                <Icon className="h-4 w-4 text-white"/>
            </div>
        </div>
        <div className="mt-auto">
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-sm text-white/80 mt-1 mb-4">{description}</p>
            <Button asChild variant="default" className="font-light text-xs">
              <Link href={href} target="_blank" rel="noopener noreferrer">
                  {buttonText}
              </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
