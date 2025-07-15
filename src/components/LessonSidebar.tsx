"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProgress } from '@/hooks/useProgress';

interface Video {
  id: string;
  title: string;
  thumbnails?: {
    default?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    high?: { url: string; width: number; height: number };
  };
}

interface LessonSidebarProps {
  courseId: string;
  videos: Video[];
  currentVideoId: string;
  courseTitle: string;
  totalLessons: number;
}

export function LessonSidebar({ courseId, videos, currentVideoId, courseTitle, totalLessons }: LessonSidebarProps) {
  const { isLessonWatched, getCourseProgress, isLoaded } = useProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentVideoRef = useRef<HTMLAnchorElement>(null);

  const watchedCount = isLoaded ? getCourseProgress(courseId) : 0;
  const progressPercentage = totalLessons > 0 ? Math.round((watchedCount / totalLessons) * 100) : 0;

  // Scroll to current video on mount
  useEffect(() => {
    if (currentVideoRef.current) {
      currentVideoRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [currentVideoId]);

  const filteredVideos = videos.filter((video, index) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return video.title.toLowerCase().includes(query) || String(index + 1).includes(query);
  });

  return (
    <div className={`bg-neutral-900/80 backdrop-blur-xl border border-neutral-700/50 rounded-2xl overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-full'}`}>
      {/* Header */}
      <div className="p-4 border-b border-neutral-700/50 bg-neutral-800/30">
        <div className="flex items-center justify-between gap-3">
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-neutral-50 truncate">{courseTitle}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-neutral-400">{watchedCount}/{totalLessons} aulas</span>
                <div className="flex-1 h-1 bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary">{progressPercentage}%</span>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="shrink-0 w-8 h-8 rounded-lg bg-neutral-700/50 flex items-center justify-center text-neutral-400 hover:text-neutral-50 hover:bg-neutral-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`}>
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        {!isCollapsed && (
          <div className="relative mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Buscar aula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-sm text-neutral-50 placeholder-neutral-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        )}
      </div>

      {/* Video List */}
      <div className={`overflow-y-auto custom-scrollbar ${isCollapsed ? 'max-h-[calc(100vh-200px)]' : 'max-h-[calc(100vh-280px)]'}`}>
        {filteredVideos.map((video) => {
          const originalIndex = videos.findIndex(v => v.id === video.id);
          const isCurrentVideo = video.id === currentVideoId;
          const isWatched = isLoaded && isLessonWatched(courseId, video.id);
          const thumbnailUrl = video.thumbnails?.medium?.url || video.thumbnails?.default?.url;

          if (isCollapsed) {
            return (
              <Link
                key={video.id}
                href={`/cursos/${courseId}/aulas/${video.id}`}
                ref={isCurrentVideo ? currentVideoRef : null}
                className={`block p-2 transition-all ${
                  isCurrentVideo
                    ? 'bg-primary/20'
                    : 'hover:bg-neutral-800/50'
                }`}
                title={video.title}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                  isCurrentVideo
                    ? 'bg-primary text-white'
                    : isWatched
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-neutral-800 text-neutral-400'
                }`}>
                  {isWatched && !isCurrentVideo ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : isCurrentVideo ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  ) : (
                    originalIndex + 1
                  )}
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={video.id}
              href={`/cursos/${courseId}/aulas/${video.id}`}
              ref={isCurrentVideo ? currentVideoRef : null}
              className={`group flex gap-3 p-3 transition-all border-l-2 ${
                isCurrentVideo
                  ? 'bg-primary/10 border-l-primary'
                  : 'border-l-transparent hover:bg-neutral-800/50 hover:border-l-neutral-600'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative shrink-0 w-24 h-14 rounded-lg overflow-hidden bg-neutral-800">
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={video.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                )}

                {/* Play/Status overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                  isCurrentVideo ? 'bg-primary/40' : 'bg-black/0 group-hover:bg-black/40'
                }`}>
                  {isCurrentVideo ? (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-primary ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-900 ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Lesson number badge */}
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-medium text-white">
                  {String(originalIndex + 1).padStart(2, '0')}
                </div>

                {/* Watched badge */}
                {isWatched && (
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <h4 className={`text-sm font-medium line-clamp-2 leading-tight transition-colors ${
                  isCurrentVideo
                    ? 'text-primary'
                    : isWatched
                      ? 'text-neutral-400 group-hover:text-neutral-200'
                      : 'text-neutral-200 group-hover:text-white'
                }`}>
                  {video.title}
                </h4>
                {isCurrentVideo && (
                  <span className="text-xs text-primary/80 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Assistindo agora
                  </span>
                )}
                {isWatched && !isCurrentVideo && (
                  <span className="text-xs text-green-500/80 mt-1">Concluída</span>
                )}
              </div>
            </Link>
          );
        })}

        {filteredVideos.length === 0 && (
          <div className="p-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-neutral-600 mb-2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <p className="text-sm text-neutral-500">Nenhuma aula encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
}
