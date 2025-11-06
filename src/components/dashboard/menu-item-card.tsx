
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
    <div className="flex items-center gap-8">
        <div className="relative h-40 w-40 flex-shrink-0">
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
            <div className="flex items-center gap-2 mb-1">
                <p className="text-xs text-muted-foreground">{item.day}</p>
                <Badge variant="default" className="text-[10px] px-2 py-0.5">{item.type}</Badge>
            </div>
            <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">
                {item.description}
            </p>
            {item.price && (
                <Badge variant="secondary" className="text-xs font-semibold rounded-md px-2 py-1 mt-3">
                    {item.price}
                </Badge>
            )}
        </div>
    </div>
  );
}
