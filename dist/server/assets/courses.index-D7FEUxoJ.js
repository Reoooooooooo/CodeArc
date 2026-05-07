import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
import { s as supabase, L as Link } from "./router-CmnqGa5V.js";
import { S as SiteHeader } from "./SiteHeader-CJs0UdNy.js";
import { A as ArrowRight } from "./arrow-right-CpUmVICX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./code-xml-BIbHjBBD.js";
const LEVELS = ["beginner", "intermediate", "advanced"];
const LEVEL_LABEL = {
  beginner: "Beginner — Foundations",
  intermediate: "Intermediate — Building Blocks",
  advanced: "Advanced — Real Projects"
};
function CoursesIndex() {
  const [courses, setCourses] = reactExports.useState([]);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data
      } = await supabase.from("courses").select("id,title,description,level,lessons(count)").order("level").order("sort_order");
      setCourses((data ?? []).map((c) => ({
        id: c.id,
        title: c.title,
        description: c.description,
        level: c.level,
        // @ts-ignore nested count
        lesson_count: c.lessons?.[0]?.count ?? 0
      })));
    })();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-6 py-12 space-y-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-accent font-mono text-sm uppercase tracking-widest mb-2", children: "Curriculum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl font-bold", children: "All courses" })
      ] }),
      LEVELS.map((lvl) => {
        const list = courses.filter((c) => c.level === lvl);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold mb-5", children: LEVEL_LABEL[lvl] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-5", children: list.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/courses/$courseId", params: {
            courseId: c.id
          }, className: "group rounded-2xl border border-ink/10 bg-card p-6 hover:-translate-y-1 hover:shadow-[0_8px_0_-2px_var(--ink)] transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-muted-foreground mb-3", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-2 leading-snug", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: c.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                c.lesson_count,
                " lessons"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 group-hover:text-accent group-hover:translate-x-0.5 transition" })
            ] })
          ] }, c.id)) })
        ] }, lvl);
      })
    ] })
  ] });
}
export {
  CoursesIndex as component
};
