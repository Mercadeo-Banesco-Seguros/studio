
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Library } from "lucide-react";
import React from 'react';

export default function BibliotecaPage() {
    return (
        <div className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[calc(100vh-10rem)]">
          <SectionWrapper
            title="Biblioteca de Gestión Documental"
            description="Impulsada por la Unidad de Procesos"
            titleClassName="text-5xl font-extrabold tracking-tight"
            descriptionClassName="text-lg text-muted-foreground"
          >
             <div className="mt-16 flex justify-center">
                <Library className="h-32 w-32 text-primary/10" strokeWidth={1} />
            </div>
          </SectionWrapper>
        </div>
    );
}
