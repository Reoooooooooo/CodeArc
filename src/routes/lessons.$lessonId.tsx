import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/SiteHeader";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeEditor } from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/lessons/$lessonId")({
  component: LessonPage,
});

type Lesson = {
  id: string; course_id: string; title: string; explanation: string;
  code_example: string; starter_code: string; sort_order: number;
};

function LessonPage() {
  const { lessonId } = Route.useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [siblings, setSiblings] = useState<Lesson[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: l } = await supabase.from("lessons").select("*").eq("id", lessonId).maybeSingle();
      if (!l) return;
      setLesson(l as Lesson);
      const { data: ss } = await supabase.from("lessons").select("id,course_id,title,explanation,code_example,starter_code,sort_order").eq("course_id", l.course_id).order("sort_order");
      setSiblings((ss as Lesson[]) ?? []);
      if (user) {
        const { data: p } = await supabase.from("progress").select("id").eq("user_id", user.id).eq("lesson_id", lessonId).maybeSingle();
        setDone(!!p);
      }
    })();
  }, [lessonId, user]);

  const markComplete = async () => {
    if (!user || !lesson) { toast.error("Sign in to track progress"); return; }
    if (done) return;
    const { error } = await supabase.from("progress").insert({ user_id: user.id, lesson_id: lesson.id });
    if (error) { toast.error(error.message); return; }
    setDone(true);
    toast.success("Lesson complete!");
  };

  if (!lesson) return <div className="min-h-screen bg-background"><SiteHeader /><div className="p-12">Loading…</div></div>;

  const idx = siblings.findIndex((s) => s.id === lesson.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link to="/courses/$courseId" params={{ courseId: lesson.course_id }} className="text-sm text-muted-foreground hover:text-accent">← Back to course</Link>
        <header className="mt-4 mb-8">
          <p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">Lesson 0{lesson.sort_order}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">{lesson.title}</h1>
        </header>

        <section className="prose prose-lg max-w-none mb-8">
          <p className="text-lg leading-relaxed text-foreground">{lesson.explanation}</p>
        </section>

        {lesson.code_example && (
          <section className="mb-10">
            <h2 className="font-display text-lg font-semibold mb-3">Example</h2>
            <CodeBlock code={lesson.code_example} />
          </section>
        )}

        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold mb-3">Try it yourself</h2>
          <CodeEditor initial={lesson.starter_code || lesson.code_example} />
        </section>

        <div className="flex items-center justify-between gap-4 pt-6 border-t border-ink/10">
          <Button variant="cream" disabled={!prev} onClick={() => prev && navigate({ to: "/lessons/$lessonId", params: { lessonId: prev.id } })}>
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          <Button variant={done ? "secondary" : "hero"} onClick={markComplete}>
            {done ? <><CheckCircle2 className="h-4 w-4" /> Completed</> : "Mark complete"}
          </Button>
          <Button variant="ink" disabled={!next} onClick={() => next && navigate({ to: "/lessons/$lessonId", params: { lessonId: next.id } })}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
