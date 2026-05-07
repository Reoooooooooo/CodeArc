import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
import { e as Route, a as useAuth, s as supabase, L as Link } from "./router-CmnqGa5V.js";
import { S as SiteHeader } from "./SiteHeader-CJs0UdNy.js";
import { P as Progress } from "./progress-_I5eOhmy.js";
import { C as CircleCheck } from "./circle-check-DIMlFrxB.js";
import { c as createLucideIcon } from "./code-xml-BIbHjBBD.js";
import { A as ArrowRight } from "./arrow-right-CpUmVICX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode);
function CourseDetail() {
  const {
    courseId
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const [course, setCourse] = reactExports.useState(null);
  const [lessons, setLessons] = reactExports.useState([]);
  const [completed, setCompleted] = reactExports.useState(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    (async () => {
      const [{
        data: c
      }, {
        data: ls
      }] = await Promise.all([supabase.from("courses").select("*").eq("id", courseId).maybeSingle(), supabase.from("lessons").select("id,title,sort_order").eq("course_id", courseId).order("sort_order")]);
      setCourse(c);
      setLessons(ls ?? []);
      if (user) {
        const ids = (ls ?? []).map((l) => l.id);
        if (ids.length) {
          const {
            data: p
          } = await supabase.from("progress").select("lesson_id").eq("user_id", user.id).in("lesson_id", ids);
          setCompleted(new Set((p ?? []).map((r) => r.lesson_id)));
        }
      }
    })();
  }, [courseId, user]);
  if (!course) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12", children: "Loading…" })
  ] });
  const pct = lessons.length ? Math.round(completed.size / lessons.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "text-sm text-muted-foreground hover:text-accent", children: "← All courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-mono text-sm uppercase tracking-widest mb-2", children: course.level }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold", children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-lg text-muted-foreground max-w-2xl", children: course.description })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            pct,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-ink/10 bg-card divide-y divide-ink/10 overflow-hidden", children: [
        lessons.map((l, i) => {
          const done = completed.has(l.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lessons/$lessonId", params: {
            lessonId: l.id
          }, className: "flex items-center gap-4 p-5 hover:bg-sand/40 transition", children: [
            done ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-5 w-5 text-ink/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground w-8", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-display text-lg font-medium", children: l.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
          ] }, l.id);
        }),
        lessons.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-muted-foreground", children: "No lessons yet." })
      ] })
    ] })
  ] });
}
export {
  CourseDetail as component
};
