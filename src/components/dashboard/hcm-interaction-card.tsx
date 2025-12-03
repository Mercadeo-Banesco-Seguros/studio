
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Phone, MessageSquare as WhatsAppIcon, Mail } from 'lucide-react';
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
}

const AnimatedContactButton = ({ href, type, label, number, icon: Icon, className, iconClassName }: {
  href: string;
  type: 'whatsapp' | 'phone' | 'email';
  label: string;
  number: string;
  icon: React.ElementType;
  className: string;
  iconClassName: string;
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative flex w-[280px] items-center justify-start rounded-full p-2 text-white shadow-lg transition-all duration-300 hover:brightness-110 overflow-hidden h-[56px] group",
        className
      )}
    >
      <div className="pl-4 transition-opacity duration-200">
        <p className="text-[10px]">{label}</p>
        <p className={cn("font-semibold", type === 'email' ? "text-[11px]" : "text-xs")}>{number}</p>
      </div>

      <div
        className={cn(
          "absolute top-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-transform duration-300 ease-in-out",
          "transform -translate-y-1/2 right-2 group-hover:scale-110",
        )}
      >
         <Icon className={cn("h-4 w-4", iconClassName)} />
      </div>
    </Link>
  );
};


export const HcmCard = ({ 
    type, 
    icon: Icon, 
    title, 
    description, 
    buttonText, 
    badgeText, 
    badgeIcon: BadgeIcon,
    imageUrl, 
    dataAiHint 
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
                                <Link href="#">{buttonText}</Link>
                            </Button>
                            <Button onClick={() => setIsFlipped(true)} variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white font-light">
                                Contacto
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Back of the card */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180">
                     <Card className="bg-primary text-primary-foreground rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-8 h-full">
                        <h3 className="text-3xl font-bold">Contacto de Emergencia</h3>
                        <p className="text-primary-foreground/80 mt-2 mb-8">Comunícate con nosotros para reportar siniestros o solicitar atención médica inmediata.</p>
                        
                        <div className="space-y-4">
                            <AnimatedContactButton
                                href="https://wa.me/584142398416"
                                type="whatsapp"
                                label="Soporte 24/7"
                                number="(0414) 239.84.16"
                                icon={WhatsAppIcon}
                                className="bg-[#25D366]"
                                iconClassName="text-[#25D366]"
                            />
                            <AnimatedContactButton
                                href="tel:08007348767"
                                type="phone"
                                label="Llamada Gratuita"
                                number="0-800-SEGUROS"
                                icon={Phone}
                                className="bg-[#3b82f6]"
                                iconClassName="text-[#3b82f6]"
                            />
                             <AnimatedContactButton
                                href="mailto:servicios@banescoseguros.com"
                                type="email"
                                label="Correo Electrónico"
                                number="servicios@banescoseguros.com"
                                icon={Mail}
                                className="bg-slate-500"
                                iconClassName="text-slate-500"
                            />
                        </div>

                        <Button onClick={() => setIsFlipped(false)} variant="ghost" className="mt-8 text-white hover:text-white hover:bg-white/10">
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
            <Button asChild variant="ghost" className="font-light text-xs bg-white/20 text-white backdrop-blur-sm hover:bg-white/30">
              <Link href="#">
                  {buttonText}
              </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
