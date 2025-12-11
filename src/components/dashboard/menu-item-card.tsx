
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, Utensils, Clock } from "lucide-react";

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
    <Card 
        className={cn(
          "group relative w-full h-full overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300"
        )}
      >
        {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={item.dataAiHint}
              className="transition-transform duration-500 group-hover:scale-105"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
                <Utensils className="h-16 w-16 text-muted-foreground/50" />
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

        <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
          <div>
              <Badge variant="default" className={cn("text-xs", getBadgeClass())}>{item.type}</Badge>
              <h3 className="text-2xl font-bold mt-2 tracking-tight">{item.name}</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs bg-white/20 text-white backdrop-blur-sm">
                  <Clock className="mr-1 h-3 w-3" />
                  {item.day}
              </Badge>
              {item.price && (
                <Badge variant="secondary" className="text-xs bg-white/20 text-white backdrop-blur-sm">
                    {item.price}
                </Badge>
              )}
          </div>
        </CardContent>
      </Card>
  );
}
