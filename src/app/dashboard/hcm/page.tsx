
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, ShieldCheck, FileText, Stethoscope, Search, MessageSquare, Phone, Mail, HelpCircle, FilePlus2, Receipt } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

const coverageData = [
  { service: "Hospitalización y Cirugía", coverage: "1.500$ por patología" },
  { service: "Maternidad", coverage: "1.500$" },
  { service: "Atención Primaria de Salud (APS)", coverage: "12 órdenes anuales (3 órdenes mensuales no acumulativas) ó 1.000$" },
  { service: "Retiro de Medicamentos (Telemedi)", coverage: "12 órdenes anuales (2 órdenes mensuales no acumulativas) ó 1.000$" },
  { service: "Servicios Odontológicos", coverage: "Se activa por evento" },
  { service: "Servicios Oftalmológicos", coverage: "Se activa por evento" },
  { service: "Servicios Funerarios", coverage: "1.000$" },
  { service: "Telemedicina", coverage: "Ilimitada" },
  { service: "Atención Médica Domiciliaria", coverage: "Ilimitada" },
];

const coveredPathologies = [
    { category: "Cardiovasculares y Respiratorias", items: ["Infarto", "Crisis hipertensiva", "Dolor torácico", "Crisis asmática", "EPOC / EBOC (Descompensado)", "Arritmias cardíacas / Trastornos del ritmo cardíaco"] },
    { category: "Traumatismos y Lesiones", items: ["Politraumatismos", "Traumatismo de tórax", "Fracturas cerradas o simples", "Fracturas abiertas", "Fracturas desplazadas", "Luxaciones", "Quemaduras", "Heridas (no incluyen las ocasionadas por armas de fuego)", "Traumatismos y/o lesiones oculares (por sustancias químicas o cuerpos extraños)", "Traumatismos (general)", "Amputaciones por accidentes o enfermedad"] },
    { category: "Abdominales y Gastrointestinales", items: ["Apendicitis", "Peritonitis", "Obstrucción intestinal", "Litiasis renal / Cólicos nefríticos", "Litiasis vesicular / Cálculos biliares (episodio agudo)", "Colitis ulcerosa", "Infecciones intestinales", "Hemorragia digestiva inferior o superior", "Síndromes diarreicos en menores hasta 12 años y adultos a partir de 60 años", "Intolerancia a la vía oral - Deshidratación moderada a severa"] },
    { category: "Gineco-Obstétricas", items: ["Embarazo ectópico roto", "Sangrados genitales", "Abortos espontáneos"] },
    { category: "Neurológicas y Sistémicas", items: ["ACV / ECV", "Meningitis", "Síncopes / Desmayos / Pérdida del conocimiento / Confusiones / Convulsiones", "Síndromes febriles en menores hasta doce años", "Síndromes metabólicos / Diabetes descompensada"] },
    { category: "Otras Patologías y Urgencias", items: ["Otitis en menores hasta doce años", "Intoxicaciones alimentarias que dificulten la respiración", "Envenenamientos", "Obstrucción de la vía aérea por cuerpo extraño / Dificultad para respirar / Asfixia", "Trombosis venosa profunda / Lesiones vasculares (arteriales y/o venosas)", "Celulitis periorbitaria", "COVID-19 (2do y 3er nivel)", "Hernias atascadas (umbilicales, inguinales y crurales)", "Retención aguda de orina", "Infecciones urinarias en menores de 12 años y en adultos mayores de 60 años"] },
];

