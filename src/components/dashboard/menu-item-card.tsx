
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MenuItem } from "@/ai/flows/get-menu-items-flow";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  isCurrentDay?: boolean;
}

export function MenuItemCard({ item, isCurrentDay }: MenuItemCardProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 bg-card">
      <div className="flex-grow text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <p className="text-sm text-muted-foreground">{item.day}</p>
              <Badge variant="default" className="text-xs px-3 py-1">{item.type}</Badge>
          </div>
          <h3 className="text-4xl font-bold text-foreground tracking-tight">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto md:mx-0">
              {item.description}
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            {item.price && (
                <Badge variant="secondary" className="text-xs font-light rounded-md px-3 py-1">
                    {item.price}
                </Badge>
            )}
            <Button asChild size="sm" className="rounded-full text-xs" variant="outline">
                <Link href="/dashboard/bienestar">
                    Ver Menú Semanal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
      </div>
       <div className="relative h-80 w-80 flex-shrink-0">
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
    </Card>
  );
}
