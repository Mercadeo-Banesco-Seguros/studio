
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, ShieldCheck, FileText, Stethoscope, Search, MessageSquare, Phone, Mail, HelpCircle, FilePlus2, Receipt } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import Image from 'next/image';

const hcmActions = [
    {
        title: "Solicitar Clave de Emergencia",
        description: "Genera una clave para atención médica inmediata en caso de emergencia.",
        icon: FilePlus2,
        href: "https://www.banesconline.com/rw/personas/solicitud-de-cartas-avales-y-claves-de-emergencia",
        bgColor: "bg-red-50",
        iconColor: "text-red-600"
    },
    {
        title: "Gestionar Reembolsos",
        description: "Sube tus facturas y sigue el estado de tus solicitudes de reembolso.",
        icon: Receipt,
        href: "https://www.banesconline.com/rw/personas/solicitud-de-reembolsos",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        title: "Buscar Proveedores",
        description: "Encuentra médicos, clínicas y farmacias en nuestra red de afiliados.",
        icon: Search,
        href: "https://www.banesconline.com/rw/seguros/directorio-de-clinicas-y-medicos",
        bgColor: "bg-green-50",
        iconColor: "text-green-600"
    },
    {
        title: "Consultar Cobertura",
        description: "Revisa los detalles, límites y beneficios de tu póliza de salud.",
        icon: FileText,
        href: "https://www.banesconline.com/rw/seguros/condiciones-generales-y-particulares",
        bgColor: "bg-indigo-50",
        iconColor: "text-indigo-600"
    }
];

const faqItems = [
    {
        value: "item-1",
        question: "¿Qué debo hacer en caso de una emergencia médica?",
        answer: "En una emergencia, dirígete a la clínica afiliada más cercana y presenta tu cédula de identidad. Luego, contacta a nuestro centro de atención telefónica al 0500-7258300 o vía WhatsApp al 0424-2668446 para solicitar la clave de emergencia."
    },
    {
        value: "item-2",
        question: "¿Cómo solicito un reembolso por gastos médicos?",
        answer: "Puedes solicitar un reembolso a través de nuestro portal en línea. Accede a la sección 'Gestionar Reembolsos', completa el formulario y adjunta los informes médicos y facturas correspondientes. El tiempo de procesamiento es de aproximadamente 15 a 20 días hábiles."
    },
    {
        value: "item-3",
        question: "¿Puedo atenderme en una clínica que no está en la red?",
        answer: "Sí, puedes atenderte en una clínica no afiliada, pero deberás pagar los gastos y luego solicitar un reembolso. Ten en cuenta que el monto del reembolso se ajustará al baremo (lista de precios) establecido en tu póliza."
    },
     {
        value: "item-4",
        question: "¿Qué documentos necesito para solicitar una carta aval?",
        answer: "Para una carta aval, generalmente necesitarás: informe médico detallado, presupuesto de la clínica, resultados de exámenes previos, y tu cédula de identidad. Puedes gestionar la solicitud a través del portal de autogestión."
    }
];

const contactMethods = [
    {
        icon: Phone,
        title: "Central Telefónica",
        details: "0500-SALUD-00 (0500-7258300)",
        href: "tel:05007258300"
    },
    {
        icon: MessageSquare,
        title: "WhatsApp",
        details: "0424-CONTIGO (2668446)",
        href: "https://wa.me/584242668446"
    },
    {
        icon: Mail,
        title: "Correo Electrónico",
        details: "servicios@banescoseguros.com",
        href: "mailto:servicios@banescoseguros.com"
    }
]

export default function HcmPage() {
    return (
        <div className="container mx-auto py-8 px-4 space-y-12">
            <div className="mb-8">
                <Button asChild variant="link" className="text-muted-foreground hover:no-underline p-0 h-auto text-xs">
                    <Link href="/dashboard" className="flex items-center gap-2 group">
                        <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al Inicio</span>
                    </Link>
                </Button>
            </div>
            
            <Card className="relative rounded-2xl overflow-hidden shadow-lg bg-primary text-primary-foreground">
                 <div className="p-8 md:p-12 relative z-10 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <Badge variant="secondary" className="bg-white/20 backdrop-blur-sm mb-4">Póliza Colectiva de Salud</Badge>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Gestión de Póliza HCM</h1>
                        <p className="mt-4 text-white/80 max-w-lg">
                            Bienvenido a tu centro de gestión de la póliza de Hospitalización, Cirugía y Maternidad. Aquí encontrarás todo lo que necesitas para administrar tu salud de forma rápida y sencilla.
                        </p>
                    </div>
                     <div className="relative h-64 w-full hidden md:flex items-center justify-center">
                         <Image
                            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(44).png?raw=true"
                            alt="Gestión de Póliza HCM"
                            layout="fill"
                            objectFit="contain"
                            data-ai-hint="health insurance"
                            className="drop-shadow-2xl"
                        />
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {hcmActions.map((action) => (
                    <Link href={action.href} key={action.title} target="_blank" rel="noopener noreferrer" className="block group">
                        <Card className="h-full rounded-2xl border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-muted/50">
                            <CardContent className="p-6">
                                <div className={cn("flex items-center justify-center h-12 w-12 rounded-xl mb-6", action.bgColor)}>
                                    <action.icon className={cn("h-6 w-6", action.iconColor)} />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-foreground">{action.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{action.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start pt-12">
                 <div>
                    <div className="flex items-center gap-3 mb-4">
                       <div className="p-2.5 bg-muted rounded-md w-fit">
                           <HelpCircle className="h-5 w-5 text-primary" />
                       </div>
                       <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                        {faqItems.map(item => (
                            <AccordionItem key={item.value} value={item.value} className="border-b">
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <Card className="bg-muted/50 p-8 rounded-2xl">
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl font-bold">Contacto de Emergencia</CardTitle>
                        <CardDescription>Guarda estos números. Estamos para ayudarte 24/7.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                       {contactMethods.map((method) => {
                         const Icon = method.icon;
                         return (
                            <a href={method.href} target="_blank" rel="noopener noreferrer" key={method.title} className="flex items-center gap-4 p-4 rounded-lg bg-background hover:bg-primary/5 transition-colors">
                                <Icon className="h-6 w-6 text-primary flex-shrink-0" />
                                <div>
                                    <p className="font-semibold">{method.title}</p>
                                    <p className="text-sm text-muted-foreground">{method.details}</p>
                                </div>
                            </a>
                         )
                       })}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