const dentalProtocolSteps = [
    {
        step: "01",
        color: "text-blue-600",
        description: <>Escribe a través del <span className="font-bold">Whatsapp al 0424-127.14.22</span>, para recibir el menú y marca la <span className="font-bold">opción 2 "Solicitud de Cita"</span>, luego marca el número de la especialidad "Odontología" e indica tus datos para el registro de tu solicitud.</>
    },
    {
        step: "02",
        color: "text-purple-600",
        description: <>Recibirás un listado de centros odontológicos <span className="font-bold">selecciona el de tu preferencia</span> y <span className="font-bold">llama directamente al centro</span> para solicitar una cita.</>
    },
    {
        step: "03",
        color: "text-sky-500",
        description: <>Luego de coordinar la cita, escribe nuevamente al Whatsapp (0424-127.14.22) y marca la <span className="font-bold">opción 3 "Generar Orden de Atención"</span>, completa los datos solicitados (centro de atención, nombre del odontólogo, fecha y hora de la cita, tipo de orden de atención (emergencia, tratamiento)) y listo, recibirás la orden de atención.</>
    }
];

const medicineRequestSteps = [
    {
        step: "01",
        color: "text-blue-600",
        description: <>Ingresa al portal con tu cédula o correo y la contraseña inicial (Telemed*23 con la T mayúscula) y selecciona en el menú izquierdo <span className="font-bold">“Medicamentos Póliza”</span></>
    },
    {
        step: "02",
        color: "text-purple-600",
        description: <>Da clic en <span className="font-bold">“Nueva Solicitud de Medicamentos”</span> y completa todos los datos solicitados</>
    },
    {
        step: "03",
        color: "text-sky-500",
        description: (
            <>
                Deberás cargar los documentos requeridos (Estos soportes deben estar en formato PDF.):
                <ul className="list-disc pl-5 mt-2">
                    <li>Cédula de identidad</li>
                    <li>Informe médico</li>
                    <li>Récipe e indicaciones</li>
                    <li>Partida de nacimiento en caso de menor de edad.</li>
                </ul>
            </>
        )
    },
    {
        step: "04",
        color: "text-indigo-600",
        description: <>Una vez cargados todos los datos y requisitos da clic a <span className="font-bold">“Guardar”</span>. Podrás ver el registro de la solicitud en la página de inicio de la sección “Medicamentos póliza” para validar el estatus.</>
    },
    {
        step: "05",
        color: "text-teal-600",
        description: <>Una vez aprobada tu solicitud serás contactado para la coordinar la entrega de los medicamentos o en caso de <span className="font-bold">antibóticos</span>, recibirás las indicaciones de retiro en la farmacia indicada más cercana.</>
    },
];

const avalRequestSteps = [
    {
        step: "01",
        color: "text-blue-600",
        description: <>Presiona la opción <span className="font-bold">"Notificación Siniestros"</span> en el menú que está del lado izquierdo, selecciona la opción <span className="font-bold">"Personas"</span>, y luego <span className="font-bold">"Carta Aval"</span>.</>
    },
    {
        step: "02",
        color: "text-purple-600",
        description: <>Selecciona el beneficiario al que corresponda el siniestro y pulsa <span className="font-bold">"Siguiente"</span>.</>
    },
    {
        step: "03",
        color: "text-sky-500",
        description: <>Complete los campos con la información solicitada (detalles del siniestro, datos de medico tratante, datos de contacto y estatus de COVID 19).</>
    },
    {
        step: "04",
        color: "text-indigo-600",
        description: <>Carga los archivos solicitados y selecciona <span className="font-bold">"Siguiente"</span>. Verifica la información registrada y presiona <span className="font-bold">"Editar"</span> en caso de error o <span className="font-bold">"Notificar"</span> en caso de estar de acuerdo.</>
    },
    {
        step: "05",
        color: "text-teal-600",
        description: <>Verifica el número del siniestro. Para finalizar presiona <span className="font-bold">"Aceptar"</span>.</>
    },
];

