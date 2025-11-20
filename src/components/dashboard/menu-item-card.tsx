
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Utensils } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  isCurrentDay?: boolean;
}

export function MenuItemCard({ item, isCurrentDay }: MenuItemCardProps) {
    const getBadgeClass = () => {
        switch (item.type) {
        case 'Clásico':
            return 'bg-menu-clasico text-white';
        case 'Dieta':
            return 'bg-menu-dieta text-white';
        case 'Ejecutivo':
            return 'bg-menu-ejecutivo text-white';
        default:
            return 'bg-muted text-muted-foreground';
        }
    };

  return (
    <Card className="w-full h-full flex flex-col rounded-2xl shadow-lg bg-card overflow-hidden">
        <CardHeader className="p-0 relative h-48 rounded-t-2xl">
             {item.imageUrl ? (
                <Image 
                    src={item.imageUrl}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={item.dataAiHint || ''}
                    className="w-full h-full rounded-t-2xl"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted rounded-t-2xl">
                    <Utensils className="h-16 w-16 text-muted-foreground/50" />
                </div>
            )}
            <div className="absolute top-4 left-4">
                <Badge className={cn("transition-colors duration-300 text-xs", getBadgeClass())}>
                    {item.type}
                </Badge>
            </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col flex-grow">
            <div className="flex-grow">
                <CardTitle className="text-lg font-bold text-foreground mb-2 leading-tight">{item.name}</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                    {item.description}
                </CardDescription>
            </div>
            <div className="mt-4 flex items-center justify-between">
                {item.price && (
                    <Badge variant="default" className="text-xs font-semibold rounded-md px-3 py-1">
                        {item.price}
                    </Badge>
                )}
                <Button asChild size="sm" variant="link" className="p-0 h-auto text-xs">
                    <Link href="/dashboard/bienestar#menu">
                        Ver más <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                </Button>
            </div>
        </CardContent>
    </Card>
  );
}
