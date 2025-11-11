'use client';

import React, { useState, useMemo } from 'react';
import { mockDocuments } from "@/lib/placeholder-data";
import type { DocumentResource } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    Download,
    Mail,
    Plus
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


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

const areas = ["Todos", ...Array.from(new Set(mockDocuments.map(doc => doc.area)))];

const DocumentCard = ({ doc }: { doc: DocumentResource }) => {
    const Icon = categories.find(c => c.name === doc.category)?.icon || FileText;

    return (
        <Card className="p-4 bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg cursor-pointer">
            <div className="flex flex-col h-full">
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-muted mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-semibold text-sm text-foreground mb-1">{doc.title}</h3>
                    <p className="text-xs text-muted-foreground">{doc.area}</p>
                </div>
            </div>
        </Card>
    );
};


export default function BibliotecaDigitalPage() {
    const [activeCategory, setActiveCategory] = useState<'Todos' | DocumentResource['category'] | 'Destacados'>('Todos');
    const [activeArea, setActiveArea] = useState('Todos');

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter(doc => {
            const categoryMatch = activeCategory === 'Todos' || 
                                  (activeCategory === 'Destacados' && doc.isFeatured) ||
                                  doc.category === activeCategory;
            const areaMatch = activeArea === 'Todos' || doc.area === activeArea;
            return categoryMatch && areaMatch;
        });
    }, [activeCategory, activeArea]);

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-56 flex-shrink-0 p-6 border-r border-border/60 hidden md:flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="h-6 w-6 text-primary"/>
                    <h2 className="font-bold text-lg">Recursos</h2>
                </div>
                <hr className="border-border/60 mb-6"/>
                <nav className="flex flex-col gap-1">
                    {categories.map(({ name, icon: Icon }) => (
                        <Button
                            key={name}
                            variant={activeCategory === name ? 'secondary' : 'ghost'}
                            className="w-full justify-start gap-3 text-sm font-normal"
                            onClick={() => setActiveCategory(name)}
                        >
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span>{name}</span>
                        </Button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                         {areas.map(area => (
                            <Button
                                key={area}
                                variant={activeArea === area ? 'default' : 'ghost'}
                                size="sm"
                                className="rounded-full flex-shrink-0 text-xs h-7 px-3"
                                onClick={() => setActiveArea(area)}
                            >
                                {area}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="text-muted-foreground h-8 w-8">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
