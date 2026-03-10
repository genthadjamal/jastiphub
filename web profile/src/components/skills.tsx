import { 
  Code2, 
  Database, 
  Globe, 
  Layout, 
  Server, 
  Smartphone, 
  Terminal, 
  Wrench 
} from 'lucide-react';

const skills = [
  { name: 'Frontend React', icon: <Layout className="w-5 h-5" /> },
  { name: 'Backend Node.js', icon: <Server className="w-5 h-5" /> },
  { name: 'Database SQL/NoSQL', icon: <Database className="w-5 h-5" /> },
  { name: 'Web Architecture', icon: <Globe className="w-5 h-5" /> },
  { name: 'System Design', icon: <Terminal className="w-5 h-5" /> },
  { name: 'Mobile Dev', icon: <Smartphone className="w-5 h-5" /> },
  { name: 'Clean Code', icon: <Code2 className="w-5 h-5" /> },
  { name: 'DevOps & CI/CD', icon: <Wrench className="w-5 h-5" /> },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 border-t border-border/40">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Technical Arsenal</h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          A focused set of technologies and methodologies I use to bring ideas to production.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {skills.map((skill, i) => (
          <div 
            key={i} 
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-border/50 hover:border-foreground/20 hover:shadow-sm transition-all duration-300"
          >
            <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
              {skill.icon}
            </div>
            <span className="font-medium text-sm text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
