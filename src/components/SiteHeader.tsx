import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Code2 } from "lucide-react";

export function SiteHeader() {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b border-ink/10 bg-background/80 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-ink text-ink-foreground grid place-items-center">
            <Code2 className="h-4 w-4" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">CodeARC</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link to="/courses" className="hover:text-accent">Courses</Link>
          {user && <Link to="/dashboard" className="hover:text-accent">Dashboard</Link>}
          {isAdmin && <Link to="/admin" className="hover:text-accent">Admin</Link>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button
              variant="ink"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              Log out
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild variant="hero" size="sm">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
