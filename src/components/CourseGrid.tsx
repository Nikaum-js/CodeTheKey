"use client";

import { useState, useMemo } from 'react';
import { Course, CourseCategory } from '@/services/youtube';
import { CourseCard } from './CourseCard';
import { CourseFilters } from './CourseFilters';
import { useProgress } from '@/hooks/useProgress';

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | null>(null);
  const { getCourseProgress, isLoaded } = useProgress();

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      // Filter by category
      if (selectedCategory && course.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDescription = course.description.toLowerCase().includes(query);
        const matchesInstructor = course.instructor.name.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDescription && !matchesInstructor) {
          return false;
        }
      }

      return true;
    });
  }, [courses, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8">
      <CourseFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredCourses.length === 0 ? (
        <div className="text-center py-16">
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
          <h3 className="text-xl font-medium text-neutral-50 mb-2">
            Nenhum curso encontrado
          </h3>
          <p className="text-neutral-400">
            Tente ajustar os filtros ou buscar por outro termo.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-neutral-400 text-sm">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                thumbnail={course.thumbnail}
                category={course.category}
                totalLessons={course.totalLessons}
                watchedLessons={isLoaded ? getCourseProgress(course.id) : 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
