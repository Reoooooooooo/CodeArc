import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, RotateCcw } from "lucide-react";

export function CodeEditor({ initial }: { initial: string }) {
  const [code, setCode] = useState(initial);
  const [output, setOutput] = useState<string[]>([]);

  const run = () => {
    const logs: string[] = [];
    const fakeConsole = {
      log: (...args: unknown[]) =>
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
    };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", code);
      fn(fakeConsole);
      setOutput(logs.length ? logs : ["(no output)"]);
    } catch (e) {
      setOutput([`Error: ${(e as Error).message}`]);
    }
  };

  return (
    <div className="code-window overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[oklch(0.7_0.18_30)]" />
          <span className="h-3 w-3 rounded-full bg-[oklch(0.78_0.14_80)]" />
          <span className="h-3 w-3 rounded-full bg-[oklch(0.65_0.14_150)]" />
        </div>
        <span className="text-xs text-white/50 font-mono">try-it.js</span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" className="text-white/70 hover:bg-white/10 hover:text-white h-7" onClick={() => { setCode(initial); setOutput([]); }}>
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="hero" className="h-7" onClick={run}>
            <Play className="h-3.5 w-3.5" /> Run
          </Button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="w-full bg-transparent text-white/95 font-mono text-sm p-4 outline-none resize-none min-h-[200px]"
      />
      <div className="border-t border-white/10 bg-black/30 p-4 min-h-[100px]">
        <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Output</div>
        <pre className="text-sm text-emerald-300 whitespace-pre-wrap">
          {output.length ? output.join("\n") : "Press Run to execute your code"}
        </pre>
      </div>
    </div>
  );
}
