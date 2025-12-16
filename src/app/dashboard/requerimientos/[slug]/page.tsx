

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { mockDepartments } from "@/lib/placeholder-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Mail, Phone, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';


const renderDepartmentContent = (department: (typeof mockDepartments)[0]) => {
  const defaultIcon = department.icon || AlertTriangle;
  
  if (department.id === 'pmo') {
    return (
        <div>
            <p className="text-primary-foreground/80 mt-2 max-w-4xl whitespace-pre-wrap">
                La Unidad Oficina de Proyectos (PMO) impulsa la ejecución exitosa de proyectos, requerimientos e iniciativas estratégicas en Banesco Seguros. Gestiona desde la planificación hasta la evaluación, buscando eficiencia, rentabilidad, logro de beneficios, documentación y entrega de resultados de alto valor.
                {'\n\n'}
                Para ello, la Unidad PMO supervisa la ejecución de todos los proyectos y requerimientos, identificando y aplicando las metodologías y herramientas más adecuadas para una gestión óptima. Coordinando recursos y articulando la participación entre unidades para mantener comunicaciones fluidas sobre el estado de los proyectos, sus posibles desviaciones, riesgos y las alternativas de mejora.
                {'\n\n'}
                Proveemos servicios e información a través de los siguientes vínculos:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {department.requests?.map((req, index) => {
                 const RequestIcon = req.icon || defaultIcon;
                 const cardContent = (
                    <div 
                      className={cn(
                        "group relative p-4 rounded-lg border transition-all h-full flex flex-col",
                        req.link
                          ? "bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20 text-primary-foreground cursor-pointer"
                          : "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground/50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-start gap-4 flex-grow">
                          <RequestIcon className={cn("h-5 w-5 mt-1 flex-shrink-0", req.link ? "text-primary-foreground/80" : "text-primary-foreground/40")} />
                          <div className="flex-grow">
                              <h3 className={cn("font-semibold")}>{req.title}</h3>
                              <p className={cn("text-xs mt-1", req.link ? "text-primary-foreground/70" : "text-primary-foreground/50")}>{req.type === 'request' ? 'Formulario de solicitud' : 'Información'}</p>
                          </div>
                      </div>
                      {req.link && (
                        <ArrowRight className="absolute top-4 right-4 h-5 w-5 text-primary-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                  </div>
                 );

                 if (req.link) {
                    return (
                        <Link href={req.link} key={index} target="_blank" rel="noopener noreferrer" className="block h-full">
                            {cardContent}
                        </Link>
                    )
                 }
                 
                 return (
                    <div key={index} className="h-full">
                        {cardContent}
                    </div>
                );
              })}
            </div>
        </div>
    );
  }

  // Check if requests exist and have content
  if (department.requests && department.requests.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {department.requests?.map((req, index) => {
             const RequestIcon = req.icon || defaultIcon;
             const cardContent = (
                <div 
                  className={cn(
                    "group relative p-4 rounded-lg border transition-all h-full flex flex-col",
                    req.link
                      ? "bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20 text-primary-foreground cursor-pointer"
                      : "bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground/50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start gap-4 flex-grow">
                      <RequestIcon className={cn("h-5 w-5 mt-1 flex-shrink-0", req.link ? "text-primary-foreground/80" : "text-primary-foreground/40")} />
                      <div className="flex-grow">
                          <h3 className={cn("font-semibold")}>{req.title}</h3>
                          <p className={cn("text-xs mt-1", req.link ? "text-primary-foreground/70" : "text-primary-foreground/50")}>{req.type === 'request' ? 'Formulario de solicitud' : 'Información'}</p>
                      </div>
                  </div>
                  {req.link && (
                    <ArrowRight className="absolute top-4 right-4 h-5 w-5 text-primary-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
              </div>
             );

             if (req.link) {
                return (
                    <Link href={req.link} key={index} target="_blank" rel="noopener noreferrer" className="block h-full">
                        {cardContent}
                    </Link>
                )
             }
             
             return (
                <div key={index} className="h-full">
                    {cardContent}
                </div>
            );
          })}
        </div>
      );
  }
  // Default content if no requests are defined
  return (
    <Card className="border-dashed border-2 col-span-1 md:col-span-2 lg:col-span-3 bg-primary-foreground/10 text-primary-foreground">
      <CardContent className="p-6 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-amber-300 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Página en Construcción</h3>
        <p className="text-primary-foreground/80">
          El contenido específico para <span className="font-medium">{department.name}</span> está actualmente en desarrollo.
          <br />
          Por favor, vuelva más tarde.
        </p>
      </CardContent>
    </Card>
  );
};


interface DepartmentPageProps {
  params: { slug: string };
}

export default function DepartmentRequestPage({ params }: DepartmentPageProps) {
  const { slug } = useParams() as { slug: string };
  const department = mockDepartments.find(d => d.id === slug);
  
  if (!department) {
    return (
      <div className="container mx-auto py-8 px-4">
          <p>El departamento que busca no existe.</p>
           <Button asChild variant="link" className="mt-4 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
            <Link href="/dashboard/requerimientos" className="flex items-center gap-2 group">
               <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al portal</span>
            </Link>
          </Button>
      </div>
    );
  }


  return (
    <Card className="w-full bg-primary text-primary-foreground rounded-none border-0 min-h-screen">
      <div className="container mx-auto py-24 px-4">
            <CardHeader className="p-0">
                <CardTitle className="text-3xl font-bold tracking-tight">{department.name}</CardTitle>
                {department.id !== 'pmo' && (
                  <CardDescription className="text-primary-foreground/80 mt-2 max-w-2xl">{department.description}</CardDescription>
                )}
            </CardHeader>
            <CardContent className="mt-8 p-0">
                {renderDepartmentContent(department)}
            </CardContent>
             <div className="flex items-center justify-between mt-8 p-0">
                <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                    <Link href="/dashboard/requerimientos">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Volver
                    </Link>
                </Button>
            </div>
      </div>
    </Card>
  );
}
