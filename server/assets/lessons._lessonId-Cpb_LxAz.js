import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
import { d as Route, a as useAuth, u as useNavigate, s as supabase, L as Link, t as toast } from "./router-CmnqGa5V.js";
import { S as SiteHeader } from "./SiteHeader-CJs0UdNy.js";
import { C as CodeBlock } from "./CodeBlock-IG4qrRVd.js";
import { c as createLucideIcon, B as Button } from "./code-xml-BIbHjBBD.js";
import { C as CircleCheck } from "./circle-check-DIMlFrxB.js";
import { A as ArrowRight } from "./arrow-right-CpUmVICX.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
];
const RotateCcw = createLucideIcon("rotate-ccw", __iconNode);
function CodeEditor({ initial }) {
  const [code, setCode] = reactExports.useState(initial);
  const [output, setOutput] = reactExports.useState([]);
  const run = () => {
    const logs = [];
    const fakeConsole = {
      log: (...args) => logs.push(args.map((a) => typeof a === "object" ? JSON.stringify(a) : String(a)).join(" "))
    };
    try {
      const fn = new Function("console", code);
      fn(fakeConsole);
      setOutput(logs.length ? logs : ["(no output)"]);
    } catch (e) {
      setOutput([`Error: ${e.message}`]);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-window overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[oklch(0.7_0.18_30)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[oklch(0.78_0.14_80)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[oklch(0.65_0.14_150)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50 font-mono", children: "try-it.js" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "text-white/70 hover:bg-white/10 hover:text-white h-7", onClick: () => {
          setCode(initial);
          setOutput([]);
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3.5 w-3.5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "hero", className: "h-7", onClick: run, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }),
          " Run"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        value: code,
        onChange: (e) => setCode(e.target.value),
        spellCheck: false,
        className: "w-full bg-transparent text-white/95 font-mono text-sm p-4 outline-none resize-none min-h-[200px]"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-white/10 bg-black/30 p-4 min-h-[100px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-white/40 mb-2", children: "Output" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-sm text-emerald-300 whitespace-pre-wrap", children: output.length ? output.join("\n") : "Press Run to execute your code" })
    ] })
  ] });
}
function LessonPage() {
  const {
    lessonId
  } = Route.useParams();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [lesson, setLesson] = reactExports.useState(null);
  const [siblings, setSiblings] = reactExports.useState([]);
  const [done, setDone] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: l
      } = await supabase.from("lessons").select("*").eq("id", lessonId).maybeSingle();
      if (!l) return;
      setLesson(l);
      const {
        data: ss
      } = await supabase.from("lessons").select("id,course_id,title,explanation,code_example,starter_code,sort_order").eq("course_id", l.course_id).order("sort_order");
      setSiblings(ss ?? []);
      if (user) {
        const {
          data: p
        } = await supabase.from("progress").select("id").eq("user_id", user.id).eq("lesson_id", lessonId).maybeSingle();
        setDone(!!p);
      }
    })();
  }, [lessonId, user]);
  const markComplete = async () => {
    if (!user || !lesson) {
      toast.error("Sign in to track progress");
      return;
    }
    if (done) return;
    const {
      error
    } = await supabase.from("progress").insert({
      user_id: user.id,
      lesson_id: lesson.id
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
    toast.success("Lesson complete!");
  };
  if (!lesson) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12", children: "Loading…" })
  ] });
  const idx = siblings.findIndex((s) => s.id === lesson.id);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-4xl px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses/$courseId", params: {
        courseId: lesson.course_id
      }, className: "text-sm text-muted-foreground hover:text-accent", children: "← Back to course" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mt-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent font-mono text-xs uppercase tracking-widest mb-2", children: [
          "Lesson 0",
          lesson.sort_order
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-bold leading-tight", children: lesson.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "prose prose-lg max-w-none mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed text-foreground", children: lesson.explanation }) }),
      lesson.code_example && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold mb-3", children: "Example" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodeBlock, { code: lesson.code_example })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold mb-3", children: "Try it yourself" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CodeEditor, { initial: lesson.starter_code || lesson.code_example })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 pt-6 border-t border-ink/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "cream", disabled: !prev, onClick: () => prev && navigate({
          to: "/lessons/$lessonId",
          params: {
            lessonId: prev.id
          }
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Previous"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: done ? "secondary" : "hero", onClick: markComplete, children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4" }),
          " Completed"
        ] }) : "Mark complete" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ink", disabled: !next, onClick: () => next && navigate({
          to: "/lessons/$lessonId",
          params: {
            lessonId: next.id
          }
        }), children: [
          "Next ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] });
}
export {
  LessonPage as component
};
