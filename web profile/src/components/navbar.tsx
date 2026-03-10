import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-4xl">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Gentha.
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#about" className="text-sm font-medium hover:text-muted-foreground transition-colors">About</Link>
          <Link href="#skills" className="text-sm font-medium hover:text-muted-foreground transition-colors">Skills</Link>
          <Link href="#projects" className="text-sm font-medium hover:text-muted-foreground transition-colors">Projects</Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
