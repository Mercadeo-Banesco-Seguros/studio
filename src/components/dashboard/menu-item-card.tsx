
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
    <Card className="w-full rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
      <div className="relative h-64 w-64 md:h-80 md:w-80 flex-shrink-0">
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
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <p className="text-sm text-muted-foreground">{item.day}</p>
              <Badge variant="default" className="text-xs px-3 py-1">{item.type}</Badge>
          </div>
          <h3 className="text-4xl font-bold text-foreground">{item.name}</h3>
          <p className="text-base text-muted-foreground mt-4 max-w-md mx-auto md:mx-0">
              {item.description}
          </p>
          {item.price && (
              <Badge variant="secondary" className="text-base font-semibold rounded-md px-4 py-2 mt-6">
                  {item.price}
              </Badge>
          )}
      </div>
    </Card>
  );
}
