import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/courses/")({
  head: () => ({ meta: [{ title: "Courses — CodeARC" }] }),
  component: CoursesIndex,
});

type Course = { id: string; title: string; description: string; level: "beginner" | "intermediate" | "advanced"; lesson_count: number };

const LEVELS: Course["level"][] = ["beginner", "intermediate", "advanced"];
const LEVEL_LABEL: Record<Course["level"], string> = {
  beginner: "Beginner — Foundations",
  intermediate: "Intermediate — Building Blocks",
  advanced: "Advanced — Real Projects",
};

function CoursesIndex() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("courses")
        .select("id,title,description,level,lessons(count)")
        .order("level")
        .order("sort_order");
      setCourses(
        (data ?? []).map((c) => ({
          id: c.id, title: c.title, description: c.description, level: c.level as Course["level"],
          // @ts-expect-error nested count
          lesson_count: c.lessons?.[0]?.count ?? 0,
        })),
      );
    })();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12 space-y-14">
        <header>
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-2">Curriculum</p>
          <h1 className="font-display text-5xl font-bold">All courses</h1>
        </header>
        {LEVELS.map((lvl) => {
          const list = courses.filter((c) => c.level === lvl);
          return (
            <section key={lvl}>
              <h2 className="font-display text-2xl font-bold mb-5">{LEVEL_LABEL[lvl]}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {list.map((c, i) => (
                  <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }} className="group rounded-2xl border border-ink/10 bg-card p-6 hover:-translate-y-1 hover:shadow-[0_8px_0_-2px_var(--ink)] transition-all">
                    <div className="font-mono text-xs text-muted-foreground mb-3">0{i + 1}</div>
                    <h3 className="font-display text-xl font-semibold mb-2 leading-snug">{c.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                    <div className="mt-5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{c.lesson_count} lessons</span>
                      <ArrowRight className="h-4 w-4 group-hover:text-accent group-hover:translate-x-0.5 transition" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
