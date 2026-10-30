// ===== Centralized config. Replace the marked placeholders. =====
export const GITHUB = import.meta.env.VITE_GITHUB_PROFILE
export const LINKEDIN = import.meta.env.VITE_LINKIN_PROFILE// TODO: add your LinkedIn profile URL (link is hidden while empty)
export const EMAIL = import.meta.env.VITE_EMAIL // TODO: replace with your real email
export const LOCATION = 'Nepal'

export interface Project { name: string; category: string; description: string; features: string[]; tech: string[]; repo?: string; demo?: string; hue: string }
// repo: add real URLs where marked. Without one, the card links to the GitHub profile instead of a guessed URL.

export const projects: Project[] = [
  {
    name: 'Ujyalo',
    category: 'AI-Powered Learning Management System',
    hue: '#D99A55',
    description:
      'An AI-powered learning platform that improves online education through intelligent assistance, course discovery, and instructor-student interaction.',
    features: [
      'AI learning assistant',
      'Course and instructor discovery',
      'Student and instructor dashboards',
      'Real-time messaging',
      'Microservices backend',
      'RAG knowledge retrieval',
      'Payment integration',
    ],
    tech: [
      'React',
      'Next.js',
      'NestJS',
      'MongoDB',
      'Redis',
      'RabbitMQ',
      'LangChain',
      'LangGraph',
      'Qdrant',
      'Docker',
    ],
    repo: 'https://github.com/Sujan-Bhandari07/lms',
  },

  {
    name: 'Gothalo AI',
    category: 'Multi-Agent AI Productivity Platform',
    hue: '#C27E3E',
    description:
      'A multi-agent AI productivity platform that combines intelligent conversation, web research, document understanding, and content generation in one unified workspace.',
    features: [
      'AI-powered conversational assistant',
      'Intelligent web search and research',
      'PDF upload and document processing',
      'AI-powered PDF summarization',
      'Document question answering',
      'RAG-based retrieval from uploaded PDFs',
      'AI-generated PowerPoint presentations',
      'Multi-agent orchestration and task routing',
      'Context-aware responses using document knowledge',
    ],
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'LangChain',
      'LangGraph',
      'LLMs',
      'RAG',
      'Qdrant',
      'Redis',
      'RabbitMQ',
      'Docker',
    ],repo: 'https://github.com/Sujan-Bhandari07/gothalo'
    // Add the actual Gothalo AI repository URL when available.
  },

  {
    name: 'BuffaloIDE',
    category: 'AI-Powered Development Environment',
    hue: '#8E6845',
    description:
      'An AI-powered development environment designed to enhance software development through intelligent assistance, an integrated developer workspace, and distributed backend services.',
    features: [
      'AI-assisted development workflows',
      'Dedicated development workspace',
      'Multi-service backend architecture',
      'Authentication and user management',
      'Distributed service communication',
      'Redis and RabbitMQ integration',
      'Nginx API gateway',
      'Cloud-based media management',
    ],
    tech: [
      'Node.js',
      'TypeScript',
      'React',
      'Redis',
      'RabbitMQ',
      'Docker',
      'Nginx',
      'Cloudinary',
    ],
    repo: 'https://github.com/Sujan-Bhandari07/buffaloide',
  },

  {
    name: 'Nepdaa',
    category: 'Social Media Platform',
    hue: '#C27E3E',
    description:
      'A social networking application focused on real-time interactions, content sharing, and community engagement.',
    features: [
      'Posts and stories',
      'Likes and comments',
      'Bookmarks',
      'Real-time communication',
      'User authentication',
      'Full-stack application architecture',
    ],
    tech: [
      'TypeScript',
      'Express.js',
      'React',
      'MongoDB',
      'WebSockets',
    ],
    repo: 'https://github.com/Sujan-Bhandari07/NEPDAA',
  },

  {
    name: 'Forever',
    category: 'Full-Stack E-Commerce Platform',
    hue: '#A5A29C',
    description:
      'A full-stack e-commerce application built to deliver a seamless online shopping experience with a database-driven backend.',
    features: [
      'Product browsing',
      'Shopping experience',
      'Backend API integration',
      'Database-driven product management',
      'Responsive user interface',
    ],
    tech: [
      'JavaScript',
      'React',
      'Express.js',
      'MongoDB',
    ],
    repo: 'https://github.com/Sujan-Bhandari07/Ecommerce',
  },

  {
    name: 'Zentry',
    category: 'Animated Gaming Website',
    hue: '#B8864B',
    description:
      'An immersive gaming-themed website focused on creative frontend development, interactive experiences, and advanced animation.',
    features: [
      'Advanced GSAP animations',
      'Interactive visual sections',
      'Scroll-based storytelling',
      'Smooth transitions',
      'Responsive design',
    ],
    tech: [
      'React',
      'TypeScript',
      'GSAP',
      'Tailwind CSS',
    ],
    repo: 'https://github.com/Sujan-Bhandari07/zentry',
  },

  {
    name: 'Mojito',
    category: 'Animated Beverage / Cafe Website',
    hue: '#7C8F6B',
    description:
      'A visually engaging beverage landing page featuring cinematic motion, smooth transitions, and interactive product storytelling.',
    features: [
      'GSAP-powered animations',
      'ScrollTrigger interactions',
      'Animated product presentations',
      'Smooth transitions',
      'Responsive layout',
    ],
    tech: [
      'React',
      'TypeScript',
      'GSAP',
      'Tailwind CSS',
    ],
    repo: 'https://github.com/Sujan-Bhandari07/Mojito',
  },
]

export const stack: { title: string; items: string[] }[] = [
  { title: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Three.js', 'React Three Fiber'] },
  { title: 'Backend', items: ['Node.js', 'NestJS', 'Express.js', 'REST APIs', 'WebSockets'] },
  { title: 'Data & Infrastructure', items: ['MongoDB', 'Redis', 'RabbitMQ', 'Docker', 'Nx', 'Cloudinary'] },
  { title: 'AI & Vector Search', items: ['LangChain', 'LangGraph', 'Qdrant', 'LLM integrations', 'RAG'] },
]
export const areas = [
  { title: 'Full-Stack Development', points: ['Modern frontend applications', 'Scalable backend APIs', 'Authentication and authorization', 'Database-driven systems'] },
  { title: 'Distributed Systems', points: ['Microservices architecture', 'RabbitMQ messaging', 'Redis caching and sessions', 'Real-time WebSocket communication'] },
  { title: 'AI Engineering', points: ['LLM integrations', 'LangChain and LangGraph', 'RAG architectures and vector databases', 'AI agent workflows'] },
  { title: 'Creative Development', points: ['GSAP animation', 'Interactive interfaces', 'Three.js and React Three Fiber', 'Immersive web experiences'] },
]
export const nav = [['Home', '#home'], ['About', '#about'], ['Projects', '#projects'], ['Tech Stack', '#stack'], ['Contact', '#contact']] as const
