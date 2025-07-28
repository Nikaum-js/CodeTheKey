"use client";

import Link from 'next/link';

interface Video {
  id: string;
  title: string;
}

interface LessonNavigationProps {
  courseId: string;
  previousVideo: Video | null;
  nextVideo: Video | null;
}

export function LessonNavigation({
  courseId,
  previousVideo,
  nextVideo,
}: LessonNavigationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-4 border-t border-neutral-800/50">
      {/* Previous */}
      {previousVideo ? (
        <Link
          href={`/cursos/${courseId}/aulas/${previousVideo.id}`}
          className="flex-1 group flex items-center gap-3 p-3 rounded-xl bg-neutral-800/30 hover:bg-neutral-800/60 border border-neutral-700/30 hover:border-neutral-600/50 transition-all"
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-neutral-700/50 group-hover:bg-primary/20 flex items-center justify-center text-neutral-400 group-hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">Anterior</p>
            <p className="text-sm font-medium text-neutral-300 group-hover:text-white truncate transition-colors">
              {previousVideo.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {/* Next */}
      {nextVideo && (
        <Link
          href={`/cursos/${courseId}/aulas/${nextVideo.id}`}
          className="flex-1 group flex items-center gap-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all"
        >
          <div className="flex-1 min-w-0 text-right sm:text-left">
            <p className="text-[10px] uppercase tracking-wider text-primary/70 mb-0.5">Próxima</p>
            <p className="text-sm font-medium text-neutral-200 group-hover:text-white truncate transition-colors">
              {nextVideo.title}
            </p>
          </div>
          <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/20 group-hover:bg-primary/30 flex items-center justify-center text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </Link>
      )}
    </div>
  );
}
