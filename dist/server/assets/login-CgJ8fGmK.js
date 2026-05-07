import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-DEcG-_wu.js";
import { u as useNavigate, L as Link, t as toast, s as supabase } from "./router-CmnqGa5V.js";
import { C as CodeXml, B as Button } from "./code-xml-BIbHjBBD.js";
import { L as Label, I as Input } from "./label-BmLz50NJ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    email: "",
    password: ""
  });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Email and password are required");
      return;
    }
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword(form);
    setLoading(false);
    if (error) {
      toast.error("Invalid email or password");
      return;
    }
    toast.success("Welcome back");
    navigate({
      to: "/dashboard"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:block ink-panel relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid-bg opacity-20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-full p-14 flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-md bg-accent grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold", children: "CodeARC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl font-bold leading-tight", children: [
            "Welcome",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "back."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/60 max-w-sm", children: "Pick up exactly where you left off." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 font-mono", children: '// console.log("welcome");' })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "w-full max-w-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Log in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Continue your coding journey." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "password", value: form.password, onChange: (e) => setForm({
          ...form,
          password: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "hero", size: "lg", className: "w-full", disabled: loading, children: loading ? "Logging in..." : "Log in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground text-center", children: [
        "New here? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-accent font-medium hover:underline", children: "Create account" })
      ] })
    ] }) })
  ] });
}
export {
  Login as component
};
