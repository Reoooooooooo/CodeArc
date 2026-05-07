import { U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
import { a as useAuth, u as useNavigate, L as Link } from "./router-CmnqGa5V.js";
import { C as CodeXml, B as Button } from "./code-xml-BIbHjBBD.js";
function SiteHeader() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-ink/10 bg-background/80 backdrop-blur sticky top-0 z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-md bg-ink text-ink-foreground grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold tracking-tight", children: "CodeARC" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-7 text-sm font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "hover:text-accent", children: "Courses" }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "hover:text-accent", children: "Dashboard" }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "hover:text-accent", children: "Admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ink",
        size: "sm",
        onClick: async () => {
          await signOut();
          navigate({ to: "/" });
        },
        children: "Log out"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Log in" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "hero", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: "Sign up" }) })
    ] }) })
  ] }) });
}
export {
  SiteHeader as S
};
