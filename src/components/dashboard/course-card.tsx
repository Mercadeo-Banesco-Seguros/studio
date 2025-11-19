
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag, PlayCircle, BookOpen } from "lucide-react";
import { Progress } from "../ui/progress";

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
    description: string;
    imageUrl: string;
}

export const NewCourseCard = ({ title, description, imageUrl }: NewCourseCardProps) => {
    return (
        <Card className="group relative w-full h-[380px] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
            <Image
                src={imageUrl}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="z-0 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
            <CardContent className="relative z-20 flex h-full flex-col justify-end p-6 text-white">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg w-fit mb-4">
                    <BookOpen className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-1 text-xs text-white/80">{description}</p>
            </CardContent>
        </Card>
    )
}
