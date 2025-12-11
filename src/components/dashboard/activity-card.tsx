
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/placeholder-data";

interface ActivityCardProps {
  activity: Activity;
}

const parseDescription = (description: string) => {
    const parts = description.split('\n\n');
    const title = parts[0];
    const needs = parts[1] ? parts[1].split('\n').slice(1) : [];
    const schedule = parts[2] ? parts[2].split('\n').slice(1) : [];

    return { title, needs, schedule };
};

export function ActivityCard({ activity }: ActivityCardProps) {
  
  const { needs, schedule } = parseDescription(activity.description);

  return (
    <Card 
      className={cn(
        "w-[720px] h-auto flex-shrink-0 relative rounded-2xl overflow-hidden",
        "bg-card shadow-lg border p-6 flex gap-6 items-center"
        )}
    >
        <div className="relative w-56 h-80 flex-shrink-0">
             <Image
                src={activity.imageUrl}
                alt={activity.title}
                layout="fill"
                objectFit="contain"
                data-ai-hint={activity.dataAiHint}
                className="transition-transform duration-300 group-hover:scale-105"
            />
        </div>

      <div className="flex flex-col text-foreground">
        <Badge
            variant="outline"
            className="mb-4 self-start font-light"
          >
            Bienestar
        </Badge>
        
        <h3 className="text-4xl font-bold mb-4">{activity.title}</h3>
        
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="font-semibold text-foreground mb-2">Para asistir a las clases solo necesitas:</p>
            <ul className="list-disc list-inside space-y-1">
                {needs.map((need, index) => (
                    <li key={index}>{need.replace('-', '').trim()}</li>
                ))}
            </ul>
          </div>
           <div>
            <p className="font-semibold text-foreground mb-2">Dónde y cuándo son las clases</p>
             <div className="space-y-0.5">
                {schedule.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
