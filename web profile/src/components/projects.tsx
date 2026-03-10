import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A high-performance modern web storefront built with Next.js, Stripe, and Tailwind CSS. Features advanced filtering and seamless checkout.',
    demoLink: '#',
    githubLink: '#',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
  },
  {
    title: 'SaaS Dashboard',
    description: 'Analytics monitoring tool providing real-time data visualization. Built on React and optimized for large datasets.',
    demoLink: '#',
    githubLink: '#',
    tags: ['React', 'Recharts', 'Tailwind'],
  },
  {
    title: 'Mobile Wellness App',
    description: 'Cross-platform app helping users track daily habits and mood. Includes push notifications and offline offline-first architecture.',
    demoLink: '#',
    githubLink: '#',
    tags: ['React Native', 'Firebase'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 border-t border-border/40">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Selected Work</h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          Highlights from my recent projects demonstrating full-stack engineering and minimalist product design.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {projects.map((project, i) => (
          <div 
            key={i} 
            className="group flex flex-col p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-border/50 hover:border-foreground/20 hover:shadow-sm transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-xl">{project.title}</h3>
              <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <Link href={project.githubLink} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub Repo</span>
                </Link>
                <Link href={project.demoLink} className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                  <span className="sr-only">Live Demo</span>
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground flex-grow mb-8 leading-relaxed">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-foreground/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
