

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag, PlayCircle, BookOpen, User, Users, Calendar, BarChart2 } from "lucide-react";
import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const linkHref = course.hasDetailPage ? `/dashboard/cursos/${course.id}` : "#";
  const linkTarget = course.hasDetailPage ? "_self" : "_blank";

  return (
    <Link href={linkHref} target={linkTarget} className="group block h-full">
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg rounded-xl bg-card">
        <CardHeader className="p-0 relative">
          <div className="aspect-video w-full relative overflow-hidden rounded-t-xl">
            <Image
              src={course.imageUrl}
              alt={course.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint={course.dataAiHint}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle className="h-8 w-8 text-white" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <CardTitle className="text-xs font-semibold leading-tight group-hover:text-primary transition-colors">
            {course.title}
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
}

const AvailabilityRing = ({ percentage }: { percentage: number }) => {
  const radius = 50;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-32 h-32 flex-shrink-0">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90"
      >
        <circle
          stroke="hsla(var(--primary-foreground), 0.2)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="hsl(var(--primary-foreground))"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-sm text-primary-foreground">
        Cupos
      </span>
    </div>
  );
};


interface NewCourseCardProps {
    title: string;
    category: string;
    details: string[];
    imageUrl?: string;
    dataAiHint?: string;
    className?: string;
    imageClassName?: string;
    icon?: LucideIcon;
    progress?: number;
    author?: string;
    isLight?: boolean;
    availability?: number;
}

export const NewCourseCard = ({ title, category, details, imageUrl, dataAiHint, className, imageClassName, icon: Icon, progress, author, isLight, availability }: NewCourseCardProps) => {
    const textColorClass = isLight ? "text-card-foreground" : "text-primary-foreground";
    const mutedTextColorClass = isLight ? "text-muted-foreground" : "text-primary-foreground/80";

    return (
        <Card className={cn("group relative w-full h-full overflow-hidden rounded-2xl shadow-lg flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-xl", className)}>
            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className={cn("absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-105", imageClassName)}
                    data-ai-hint={dataAiHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-0" />

            <div className="relative z-10 grid grid-cols-3 gap-4 items-center h-full">
                <div className="col-span-2 flex flex-col h-full justify-between">
                    <div>
                        <p className={cn("text-sm", mutedTextColorClass)}>{category}</p>
                        <div className="flex items-center gap-2 mt-2">
                            {Icon && <Icon className={cn("h-6 w-6", textColorClass)} />}
                            <h3 className={cn("text-2xl font-bold", textColorClass)}>{title}</h3>
                        </div>
                    </div>
                    <div>
                         <div className={cn("flex items-center gap-4 text-xs mt-2", mutedTextColorClass)}>
                            {details.map((detail, index) => (
                                <span key={index}>{detail}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <Button variant={isLight ? "secondary" : "secondary"} size="sm" className={cn("text-xs font-light", !isLight && "bg-white/20 text-white hover:bg-white/30")}>
                                Preview
                            </Button>
                            <Button variant="link" size="sm" className={cn("text-xs font-light", mutedTextColorClass)}>
                                Details
                            </Button>
                        </div>
                    </div>
                </div>

                {availability !== undefined && (
                  <div className="col-span-1 flex items-center justify-center">
                    <AvailabilityRing percentage={availability} />
                  </div>
                )}
            </div>
        </Card>
    )
}
