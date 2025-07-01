"use client";

import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';

interface LessonPlayerProps {
  courseId: string;
  lessonId: string;
  embedUrl: string;
  title: string;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export function LessonPlayer({
  courseId,
  lessonId,
  embedUrl,
  title,
  onNextLesson,
  hasNextLesson
}: LessonPlayerProps) {
  const { isLessonWatched, markLessonAsWatched, unmarkLesson, isLoaded } = useProgress();
  const [isHovering, setIsHovering] = useState(false);

  const isWatched = isLoaded && isLessonWatched(courseId, lessonId);

  const toggleWatched = () => {
    if (isWatched) {
      unmarkLesson(courseId, lessonId);
    } else {
      markLessonAsWatched(courseId, lessonId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Container */}
      <div
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Main Video */}
        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/10">
          <iframe
            src={embedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
            title={title}
          />
        </div>

        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between gap-4 p-4 bg-neutral-800/30 backdrop-blur-sm rounded-xl border border-neutral-700/30">
        <div className="flex items-center gap-3">
          {/* Mark as Complete Button */}
          <button
            onClick={toggleWatched}
            className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
              isWatched
                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 ring-1 ring-green-500/30'
                : 'bg-neutral-700/50 text-neutral-300 hover:bg-primary/20 hover:text-primary hover:ring-1 hover:ring-primary/30'
            }`}
          >
            {isWatched ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>Concluída</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Marcar como concluída</span>
              </>
            )}
          </button>

          {/* Watch on YouTube */}
          <a
            href={`https://www.youtube.com/watch?v=${lessonId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-700/50 text-neutral-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="hidden sm:inline">YouTube</span>
          </a>
        </div>

        {/* Next Lesson Button */}
        {hasNextLesson && onNextLesson && (
          <button
            onClick={onNextLesson}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]"
          >
            <span>Próxima aula</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
