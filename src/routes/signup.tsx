import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2 } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — CodeARC" }] }),
  component: SignUp,
});

const schema = z.object({
  username: z.string().trim().min(2, "Username too short").max(40),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(72),
});

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { username: parsed.data.username },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message.includes("registered") ? "Email already registered" : error.message);
      return;
    }
    toast.success("Welcome to CodeARC!");
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
            <h2 className="font-display text-5xl font-bold leading-tight">Start your<br />coding arc.</h2>
            <p className="mt-4 text-white/60 max-w-sm">Create an account and unlock 12+ structured courses with live coding exercises.</p>
          </div>
          <p className="text-xs text-white/40 font-mono">// learn.code.repeat</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-sm space-y-5">
          <div>
            <h1 className="font-display text-3xl font-bold">Create account</h1>
            <p className="text-muted-foreground text-sm mt-1">Free forever. No credit card.</p>
          </div>
          <div className="space-y-2">
            <Label>Username</Label>
            <Input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="ada_lovelace" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@school.edu" />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account? <Link to="/login" className="text-accent font-medium hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
