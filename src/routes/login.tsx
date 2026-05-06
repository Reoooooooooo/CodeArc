import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — CodeARC" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error("Email and password are required"); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(form);
    setLoading(false);
    if (error) { toast.error("Invalid email or password"); return; }
    toast.success("Welcome back");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block ink-panel relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative h-full p-14 flex flex-col justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-accent grid place-items-center"><Code2 className="h-4 w-4" /></div>
            <span className="font-display text-xl font-bold">CodeARC</span>
          </Link>
          <div>
            <h2 className="font-display text-5xl font-bold leading-tight">Welcome<br />back.</h2>
            <p className="mt-4 text-white/60 max-w-sm">Pick up exactly where you left off.</p>
          </div>
          <p className="text-xs text-white/40 font-mono">// console.log("welcome");</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display text-3xl font-bold">Log in</h1>
            <p className="text-muted-foreground text-sm mt-1">Continue your coding journey.</p>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            New here? <Link to="/signup" className="text-accent font-medium hover:underline">Create account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
