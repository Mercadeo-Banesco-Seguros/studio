
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-md w-full">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="relative h-24 w-24 flex-shrink-0">
            {item.imageUrl ? (
                <Image
                src={item.imageUrl}
                alt={item.name}
                layout="fill"
                objectFit="contain"
                data-ai-hint={item.dataAiHint || ''}
                />
            ) : null}
        </div>
        <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{item.day}</p>
                    <Badge variant="default" className="text-[10px] px-2 py-0.5">{item.type}</Badge>
                </div>
            </div>
            <p className="text-md font-bold text-foreground">{item.name}</p>
            <CardDescription className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {item.description}
            </CardDescription>
             <div className="flex justify-between items-center mt-2">
                {item.price && (
                     <Badge variant="outline" className="text-xs font-semibold rounded-lg px-2 py-0.5">
                        {item.price}
                    </Badge>
                )}
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 flex-shrink-0 ml-auto">
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
