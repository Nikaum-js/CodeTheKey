"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useProgress } from '@/hooks/useProgress';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
}

interface CourseLessonsListProps {
  courseId: string;
  videos: Video[];
}

export function CourseLessonsList({ courseId, videos }: CourseLessonsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyUnwatched, setShowOnlyUnwatched] = useState(false);
  const { isLessonWatched, getCourseProgress, isLoaded } = useProgress();

  const watchedCount = isLoaded ? getCourseProgress(courseId) : 0;
  const progressPercentage = videos.length > 0 ? Math.round((watchedCount / videos.length) * 100) : 0;

  const filteredVideos = useMemo(() => {
    return videos.filter((video, index) => {
      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = video.title.toLowerCase().includes(query);
        const matchesNumber = String(index + 1).includes(query);
        if (!matchesTitle && !matchesNumber) {
          return false;
        }
      }

      // Filter by watched status
      if (showOnlyUnwatched && isLoaded && isLessonWatched(courseId, video.id)) {
        return false;
      }

      return true;
    });
  }, [videos, searchQuery, showOnlyUnwatched, courseId, isLessonWatched, isLoaded]);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-neutral-700/50 p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-neutral-50">Seu progresso</h3>
              <p className="text-sm text-neutral-400">
                {isLoaded ? `${watchedCount} de ${videos.length} aulas concluídas` : 'Carregando...'}
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary">{progressPercentage}%</div>
        </div>
        <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Buscar aula por título ou número..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-50 placeholder-neutral-400 focus:outline-none focus:border-primary/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={() => setShowOnlyUnwatched(!showOnlyUnwatched)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${
            showOnlyUnwatched
              ? 'bg-primary/10 border-primary/50 text-primary'
              : 'bg-neutral-800/50 border-neutral-700/50 text-neutral-100 hover:border-neutral-600/50'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          {showOnlyUnwatched ? 'Mostrando não assistidas' : 'Mostrar não assistidas'}
        </button>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-neutral-400">
        <span>
          {filteredVideos.length === videos.length
            ? `${videos.length} aulas`
            : `${filteredVideos.length} de ${videos.length} aulas`}
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-primary hover:underline"
          >
            Limpar busca
          </button>
        )}
      </div>

      {/* Lessons List */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mx-auto text-neutral-600 mb-4"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <h3 className="text-xl font-medium text-neutral-50 mb-2">Nenhuma aula encontrada</h3>
          <p className="text-neutral-400">
            {showOnlyUnwatched
              ? 'Você já assistiu todas as aulas! Parabéns!'
              : 'Tente buscar por outro termo.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVideos.map((video) => {
            const originalIndex = videos.findIndex(v => v.id === video.id);
            const isWatched = isLoaded && isLessonWatched(courseId, video.id);

            return (
              <Link
                key={video.id}
                href={`/cursos/${courseId}/aulas/${video.id}`}
                className="group bg-neutral-800/50 backdrop-blur-sm rounded-xl border border-neutral-700/50 overflow-hidden hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="relative shrink-0 w-32 h-20 rounded-lg overflow-hidden bg-neutral-700">
                    <Image
                      src={video.thumbnails.medium?.url || video.thumbnails.default?.url}
                      alt={video.title}
                      fill
                      sizes="128px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Play overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                      </div>
                    </div>
                    {/* Lesson number badge */}
                    <div className="absolute top-1 left-1 px-2 py-0.5 rounded bg-black/70 text-xs font-medium text-white">
                      {String(originalIndex + 1).padStart(2, '0')}
                    </div>
                    {/* Watched badge */}
                    {isWatched && (
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className={`font-medium line-clamp-2 group-hover:text-primary transition-colors ${
                      isWatched ? 'text-neutral-300' : 'text-neutral-50'
                    }`}>
                      {video.title}
                    </h3>
                    {isWatched && (
                      <span className="text-xs text-green-500 mt-1">Concluída</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
