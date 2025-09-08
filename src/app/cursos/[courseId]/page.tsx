import Link from 'next/link';
import { getPlaylistVideos, getAvailableCourses, CATEGORIES } from '@/services/youtube';
import { Header } from '@/components/Header';
import { CourseLessonsList } from '@/components/CourseLessonsList';

export const dynamic = 'force-dynamic';

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const courses = await getAvailableCourses();
  const course = courses.find(course => course.id === courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  const videos = await getPlaylistVideos(course.playlistId);
  const categoryInfo = CATEGORIES.find(c => c.id === course.category);

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      {/* Course Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/50">
        <div className="max-w-[1200px] mx-auto px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/cursos"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-800/50 text-neutral-100 hover:text-primary hover:bg-neutral-800 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                {categoryInfo?.name || course.category}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-400 text-sm">{videos.length} aulas</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-neutral-50 mb-4">{course.title}</h1>

          <p className="text-lg text-neutral-100 leading-relaxed mb-6 max-w-3xl">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-50">{course.instructor.name}</p>
                <p className="text-xs text-neutral-400">Instrutor</p>
              </div>
            </div>

            <a
              href={`https://www.youtube.com/playlist?list=${course.playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 border border-neutral-700/50 text-neutral-100 hover:text-primary hover:border-primary/50 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              <span className="text-sm">Ver playlist no YouTube</span>
            </a>

            {videos.length > 0 && (
              <Link
                href={`/cursos/${courseId}/aulas/${videos[0].id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span className="text-sm font-medium">Começar curso</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <main className="max-w-[1200px] mx-auto px-8 py-8">
        <CourseLessonsList courseId={courseId} videos={videos} />
      </main>
    </div>
  );
}
