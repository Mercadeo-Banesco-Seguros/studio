
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/placeholder-data";
import { MapPin, CalendarDays, Clock, Tag } from "lucide-react";

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const scheduleLines = activity.description
    .split('Dónde y cuándo son las clases:')[1]
    ?.trim()
    .split('\n') || [];
  const time = scheduleLines[0] || "5:00 PM";
  
  const shortDescription = activity.description.split('\n')[0];

  return (
    <Card 
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={activity.imageUrl}
          alt={activity.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={activity.dataAiHint}
          className="transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="flex items-center gap-1.5 text-xs font-normal">
                <Tag className="h-3 w-3" />
                {activity.category}
            </Badge>
             <Badge variant="secondary" className="flex items-center gap-1.5 text-xs font-normal">
                <MapPin className="h-3 w-3" />
                {activity.location}
            </Badge>
             <Badge variant="secondary" className="flex items-center gap-1.5 text-xs font-normal">
                <Clock className="h-3 w-3" />
                {time}
            </Badge>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-1">{activity.title}</h3>
        <p className="text-sm text-muted-foreground">{shortDescription}</p>
      </CardContent>
    </Card>
  );
}
