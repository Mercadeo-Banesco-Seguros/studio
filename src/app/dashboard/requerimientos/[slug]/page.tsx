
'use client';

import React from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { mockDepartments } from "@/lib/placeholder-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface DepartmentPageProps {
  params: { slug: string };
}

const renderDepartmentContent = (department: (typeof mockDepartments)[0]) => {
  const defaultIcon = department.icon || AlertTriangle;
  switch (department.id) {
    case 'capital-humano':
      return (
        <>
          {department.requests?.map((req, index) => {
             const RequestIcon = req.icon || defaultIcon;
             return (
              <Card 
                  key={index} 
                  className="bg-card shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300 group cursor-pointer flex flex-col h-full"
                >
                <CardContent className="p-4 flex items-center justify-between flex-grow">
                  <div className="flex items-center gap-4 flex-grow min-w-0">
                      <div className="p-2 bg-muted rounded-md group-hover:bg-primary-foreground/10 flex-shrink-0">
                          <RequestIcon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div className="min-w-0">
                          <h3 className="font-semibold text-sm truncate">{req.title}</h3>
                          <p className="text-muted-foreground text-xs group-hover:text-primary-foreground/80 truncate">Haga clic para iniciar su gestión.</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className="text-xs font-medium text-primary group-hover:text-primary-foreground">
                         {req.type === 'info' ? 'Consultar' : 'Solicitar'}
                      </span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary-foreground transition-opacity" />
                  </div>
                </CardContent>
              </Card>
             )
          })}
        </>
      );
    case 'mercadeo':
        return (
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                     <div className="p-2 bg-muted rounded-md w-fit">
                        <defaultIcon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Unidad de Mercadeo y Experiencia del Cliente</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground text-sm">
                    <p>
                        La Unidad de Mercadeo es el área encargada de difundir comunicaciones a toda la Organización y clientes externos, por ello la información de carácter masivo debe ser canalizada a través de este departamento.
                    </p>
                    <p>Dentro de las actividades que realiza el área se encuentran:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>SMS</li>
                        <li>Mailing</li>
                        <li>Comunicados</li>
                        <li>Entre Líneas</li>
                        <li>Redes Sociales</li>
                    </ul>
                    <p className="font-semibold text-foreground pt-4">Para hacer una solicitud, por favor llene el siguiente formulario:</p>
                     <Card className="border-dashed border-2 mt-4">
                        <CardContent className="p-6 text-center">
                            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Formulario en Construcción</h3>
                            <p className="text-muted-foreground">
                            Estamos trabajando en el formulario de solicitud para esta unidad.
                            </p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        );
    case 'pmo':
        return (
            <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                <CardHeader>
                     <div className="p-2 bg-muted rounded-md w-fit">
                        <defaultIcon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>Nivel de Prioridad - Unidad de Gestión de Proyectos (PMO)</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Prioridad</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Detalle / Observaciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center">1</TableCell>
                                <TableCell><Badge>Regulatorio</Badge></TableCell>
                                <TableCell>Presentar copia del oficio, gaceta o ley al que hace referencia.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center" rowSpan={2}>2</TableCell>
                                <TableCell><Badge variant="secondary">Aumento de volumen rentable</Badge></TableCell>
                                <TableCell>Exponer el cálculo de la cantidad de dinero que ingresa actualmente vs la que ingresará posterior a la puesta en producción de la solución tecnológica.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Badge variant="secondary">Mejor calidad de servicio</Badge></TableCell>
                                <TableCell>Descripción de la promesa de valor relacionado a la mejora de experiencia al cliente ofrecida con la implementación de la solución.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center">3</TableCell>
                                <TableCell><Badge variant="outline">Mitigar Riesgo</Badge></TableCell>
                                <TableCell>Número de hallazgo operativo identificado en la Matriz de Riesgo Operativo de la Organización asociado al requerimiento.</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-bold text-2xl text-center" rowSpan={2}>4</TableCell>
                                <TableCell><Badge variant="destructive">Disminución de costos</Badge></TableCell>
                                <TableCell>Mostrar la proporción en que se beneficia el banco, con el desarrollo de la solución tecnológica.</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell><Badge variant="destructive">Mejora proceso interno</Badge></TableCell>
                                <TableCell>Descripción de la promesa de valor ofrecida en la mejora del proceso (reducción HH, mejoras operativas) con la implementación de la solución.</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    default:
      return (
        <Card className="border-dashed border-2 col-span-1 md:col-span-2 lg:col-span-3">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Página en Construcción</h3>
            <p className="text-muted-foreground">
              El contenido específico para <span className="font-medium text-foreground">{department.name}</span> está actualmente en desarrollo.
              <br />
              Por favor, vuelva más tarde.
            </p>
          </CardContent>
        </Card>
      );
  }
};


export default function DepartmentRequestPage({ params }: DepartmentPageProps) {
  const department = mockDepartments.find(d => d.id === params.slug);
  
  if (!department) {
    return (
      <div className="container mx-auto py-8 px-4">
        <SectionWrapper title="Departamento no encontrado">
          <p>El departamento que busca no existe.</p>
           <Button asChild variant="link" className="mt-4 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
            <Link href="/dashboard/requerimientos" className="flex items-center gap-2 group">
               <span className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
                <ArrowLeft className="h-4 w-4" />
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al portal</span>
            </Link>
          </Button>
        </SectionWrapper>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div>
        <Button asChild variant="link" className="mb-6 text-muted-foreground hover:no-underline p-0 h-auto text-xs">
          <Link href="/dashboard/requerimientos" className="flex items-center gap-2 group">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Volver al portal de requerimientos</span>
          </Link>
        </Button>
      </div>

      <Card className="bg-foreground text-background rounded-2xl overflow-hidden">
         <div className="p-8 md:p-12 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-foreground to-neutral-800 opacity-50"></div>
             <div className="relative">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{department.name}</h1>
                <p className="max-w-2xl text-background/80 mb-6 text-sm">{department.description}</p>
                 <div className="flex gap-4 items-center">
                    {department.id === 'capital-humano' && (
                       <>
                        <Button asChild variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-white/10">
                          <Link href="mailto:capital_humano_ve@banescoseguros.com">
                              <Mail className="h-5 w-5" />
                              <span className="sr-only">Enviar correo a Capital Humano</span>
                          </Link>
                        </Button>
                        <Button asChild variant="ghost" size="icon" className="text-background/80 hover:text-background hover:bg-white/10">
                          <Link href="tel:+582125011111">
                              <Phone className="h-5 w-5" />
                              <span className="sr-only">Llamar a Capital Humano</span>
                          </Link>
                        </Button>
                      </>
                    )}
                </div>
             </div>
         </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderDepartmentContent(department)}
      </div>

    </div>
  );
}
