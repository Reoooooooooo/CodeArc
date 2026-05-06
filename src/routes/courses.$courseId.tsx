import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/SiteHeader";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/courses/$courseId")({
  component: CourseDetail,
});

type Lesson = { id: string; title: string; sort_order: number };
type Course = { id: string; title: string; description: string; level: string };

function CourseDetail() {
  const { courseId } = Route.useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      const [{ data: c }, { data: ls }] = await Promise.all([
        supabase.from("courses").select("*").eq("id", courseId).maybeSingle(),
        supabase.from("lessons").select("id,title,sort_order").eq("course_id", courseId).order("sort_order"),
      ]);
      setCourse(c as Course | null);
      setLessons((ls as Lesson[]) ?? []);
      if (user) {
        const ids = (ls ?? []).map((l) => l.id);
        if (ids.length) {
          const { data: p } = await supabase.from("progress").select("lesson_id").eq("user_id", user.id).in("lesson_id", ids);
          setCompleted(new Set((p ?? []).map((r) => r.lesson_id)));
        }
      }
    })();
  }, [courseId, user]);

  if (!course) return <div className="min-h-screen bg-background"><SiteHeader /><div className="p-12">Loading…</div></div>;

  const pct = lessons.length ? Math.round((completed.size / lessons.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <Link to="/courses" className="text-sm text-muted-foreground hover:text-accent">← All courses</Link>
        <div className="mt-4">
          <p className="text-accent font-mono text-sm uppercase tracking-widest mb-2">{course.level}</p>
          <h1 className="font-display text-5xl font-bold">{course.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl">{course.description}</p>
        </div>
        {user && (
          <div className="mt-6 max-w-md">
            <div className="flex justify-between text-sm mb-1.5"><span>Progress</span><span className="font-medium">{pct}%</span></div>
            <Progress value={pct} className="h-2" />
          </div>
        )}
        <div className="mt-10 rounded-2xl border border-ink/10 bg-card divide-y divide-ink/10 overflow-hidden">
          {lessons.map((l, i) => {
            const done = completed.has(l.id);
            return (
              <Link key={l.id} to="/lessons/$lessonId" params={{ lessonId: l.id }} className="flex items-center gap-4 p-5 hover:bg-sand/40 transition">
                {done ? <CheckCircle2 className="h-5 w-5 text-accent" /> : <Circle className="h-5 w-5 text-ink/30" />}
                <span className="font-mono text-xs text-muted-foreground w-8">0{i + 1}</span>
                <span className="flex-1 font-display text-lg font-medium">{l.title}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            );
          })}
          {lessons.length === 0 && <div className="p-8 text-center text-muted-foreground">No lessons yet.</div>}
        </div>
      </main>
    </div>
  );
}
