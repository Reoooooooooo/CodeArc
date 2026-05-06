import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Pencil, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — CodeARC" }] }),
  component: Admin,
});

type Course = { id: string; title: string; description: string; level: "beginner" | "intermediate" | "advanced"; sort_order: number };
type Lesson = { id: string; course_id: string; title: string; explanation: string; code_example: string; starter_code: string; sort_order: number };

function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editingLesson, setEditingLesson] = useState<Partial<Lesson> | null>(null);
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) { toast.error("Access denied"); navigate({ to: "/" }); }
  }, [loading, user, isAdmin, navigate]);

  const loadCourses = async () => {
    const { data } = await supabase.from("courses").select("*").order("level").order("sort_order");
    setCourses((data as Course[]) ?? []);
  };
  const loadLessons = async (cid: string) => {
    const { data } = await supabase.from("lessons").select("*").eq("course_id", cid).order("sort_order");
    setLessons((data as Lesson[]) ?? []);
  };

  useEffect(() => { if (isAdmin) loadCourses(); }, [isAdmin]);
  useEffect(() => { if (selected) loadLessons(selected.id); else setLessons([]); }, [selected]);

  const saveCourse = async () => {
    if (!editingCourse?.title || !editingCourse.level) { toast.error("Title and level required"); return; }
    const payload = { title: editingCourse.title, description: editingCourse.description ?? "", level: editingCourse.level, sort_order: editingCourse.sort_order ?? 0 };
    const res = editingCourse.id
      ? await supabase.from("courses").update(payload).eq("id", editingCourse.id)
      : await supabase.from("courses").insert(payload);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success("Saved"); setEditingCourse(null); loadCourses();
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course and all its lessons?")) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    if (selected?.id === id) setSelected(null);
    loadCourses();
  };

  const saveLesson = async () => {
    if (!selected || !editingLesson?.title) { toast.error("Title required"); return; }
    const payload = {
      course_id: selected.id,
      title: editingLesson.title,
      explanation: editingLesson.explanation ?? "",
      code_example: editingLesson.code_example ?? "",
      starter_code: editingLesson.starter_code ?? "",
      sort_order: editingLesson.sort_order ?? lessons.length + 1,
    };
    const res = editingLesson.id
      ? await supabase.from("lessons").update(payload).eq("id", editingLesson.id)
      : await supabase.from("lessons").insert(payload);
    if (res.error) { toast.error(res.error.message); return; }
    toast.success("Saved"); setEditingLesson(null); loadLessons(selected.id);
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Delete this lesson?")) return;
    const { error } = await supabase.from("lessons").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    if (selected) loadLessons(selected.id);
  };

  if (loading || !isAdmin) return <div className="min-h-screen grid place-items-center">Loading…</div>;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold">Courses</h2>
            <Button size="sm" variant="hero" onClick={() => setEditingCourse({ level: "beginner", sort_order: courses.length + 1 })}>
              <Plus className="h-4 w-4" /> New
            </Button>
          </div>
          <div className="space-y-2">
            {courses.map((c) => (
              <div key={c.id} className={`rounded-lg border p-3 cursor-pointer ${selected?.id === c.id ? "border-accent bg-accent/5" : "border-ink/10 bg-card"}`} onClick={() => setSelected(c)}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-mono">{c.level}</div>
                    <div className="font-medium">{c.title}</div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); setEditingCourse(c); }}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); deleteCourse(c.id); }}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="lg:col-span-8 space-y-6">
          {editingCourse && (
            <div className="rounded-2xl border border-ink/10 bg-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{editingCourse.id ? "Edit course" : "New course"}</h3>
                <Button variant="ghost" size="icon" onClick={() => setEditingCourse(null)}><X className="h-4 w-4" /></Button>
              </div>
              <div><Label>Title</Label><Input value={editingCourse.title ?? ""} onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={editingCourse.description ?? ""} onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Level</Label>
                  <Select value={editingCourse.level} onValueChange={(v) => setEditingCourse({ ...editingCourse, level: v as Course["level"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Sort order</Label><Input type="number" value={editingCourse.sort_order ?? 0} onChange={(e) => setEditingCourse({ ...editingCourse, sort_order: Number(e.target.value) })} /></div>
              </div>
              <Button variant="hero" onClick={saveCourse}>Save</Button>
            </div>
          )}

          {selected && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl font-bold">Lessons in “{selected.title}”</h2>
                <Button size="sm" variant="hero" onClick={() => setEditingLesson({ sort_order: lessons.length + 1 })}>
                  <Plus className="h-4 w-4" /> New lesson
                </Button>
              </div>
              <div className="space-y-2 mb-4">
                {lessons.map((l) => (
                  <div key={l.id} className="rounded-lg border border-ink/10 bg-card p-3 flex items-center justify-between">
                    <div><span className="font-mono text-xs text-muted-foreground mr-2">0{l.sort_order}</span>{l.title}</div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => setEditingLesson(l)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteLesson(l.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                    </div>
                  </div>
                ))}
              </div>

              {editingLesson && (
                <div className="rounded-2xl border border-ink/10 bg-card p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-semibold">{editingLesson.id ? "Edit lesson" : "New lesson"}</h3>
                    <Button variant="ghost" size="icon" onClick={() => setEditingLesson(null)}><X className="h-4 w-4" /></Button>
                  </div>
                  <div><Label>Title</Label><Input value={editingLesson.title ?? ""} onChange={(e) => setEditingLesson({ ...editingLesson, title: e.target.value })} /></div>
                  <div><Label>Explanation</Label><Textarea rows={4} value={editingLesson.explanation ?? ""} onChange={(e) => setEditingLesson({ ...editingLesson, explanation: e.target.value })} /></div>
                  <div><Label>Code example</Label><Textarea rows={4} className="font-mono text-sm" value={editingLesson.code_example ?? ""} onChange={(e) => setEditingLesson({ ...editingLesson, code_example: e.target.value })} /></div>
                  <div><Label>Starter code</Label><Textarea rows={4} className="font-mono text-sm" value={editingLesson.starter_code ?? ""} onChange={(e) => setEditingLesson({ ...editingLesson, starter_code: e.target.value })} /></div>
                  <div><Label>Sort order</Label><Input type="number" value={editingLesson.sort_order ?? 0} onChange={(e) => setEditingLesson({ ...editingLesson, sort_order: Number(e.target.value) })} /></div>
                  <Button variant="hero" onClick={saveLesson}>Save lesson</Button>
                </div>
              )}
            </div>
          )}

          {!selected && !editingCourse && (
            <div className="rounded-2xl border border-dashed border-ink/20 p-12 text-center text-muted-foreground">
              Select a course on the left to manage its lessons, or create a new one.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
