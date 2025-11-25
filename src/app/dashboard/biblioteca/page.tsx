
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Button } from "@/components/ui/button";
import { Library, ArrowRight } from "lucide-react";
import Link from "next/link";
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
             <div className="mt-16 flex flex-col items-center justify-center gap-8">
                <Button asChild size="lg">
                    <Link href="https://www.appsheet.com/start/410a1959-0f25-4a71-8e93-d61b3d312d8a" target="_blank" rel="noopener noreferrer">
                        Acceder
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </SectionWrapper>
        </div>
    );
}
