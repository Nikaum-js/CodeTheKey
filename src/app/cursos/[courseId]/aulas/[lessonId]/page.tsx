import Link from 'next/link';
import { getPlaylistVideos, getAvailableCourses, getVideoEmbedUrl } from '@/services/youtube';
import { Header } from '@/components/Header';
import { LessonPlayer } from '@/components/LessonPlayer';
import { LessonSidebar } from '@/components/LessonSidebar';
import { LessonNavigation } from '@/components/LessonNavigation';

interface LessonPageProps {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  const courses = await getAvailableCourses();
  const course = courses.find(course => course.id === courseId);
  if (!course) {
    throw new Error('Course not found');
  }

  const videos = await getPlaylistVideos(course.playlistId);
  const currentVideo = videos.find(video => video.id === lessonId);
  if (!currentVideo) {
    throw new Error('Video not found');
  }

  const currentIndex = videos.findIndex(video => video.id === lessonId);
  const previousVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-neutral-950">
      <Header />

      {/* Compact Top Bar */}
      <div className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800/50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Left: Back + Course Info */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href={`/cursos/${courseId}`}
                className="shrink-0 w-9 h-9 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </Link>

              <div className="hidden sm:block h-6 w-px bg-neutral-700/50" />

              <div className="min-w-0 hidden sm:block">
                <p className="text-sm font-medium text-neutral-200 truncate">{course.title}</p>
                <p className="text-xs text-neutral-500 truncate">{course.instructor.name}</p>
              </div>
            </div>

            {/* Center: Progress */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-800/60 border border-neutral-700/30">
                <span className="text-xs text-neutral-400">Aula</span>
                <span className="text-sm font-semibold text-white">{currentIndex + 1}</span>
                <span className="text-xs text-neutral-500">/</span>
                <span className="text-sm text-neutral-400">{videos.length}</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / videos.length) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-primary">
                  {Math.round(((currentIndex + 1) / videos.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <a
                href={`https://www.youtube.com/watch?v=${currentVideo.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-800/60 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-all border border-neutral-700/30 hover:border-red-500/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span className="hidden sm:inline text-sm">YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Area */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Player */}
            <LessonPlayer
              courseId={courseId}
              lessonId={lessonId}
              embedUrl={getVideoEmbedUrl(lessonId)}
              title={currentVideo.title}
              hasNextLesson={!!nextVideo}
            />

            {/* Video Info Card */}
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800/50 p-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Aula {currentIndex + 1}
                </span>
                <span className="text-sm text-neutral-500">{course.instructor.name}</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                {currentVideo.title}
              </h1>

              {/* Tags */}
              {currentVideo.description.includes('#') && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentVideo.description
                    .split(/\s+/)
                    .filter(word => word.startsWith('#'))
                    .slice(0, 8)
                    .map((tag, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 rounded-md bg-neutral-800/80 text-neutral-400 text-xs font-medium hover:bg-neutral-700/80 hover:text-neutral-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              )}

              {/* Navigation */}
              <LessonNavigation
                courseId={courseId}
                previousVideo={previousVideo}
                nextVideo={nextVideo}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[380px] xl:w-[420px] shrink-0">
            <div className="lg:sticky lg:top-20">
              <LessonSidebar
                courseId={courseId}
                videos={videos}
                currentVideoId={currentVideo.id}
                courseTitle={course.title}
                totalLessons={videos.length}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
