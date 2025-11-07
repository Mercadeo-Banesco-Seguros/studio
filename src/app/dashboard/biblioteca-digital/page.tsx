'use client';

import React, { useState, useMemo } from 'react';
import { SectionWrapper } from "@/components/dashboard/section-wrapper";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { mockDocuments } from "@/lib/placeholder-data";
import type { DocumentResource } from '@/lib/placeholder-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, SlidersHorizontal, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const areas = ["Todas", ...Array.from(new Set(mockDocuments.map(doc => doc.area)))];
const categories = ["Todas", ...Array.from(new Set(mockDocuments.map(doc => doc.category)))];
const businessLines = ["Todas", ...Array.from(new Set(mockDocuments.map(doc => doc.businessLine).filter(Boolean))) as string[]];


export default function BibliotecaDigitalPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState('Todas');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedBusinessLine, setSelectedBusinessLine] = useState('Todas');
    const [showFilters, setShowFilters] = useState(false);

    const featuredDocuments = useMemo(() => {
        return mockDocuments.filter(doc => doc.isFeatured).slice(0, 3);
    }, []);

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter(doc => {
            const searchTermMatch = searchTerm === '' || doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.description.toLowerCase().includes(searchTerm.toLowerCase());
            const areaMatch = selectedArea === 'Todas' || doc.area === selectedArea;
            const categoryMatch = selectedCategory === 'Todas' || doc.category === selectedCategory;
            const businessLineMatch = selectedBusinessLine === 'Todas' || doc.businessLine === selectedBusinessLine;
            return searchTermMatch && areaMatch && categoryMatch && businessLineMatch;
        });
    }, [searchTerm, selectedArea, selectedCategory, selectedBusinessLine]);

    return (
        <div className="container mx-auto py-8 px-4">
            <SectionWrapper
                title="Centro de Recursos Multimedia"
                description="Encuentra manuales, presentaciones, recursos visuales y más para potenciar tu trabajo diario."
                titleClassName="text-4xl md:text-5xl font-extrabold tracking-tight"
                descriptionClassName="text-lg"
            >
                {/* Featured Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Recursos Destacados</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredDocuments.map(doc => (
                           <Card key={doc.id} className="group overflow-hidden rounded-xl border-none shadow-lg">
                             <Link href={doc.linkUrl || '#'} target="_blank" className="block">
                                <div className="relative h-56 w-full">
                                    <Image src={doc.imageUrl} alt={doc.title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" data-ai-hint={doc.dataAiHint} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-foreground">{doc.area}</Badge>
                                    </div>
                                </div>
                                <div className="p-4 bg-card">
                                    <h3 className="font-semibold text-sm truncate group-hover:text-primary">{doc.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 h-8 overflow-hidden">{doc.description}</p>
                                </div>
                             </Link>
                           </Card>
                        ))}
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mb-6">Explorar Catálogo</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por título o palabra clave..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full md:w-auto">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            {showFilters ? "Ocultar" : "Mostrar"} Filtros
                        </Button>
                    </div>

                    {showFilters && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                            <Select value={selectedArea} onValueChange={setSelectedArea}>
                                <SelectTrigger><SelectValue placeholder="Filtrar por Área" /></SelectTrigger>
                                <SelectContent>
                                    {areas.map(area => <SelectItem key={area} value={area}>{area}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger><SelectValue placeholder="Filtrar por Categoría" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                             <Select value={selectedBusinessLine} onValueChange={setSelectedBusinessLine}>
                                <SelectTrigger><SelectValue placeholder="Línea de Negocio" /></SelectTrigger>
                                <SelectContent>
                                    {businessLines.map(line => <SelectItem key={line} value={line}>{line}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredDocuments.map(doc => (
                        <Card key={doc.id} className="group overflow-hidden rounded-xl border-border shadow-sm flex flex-col">
                             <div className="relative h-40 w-full">
                                <Image src={doc.imageUrl} alt={doc.title} layout="fill" objectFit="cover" data-ai-hint={doc.dataAiHint} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                            <CardHeader className="p-4 pb-2">
                                <div className="flex items-center justify-between">
                                    <Badge variant="outline" className="text-xs">{doc.category}</Badge>
                                    <Badge variant="secondary" className="text-xs">{doc.area}</Badge>
                                </div>
                                <CardTitle className="text-base font-semibold pt-2 h-12 overflow-hidden">{doc.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 flex-grow">
                                <p className="text-xs text-muted-foreground h-16 overflow-hidden">{doc.description}</p>
                            </CardContent>
                            <CardContent className="p-4 pt-0 mt-auto">
                                <Button asChild size="sm" className="w-full">
                                    <Link href={doc.linkUrl || '#'} target="_blank">
                                        <Download className="mr-2 h-4 w-4"/>
                                        Descargar
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 {filteredDocuments.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>No se encontraron documentos que coincidan con su búsqueda.</p>
                    </div>
                )}
            </SectionWrapper>
        </div>
    );
}
