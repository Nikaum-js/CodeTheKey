# Code The Key - Documentação

## Visão Geral

**Code The Key** é um projeto de extensão universitária desenvolvido por estudantes do **UNASP Campus São Paulo**. A plataforma centraliza cursos gratuitos de programação do YouTube em um único lugar, funcionando como uma "biblioteca comunitária" que oferece uma experiência de aprendizado organizada.

### Equipe

- **Nikolas Santana**
- **José Corte**
- **Mateus Demuno**

### Missão

Democratizar o acesso à educação em tecnologia, reunindo os melhores cursos gratuitos de programação do YouTube em uma única plataforma organizada.

## Stack Tecnológica

- **Framework**: Next.js 15.3.3 (com Turbopack)
- **React**: 19.0.0
- **TypeScript**: 5.x
- **Estilização**: Tailwind CSS 3.4.1
- **Autenticação**: NextAuth.js com GitHub OAuth
- **Fonte**: Roboto (Google Fonts)
- **Ícones**: Lucide React + SVGs customizados

## Arquitetura do Projeto

```
src/
├── app/
│   ├── page.tsx                           # Landing page (Home)
│   ├── layout.tsx                         # Layout raiz da aplicação
│   ├── globals.css                        # Estilos globais + custom scrollbar
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts               # Configuração NextAuth
│   └── cursos/
│       ├── page.tsx                       # Listagem de cursos
│       └── [courseId]/
│           ├── page.tsx                   # Detalhes do curso
│           └── aulas/
│               └── [lessonId]/
│                   └── page.tsx           # Player de aula (redesenhado)
├── components/
│   ├── Header.tsx                         # Cabeçalho global com auth
│   ├── CourseCard.tsx                     # Card de exibição de curso
│   ├── CourseFilters.tsx                  # Filtros de categoria e busca
│   ├── CourseGrid.tsx                     # Grid de cursos com filtros
│   ├── CourseLessonsList.tsx              # Lista de aulas do curso
│   ├── LessonPlayer.tsx                   # Player de vídeo com ações
│   ├── LessonSidebar.tsx                  # Sidebar com lista de aulas e thumbnails
│   ├── LessonNavigation.tsx               # Navegação anterior/próxima aula
│   └── Providers.tsx                      # SessionProvider para NextAuth
├── hooks/
│   └── useProgress.ts                     # Hook para gerenciar progresso (localStorage)
└── services/
    └── youtube.ts                         # Integração com YouTube API
```

## Regras de Negócio

### 1. Catálogo de Cursos

- Os cursos são **playlists do YouTube** previamente selecionadas e cadastradas manualmente no sistema
- Cada curso possui uma descrição customizada (não usa a descrição original do YouTube)
- Os cursos são definidos estaticamente em `AVAILABLE_PLAYLISTS` no arquivo `youtube.ts`
- **30 cursos disponíveis** de canais como:
  - Curso em Vídeo (Gustavo Guanabara)
  - Rocketseat
  - Filipe Deschamps
  - Código Fonte TV
  - DevDojo
  - Traversy Media
  - The Net Ninja
  - Fireship
  - Hora de Codar
  - Otávio Miranda
  - E outros

### 2. Sistema de Categorias

Cursos são organizados em 6 categorias:
- **Frontend**: HTML/CSS, JavaScript, React, Vue.js, Next.js, Nuxt.js, Angular
- **Backend**: Spring Boot, Node.js, PHP
- **DevOps**: Git/GitHub, AWS, Docker, Linux
- **Dados**: Engenharia de Dados, Data Science
- **Mobile**: Flutter, React Native
- **Fundamentos**: Python, TypeScript, Java, Linguagem C, Algoritmos

### 3. Sistema de Aulas

- Cada aula corresponde a um **vídeo da playlist do YouTube**
- As aulas são numeradas sequencialmente pela posição na playlist
- O player embarca o vídeo do YouTube diretamente na plataforma
- Navegação entre aulas anterior/próxima disponível
- Barra de progresso visual mostra posição atual no curso
- **Paginação implementada**: busca todas as aulas (não apenas as 50 primeiras)

### 4. Sistema de Progresso

