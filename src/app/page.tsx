import { Header } from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-neutral-900/50 to-neutral-900" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <div className="relative max-w-[1200px] mx-auto px-8 py-24">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span className="text-sm font-medium">Projeto de Extensão - UNASP Campus SP</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-50 mb-6">
              Os melhores cursos gratuitos em um só lugar
            </h1>
            <p className="text-xl text-neutral-100 mb-8 max-w-2xl">
              O <span className="text-primary font-semibold">Code The Key</span> é um projeto de extensão universitária desenvolvido por estudantes do UNASP Campus São Paulo. Nossa missão é democratizar o acesso à educação em tecnologia, reunindo os melhores cursos gratuitos de programação do YouTube em uma única plataforma organizada.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/cursos"
                className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                Explorar biblioteca
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/cursos"
                className="text-neutral-100 hover:text-neutral-50 font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 border border-neutral-800 hover:border-neutral-700"
              >
                Ver categorias
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-b border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">UNASP</div>
              <div className="text-neutral-100">Projeto de Extensão</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">YouTube</div>
              <div className="text-neutral-100">Melhores cursos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-neutral-100">Gratuito</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="border-b border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-neutral-50 mb-6">Sobre o Projeto</h2>
            <p className="text-neutral-100 text-lg leading-relaxed mb-6">
              O <span className="text-primary font-semibold">Code The Key</span> nasceu da necessidade de facilitar o acesso a conteúdo de qualidade para quem deseja aprender programação. Como estudantes de tecnologia do UNASP Campus São Paulo, entendemos os desafios de encontrar bons materiais de estudo gratuitos na internet.
            </p>
            <p className="text-neutral-100 text-lg leading-relaxed">
              Por isso, criamos esta plataforma que reúne e organiza os melhores cursos de programação disponíveis no YouTube, permitindo que você acompanhe seu progresso e aprenda de forma estruturada, sem custo algum.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-8">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-neutral-400 text-sm">
            Desenvolvido por <span className="text-primary">Nikolas Santana</span>, <span className="text-primary">José Corte</span> e <span className="text-primary">Mateus Demuno</span> - UNASP Campus São Paulo
          </p>
        </div>
      </footer>
    </div>
  );
}