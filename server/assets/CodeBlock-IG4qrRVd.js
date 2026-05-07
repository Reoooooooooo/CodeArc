import { U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
function CodeBlock({ code, label = "example.js" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "code-window overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 border-b border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[oklch(0.7_0.18_30)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[oklch(0.78_0.14_80)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full bg-[oklch(0.65_0.14_150)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50 font-mono", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-12" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "p-4 text-sm overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: code }) })
  ] });
}
export {
  CodeBlock as C
};
