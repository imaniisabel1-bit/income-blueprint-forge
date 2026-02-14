import { Loader2 } from "lucide-react";

const PageLoader = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-emerald-glow/20" />
      <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-emerald-glow animate-spin" />
    </div>
    <p className="font-mono-system text-xs text-emerald-glow tracking-widest uppercase animate-pulse">
      Loading Infrastructure…
    </p>
  </div>
);

export default PageLoader;