const reimbursementRequestSteps = [
    {
        step: "01",
        color: "text-blue-800",
        description: <>Presiona la opción <span className="font-bold">"Notificación Siniestros"</span> en el menú que está del lado izquierdo, selecciona la opción <span className="font-bold">"Personas"</span>, y luego <span className="font-bold">"Reembolso"</span>.</>
    },
    {
        step: "02",
        color: "text-purple-600",
        description: <>Selecciona el beneficiario al que corresponda el siniestro y pulsa <span className="font-bold">"Siguiente"</span>.</>
    },
    {
        step: "03",
        color: "text-purple-400",
        description: <>Complete los campos con la información solicitada (detalles del siniestro, datos de medico tratante, datos de contacto y estatus de COVID 19).</>
    },
    {
        step: "04",
        color: "text-sky-500",
        description: <>Selecciona la cuenta domiciliada. En caso de no tenerla o requerir modificación, completa los campos indicados. Presiona <span className="font-bold">"Siguiente"</span> para continuar.</>
    },
    {
        step: "05",
        color: "text-indigo-600",
        description: <>Carga los archivos solicitados y selecciona <span className="font-bold">"Siguiente"</span>. Verifica la información registrada y presiona <span className="font-bold">"Editar"</span> en caso de error o <span className="font-bold">"Notificar"</span> en caso de estar de acuerdo.</>
    },
    {
        step: "06",
        color: "text-blue-800",
        description: <>Verifica el número del siniestro. Para finalizar presiona <span className="font-bold">"Aceptar"</span>.</>
    }
];

const StepDiagram = ({ steps, StepComponent }: { steps: any[], StepComponent: React.ElementType }) => (
    <div className="space-y-12">
        {steps.map((step, index) => (
            <StepComponent
                key={step.step}
                step={step.step}
                color={step.color}
                description={step.description}
                isLast={index === steps.length - 1}
            />
        ))}
    </div>
);


const DentalProtocolStep = ({ step, color, description, isLast }: { step: string; color: string; description: React.ReactNode; isLast: boolean }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 flex items-center">
            <div className={cn("text-3xl font-bold", color)}>{step}</div>
            <div className={cn("w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px]", color.replace("text-", "border-l-"))}></div>
        </div>
        {!isLast && <div className="absolute left-4 top-12 bottom-[-2rem] w-0.5 bg-border -translate-x-1/2"></div>}
        <p className="text-sm text-muted-foreground pt-1">{description}</p>
    </div>
);

const MedicineRequestStep = ({ step, color, description, isLast }: { step: string; color: string; description: React.ReactNode; isLast: boolean }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 flex items-center">
            <div className={cn("text-3xl font-bold", color)}>{step}</div>
            <div className={cn("w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px]", color.replace("text-", "border-l-"))}></div>
        </div>
        {!isLast && <div className="absolute left-4 top-12 bottom-[-2rem] w-0.5 bg-border -translate-x-1/2"></div>}
        <div className="text-sm text-muted-foreground pt-1">{description}</div>
    </div>
);

const AvalRequestStep = ({ step, color, description, isLast }: { step: string; color: string; description: React.ReactNode; isLast: boolean }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 flex items-center">
            <div className={cn("text-3xl font-bold", color)}>{step}</div>
            <div className={cn("w-0 h-0 border-y-[18px] border-y-transparent border-l-[18px]", color.replace("text-", "border-l-"))}></div>
        </div>
        {!isLast && <div className="absolute left-4 top-12 bottom-[-2rem] w-0.5 bg-border -translate-x-1/2"></div>}
        <div className="text-sm text-muted-foreground pt-1">{description}</div>
    </div>
);

