import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
import { a as useAuth, u as useNavigate, s as supabase, L as Link } from "./router-CmnqGa5V.js";
import { S as SiteHeader } from "./SiteHeader-CJs0UdNy.js";
import { c as createLucideIcon, B as Button } from "./code-xml-BIbHjBBD.js";
import { P as Progress } from "./progress-_I5eOhmy.js";
import { A as ArrowRight } from "./arrow-right-CpUmVICX.js";
import { C as CircleCheck } from "./circle-check-DIMlFrxB.js";
import { B as BookOpen } from "./book-open-4GUgdZYm.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode);
function Dashboard() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = reactExports.useState("");
  const [courses, setCourses] = reactExports.useState([]);
  const [completedByCourse, setCompletedByCourse] = reactExports.useState({});
  const [totalLessons, setTotalLessons] = reactExports.useState(0);
  const [completedLessons, setCompletedLessons] = reactExports.useState(0);
  const [lastCourseId, setLastCourseId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login"
    });
  }, [loading, user, navigate]);
  reactExports.useEffect(() => {
    if (!user) return;
    (async () => {
      const [{
        data: profile
      }, {
        data: courseRows
      }, {
        data: progressRows
      }] = await Promise.all([supabase.from("profiles").select("username").eq("id", user.id).maybeSingle(), supabase.from("courses").select("id,title,level,lessons(count)").order("level").order("sort_order"), supabase.from("progress").select("lesson_id, lessons(course_id), completed_at").eq("user_id", user.id).order("completed_at", {
        ascending: false
      })]);
      setUsername(profile?.username ?? user.email?.split("@")[0] ?? "friend");
      const cs = (courseRows ?? []).map((c) => ({
        id: c.id,
        title: c.title,
        level: c.level,
        // @ts-ignore nested count
        lesson_count: c.lessons?.[0]?.count ?? 0
      }));
      setCourses(cs);
      setTotalLessons(cs.reduce((s, c) => s + c.lesson_count, 0));
      const counts = {};
      (progressRows ?? []).forEach((p) => {
        const cid = p.lessons?.course_id;
        if (cid) counts[cid] = (counts[cid] ?? 0) + 1;
      });
      setCompletedByCourse(counts);
      setCompletedLessons(progressRows?.length ?? 0);
      const first = progressRows?.[0];
      if (first?.lessons?.course_id) setLastCourseId(first.lessons.course_id);
    })();
  }, [user]);
  if (loading || !user) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen grid place-items-center", children: "Loading..." });
  const completedCourses = courses.filter((c) => c.lesson_count > 0 && (completedByCourse[c.id] ?? 0) >= c.lesson_count).length;
  const overall = totalLessons ? Math.round(completedLessons / totalLessons * 100) : 0;
  const continueCourse = lastCourseId ? courses.find((c) => c.id === lastCourseId) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-mono text-sm uppercase tracking-widest mb-2", children: "Welcome back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl md:text-5xl font-bold", children: [
            "Hello, ",
            username,
            " 👋"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ink", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses", children: [
          "Browse courses ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-5 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Overall progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4 text-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl font-bold", children: [
            overall,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: overall, className: "mt-3 h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
            completedLessons,
            " of ",
            totalLessons,
            " lessons"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-ink/10 bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Courses completed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-accent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl font-bold", children: [
            completedCourses,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl text-muted-foreground", children: [
              " / ",
              courses.length
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl ink-panel p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-white/60", children: "Continue learning" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4 text-accent" })
          ] }),
          continueCourse ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl font-bold leading-tight", children: continueCourse.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", size: "sm", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$courseId", params: {
              courseId: continueCourse.id
            }, children: [
              "Resume ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
            ] }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white/70 text-sm", children: "Pick a course to start." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", size: "sm", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", children: "Browse" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-5", children: "Your courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: courses.map((c) => {
        const done = completedByCourse[c.id] ?? 0;
        const pct = c.lesson_count ? Math.round(done / c.lesson_count * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$courseId", params: {
          courseId: c.id
        }, className: "rounded-2xl border border-ink/10 bg-card p-6 hover:-translate-y-1 hover:shadow-[0_8px_0_-2px_var(--ink)] transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-accent font-mono mb-2", children: c.level }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg font-semibold mb-3", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-1.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
            done,
            "/",
            c.lesson_count,
            " lessons"
          ] })
        ] }, c.id);
      }) })
    ] })
  ] });
}
export {
  Dashboard as component
};
