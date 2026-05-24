/* Shared hooks and components for IF Portfolio prototype */

const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============================================================
   Hooks
============================================================ */

function useInView(margin = "-80px") {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          obs.unobserve(el);
        }
      },
      { rootMargin: margin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [margin]);
  return { ref, isInView };
}

function useMouse() {
  const [pos, setPos] = useState({ x: -1000, y: -1000, vx: 0, vy: 0 });
  useEffect(() => {
    let last = { x: 0, y: 0, t: performance.now() };
    const onMove = (e) => {
      const now = performance.now();
      const dt = Math.max(now - last.t, 1);
      setPos({
        x: e.clientX,
        y: e.clientY,
        vx: (e.clientX - last.x) / dt,
        vy: (e.clientY - last.y) / dt,
      });
      last = { x: e.clientX, y: e.clientY, t: now };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

/* ============================================================
   Components
============================================================ */

function FadeIn({ children, delay = 0, y = 24, className = "", style = {} }) {
  const { ref, isInView } = useInView("-60px");
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ============================================================
   Placeholder graphics — striped SVGs with mono labels
   (real client work to be dropped in later)
============================================================ */

function GraphicPlaceholder({ label, palette = "crystal", aspect = "1/1", className = "", note }) {
  const palettes = {
    crystal: ["#0a1428", "#1a3a6b", "#4ea3ff", "#a8d5ff"],
    purple: ["#1a0a2e", "#3b0e6b", "#7e3aff", "#d4b3ff"],
    y2k: ["#0a0a0a", "#ff2bd6", "#00f0ff", "#ffea00"],
    sff: ["#050505", "#222", "#888", "#e5e5e5"],
    teal: ["#02161a", "#0d3b44", "#23d3c6", "#a8f0e8"],
    amber: ["#1a0a02", "#4d2400", "#ff9933", "#ffd6a8"],
  };
  const p = palettes[palette] || palettes.crystal;
  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect, background: p[0] }}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 400">
        <defs>
          <linearGradient id={`g-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={p[1]} />
            <stop offset="50%" stopColor={p[2]} />
            <stop offset="100%" stopColor={p[3]} />
          </linearGradient>
          <pattern id={`p-${id}`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <rect width="3" height="3" fill={p[0]} />
            <rect width="1" height="3" fill={p[2]} opacity="0.45" />
          </pattern>
          <radialGradient id={`r-${id}`} cx="35%" cy="40%" r="65%">
            <stop offset="0%" stopColor={p[3]} stopOpacity="0.8" />
            <stop offset="60%" stopColor={p[2]} stopOpacity="0.2" />
            <stop offset="100%" stopColor={p[0]} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill={`url(#g-${id})`} opacity="0.85" />
        <rect width="400" height="400" fill={`url(#p-${id})`} opacity="0.5" />
        <rect width="400" height="400" fill={`url(#r-${id})`} />
        {/* diamond / crystal shapes */}
        <g opacity="0.6" stroke={p[3]} strokeWidth="0.7" fill="none">
          <polygon points="200,80 320,200 200,320 80,200" />
          <polygon points="200,120 280,200 200,280 120,200" />
          <line x1="80" y1="200" x2="320" y2="200" />
          <line x1="200" y1="80" x2="200" y2="320" />
        </g>
      </svg>
      {label && (
        <div className="absolute inset-0 flex items-end justify-between p-3 sm:p-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 mix-blend-difference">
            {label}
          </span>
          {note && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 mix-blend-difference">
              {note}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* Animated 3D/VJ-style loop placeholder (CSS rotating shapes) */
function VJLoopPlaceholder({ label, hue = 200, className = "", aspect = "16/9" }) {
  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);
  return (
    <div
      className={`vj-loop relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect, "--vj-hue": hue }}
    >
      <div className={`vj-${id} absolute inset-0`}>
        <div className="vj-orb" />
        <div className="vj-ring" />
        <div className="vj-ring vj-ring-2" />
        <div className="vj-grid" />
      </div>
      {label && (
        <div className="absolute inset-0 flex items-end p-3 sm:p-4 pointer-events-none">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 mix-blend-difference">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  useInView,
  useMouse,
  useScrollY,
  FadeIn,
  GraphicPlaceholder,
  VJLoopPlaceholder,
});