const ReimbursementRequestStep = ({ step, color, description, isLast }: { step: string; color: string; description: React.ReactNode; isLast: boolean }) => (
    <div className="relative pl-16">
        <div className="absolute left-0 top-0 flex items-center">
             <div className={cn("flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold text-white", color.replace('text-', 'bg-'))}>{step}</div>
        </div>
        {!isLast && <div className="absolute left-5 top-12 bottom-[-2rem] w-px bg-border -translate-x-1/2"></div>}
        <div className="text-sm text-muted-foreground pt-2.5">{description}</div>
    </div>
);


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

            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Cobertura de la Póliza Básica</CardTitle>
                        <CardDescription>Resumen de los beneficios y límites de tu plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">Servicio</TableHead>
                                    <TableHead>Cobertura</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {coverageData.map((item) => (
                                    <TableRow key={item.service}>
                                        <TableCell className="font-medium">{item.service}</TableCell>
                                        <TableCell>{item.coverage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
              </div>
              <div className="md:col-span-2">
                <div className="relative h-full w-full min-h-[300px] rounded-2xl overflow-hidden">
                   <Image 
                      src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(44).png?raw=true"
                      alt="Salud y bienestar"
                      layout="fill"
                      objectFit="contain"
                      data-ai-hint="health wellbeing"
                      className="drop-shadow-2xl"
                    />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8 items-start pt-8">
                <div className="md:col-span-2 md:order-2">
                    <div className="relative h-full w-full min-h-[300px] rounded-2xl overflow-hidden">
                        <Image 
                            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxkb2N0b3J8ZW58MHx8fHwxNzYzMjAwOTk4fDA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Doctor revisando documentos"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="doctor documents"
                            className="rounded-2xl"
                        />
                    </div>
                </div>
                <div className="md:col-span-3 md:order-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Patologías de Emergencias Médicas Cubiertas</CardTitle>
                            <CardDescription>Aquí tienes la lista de las patologías cubiertas por la Póliza de urgencias y emergencias médicas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Categoría</TableHead>
                                        <TableHead>Patologías Cubiertas</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {coveredPathologies.map((category) => (
                                        <TableRow key={category.category}>
                                            <TableCell className="font-medium align-top">{category.category}</TableCell>
                                            <TableCell>
                                                <ul className="list-disc pl-5 space-y-1">
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

            <Card className="mt-12">
                <CardHeader>
                    <CardTitle>Cobertura y protocolo de Atención Odontológica</CardTitle>
                    <CardDescription>
                        Tu póliza básica HCM te brinda cobertura de servicio odontológico en los siguientes casos. <Link href="#" className="text-primary underline">Clic aquí</Link> para ver cobertura.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="font-semibold text-foreground mb-8">Sigue estos sencillos pasos para solicitar tu cita:</p>
                    <StepDiagram steps={dentalProtocolSteps} StepComponent={DentalProtocolStep} />
                </CardContent>
            </Card>

            <Card className="mt-12">
                <CardHeader>
                    <CardTitle>Paso a paso para la Solicitud de Medicinas</CardTitle>
                    <CardDescription>
                        En la página web de nuestro aliado Telemedi podrán ingresar al portal para <span className="font-bold text-primary">solicitar la entrega de medicamentos</span> en cualquier momento, <span className="font-bold text-primary">cargando los requisitos</span> para registrar la solicitud. Una vez aprobada, serán contactados para coordinar la entrega a través de delivery o en farmacia cercana en caso de medicamentos que requieren récipe físico para su entrega. Adicionalmente, nuestra app permite <span className="font-bold text-primary">solicitar la atención médica inicial por videollamada, en caso de malestar o emergencia</span>.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <StepDiagram steps={medicineRequestSteps} StepComponent={MedicineRequestStep} />
                     <p className="text-center text-xs text-muted-foreground mt-12">
                        En caso de presentar error o problemas puedes comunicarte al Call Center de Telemedi al 0212-287.9261 / 0212-287.9262 / 02128195301.99.19.
                    </p>
                </CardContent>
            </Card>

            <Card className="mt-12">
                <CardHeader>
                    <CardTitle>Paso a Paso para la Solicitud de Carta Aval</CardTitle>
                    <CardDescription>
                        Ingresa a Banesco SegurOnline y sigue estos sencillos pasos:
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <StepDiagram steps={avalRequestSteps} StepComponent={AvalRequestStep} />
                </CardContent>
            </Card>

             <Card className="mt-12">
                <CardHeader>
                    <CardTitle>Paso a Paso para Solicitud de Reembolsos</CardTitle>
                    <CardDescription>
                        Ingresa a Banesco SegurOnline y sigue estos sencillos pasos:
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <StepDiagram steps={reimbursementRequestSteps} StepComponent={ReimbursementRequestStep} />
                </CardContent>
            </Card>


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

    