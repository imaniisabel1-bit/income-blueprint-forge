import { useRef, useEffect } from "react";
import { Play } from "lucide-react";

interface AmayaBriefingVideoProps {
  videoSrc?: string | null;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-16 h-16",
  md: "w-20 h-20",
  lg: "w-24 h-24",
};

const AmayaBriefingVideo = ({
  videoSrc = null,
  label = "Amaya Briefing",
  size = "md",
}: AmayaBriefingVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSrc]);

  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      <div
        className={`${sizeMap[size]} rounded-full border-[3px] border-emerald-glow overflow-hidden bg-secondary/50 flex items-center justify-center relative shadow-[0_0_16px_hsl(var(--emerald-glow)/0.3)]`}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-secondary to-background">
            <Play className="h-5 w-5 text-emerald-glow ml-0.5" />
          </div>
        )}
      </div>
      <span className="font-mono-system text-[8px] tracking-[0.15em] uppercase text-emerald-glow/70">
        {label}
      </span>
    </div>
  );
};

export default AmayaBriefingVideo;
