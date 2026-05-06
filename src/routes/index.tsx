import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/CodeBlock";
import { ArrowRight, Sparkles, Rocket, GraduationCap, Code2, BookOpen, Trophy } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CodeARC — Learn Coding. Build Your Future." },
      { name: "description", content: "Interactive coding platform for CTE students. Beginner to advanced learning paths with hands-on exercises." },
      { property: "og:title", content: "CodeARC — Learn Coding. Build Your Future." },
      { property: "og:description", content: "Interactive coding platform for CTE students." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-28 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream px-3 py-1 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Built for CTE students
            </div>
            <h1 className="mt-6 font-display text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
              Learn coding.<br />
              <span className="text-accent">Build</span> your future.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl">
              CodeARC turns the curriculum into something you can actually run. Read a lesson, write code in your browser, and see results instantly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/signup">Start learning <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="cream" size="xl">
                <Link to="/courses">Explore courses</Link>
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm text-muted-foreground">
              <div><span className="font-display text-2xl font-bold text-foreground">12+</span><br />Courses</div>
              <div className="h-10 w-px bg-ink/15" />
              <div><span className="font-display text-2xl font-bold text-foreground">3</span><br />Skill levels</div>
              <div className="h-10 w-px bg-ink/15" />
              <div><span className="font-display text-2xl font-bold text-foreground">∞</span><br />Try-it editors</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CodeBlock
              label="lesson-01.js"
              code={`// Welcome to CodeARC\nconst student = {\n  name: "you",\n  level: "beginner",\n};\n\nfunction learn(topic) {\n  return \`learning \${topic}\`;\n}\n\nconsole.log(learn("javascript"));\n// → learning javascript`}
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-ink text-ink-foreground py-24">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">About CodeARC</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              A coding curriculum that meets you where you are.
            </h2>
          </div>
          <p className="text-lg text-white/70 leading-relaxed">
            CodeARC was built for Career and Technical Education programs and self-learners. We pair clear, short lessons with an in-browser editor so you can practice immediately. No setup, no tabs full of docs — just read, code, run, repeat.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-14">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-3">What you get</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Everything you need to actually learn.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: BookOpen, title: "Interactive lessons", body: "Bite-sized explanations paired with live code examples you can edit on the spot." },
            { icon: Rocket, title: "Self-paced learning", body: "Move at your speed. Your progress is saved across every session and device." },
            { icon: Trophy, title: "Hands-on exercises", body: "Each lesson ends with a try-it-yourself challenge so the concept actually sticks." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-ink/10 bg-card p-7 hover:shadow-[0_8px_0_-2px_var(--ink)] hover:-translate-y-1 transition-all">
              <div className="h-11 w-11 rounded-lg bg-accent text-accent-foreground grid place-items-center mb-5">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEVELS */}
      <section className="bg-sand/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-accent font-mono text-sm uppercase tracking-widest mb-3">Three paths</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">Start anywhere. Go everywhere.</h2>
            </div>
            <Button asChild variant="ink"><Link to="/courses">See all courses <ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tag: "01", level: "Beginner", title: "Foundations", desc: "Variables, syntax, your very first programs.", color: "bg-accent" },
              { tag: "02", level: "Intermediate", title: "Building Blocks", desc: "Functions, loops, arrays, objects, problem solving.", color: "bg-secondary" },
              { tag: "03", level: "Advanced", title: "Real Projects", desc: "Algorithms, data structures, async APIs, mini projects.", color: "bg-ink" },
            ].map((l) => (
              <div key={l.tag} className="rounded-2xl bg-card border border-ink/10 overflow-hidden">
                <div className={`${l.color} ${l.color === "bg-ink" ? "text-ink-foreground" : "text-white"} p-6 flex items-center justify-between`}>
                  <span className="font-mono text-sm">{l.tag}</span>
                  <span className="text-xs uppercase tracking-widest">{l.level}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl font-bold mb-2">{l.title}</h3>
                  <p className="text-muted-foreground">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-3">Students say</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">Code clicks faster here.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { q: "I went from never writing code to building my own loops in a weekend.", n: "Maya R.", r: "CTE Student, Year 1" },
            { q: "The try-it editor is what made it real. Reading wasn't enough for me.", n: "Jordan P.", r: "Self-learner" },
            { q: "Finally a curriculum my class can actually follow start to finish.", n: "Mr. Alvarez", r: "CTE Instructor" },
          ].map((t) => (
            <figure key={t.n} className="rounded-2xl border border-ink/10 bg-card p-7">
              <blockquote className="font-display text-xl leading-snug">"{t.q}"</blockquote>
              <figcaption className="mt-5 text-sm">
                <div className="font-semibold">{t.n}</div>
                <div className="text-muted-foreground">{t.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <GraduationCap className="h-12 w-12 mx-auto text-accent mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-bold max-w-3xl mx-auto leading-tight">
            Your first line of code is one click away.
          </h2>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/signup">Create your free account</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-ink/10 py-8 text-center text-sm text-muted-foreground">
        <Code2 className="h-4 w-4 inline mr-1.5" /> CodeARC · Learn coding. Build your future.
      </footer>
    </div>
  );
}
