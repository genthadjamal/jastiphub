import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Skills } from '@/components/skills';
import { Projects } from '@/components/projects';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-foreground selection:text-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-6 max-w-4xl">
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
      <div className="container mx-auto px-6 max-w-4xl">
        <Footer />
      </div>
    </div>
  );
}
