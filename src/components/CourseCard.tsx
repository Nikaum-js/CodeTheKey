import Image from 'next/image';
import Link from 'next/link';
import { CourseCategory, CATEGORIES } from '@/services/youtube';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    description: string;
  };
  thumbnail: string;
  category: CourseCategory;
  totalLessons?: number;
  watchedLessons?: number;
}

export function CourseCard({
  id,
  title,
  description,
  instructor,
  thumbnail,
  category,
  totalLessons = 0,
  watchedLessons = 0,
}: CourseCardProps) {
  const categoryInfo = CATEGORIES.find(c => c.id === category);
  const progressPercentage = totalLessons > 0 ? Math.round((watchedLessons / totalLessons) * 100) : 0;
  const hasProgress = watchedLessons > 0;

  return (
    <Link href={`/cursos/${id}`} className="group block h-full">
      <article className="h-full flex flex-col bg-neutral-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-neutral-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
        {/* Thumbnail */}
        <div className="relative aspect-video">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/80 backdrop-blur-sm text-xs font-medium text-neutral-50">
              {categoryInfo?.name || category}
            </span>
          </div>
          {/* Progress Overlay */}
          {hasProgress && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900/50">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-neutral-50 group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutral-400 line-clamp-3 mb-4">
            {description}
          </p>

          {/* Progress Indicator */}
          {totalLessons > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-neutral-400">
                  {hasProgress ? `${watchedLessons}/${totalLessons} aulas` : `${totalLessons} aulas`}
                </span>
                {hasProgress && (
                  <span className="text-primary font-medium">{progressPercentage}%</span>
                )}
              </div>
              <div className="h-1.5 bg-neutral-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Channel Info */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-50">{instructor.name}</p>
                <p className="text-xs text-neutral-400">Canal no YouTube</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-primary">
              <span className="text-sm font-medium">Acessar</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
