interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  position: number;
}

interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    position: number;
    resourceId: {
      videoId: string;
    };
    channelTitle: string;
  };
}

interface PlaylistInfo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
    };
    channelTitle: string;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    description: string;
  };
  playlistId: string;
  thumbnail: string;
  category: CourseCategory;
  totalLessons?: number;
}

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_API_KEY = "AIzaSyDyzDv96B3vyIekxdgrv9x2jvJ2m4a55-Q";

export type CourseCategory = "frontend" | "backend" | "devops" | "data" | "mobile" | "fundamentos";

export const CATEGORIES: { id: CourseCategory; name: string }[] = [
  { id: "frontend", name: "Frontend" },
  { id: "backend", name: "Backend" },
  { id: "devops", name: "DevOps" },
  { id: "data", name: "Dados" },
  { id: "mobile", name: "Mobile" },
  { id: "fundamentos", name: "Fundamentos" },
];

interface CourseInfo {
  id: string;
  description: string;
  category: CourseCategory;
}

// Apenas playlists válidas e públicas do YouTube
const AVAILABLE_PLAYLISTS: CourseInfo[] = [
  {
    id: "PLHz_AreHm4dlKP6QQCekuIPky1CiwmdI6",
    description:
      "Python é uma linguagem moderna e versátil, usada por empresas como Google, YouTube e muitas outras. Neste curso, você aprenderá os fundamentos da programação Python de forma clara e objetiva, ideal para iniciantes.",
    category: "fundamentos",
  },
  {
    id: "PLs5wTEi6ddhBsgqe6Rs5NBb6rKc9y4tNW",
    description:
      "Curso completo de Engenharia de Dados com foco em Azure. Aprenda ETL, Data Lake, Data Warehouse, Azure Data Factory, Databricks e construa pipelines de dados profissionais.",
    category: "data",
  },
  {
    id: "PL_m43UlJFjF5wecIJOybo82vEUlEioP9W",
    description:
      "Aprenda Nuxt.js do zero e desenvolva aplicações web modernas com Vue.js. Do básico ao avançado, você aprenderá sobre renderização universal, SEO, middlewares e construirá um projeto real usando a API do Rick and Morty.",
    category: "frontend",
  },
  {
    id: "PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1",
    description:
      "Aprenda HTML5 e CSS3 do zero e crie sites responsivos e modernos. Curso completo para iniciantes que querem entrar no mundo do desenvolvimento web.",
    category: "frontend",
  },
  {
    id: "PLJ0AcghBBWSi6nK2CUkw9ngvwWB1gE8mL",
    description:
      "Curso completo de TypeScript. Aprenda tipagem estática, interfaces, generics e como usar TypeScript em projetos reais para escrever código mais seguro.",
    category: "fundamentos",
  },
  {
    id: "PLHz_AreHm4dm7ZULPAmadvNhH6vk9oNZA",
    description:
      "Curso de Git e GitHub do básico ao avançado. Aprenda versionamento de código, branches, merge, pull requests e colaboração em projetos open source.",
    category: "devops",
  },
  {
    id: "PLpaKFn4Q4GMOBAeqC1S5_Fna_Y5XaOQS2",
    description:
      "Curso completo de Linguagem C para iniciantes. Aprenda a base da programação com uma das linguagens mais importantes da história da computação.",
    category: "fundamentos",
  },
  {
    id: "PL62G310vn6nFIsOCC0H-C2infYgwm8SWW",
    description:
      "Curso completo de Spring Boot com Java. Aprenda a criar APIs REST profissionais, segurança, JPA e boas práticas de desenvolvimento.",
    category: "backend",
  },
  {
    id: "PLf-O3X2-mxDmXQU-mJVgeaSL7Rtejvv0S",
    description:
      "Curso de AWS para desenvolvedores. Aprenda EC2, S3, Lambda, RDS e como fazer deploy de aplicações na nuvem Amazon.",
    category: "devops",
  },
  // Curso em Vídeo - Gustavo Guanabara
  {
    id: "PLHz_AreHm4dkcVCk2Bn_fdVQ81Fkrh6WT",
    description:
      "Curso de JavaScript com foco em DOM, eventos e interatividade. Aprenda a manipular páginas web de forma dinâmica.",
    category: "frontend",
  },
  {
    id: "PLHz_AreHm4dk_nZHmxxf_J0WRAqy5Czye",
    description:
      "Curso de PHP moderno para iniciantes. Aprenda a criar sistemas web dinâmicos com uma das linguagens mais utilizadas no backend.",
    category: "backend",
  },
  {
    id: "PLHz_AreHm4dlAnJ_jJtV29RFxnPHDuk9o",
    description:
      "Curso de Photoshop CC completo. Aprenda edição de imagens, manipulação, efeitos e design gráfico profissional.",
    category: "frontend",
  },
  // Rocketseat
  {
    id: "PL85ITvJ7FLoiuaKgHFYgrhZDwXOUEaxWI",
    description:
      "Maratona Discover da Rocketseat. Aprenda desenvolvimento web do zero com HTML, CSS e JavaScript de forma prática.",
    category: "frontend",
  },
  // Filipe Deschamps
  {
    id: "PLMdYygf53DP5SVQQrkKCVWDS0TwYLVitL",
    description:
      "Curso completo de Ciência da Computação. Fundamentos, algoritmos, estruturas de dados e conceitos essenciais para programadores.",
    category: "fundamentos",
  },
  // Código Fonte TV
  {
    id: "PLVc5bWuiFQ8GgKm5m0cZE6E02amJho94o",
    description:
      "Dicionário do Programador. Aprenda os principais termos e conceitos de programação de forma clara e objetiva.",
    category: "fundamentos",
  },
  // DevDojo
  {
    id: "PL62G310vn6nF3gssjqfCKLpTK2sZJ_a_1",
    description:
      "Curso de Java completo e atualizado. POO, collections, streams, lambdas e desenvolvimento de aplicações robustas.",
    category: "fundamentos",
  },
  // Traversy Media (em inglês, mas muito popular)
  {
    id: "PLillGF-RfqbYeckUaD1z6nviTp31GLTH8",
    description:
      "Modern JavaScript from the Beginning. Complete course covering ES6+, async/await, OOP, and real-world projects.",
    category: "fundamentos",
  },
  {
    id: "PLillGF-RfqbZTASqIqdvm1R5mLrQq79CU",
    description:
      "Node.js crash course and tutorials. Build REST APIs, work with Express, MongoDB and deploy applications.",
    category: "backend",
  },
  {
    id: "PLillGF-RfqbaEmlPcX5e_ejaK7Y5MydkW",
    description:
      "React Front to Back course. Learn React hooks, context API, Redux and build real-world applications.",
    category: "frontend",
  },
  // The Net Ninja
  {
    id: "PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d",
    description:
      "Vue.js 3 complete tutorial. Learn composition API, Vuex, Vue Router and build modern web applications.",
    category: "frontend",
  },
  {
    id: "PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf",
    description:
      "Flutter tutorial for beginners. Build beautiful mobile apps for iOS and Android with a single codebase.",
    category: "mobile",
  },
  {
    id: "PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ",
    description:
      "Next.js crash course. Learn server-side rendering, static generation, and build production-ready React apps.",
    category: "frontend",
  },
  // Fireship
  {
    id: "PL0vfts4VzfNiI1BsIK5u7LpPaIDKMJIDN",
    description:
      "Fireship tutorials on modern web development. Quick, practical guides on the latest technologies and frameworks.",
    category: "frontend",
  },
  // Hora de Codar
  {
    id: "PLnDvRpP8BnezfJcfiClWskFOLODeqI_Ft",
    description:
      "Curso de Python completo e gratuito. Do básico ao avançado com projetos práticos e aplicações reais.",
    category: "fundamentos",
  },
  {
    id: "PLnDvRpP8BneysKU8KivhnrVaKpILD3gZ6",
    description:
      "Curso completo de Docker. Aprenda containers, imagens, compose, volumes e orquestração de aplicações.",
    category: "devops",
  },
  // Otávio Miranda
  {
    id: "PLbIBj8vQhvm0ayQsrhEf-7-8JAj-MwmPr",
    description:
      "Curso de Python 3 do básico ao avançado com projetos reais. POO, Django, automação e muito mais.",
    category: "fundamentos",
  },
  {
    id: "PLbIBj8vQhvm2WT-pjGS5x7zUzmh4VgvRk",
    description:
      "Curso de JavaScript e TypeScript do básico ao avançado. Aprenda as duas linguagens mais importantes do frontend.",
    category: "fundamentos",
  },
  // Gustavo Guanabara - Algoritmos
  {
    id: "PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV",
    description:
      "Curso de Algoritmos e Lógica de Programação. Aprenda os fundamentos essenciais antes de qualquer linguagem.",
    category: "fundamentos",
  },
  // Cursos de Linux
  {
    id: "PLucm8g_ezqNp92MmkF9p_cj4yhT-fCTl7",
    description:
      "Curso de Linux completo. Aprenda linha de comando, administração de sistemas e gerenciamento de servidores.",
    category: "devops",
  },
  // Programação Web
  {
    id: "PLwXQLZ3FdTVF9Y0RbsuN54XYP7D0dZIlR",
    description:
      "Curso de Desenvolvimento Web completo. HTML, CSS, JavaScript, responsividade e boas práticas de frontend.",
    category: "frontend",
  },
];

