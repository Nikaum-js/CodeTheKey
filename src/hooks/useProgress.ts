"use client";

import { useState, useEffect, useCallback } from 'react';

interface CourseProgress {
  [lessonId: string]: boolean;
}

interface AllProgress {
  [courseId: string]: CourseProgress;
}

const STORAGE_KEY = 'code-the-key-progress';

function getStoredProgress(): AllProgress {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress: AllProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    console.error('Failed to save progress to localStorage');
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<AllProgress>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(getStoredProgress());
    setIsLoaded(true);
  }, []);

  const markLessonAsWatched = useCallback((cId: string, lessonId: string) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [cId]: {
          ...prev[cId],
          [lessonId]: true,
        },
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const unmarkLesson = useCallback((cId: string, lessonId: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (newProgress[cId]) {
        delete newProgress[cId][lessonId];
        if (Object.keys(newProgress[cId]).length === 0) {
          delete newProgress[cId];
        }
      }
      saveProgress(newProgress);
      return newProgress;
    });
  }, []);

  const isLessonWatched = useCallback((cId: string, lessonId: string): boolean => {
    return progress[cId]?.[lessonId] || false;
  }, [progress]);

  const getCourseProgress = useCallback((cId: string): number => {
    const courseProgress = progress[cId];
    if (!courseProgress) return 0;
    return Object.keys(courseProgress).length;
  }, [progress]);

  const getProgressPercentage = useCallback((cId: string, totalLessons: number): number => {
    if (totalLessons === 0) return 0;
    const watched = getCourseProgress(cId);
    return Math.round((watched / totalLessons) * 100);
  }, [getCourseProgress]);

  return {
    progress,
    isLoaded,
    markLessonAsWatched,
    unmarkLesson,
    isLessonWatched,
    getCourseProgress,
    getProgressPercentage,
  };
}
