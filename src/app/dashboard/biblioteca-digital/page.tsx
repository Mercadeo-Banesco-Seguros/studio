'use client';

import React, { useState, useMemo } from 'react';
import { mockDocuments } from "@/lib/placeholder-data";
import type { DocumentResource } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
    LayoutGrid, 
    Star, 
    ImageIcon, 
    Code, 
    Presentation, 
    BookOpen, 
    FileText, 
    Video, 
    Music,
    Search,
    Mail,
    Download,
    ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const categories: { name: DocumentResource['category'] | 'Destacados' | 'Todos', icon: LucideIcon }[] = [
    { name: 'Todos', icon: LayoutGrid },
    { name: 'Destacados', icon: Star },
    { name: 'Recursos Visuales', icon: ImageIcon },
    { name: 'Herramientas', icon: Code },
    { name: 'Presentaciones', icon: Presentation },
    { name: 'Manuales', icon: BookOpen },
    { name: 'Documentos', icon: FileText },
    { name: 'Videos', icon: Video },
    { name: 'Música', icon: Music }
];

const businessLines: (DocumentResource['businessLine'] | 'Todos')[] = ["Todos", "Automóvil", "Personas", "Patrimoniales", "Salud"];

const DocumentCard = ({ doc }: { doc: DocumentResource }) => {
    return (
        <Card className="p-4 bg-blue-50 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg cursor-pointer h-full flex flex-col">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-blue-500 font-semibold">{doc.businessLine}</span>
                <span className="text-xs text-muted-foreground">{doc.area}</span>
            </div>
            <div className="text-center my-auto">
                <h3 className="font-semibold text-sm text-foreground mb-1">Your first 7 content assets should not be random</h3>
                <div className="relative w-24 h-24 mx-auto mt-4">
                     <Image
                        src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom.png?raw=true"
                        alt={doc.title}
                        layout="fill"
                        objectFit="contain"
                        data-ai-hint="toolbox illustration"
                     />
                </div>
            </div>
        </Card>
    );
};


export default function BibliotecaDigitalPage() {
    const [activeCategory, setActiveCategory] = useState<'Todos' | DocumentResource['category'] | 'Destacados'>('Todos');
    const [activeBusinessLine, setActiveBusinessLine] = useState<(typeof businessLines)[number]>('Todos');

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter(doc => {
            const categoryMatch = activeCategory === 'Todos' || 
                                  (activeCategory === 'Destacados' && doc.isFeatured) ||
                                  doc.category === activeCategory;
            const businessLineMatch = activeBusinessLine === 'Todos' || doc.businessLine === activeBusinessLine;
            return categoryMatch && businessLineMatch;
        }).slice(0, 4); // Limit to 4 cards to match the design
    }, [activeCategory, activeBusinessLine]);

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-56 flex-shrink-0 p-6 border-r border-border/60 hidden md:flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    {/* Placeholder for a logo if needed */}
                </div>
                <hr className="border-border/60 mb-6"/>
                <nav className="flex flex-col gap-1">
                    {categories.map(({ name, icon: Icon }) => {
                        const isActive = activeCategory === name;
                        return (
                            <Button
                                key={name}
                                variant={isActive ? 'default' : 'ghost'}
                                className={cn(
                                    "w-full justify-start gap-3 text-xs font-normal",
                                    !isActive && "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                )}
                                onClick={() => setActiveCategory(name)}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{name}</span>
                                {isActive && <ChevronRight className="h-4 w-4 ml-auto"/>}
                            </Button>
                        )
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                     <div className="flex items-center gap-2 flex-wrap pb-2 w-full border-b">
                        {businessLines.map(line => (
                             <Button
                                key={line}
                                variant={activeBusinessLine === line ? 'default' : 'ghost'}
                                size="sm"
                                className="rounded-full text-xs h-7 px-4"
                                onClick={() => setActiveBusinessLine(line)}
                            >
                                {line}
                            </Button>
                        ))}
                         <div className="flex items-center gap-2 ml-auto">
                            <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                                <Search className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                                <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredDocuments.map(doc => (
                        <DocumentCard key={doc.id} doc={doc} />
                    ))}
                </div>

                {filteredDocuments.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground col-span-full">
                        <p>No se encontraron documentos que coincidan con su búsqueda.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
