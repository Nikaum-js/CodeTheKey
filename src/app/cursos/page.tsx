import { Header } from "@/components/Header";
import { CourseGrid } from "@/components/CourseGrid";
import { getAvailableCourses } from '@/services/youtube';

export default async function CoursesPage() {
  const courses = await getAvailableCourses();

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      <main className="max-w-[1200px] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-4 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Biblioteca Comunitária
            </div>
            <h1 className="text-4xl font-bold text-neutral-50 mb-4">Aprenda programação gratuitamente</h1>
            <p className="text-neutral-100 text-lg leading-relaxed">
              O Code The Key é uma biblioteca comunitária que reúne os melhores cursos gratuitos de programação disponíveis no YouTube. Nossa missão é democratizar o acesso ao conhecimento, organizando conteúdo de qualidade em um só lugar.
            </p>
          </div>

          <div className="flex flex-col gap-4 bg-neutral-800/50 backdrop-blur-sm p-6 rounded-xl border border-neutral-700/50 min-w-[280px]">
            <div className="flex items-center gap-3 text-neutral-50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <span className="font-medium">100% Gratuito</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-medium">Conteúdo Curado</span>
            </div>

            <div className="flex items-center gap-3 text-neutral-50">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <circle cx="12" cy="8" r="7"/>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                </svg>
              </div>
              <span className="font-medium">Professores Experientes</span>
            </div>
          </div>
        </div>

        <CourseGrid courses={courses} />
      </main>
    </div>
  );
}