export async function getPlaylistVideos(
  playlistId: string
): Promise<YouTubeVideo[]> {
  const allVideos: YouTubeVideo[] = [];
  let nextPageToken: string | undefined;

  try {
    do {
      const url = new URL(`${YOUTUBE_API_URL}/playlistItems`);
      url.searchParams.set("part", "snippet");
      url.searchParams.set("maxResults", "50");
      url.searchParams.set("playlistId", playlistId);
      url.searchParams.set("key", YOUTUBE_API_KEY);
      if (nextPageToken) {
        url.searchParams.set("pageToken", nextPageToken);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Failed to fetch playlist data");
      }

      const data = await response.json();

      const videos = data.items.map((item: PlaylistItem) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        position: item.snippet.position,
      }));

      allVideos.push(...videos);
      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return allVideos;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw error;
  }
}

export async function getAvailableCourses(): Promise<Course[]> {
  try {
    const allPlaylistIds = AVAILABLE_PLAYLISTS.map((p) => p.id);

    const playlistsResponse = await fetch(
      `${YOUTUBE_API_URL}/playlists?part=snippet,contentDetails&id=${allPlaylistIds.join(",")}&key=${YOUTUBE_API_KEY}`
    );

    if (!playlistsResponse.ok) {
      throw new Error("Failed to fetch playlists data");
    }

    const data = await playlistsResponse.json();

    const courses = data.items.map((playlist: PlaylistInfo & { contentDetails?: { itemCount: number } }) => {
      const courseInfo = AVAILABLE_PLAYLISTS.find((p) => p.id === playlist.id);

      return {
        id: playlist.id.toLowerCase(),
        title: playlist.snippet.title,
        description: courseInfo?.description || "Sem descrição",
        instructor: {
          name: playlist.snippet.channelTitle,
          description: `Professor do curso ${playlist.snippet.title}`,
        },
        playlistId: playlist.id,
        thumbnail: playlist.snippet.thumbnails.high.url,
        category: courseInfo?.category || "fundamentos",
        totalLessons: playlist.contentDetails?.itemCount || 0,
      };
    });

    return courses;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
}

export function getVideoEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}
