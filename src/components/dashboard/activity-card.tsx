
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/placeholder-data";
import { Button } from "../ui/button";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="group block h-full">
      <Card 
        className={cn(
          "group relative w-80 overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 h-96"
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
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

        <CardContent className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
          <div>
              <Badge variant="default" className="text-xs">{activity.category}</Badge>
              <h3 className="text-2xl font-bold mt-2 tracking-tight">{activity.title}</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs bg-white/20 text-white backdrop-blur-sm">
                  <Clock className="mr-1 h-3 w-3" />
                  Lunes, 5:00 PM
              </Badge>
              <Badge variant="secondary" className="text-xs bg-white/20 text-white backdrop-blur-sm">
                  <MapPin className="mr-1 h-3 w-3" />
                  {activity.location}
              </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
