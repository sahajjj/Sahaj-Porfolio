export const SAHAJ = {
  name: 'Sahaj Sharma',
  title: 'Aspiring Software Engineer | Full Stack Developer',
  email: 'Ssahaj646@gmail.com',
  phone: '+91 81780227719',
  linkedin: 'https://www.linkedin.com/in/sahaj-sharma-ba8464315/',
  github: 'https://github.com/Sahaj1864'
}

export const EXPERIENCE = [
  {
    company: 'Gatepax AI',
    role: 'FRONTEND DEVELOPER (PART-TIME)',
    period: 'Sept 2024 - Nov 2024',
    bullets: [
      'Developed responsive, pixel-perfect UI components for 500K+ DAU e-commerce using React + TypeScript',
      'Led AngularJS → React migration (150+ components), cut bundle size 40%, 55% faster render',
      'Increased meeting booking efficiency 70%'
    ]
  },
  {
    company: 'Bits And Bytes',
    role: 'Co-CEO',
    period: 'Mar 2024 - Aug 2024',
    bullets: [
      'Directed scalable web app with Ember.js + Node.js → 25% faster load',
      'Used Glimmer engine → 15% UI boost, 1000+ concurrent users',
      'Google Sheets as DB → 90% cost reduction'
    ]
  },
  {
    company: 'Cohesive Technologies',
    role: 'FULL STACK INTERN',
    period: 'Sept 2023 - Dec 2023',
    bullets: [
      'Built 3 features → +15% engagement',
      'Fixed 50+ critical bugs → +25% stability'
    ]
  },
  {
    company: 'Motherson Technology Services',
    role: 'FULL STACK INTERN',
    period: '1 Sep 2025 - 1 Dec 2025 (ongoing)',
    bullets: [
      'Built 3 features → +15% engagement',
      'Fixed 50+ critical bugs → +25% stability'
    ]
  }
] as const

export const PROJECTS = [
  { title: 'AI Cardio Health Generator', desc: 'ML model, 25% better accuracy, 30% faster navigation', stack: ['Python', 'Next.js'] },
  { title: 'Priscibio', desc: '30% engagement lift, 25% bug reduction', stack: ['React', 'Node.js'] },
  { title: 'Serve Smart', desc: 'Led team of 5, 30% efficiency gain, 20% satisfaction increase', stack: ['Next.js', 'TypeScript'] }
] as const

export const EDUCATION = [
  'B.Tech CSE, VIT Bhopal (2023-2027)',
  'HSC Science, St Johns (2023)',
  'SSC, Father Agnel School (2021)'
] as const

export const SKILLS = {
  Languages: ['C/C++','Python','Java','JavaScript','TypeScript','Ruby','Go','SQL','HTML/CSS'],
  Frameworks: ['Next.js','React','Node.js','Angular','Django','Ruby on Rails'],
  Databases: ['MongoDB','MySQL','PostgreSQL','Redis'],
  Tools: ['Docker','AWS','GCP','Kubernetes','Git','Jenkins','TensorFlow','Unity','Blender']
} as const

export const CERTS = [
  'Python Essential (Cisco) – Oct 2025',
  'Python 101 Data Science (IBM) – Oct 2025',
  'Advanced SQL (Great Learning) – May 2025',
  'Advanced Java Programming – May 2025',
  'Advanced Cyber Security – May 2025',
  'Advanced C++ (CodeChef) – July 2023'
] as const

// Optional credential URLs keyed by certificate title (before issuer parentheses)
export const CERT_URLS: Record<string, string> = {
  'Python Essential': '#',
  'Python 101 Data Science': '#',
  'Advanced SQL': '#',
  'Advanced Java Programming': '#',
  'Advanced Cyber Security': '#',
  'Advanced C++': '#'
}
