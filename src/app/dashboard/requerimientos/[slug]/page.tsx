
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


const renderDepartmentContent = (department: (typeof mockDepartments)[0], selectedId: string | null, setSelectedId: (id: string | null) => void) => {
  const defaultIcon = department.icon || AlertTriangle;
  switch (department.id) {
    case 'capital-humano':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {department.requests?.map((req, index) => {
             const RequestIcon = req.icon || defaultIcon;
             const isSelected = selectedId === req.title;
             return (
              <div 
                  key={index} 
                  className={cn(
                    "group relative p-4 rounded-lg border transition-all cursor-pointer",
                    isSelected ? "bg-background/90 text-foreground border-transparent" : "bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20 text-primary-foreground"
                  )}
                  onClick={() => setSelectedId(isSelected ? null : req.title)}
                >
                <div className="flex items-start gap-4">
                    <RequestIcon className={cn("h-5 w-5 mt-1 flex-shrink-0", isSelected ? "text-primary" : "text-primary-foreground/80")} />
                    <div className="flex-grow">
                        <h3 className={cn("font-semibold")}>{req.title}</h3>
                        <p className={cn("text-xs mt-1", isSelected ? "text-muted-foreground" : "text-primary-foreground/70")}>{req.type === 'request' ? 'Formulario de solicitud' : 'Información'}</p>
                    </div>
                </div>
                <Checkbox checked={isSelected} className={cn("absolute top-4 right-4", isSelected ? "border-primary text-primary" : "border-primary-foreground/50 text-primary-foreground")} />
              </div>
             )
          })}
        </div>
      );
    default:
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
  }
};


interface DepartmentPageProps {
  params: { slug: string };
}

export default function DepartmentRequestPage({ params }: DepartmentPageProps) {
  const { slug } = useParams() as { slug: string };
  const department = mockDepartments.find(d => d.id === slug);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  
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
    <Card className="w-full bg-primary text-primary-foreground rounded-none border-0 min-h-[calc(100vh-6rem)]">
        <div className="container mx-auto py-12 px-4">
            <CardHeader className="p-0">
                <CardTitle className="text-3xl font-bold tracking-tight">{department.name}</CardTitle>
                <CardDescription className="text-primary-foreground/80 mt-2 max-w-2xl">{department.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-8 p-0">
                {renderDepartmentContent(department, selectedId, setSelectedId)}
            </CardContent>
             <div className="flex items-center justify-between mt-8 p-0">
                <Button asChild variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                    <Link href="/dashboard/requerimientos">
                        <ArrowLeft className="mr-2 h-4 w-4"/>
                        Volver
                    </Link>
                </Button>
                <Button variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    Siguiente
                    <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            </div>
        </div>
    </Card>
  );
}
