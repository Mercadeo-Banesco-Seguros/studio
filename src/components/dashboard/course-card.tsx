

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
import React, { useState, useEffect, useRef } from 'react';

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

const useAnimatedNumber = (end: number, duration = 1500) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const endValue = end;
                    if (start === endValue) return;

                    const range = endValue - start;
                    const increment = endValue > start ? 1 : -1;
                    const stepTime = Math.abs(Math.floor(duration / range));
                    
                    const timer = setInterval(() => {
                        start += increment;
                        setCount(start);
                        if (start === endValue) {
                            clearInterval(timer);
                        }
                    }, stepTime);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [end, duration]);

    return { count, ref };
};


const ProgressRing = ({ percentage, isLight = false }: { percentage: number, isLight?: boolean }) => {
    const { count: animatedNumber, ref } = useAnimatedNumber(percentage);
    const [animatedProgress, setAnimatedProgress] = useState(0);

    const radius = 60;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setAnimatedProgress(percentage);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        
        const currentRef = ref.current;
        if(currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if(currentRef) {
                observer.unobserve(currentRef);
            }
        }
    }, [percentage, ref]);

    const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

    const strokeColor = isLight ? 'hsl(var(--primary))' : 'hsl(var(--primary-foreground))';
    const trackColor = isLight ? 'hsla(var(--primary), 0.2)' : 'hsla(var(--primary-foreground), 0.2)';
    const textColor = isLight ? 'hsl(var(--primary))' : 'hsl(var(--primary-foreground))';

    return (
        <div ref={ref} className="relative flex items-center justify-center w-36 h-36 flex-shrink-0">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                <circle
                    stroke={trackColor}
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={strokeColor}
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
            <span className="absolute text-2xl font-bold" style={{ color: textColor }}>
                {animatedNumber}%
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
            <div className={cn("absolute inset-0 z-0 bg-gradient-to-t from-black/60 to-black/20")} />

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
                                Vista Previa
                            </Button>
                            <Button variant="link" size="sm" className={cn("text-xs font-light", mutedTextColorClass, !isLight && "text-white/80 hover:text-white")}>
                                Detalles
                            </Button>
                        </div>
                    </div>
                </div>

                {availability !== undefined && (
                  <div className="col-span-1 flex items-center justify-center">
                    <ProgressRing percentage={availability} isLight={isLight}/>
                  </div>
                )}
            </div>
        </Card>
    )
}
