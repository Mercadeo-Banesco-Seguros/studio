
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MessageSquare, Phone, Mail, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import imageData from '@/app/lib/placeholder-images.json';

const slides = [
    {
      id: 1,
      title: "Conoce Nuestra Póliza de Salud!",
      gradient: 'bg-gradient-to-r from-[#345cff] to-[#c1caf1]',
      imageUrl: imageData.images.find(img => img.id === 'hcm-shield')?.url || '',
      dataAiHint: 'health shield',
      textOrder: 'md:order-1',
      imageOrder: 'md:order-2',
      imageClassName: 'w-[500px] h-[500px]'
    },
    {
      id: 2,
      title: "Gestiona tu salud de forma rápida y sencilla.",
      gradient: 'bg-gradient-to-l from-[#345cff] to-[#c1caf1]',
      imageUrl: imageData.images.find(img => img.id === 'hcm-digital')?.url || '',
      dataAiHint: 'digital health',
      textOrder: 'md:order-2',
      imageOrder: 'md:order-1',
      imageClassName: 'w-[480px] h-[480px] translate-y-24'
    },
];


const hcmActions = [
    {
        title: "Solicitar Medicinas",
        description: "Solicita el envío de tus medicamentos a domicilio o farmacia.",
        imageUrl: imageData.images.find(img => img.id === 'hcm-meds')?.url || '',
        href: "#",
    },
    {
        title: "Buscar Proveedores",
        description: "Encuentra médicos y clínicas en nuestra red de afiliados.",
        imageUrl: imageData.images.find(img => img.id === 'hcm-providers')?.url || '',
        href: "https://www.banesconline.com/rw/seguros/directorio-de-clinicas-y-medicos",
    },
    {
        title: "Consultar Cobertura",
        description: "Revisa los detalles y beneficios de tu póliza de salud.",
        imageUrl: imageData.images.find(img => img.id === 'hcm-coverage')?.url || '',
        href: "https://www.banesconline.com/rw/seguros/condiciones-generales-y-particulares",
    },
    {
        title: "Calculadora de Excesos",
        description: "Calcula los montos excedentes de tus gastos médicos.",
        imageUrl: imageData.images.find(img => img.id === 'hcm-calculator')?.url || '',
        href: "#",
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
        details: "0500-7258300",
        href: "tel:05007258300"
    },
    {
        icon: MessageSquare,
        title: "WhatsApp",
        details: "0424-2668446",
        href: "https://wa.me/584242668446"
    },
    {
        icon: Mail,
        title: "Correo Electrónico",
        details: "servicios@banescoseguros.com",
        href: "mailto:servicios@banescoseguros.com"
    }
]

const allCoverageItems = [
  { amount: "USD 3000", service: "Hospitalización y Cirugía" },
  { amount: "USD 2000", service: "Maternidad" },
  { amount: "USD 1000", service: "Atención Primaria Salud", note: "(12 Órdenes Anuales o 3 Órdenes Mensuales No Acumulativas)" },
  { amount: "USD 1000", service: "Retiro Medicamentos", note: "(12 Órdenes Anuales o 2 Órdenes Mensuales No Acumulativas)" },
  { amount: "Por evento", service: "Servicios Odontológicos" },
  { amount: "Por evento", service: "Retiro Medicamentos" },
  { amount: "USD 1000", service: "Servicios Funerarios" },
  { amount: "Ilimitado", service: "Telemedicina" },
  { amount: "Ilimitado", service: "Atención Domiciliaria" },
];

const coveredPathologies = [
    { category: "Cardiovasculares y Respiratorias", items: ["Infarto", "Crisis hipertensiva", "Dolor torácico", "Crisis asmática", "EPOC / EBOC (Descompensado)", "Arritmias cardíacas / Trastornos del ritmo cardíaco"] },
    { category: "Traumatismos y Lesiones", items: ["Politraumatismos", "Traumatismo de tórax", "Fracturas cerradas o simples", "Fracturas abiertas", "Fracturas desplazadas", "Luxaciones", "Quemaduras", "Heridas (no incluyen las ocasionadas por armas de fuego)", "Traumatismos y/o lesiones oculares (por sustancias químicas o cuerpos extraños)", "Traumatismos (general)", "Amputaciones por accidentes o enfermedad"] },
    { category: "Abdominales y Gastrointestinales", items: ["Apendicitis", "Peritonitis", "Obstrucción intestinal", "Litiasis renal / Cólicos nefríticos", "Litiasis vesicular / Cálculos biliares (episodio agudo)", "Colitis ulcerosa", "Infecciones intestinales", "Hemorragia digestiva inferior o superior", "Síndromes diarreicos en menores hasta 12 años y adultos a partir de 60 años", "Intolerancia a la vía oral - Deshidratación moderada a severa"] },
    { category: "Gineco-Obstétricas", items: ["Embarazo ectópico roto", "Sangrados genitales", "Abortos espontáneos"] },
    { category: "Neurológicas y Sistémicas", items: ["ACV / ECV", "Meningitis", "Síncopes / Desmayos / Pérdida del conocimiento / Confusiones / Convulsiones", "Síndromes febriles en menores hasta doce años", "Síndromes metabólicos / Diabetes descompensada"] },
    { category: "Otras Patologías y Urgencias", items: ["Otitis en menores hasta doce años", "Intoxicaciones alimentarias que dificulten la respiración", "Envenenamientos", "Obstrucción de la vía aérea por cuerpo extraño / Dificultad para respirar / Asfixia", "Trombosis venosa profunda / Lesiones vasculares (arteriales y/o venosas)", "Celulitis periorbitaria", "COVID-19 (2do y 3er nivel)", "Hernias atascadas (umbilicales, inguinales y crurales)", "Retención aguda de orina", "Infecciones urinarias en menores de 12 años y en adultos mayores de 60 años"] },
];

