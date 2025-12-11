
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/placeholder-data";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card 
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 h-96"
      )}
    >
      <Image
        src={activity.imageUrl}
        alt={activity.title}
        layout="fill"
        objectFit="cover"
        data-ai-hint={activity.dataAiHint}
        className="transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <div>
            <Badge variant="default" className="text-xs">{activity.category}</Badge>
            <h3 className="text-2xl font-bold mt-2 tracking-tight">{activity.title}</h3>
        </div>
        <div className="mt-4">
             <Button variant="ghost" className="text-white h-auto p-0 hover:bg-transparent hover:text-white group/link">
                Ver más
                <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover/link:translate-x-1" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
