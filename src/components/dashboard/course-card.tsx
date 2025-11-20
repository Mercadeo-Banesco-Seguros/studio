

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
}

export const NewCourseCard = ({ title, category, details, imageUrl, dataAiHint, className, imageClassName, icon: Icon, progress, author, isLight }: NewCourseCardProps) => {
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

            <div className="relative z-10">
                <p className={cn("text-sm", mutedTextColorClass)}>{category}</p>
                 <div className="flex items-center gap-2 mt-4">
                    {Icon && <Icon className={cn("h-6 w-6", textColorClass)} />}
                    <h3 className={cn("text-2xl font-bold", textColorClass)}>{title}</h3>
                </div>
            </div>
            
            <div className="relative z-10">
                {author && <p className="text-xs mb-2">{author}</p>}
                {progress !== undefined && (
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <Progress value={progress} className="h-1 bg-white/30" indicatorClassName="bg-white" />
                    <span>{progress}%</span>
                  </div>
                )}
                <div className={cn("flex items-center gap-4 text-xs", mutedTextColorClass)}>
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
        </Card>
    )
}