const StepCard = ({ step, title, color, description }: { step: string; title: string; color: string; description: React.ReactNode }) => (
    <div className="relative pl-12 pb-8">
        <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full bg-muted border">
            <span className={cn("text-sm font-bold", color)}>{step}</span>
        </div>
        <div className="absolute left-4 top-10 bottom-0 w-px bg-border -translate-x-1/2"></div>
        <h4 className="font-semibold text-foreground text-base">{title}</h4>
        <div className="text-sm text-muted-foreground mt-1">{description}</div>
    </div>
);


export default function HcmPage() {
    const [activeSlide, setActiveSlide] = useState(0);
    const oftalmologicaCoverageItems = [
      { amount: '100%', service: 'Consulta Oftalmológica' },
      { amount: '100%', service: 'Consulta Subespecialista' },
      { amount: '100%', service: 'Consulta Oftalmológica Sucesiva' },
      { amount: '100%', service: 'Emergencia general' },
      { amount: '100%', service: 'Emergencia con procedimiento' },
      { amount: '100%', service: 'Emergencia causada a terceros' },
      { amount: '100%', service: 'Emergencia con procedimiento causado a terceros' },
      { amount: 'USD 40', service: 'Lentes Correctivos', note: '(Cristales o Cristales y Montura)' },
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-background">
            <header className="relative w-full h-[500px] text-white overflow-hidden">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={cn(
                            'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
                            slide.gradient,
                            activeSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        )}
                    >
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full grid md:grid-cols-2 items-center">
                            <div className={cn("text-left", slide.textOrder)}>
                                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
                                    {slide.title}
                                </h1>
                            </div>
                            <div className={cn("relative h-full w-full hidden md:flex items-center justify-center", slide.imageOrder)}>
                                 {slide.imageUrl && (
                                     <div className={cn("relative", slide.imageClassName)}>
                                         <Image
                                            src={slide.imageUrl}
                                            alt={String(slide.dataAiHint) || 'HCM Banner Image'}
                                            layout="fill"
                                            objectFit="contain"
                                            data-ai-hint={slide.dataAiHint}
                                            priority={index === 0}
                                        />
                                     </div>
                                 )}
                            </div>
                        </div>
                    </div>
                ))}
            </header>
            
            <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-24">
                
                <section>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {hcmActions.map((action) => (
                            <Link href={action.href} key={action.title} target="_blank" rel="noopener noreferrer" className="block group">
                                <Card className="h-full rounded-2xl border-border/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary">
                                    <CardContent className="p-6 text-center">
                                        <div className="relative h-20 w-20 mx-auto mb-6">
                                            <Image
                                                src={action.imageUrl}
                                                alt={action.title}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <h3 className="font-bold text-lg tracking-tight mb-2 text-foreground">{action.title}</h3>
                                        <p className="text-sm leading-relaxed text-muted-foreground">{action.description}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
                
                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Cobertura de la <br /> Póliza Básica
                            </h2>
                        </div>
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:pl-16">
                            {allCoverageItems.map((item, index) => (
                                <div key={`coverage-${index}`}>
                                    <p className="text-3xl font-extrabold tracking-tighter text-foreground">{item.amount}</p>
                                    <p className="text-sm text-muted-foreground">{item.service}</p>
                                    {item.note && <p className="text-xs text-muted-foreground/80 mt-1">{item.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Cobertura Oftalmológica
                            </h2>
                            <p className="text-muted-foreground mt-4">Toda la cobertura de consultas y emergencias mencionada a continuación es al 100%.</p>
                        </div>
                         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12 lg:pl-16">
                            {oftalmologicaCoverageItems.map((item, index) => (
                                <div key={`oftalmologica-coverage-${index}`}>
                                    <p className="text-3xl font-extrabold tracking-tighter text-foreground">{item.amount}</p>
                                    <p className="text-sm text-muted-foreground">{item.service}</p>
                                    {item.note && <p className="text-xs text-muted-foreground/80 mt-1">{item.note}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid lg:grid-cols-3 gap-8 xl:gap-16 items-start">
                        <div className="lg:col-span-1">
                            <h2 className="text-5xl font-extrabold tracking-tighter leading-none text-primary">
                                Patologías de Emergencias Cubiertas
                            </h2>
                            <p className="text-muted-foreground mt-4">Lista de patologías cubiertas por la Póliza de urgencias y emergencias médicas.</p>
                        </div>
                        <div className="lg:col-span-2 lg:pl-16">
                            <Card className="rounded-2xl shadow-sm bg-muted overflow-hidden">
                                <CardContent className="p-0">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[250px] p-6">Categoría</TableHead>
                                                <TableHead className="p-6">Patologías Cubiertas</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {coveredPathologies.map((category) => (
                                                <TableRow key={category.category} className="last:border-b-0">
                                                    <TableCell className="font-medium align-top p-6">{category.category}</TableCell>
                                                    <TableCell className="p-6">
                                                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                                                            {category.items.map((item) => (
                                                                <li key={item}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>


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
        </div>
    );
}
