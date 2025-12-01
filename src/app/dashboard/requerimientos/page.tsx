
'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { MoreVertical, Flag, ArrowRight, Briefcase, Shield, Scale, LayoutGrid, Users, FolderKanban, MoreHorizontal } from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";


const categories = [
    { id: "ALL", name: "ALL", icon: LayoutGrid },
    { id: "Capital Humano", name: "Capital Humano", icon: Users },
    { id: "Comercial", name: "Comercial", icon: Briefcase },
    { id: "Legal", name: "Legal", icon: Scale },
    { id: "Seguridad", name: "Seguridad", icon: Shield },
    { id: "Proyectos", name: "Proyectos", icon: FolderKanban },
    { id: "Otros", name: "Otros", icon: MoreHorizontal }
];

interface DepartmentCardProps {
  department: Department;
  isActive: boolean;
  onReportError: () => void;
}

const DepartmentCard = ({ department, isActive, onReportError }: DepartmentCardProps) => {
  const Icon = department.icon || MoreHorizontal;
  
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-300 flex flex-col text-left rounded-2xl h-full relative",
        "bg-card shadow-sm hover:shadow-xl hover:-translate-y-1",
        "hover:bg-primary hover:text-primary-foreground",
        isActive ? "shadow-xl ring-2 ring-primary" : "shadow-sm"
      )}
    >
      <CardContent className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-muted group-hover:bg-primary-foreground/20">
                  <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full group-hover:text-primary-foreground group-hover:hover:bg-primary-foreground/20"
                    onClick={handleDropdownClick}
                    >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" onClick={handleDropdownClick}>
                  <DropdownMenuItem onClick={onReportError}>
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Reportar Error</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
          <div className="flex-grow">
            <p className="font-semibold mb-1">{department.name}</p>
            <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80">{department.description}</p>
          </div>
          <div className="mt-4 text-right">
              <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary-foreground transition-opacity" />
          </div>
      </CardContent>
    </Card>
  );
};


export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  
  const { toast } = useToast();

  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);
    
  const handleReportError = () => {
    setIsReportDialogOpen(true);
  };

  const handleSendReport = () => {
    setIsReportDialogOpen(false);
    toast({
        title: "Reporte Enviado",
        description: "Gracias por tu feedback. Hemos recibido tu reporte y lo revisaremos pronto.",
    });
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Portal de Requerimientos</h1>
          <p className="text-muted-foreground mt-1">Selecciona una categoría o departamento para iniciar tu solicitud.</p>
        </div>
      </header>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        
        <nav className="md:col-span-3 lg:col-span-2 sticky top-28 h-fit">
          <div className="flex flex-col space-y-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors relative",
                    "hover:bg-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                         isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-5 w-5 flex-shrink-0" />
                    </div>
                    <span className={cn(
                        "font-medium text-xs",
                        isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    )}>{category.name}</span>
                  </div>
                   {isActive && <div className="absolute right-0 h-5 w-1 bg-primary rounded-full" />}
                </button>
              );
            })}
          </div>
        </nav>

        <Separator orientation="vertical" className="hidden md:block h-auto" />

         <div className="md:col-span-8 lg:col-span-9">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDepartments.map((dept) => {
                  const departmentDetails = mockDepartments.find(d => d.id === dept.id);
                  if (!departmentDetails) return null;
                  
                  const href = departmentDetails.directLink ? departmentDetails.directLink : `/dashboard/requerimientos/${departmentDetails.id}`;

                  return (
                      <Link href={href} key={dept.id} className="block h-full">
                         <DepartmentCard 
                              department={dept} 
                              isActive={activeCategory === dept.category}
                              onReportError={handleReportError}
                          />
                      </Link>
                  );
              })}
          </div>
        </div>
      </div>
      
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reportar un Error</DialogTitle>
            <DialogDescription>
              Ayúdanos a mejorar. Por favor, describe el problema que encontraste con esta tarjeta o sección.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea placeholder="Describe el error aquí..." rows={4} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSendReport}>Enviar Reporte</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
