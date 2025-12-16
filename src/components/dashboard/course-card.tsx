
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/lib/placeholder-data";
import { PlayCircle } from "lucide-react";


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
