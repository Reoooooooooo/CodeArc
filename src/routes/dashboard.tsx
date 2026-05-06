import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, CheckCircle2, Flame } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CodeARC" }] }),
  component: Dashboard,
});

type Course = { id: string; title: string; level: string; lesson_count: number };
type ProgressRow = { lesson_id: string; lessons: { course_id: string } | null };

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [completedByCourse, setCompletedByCourse] = useState<Record<string, number>>({});
  const [totalLessons, setTotalLessons] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [lastCourseId, setLastCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: profile }, { data: courseRows }, { data: progressRows }] = await Promise.all([
        supabase.from("profiles").select("username").eq("id", user.id).maybeSingle(),
        supabase.from("courses").select("id,title,level,lessons(count)").order("level").order("sort_order"),
        supabase.from("progress").select("lesson_id, lessons(course_id), completed_at").eq("user_id", user.id).order("completed_at", { ascending: false }),
      ]);
      setUsername(profile?.username ?? user.email?.split("@")[0] ?? "friend");

      const cs: Course[] = (courseRows ?? []).map((c) => ({
        id: c.id, title: c.title, level: c.level,
        // @ts-expect-error nested count
        lesson_count: c.lessons?.[0]?.count ?? 0,
      }));
      setCourses(cs);
      setTotalLessons(cs.reduce((s, c) => s + c.lesson_count, 0));

      const counts: Record<string, number> = {};
      (progressRows as ProgressRow[] | null ?? []).forEach((p) => {
        const cid = p.lessons?.course_id;
        if (cid) counts[cid] = (counts[cid] ?? 0) + 1;
      });
      setCompletedByCourse(counts);
      setCompletedLessons(progressRows?.length ?? 0);
      const first = (progressRows as ProgressRow[] | null)?.[0];
      if (first?.lessons?.course_id) setLastCourseId(first.lessons.course_id);
    })();
  }, [user]);

  if (loading || !user) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  const completedCourses = courses.filter((c) => c.lesson_count > 0 && (completedByCourse[c.id] ?? 0) >= c.lesson_count).length;
  const overall = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const continueCourse = lastCourseId ? courses.find((c) => c.id === lastCourseId) : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-2">Welcome back</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Hello, {username} 👋</h1>
          </div>
          <Button asChild variant="ink"><Link to="/courses">Browse courses <ArrowRight className="h-4 w-4" /></Link></Button>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <div className="rounded-2xl border border-ink/10 bg-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Overall progress</span>
              <Flame className="h-4 w-4 text-accent" />
            </div>
            <div className="font-display text-4xl font-bold">{overall}%</div>
            <Progress value={overall} className="mt-3 h-2" />
            <div className="mt-2 text-xs text-muted-foreground">{completedLessons} of {totalLessons} lessons</div>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-card p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Courses completed</span>
              <CheckCircle2 className="h-4 w-4 text-accent" />
            </div>
            <div className="font-display text-4xl font-bold">{completedCourses}<span className="text-2xl text-muted-foreground"> / {courses.length}</span></div>
          </div>
          <div className="rounded-2xl ink-panel p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-white/60">Continue learning</span>
              <BookOpen className="h-4 w-4 text-accent" />
            </div>
            {continueCourse ? (
              <>
                <div className="font-display text-xl font-bold leading-tight">{continueCourse.title}</div>
                <Button asChild variant="hero" size="sm" className="mt-4">
                  <Link to="/courses/$courseId" params={{ courseId: continueCourse.id }}>Resume <ArrowRight className="h-3.5 w-3.5" /></Link>
                </Button>
              </>
            ) : (
              <>
                <div className="text-white/70 text-sm">Pick a course to start.</div>
                <Button asChild variant="hero" size="sm" className="mt-4">
                  <Link to="/courses">Browse</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        <h2 className="font-display text-2xl font-bold mb-5">Your courses</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((c) => {
            const done = completedByCourse[c.id] ?? 0;
            const pct = c.lesson_count ? Math.round((done / c.lesson_count) * 100) : 0;
            return (
              <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }} className="rounded-2xl border border-ink/10 bg-card p-6 hover:-translate-y-1 hover:shadow-[0_8px_0_-2px_var(--ink)] transition-all">
                <div className="text-xs uppercase tracking-widest text-accent font-mono mb-2">{c.level}</div>
                <div className="font-display text-lg font-semibold mb-3">{c.title}</div>
                <Progress value={pct} className="h-1.5" />
                <div className="mt-2 text-xs text-muted-foreground">{done}/{c.lesson_count} lessons</div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
