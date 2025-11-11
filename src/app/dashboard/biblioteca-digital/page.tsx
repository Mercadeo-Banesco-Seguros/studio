'use client';

import React, { useState, useMemo } from 'react';
import { mockDocuments } from "@/lib/placeholder-data";
import type { DocumentResource } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    ArrowLeft,
    Megaphone,
    Target,
    ShoppingBag,
    CircleDollarSign,
    ZoomIn,
    BadgeCheck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const documentCategories: { name: DocumentResource['category'] | 'Destacados' | 'Todos', icon: LucideIcon }[] = [
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

const mainCategories = [
    { 
        id: 'Corporativo', 
        title: 'Corporativo', 
        description: 'Recursos y guías generales', 
        icon: Megaphone, 
        image: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(31).png?raw=true',
        dataAiHint: 'megaphone illustration'
    },
    { 
        id: 'Productos', 
        title: 'Productos', 
        description: 'Información y materiales', 
        icon: ZoomIn, 
        image: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(29).png?raw=true',
        dataAiHint: 'magnifying glass'
    },
    { 
        id: 'Marca', 
        title: 'Marca', 
        description: 'Identidad visual y manuales', 
        icon: BadgeCheck, 
        image: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(27).png?raw=true',
        dataAiHint: 'verified badge'
    },
    { 
        id: 'Finanzas', 
        title: 'Finanzas', 
        description: 'Planes de cuentas y reportes', 
        icon: CircleDollarSign,
        image: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(30).png?raw=true',
        dataAiHint: 'money bills'
    },
    { 
        id: 'Comercial', 
        title: 'Comercial', 
        description: 'Intermediación de Productos', 
        icon: ShoppingBag, 
        image: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(28).png?raw=true',
        dataAiHint: 'shopping bag'
    },
    { 
        id: 'Desarrollo', 
        title: 'Desarrollo', 
        description: 'Cursos y planes de carrera', 
        icon: Target, 
        image: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(26).png?raw=true',
        dataAiHint: 'target icon'
    }
];

const DocumentCard = ({ doc }: { doc: DocumentResource }) => {
    return (
        <Card className="p-4 bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg cursor-pointer h-full flex flex-col">
             <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-primary font-semibold">{doc.businessLine || doc.area}</span>
                <span className="text-xs text-muted-foreground">{doc.category}</span>
            </div>
            <div className="text-center my-auto">
                <h3 className="font-semibold text-sm text-foreground mb-1">{doc.title}</h3>
                <div className="relative w-24 h-24 mx-auto mt-4">
                     <Image
                        src={doc.imageUrl}
                        alt={doc.title}
                        layout="fill"
                        objectFit="contain"
                        data-ai-hint={doc.dataAiHint}
                     />
                </div>
            </div>
        </Card>
    );
};

const MainCategoryCard = ({ category, onClick }: { category: typeof mainCategories[0], onClick: () => void }) => {
    return (
        <Card
            className="group relative p-6 bg-card shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl cursor-pointer overflow-hidden flex flex-col justify-between items-center text-center"
            onClick={onClick}
        >
            <div className="relative z-10 w-full">
                <Badge variant="secondary" className="mb-2 text-[10px] bg-neutral-500 text-white font-normal">{category.description}</Badge>
                <h3 className="text-2xl font-bold text-foreground mt-1 tracking-tight">{category.title}</h3>
            </div>
            <div className="relative z-10 w-full h-40 transform group-hover:scale-110 transition-transform duration-300">
                <Image
                    src={category.image}
                    alt={category.title}
                    layout="fill"
                    objectFit="contain"
                    data-ai-hint={category.dataAiHint}
                />
            </div>
        </Card>
    );
};


export default function BibliotecaDigitalPage() {
    const [activeDocCategory, setActiveDocCategory] = useState<(typeof documentCategories)[number]['name']>('Todos');
    const [activeBusinessLine, setActiveBusinessLine] = useState<(typeof businessLines)[number]>('Todos');
    const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);

    const filteredDocuments = useMemo(() => {
        let documents = mockDocuments;
        
        // 1. Filter by main category if one is selected
        if (selectedMainCategory) {
            const mainCatLower = selectedMainCategory.toLowerCase();
             // A simple mapping from main category to document areas
            const areaMap: { [key: string]: DocumentResource['area'][] } = {
                corporativo: ['General', 'Legal', 'Capital Humano'],
                productos: ['Suscripción', 'Actuarial'],
                marca: ['Mercadeo'],
                finanzas: ['Finanzas'],
                comercial: ['Comercial'],
                desarrollo: ['Capital Humano', 'Procesos'],
            };

            const relevantAreas = areaMap[mainCatLower] || [];
            documents = documents.filter(doc => relevantAreas.includes(doc.area));
        }

        // 2. Filter by document category (sidebar)
        if (activeDocCategory !== 'Todos') {
            if (activeDocCategory === 'Destacados') {
                documents = documents.filter(doc => doc.isFeatured);
            } else {
                documents = documents.filter(doc => doc.category === activeDocCategory);
            }
        }
        
        // 3. Filter by business line (top bar)
        if (activeBusinessLine !== 'Todos') {
            documents = documents.filter(doc => doc.businessLine === activeBusinessLine);
        }

        return documents;
    }, [activeDocCategory, activeBusinessLine, selectedMainCategory]);

    return (
        <div className="flex min-h-screen bg-background text-foreground px-10">
            {/* Sidebar */}
            <aside className="w-56 flex-shrink-0 p-6 hidden md:flex flex-col">
                 <div className="flex items-center gap-3 mb-6">
                    <h2 className="font-bold text-2xl tracking-tight">Recursos</h2>
                </div>
                <nav className="flex flex-col gap-1">
                    {documentCategories.map(({ name, icon: Icon }) => {
                        const isActive = activeDocCategory === name;
                        return (
                            <Button
                                key={name}
                                variant={isActive ? 'default' : 'ghost'}
                                className={cn(
                                    "w-full justify-start gap-3 text-xs font-normal",
                                    !isActive && "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                                )}
                                onClick={() => setActiveDocCategory(name)}
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
            <main className="flex-1 p-6 sm:p-8 md:p-10">
                <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                     <div className="flex items-center gap-2 flex-wrap w-full">
                        {selectedMainCategory && (
                             <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full text-xs h-7 px-3 flex items-center gap-2"
                                onClick={() => setSelectedMainCategory(null)}
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Volver
                            </Button>
                        )}
                        {businessLines.map(line => (
                             <Button
                                key={line}
                                variant={activeBusinessLine === line ? 'default' : 'ghost'}
                                size="sm"
                                className="rounded-full text-xs h-7 px-4 font-light"
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

                {selectedMainCategory === null ? (
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mainCategories.map(cat => (
                            <MainCategoryCard 
                                key={cat.id} 
                                category={cat} 
                                onClick={() => setSelectedMainCategory(cat.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </main>
        </div>
    );
}