- Progresso do usuário salvo em **localStorage**
- Aulas podem ser marcadas/desmarcadas como concluídas (toggle)
- Barra de progresso exibe porcentagem de conclusão
- Filtro para mostrar apenas aulas não assistidas
- Progresso visível nos cards de curso e na lista de aulas

### 5. Autenticação

- Login via **GitHub OAuth** usando NextAuth.js
- Header exibe foto e nome do usuário logado
- Menu dropdown com opção de logout
- Configurado em `/api/auth/[...nextauth]/route.ts`

### 6. Integração com YouTube

A integração é feita via **YouTube Data API v3**:

```typescript
// Endpoints utilizados
GET /playlistItems  → Busca vídeos de uma playlist (com paginação)
GET /playlists      → Busca informações das playlists
```

**Funções principais:**
- `getAvailableCourses()`: Retorna lista de cursos disponíveis
- `getPlaylistVideos(playlistId)`: Retorna TODOS os vídeos de uma playlist (com paginação)
- `getVideoEmbedUrl(videoId)`: Gera URL de embed para o player

**Importante**: Apenas playlists públicas do YouTube são exibidas. Playlists privadas ou não listadas são ignoradas pela API.

### 7. Estrutura de Dados

```typescript
// Curso
interface Course {
  id: string;              // ID da playlist (lowercase)
  title: string;           // Título original do YouTube
  description: string;     // Descrição customizada
  instructor: {
    name: string;          // Nome do canal
    description: string;   // Descrição do instrutor
  };
  playlistId: string;      // ID original da playlist
  thumbnail: string;       // URL da thumbnail
  category: CourseCategory;// Categoria do curso
  totalLessons?: number;   // Total de aulas
}

// Vídeo/Aula
interface YouTubeVideo {
  id: string;              // ID do vídeo
  title: string;           // Título do vídeo
  description: string;     // Descrição do vídeo
  thumbnails: object;      // Thumbnails em diferentes tamanhos
  position: number;        // Posição na playlist
}

// Categorias
type CourseCategory = "frontend" | "backend" | "devops" | "data" | "mobile" | "fundamentos";
```

## Fluxo de Navegação

```
Home (/)
    │ ├── Apresentação do projeto
    │ ├── Informações sobre UNASP
    │ └── Seção "Sobre o Projeto"
    │
    └──→ Cursos (/cursos)
              │ ├── Filtro por categoria
              │ ├── Busca por título
              │ └── Indicador de progresso
              │
              └──→ Detalhes do Curso (/cursos/[courseId])
                        │ ├── Barra de progresso geral
                        │ ├── Busca de aulas
                        │ └── Filtro "não assistidas"
                        │
                        └──→ Aula (/cursos/[courseId]/aulas/[lessonId])
                                  ├── Player de vídeo imersivo
                                  ├── Botão toggle "Marcar como concluída"
                                  ├── Sidebar colapsável com thumbnails
                                  └── Navegação anterior/próxima
```

## Páginas e Funcionalidades

### Home (`/`)
- Badge "Projeto de Extensão - UNASP Campus SP"
- Hero section explicando o projeto
- Estatísticas: UNASP, YouTube, 100% Gratuito
- Seção "Sobre o Projeto" com história e missão
- Footer com nomes dos desenvolvedores

### Listagem de Cursos (`/cursos`)
- **Filtro por categoria** (Frontend, Backend, DevOps, etc.)
- **Busca por título** do curso
- Grid responsivo de cards de cursos
- **Indicador de progresso** em cada card
- Contador de aulas por curso

### Detalhes do Curso (`/cursos/[courseId]`)
- Informações do curso e instrutor
- **Barra de progresso geral** do curso
- **Busca de aulas** por título ou número
- **Filtro "Mostrar não assistidas"**
- Lista completa de aulas com thumbnails
- Indicador visual de aulas concluídas
- Link direto para playlist no YouTube
- Botão "Começar curso"

### Player de Aula (`/cursos/[courseId]/aulas/[lessonId]`) - **REDESENHADO**
- **Layout cinema mode** com background escuro
- **Top bar compacta** com navegação e progresso
- **Player de vídeo** com cantos arredondados e sombras
- **Barra de ações** com:
  - Botão toggle "Marcar como concluída" (pode desmarcar)
  - Link para YouTube
  - Botão "Próxima aula" destacado
