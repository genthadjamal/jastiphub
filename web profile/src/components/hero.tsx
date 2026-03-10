import { Download, Mail } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="py-24 md:py-32 flex flex-col items-start justify-center min-h-[70vh]">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
          Hi, I&apos;m Gentha <br />
          <span className="text-neutral-500 dark:text-neutral-400">IT Developer.</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mt-6 leading-relaxed">
          I build performant, accessible digital experiences with a focus on minimalist design and robust backend architecture. Turning complex problems into elegant solutions.
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-4 mt-10">
        <Link
          href="mailto:hello@example.com"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-900 text-neutral-50 dark:bg-neutral-100 dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
        >
          <Mail className="h-4 w-4" />
          Get in Touch
        </Link>
        <Link
          href="/cv.pdf"
          target="_blank"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors font-medium text-neutral-900 dark:text-neutral-100"
        >
          <Download className="h-4 w-4" />
          Download CV
        </Link>
      </div>
    </section>
  );
}
