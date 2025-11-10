# Code The Key

Uma plataforma que reúne os melhores cursos gratuitos de programação do YouTube em um só lugar.

**Projeto de Extensão - UNASP Campus São Paulo**

## Sobre o Projeto

O **Code The Key** nasceu da necessidade de facilitar o acesso a conteúdo de qualidade para quem deseja aprender programação. Como estudantes de tecnologia do UNASP Campus São Paulo, entendemos os desafios de encontrar bons materiais de estudo gratuitos na internet.

Por isso, criamos esta plataforma que reúne e organiza os melhores cursos de programação disponíveis no YouTube, permitindo que você acompanhe seu progresso e aprenda de forma estruturada, sem custo algum.

## Equipe

- **Nikolas Santana**
- **José Corte**
- **Mateus Demuno**

## Funcionalidades

- 30+ cursos gratuitos de programação
- Organização por categorias (Frontend, Backend, DevOps, Mobile, Dados, Fundamentos)
- Sistema de progresso pessoal
- Busca e filtros avançados
- Player de vídeo integrado
- Autenticação com GitHub
- Interface moderna e responsiva

## Tech Stack

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **NextAuth.js** - Autenticação
- **YouTube Data API v3** - Integração com playlists

## Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no GitHub (para OAuth)
- Chave da API do YouTube

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/code-the-key.git
cd code-the-key
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o `.env.local` com suas credenciais:
```env
GITHUB_ID=seu_github_client_id
GITHUB_SECRET=seu_github_client_secret
NEXTAUTH_SECRET=sua_secret_key
NEXTAUTH_URL=http://localhost:3000
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter
```

## Estrutura do Projeto

```
src/
├── app/                    # Rotas e páginas (App Router)
│   ├── page.tsx           # Landing page
│   ├── cursos/            # Páginas de cursos
│   └── api/auth/          # API de autenticação
├── components/            # Componentes React
├── hooks/                 # Custom hooks
└── services/              # Serviços e integrações
```

## Categorias de Cursos

| Categoria | Conteúdo |
|-----------|----------|
| Frontend | HTML/CSS, JavaScript, React, Vue.js, Next.js |
| Backend | Node.js, Spring Boot, PHP |
| DevOps | Git, Docker, AWS, Linux |
| Mobile | Flutter, React Native |
| Dados | Engenharia de Dados, Data Science |
| Fundamentos | Python, Java, TypeScript, Algoritmos |

## Canais Parceiros

Os cursos são selecionados dos melhores canais de programação do YouTube:

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

## Documentação

Para informações técnicas detalhadas, consulte a [DOCUMENTATION.md](./DOCUMENTATION.md).

## Contribuindo

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto é desenvolvido como parte do programa de extensão universitária do UNASP Campus São Paulo.

---

Desenvolvido com dedicação por estudantes do **UNASP Campus São Paulo**