- **Sidebar colapsável** com:
  - Thumbnails dos vídeos
  - Busca integrada
  - Barra de progresso
  - Scroll automático para aula atual
  - Indicador "Assistindo agora" com animação
- **Card de informações** com título e hashtags
- **Navegação** anterior/próxima aula estilizada
- **Scrollbar customizada**

## Design System

### Cores
| Token | Cor | Uso |
|-------|-----|-----|
| `primary` | `#F97316` (Laranja) | Destaques, botões, links |
| `neutral-950` | `#0a0a0a` | Background página de aula |
| `neutral-900` | `#09090B` | Background principal |
| `neutral-800` | `#18181B` | Cards, containers |
| `neutral-700` | `#202024` | Bordas |
| `neutral-100` | `#A3A3A3` | Texto secundário |
| `neutral-50` | `#FFFFFF` | Texto principal |
| `green-500` | `#22C55E` | Indicador de "concluído" |
| `red-400` | `#F87171` | Hover YouTube |

### Componentes Reutilizáveis

- **Header**: Cabeçalho global com logo e autenticação GitHub
- **CourseCard**: Card responsivo com thumbnail, título, descrição, progresso e instrutor
- **CourseFilters**: Filtros de categoria e busca
- **CourseGrid**: Grid de cursos com lógica de filtro
- **CourseLessonsList**: Lista de aulas com busca, filtro e progresso
- **LessonPlayer**: Player de vídeo com barra de ações e toggle de conclusão
- **LessonSidebar**: Sidebar colapsável com thumbnails, busca e progresso
- **LessonNavigation**: Navegação anterior/próxima aula

## Características Técnicas

### Server-Side Rendering
- Todas as páginas de cursos são **Server Components**
- Dados são buscados no servidor via `async/await`
- `force-dynamic` habilitado para páginas de curso individual
- Next.js 15 usa `params` como Promise (await necessário)

### Client Components
- Componentes interativos marcados com `"use client"`
- Header, filtros, player e sidebar são client components
- Hook `useProgress` para gerenciamento de estado local

### Otimizações
- Next.js Image para otimização de imagens (com `sizes` prop)
- Turbopack para desenvolvimento rápido
- CSS com backdrop-blur e transições suaves
- Scrollbar customizada para melhor UX

### Tratamento de Erros
- Throw de erros para cursos/vídeos não encontrados
- Console.error para falhas de API

## Configuração de Ambiente

### Variáveis de Ambiente (`.env.local`)

```env
GITHUB_ID=seu_github_client_id
GITHUB_SECRET=seu_github_client_secret
NEXTAUTH_SECRET=sua_secret_key
NEXTAUTH_URL=http://localhost:3000
```

### Configuração de Imagens (`next.config.js`)

```javascript
images: {
  remotePatterns: [
    { hostname: "i.ytimg.com" },           // Thumbnails YouTube
    { hostname: "avatars.githubusercontent.com" }, // Avatares GitHub
  ],
}
```

## Limitações Conhecidas

1. **Progresso local**: Progresso salvo em localStorage (não sincroniza entre dispositivos)
2. **Cursos estáticos**: Novos cursos precisam ser adicionados manualmente no código
3. **API Key exposta**: A chave da API do YouTube está hardcoded no código
4. **Playlists válidas**: Apenas playlists públicas do YouTube funcionam

## Funcionalidades Implementadas

- [x] Catálogo de 30 cursos gratuitos
- [x] Autenticação com GitHub
- [x] Sistema de progresso do usuário (localStorage)
- [x] Toggle para marcar/desmarcar aulas como concluídas
- [x] Busca e filtro de cursos por categoria
- [x] Paginação para playlists grandes
- [x] Interface responsiva e moderna
- [x] Landing page institucional (UNASP)
- [x] Player de vídeo redesenhado (cinema mode)
- [x] Sidebar colapsável com thumbnails
- [x] Scrollbar customizada

## Próximos Passos Sugeridos

1. Sincronizar progresso com banco de dados (para usuários logados)
2. Criar painel admin para gerenciar cursos
3. Mover API key para variáveis de ambiente
4. Implementar sistema de favoritos
5. Adicionar certificados de conclusão
6. Sistema de comentários/discussão por aula
