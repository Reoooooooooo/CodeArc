export function CodeBlock({ code, label = "example.js" }: { code: string; label?: string }) {
  return (
    <div className="code-window overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.18_30)]" />
          <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.14_80)]" />
          <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.14_150)]" />
        </div>
        <span className="text-xs text-white/50 font-mono">{label}</span>
        <span className="w-12" />
      </div>
      <pre className="p-4 text-sm overflow-x-auto"><code>{code}</code></pre>
    </div>
  );
}
