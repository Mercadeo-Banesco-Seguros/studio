
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
      <div className="relative h-48 w-48 md:h-40 md:w-40 flex-shrink-0">
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
      <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <p className="text-xs text-muted-foreground">{item.day}</p>
              <Badge variant="default" className="text-[10px] px-2 py-0.5">{item.type}</Badge>
          </div>
          <h3 className="text-2xl font-bold text-foreground">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto md:mx-0">
              {item.description}
          </p>
          {item.price && (
              <Badge variant="secondary" className="text-xs font-semibold rounded-md px-3 py-1 mt-4">
                  {item.price}
              </Badge>
          )}
      </div>
    </Card>
  );
}
