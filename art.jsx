/* IF — Art brand
   Design: dark, immersive, reactive. Cursor-follow, parallax, glitch.
   Y2K / cyber / sci-fi tonality. Graphics-first. */

const { useState: useStateI, useEffect: useEffectI, useRef: useRefI } = React;

/* ---------------- Custom cursor ---------------- */
const isTouchDevice = () => navigator.maxTouchPoints > 0;

function ArtCursor() {
  if (isTouchDevice()) return null;
  const dotRef = useRefI(null);
  const ringRef = useRefI(null);
  const [label, setLabel] = useStateI("");
  useEffectI(() => {
    let dx = 0, dy = 0, rx = 0, ry = 0;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let raf;
    const tick = () => {
      // dot follows fast, ring lags
      dx += (mx - dx) * 0.42;
      dy += (my - dy) * 0.42;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx}px,${dy}px,0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      const t = e.target;
      if (t && t.closest && t.closest("[data-cursor]")) {
        const l = t.closest("[data-cursor]").getAttribute("data-cursor");
        setLabel(l || "");
      } else setLabel("");
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={dotRef} className="art-cursor-dot" />
      <div ref={ringRef} className="art-cursor-ring">
        {label && <span className="art-cursor-label">{label}</span>}
      </div>
    </React.Fragment>
  );
}

/* ---------------- Nav ---------------- */
function ArtNav({ go, t, lang, setLang }) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-6 py-5 md:px-10">
        <button
          onClick={() => go("landing")}
          data-cursor="back"
          className="flex items-center gap-3"
        >
          <img
            src="assets/logo_IF_trim.png"
            alt="IF"
            className="h-9 w-auto"
            style={{ mixBlendMode: "screen" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
            / Art
          </span>
        </button>
        <div className="flex items-center gap-5 md:gap-7">
          {t.art.nav.map((n, i) => {
            const h = ["#a-graphic", "#a-motion", "#a-vj", "#a-about"][i];
            return (
              <a
                key={n}
                href={h}
                data-cursor="→"
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55 transition-colors hover:text-white"
              >
                {n}
              </a>
            );
          })}
          <LangSwitch lang={lang} setLang={setLang} dark />
        </div>
      </div>
    </nav>
  );
}

/* ---------------- Hero ---------------- */
function ArtHero({ t }) {
  const wrapRef = useRefI(null);
  const [tilt, setTilt] = useStateI({ x: 0, y: 0 });
  const [glitch, setGlitch] = useStateI(false);
  const H = t.art.hero;

  useEffectI(() => {
    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setTilt({
        x: (e.clientX - cx) / cx,
        y: (e.clientY - cy) / cy,
      });
    };
    window.addEventListener("mousemove", onMove);
    // periodic glitch
    const iv = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 4200);
    return () => {
      window.removeEventListener("mousemove", onMove);
      clearInterval(iv);
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative flex h-screen min-h-[720px] items-center justify-center overflow-hidden"
    >
      {/* Hero crystal graphic, mouse parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate3d(${tilt.x * -20}px, ${tilt.y * -20}px, 0) scale(1.1)`,
          transition: "transform 0.6s cubic-bezier(.18,.7,.2,1)",
        }}
      >
        <img
          src="assets/works/sff.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(1.05)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.92) 100%)",
          }}
        />
      </div>

      {/* Scan lines */}
      <div className="pointer-events-none absolute inset-0 scanlines" />

      {/* Center content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.5em] text-white/55">
          {H.kicker}
        </div>

        {/* Logo as title */}
        <div
          className="relative mx-auto mt-8 flex items-center justify-center"
          style={{
            transform: `translate3d(${tilt.x * 8}px, ${tilt.y * 8}px, 0)`,
            transition: "transform 0.6s cubic-bezier(.18,.7,.2,1)",
          }}
        >
          <div
            className="absolute inset-0 -z-10 blur-[120px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(168, 92, 255, 0.6), rgba(0, 240, 255, 0.25) 35%, transparent 70%)",
              opacity: 0.85,
            }}
          />
          <img
            src="assets/logo_IF_trim.png"
            alt="IF"
            className={`relative h-[clamp(5rem,15vw,11rem)] w-auto select-none ${
              glitch ? "art-glitch" : ""
            }`}
            style={{
              mixBlendMode: "screen",
              filter: glitch
                ? "drop-shadow(2px 0 #ff2bd6) drop-shadow(-2px 0 #00f0ff)"
                : "drop-shadow(0 0 32px rgba(168, 92, 255, 0.35))",
            }}
            draggable="false"
          />
        </div>

        <div className="mt-10 font-mono text-sm tracking-[0.42em] uppercase text-white/75 md:text-base">
          {H.tagline.split(" / ").map((w, i, arr) => (
            <React.Fragment key={i}>
              {w}
              {i < arr.length - 1 && (
                <span className="text-white/40"> / </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
          {H.body}
        </p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
          {H.meta.map((m, i) => (
            <React.Fragment key={i}>
              <span className={i === H.meta.length - 1 ? "text-white/85" : ""}>{m}</span>
              {i < H.meta.length - 1 && <span className="text-white/20">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* corner marks */}
      <div className="pointer-events-none absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
        REC ● 00:00:42
      </div>
      <div className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
        v2.6 / build {Math.floor(Math.random() * 9000 + 1000)}
      </div>
      <div className="pointer-events-none absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
        scroll ↓
      </div>
      <div className="pointer-events-none absolute bottom-6 right-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
        no.001 / hero — crystal
      </div>
    </section>
  );
}

/* ---------------- Graphic Works ---------------- */
const graphicWorks = [
  {
    id: "g01",
    title: "Crystalline / Diamonds",
    num: "G01",
    type: "image",
    src: "assets/works/crystal.png",
    note: "2026",
    tags: "3D · Graphic",
  },
  {
    id: "g02",
    title: "SFF",
    num: "G02",
    type: "image",
    src: "assets/works/sff.png",
    note: "2025",
    tags: "Glitch · Y2K",
  },
  {
    id: "g03",
    title: "Chrome / Freedom",
    num: "G03",
    type: "image",
    src: "assets/works/chrome.png",
    note: "2025",
    tags: "Cyber · Type",
  },
  {
    id: "g04",
    title: "Chrome II / Motion",
    num: "G04",
    type: "video",
    src: "assets/works/chrome2.mp4",
    note: "2026",
    tags: "Motion · Graphic",
  },
];

/* ---------------- Lightbox (generic) ---------------- */
function MediaLightbox({ item, items, onClose, onNavigate }) {
  useEffectI(() => {
    if (!item) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate(1);
      if (e.key === "ArrowLeft") onNavigate(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose, onNavigate]);
  if (!item) return null;
  const safeItems = Array.isArray(items) && items.length ? items : [item];
  const idx = Math.max(0, safeItems.findIndex((it) => it.id === item.id));
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9000] flex flex-col bg-black/95 backdrop-blur-md art-lightbox"
      onClick={onClose}
      style={isTouchDevice() ? {} : { cursor: "none" }}
    >
      <div className="flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 md:px-10">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-white">{item.num}</span>
          <span className="text-white/40">/</span>
          <span>{item.title}</span>
          {item.tags && (
            <React.Fragment>
              <span className="text-white/40">·</span>
              <span className="text-white/55">{item.tags}</span>
            </React.Fragment>
          )}
        </div>
        <button
          data-cursor="close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-black"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-6 pb-4 md:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        {safeItems.length > 1 && (
          <React.Fragment>
            <button
              data-cursor="prev"
              onClick={() => onNavigate(-1)}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 font-mono text-[11px] tracking-[0.25em] text-white/80 backdrop-blur hover:bg-white hover:text-black md:left-6"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              data-cursor="next"
              onClick={() => onNavigate(1)}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-3 py-2 font-mono text-[11px] tracking-[0.25em] text-white/80 backdrop-blur hover:bg-white hover:text-black md:right-6"
              aria-label="Next"
            >
              →
            </button>
          </React.Fragment>
        )}

        <div className="relative flex h-full max-h-[78vh] w-full max-w-[1400px] items-center justify-center">
          {item.type === "video" && (
            <video
              key={item.src}
              src={item.src}
              autoPlay
              loop
              playsInline
              controls
              className="max-h-full max-w-full rounded-sm shadow-[0_30px_120px_-30px_rgba(168,92,255,0.4)]"
            />
          )}
          {item.type === "image" && (
            <img
              key={item.src}
              src={item.src}
              alt={item.title}
              className="max-h-full max-w-full rounded-sm object-contain shadow-[0_30px_120px_-30px_rgba(168,92,255,0.4)]"
            />
          )}
          {item.type === "youtube" && (
            <div className="relative w-full max-w-[1400px] aspect-video">
              <iframe
                key={item.src}
                src={`https://www.youtube.com/embed/${item.src}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1`}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full rounded-sm shadow-[0_30px_120px_-30px_rgba(168,92,255,0.4)]"
              />
            </div>
          )}
        </div>
      </div>

      {safeItems.length > 1 && (
        <div
          className="flex items-center justify-center gap-2 overflow-x-auto px-5 py-4 md:px-10"
          onClick={(e) => e.stopPropagation()}
        >
          {safeItems.map((g, i) => (
            <button
              key={g.id}
              data-cursor="view"
              onClick={() => onNavigate(i - idx)}
              className={`relative h-12 w-16 flex-none overflow-hidden rounded-sm border transition-all ${
                i === idx
                  ? "border-white opacity-100"
                  : "border-white/15 opacity-55 hover:opacity-90"
              }`}
              aria-label={g.title}
            >
              {g.type === "image" && (
                <img
                  src={g.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {g.type === "video" && (
                <video
                  src={g.src}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              {g.type === "youtube" && (
                <img
                  src={`https://img.youtube.com/vi/${g.src}/mqdefault.jpg`}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function GraphicCard({ w, i, onOpen }) {
  const [hover, setHover] = useStateI(false);
  return (
    <FadeIn delay={i * 0.08}>
      <article
        data-cursor="zoom +"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onOpen(w, graphicWorks)}
        className="group relative cursor-pointer overflow-hidden border border-white/10 transition-colors duration-500 hover:border-white/40"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          {w.type === "video" ? (
            <video
              src={w.src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms]"
              style={{
                transform: hover ? "scale(1.06)" : "scale(1.01)",
                filter: hover ? "saturate(1.15) contrast(1.05)" : "saturate(1)",
              }}
            />
          ) : (
            <img
              src={w.src}
              alt={w.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms]"
              style={{
                transform: hover ? "scale(1.06)" : "scale(1.01)",
                filter: hover ? "saturate(1.15) contrast(1.05)" : "saturate(1)",
              }}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500"
            style={{
              opacity: hover ? 0.6 : 0,
              background:
                "linear-gradient(115deg, rgba(255,0,200,0.15) 0%, transparent 35%, transparent 65%, rgba(0,200,255,0.15) 100%)",
              mixBlendMode: "screen",
            }}
          />
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: hover ? 1 : 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), transparent 55%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 p-4 transition-transform duration-500"
          style={{
            transform: hover ? "translateY(0)" : "translateY(20px)",
            opacity: hover ? 1 : 0,
          }}
        >
          <div className="flex items-end justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/65">
                {w.num} / {w.note} · {w.tags}
              </div>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-white">
                {w.title}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
              view →
            </span>
          </div>
        </div>
        <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mix-blend-difference">
          {w.num}
        </div>
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mix-blend-difference">
          {w.type === "video" && (
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
          )}
          {w.type === "video" ? "loop" : w.note}
        </div>
        {/* expand icon, visible on hover */}
        <div
          className="pointer-events-none absolute right-3 top-9 flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/40 font-mono text-[11px] text-white backdrop-blur transition-opacity duration-300"
          style={{ opacity: hover ? 1 : 0 }}
        >
          ⤢
        </div>
      </article>
    </FadeIn>
  );
}

function GraphicWorks({ onOpen, t }) {
  const G = t.art.graphic;
  return (
    <section id="a-graphic" className="relative px-6 py-32 md:px-10">
      <FadeIn>
        <div className="mb-12 flex items-end justify-between border-t border-white/10 pt-8">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              {G.eyebrow}
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {G.title}
            </h2>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 md:block">
            {graphicWorks.length} works · {G.hint}
          </div>
        </div>
      </FadeIn>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {graphicWorks.map((w, i) => (
          <GraphicCard key={w.num} w={w} i={i} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

/* ---------------- Motion Graphics (featured video) ---------------- */
function MotionGraphicsSection({ onOpen, t }) {
  const [hover, setHover] = useStateI(false);
  const item = motionItems[0];
  const M = t.art.motion;
  return (
    <section
      id="a-motion"
      className="relative border-t border-white/10 px-6 py-32 md:px-10"
    >
      <FadeIn>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              {M.eyebrow}
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {M.title}
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/60">
              {M.body}
            </p>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 md:block">
            {M.featured}
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div
          data-cursor="zoom +"
          onClick={() => onOpen(item, motionItems)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="group relative aspect-video w-full cursor-pointer overflow-hidden border border-white/15 bg-black"
        >
          <iframe
            src={`https://www.youtube.com/embed/${item.src}?autoplay=1&mute=1&loop=1&playlist=${item.src}&controls=0&modestbranding=1&rel=0&playsinline=1`}
            title="Motion Graphics"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 h-full w-full pointer-events-none transition-opacity duration-700"
            style={{ opacity: hover ? 1 : 0.78 }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mix-blend-difference">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
              REC · M01
            </span>
            <span>3D · Audio Sync · Music: Bemaybe</span>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 transition-opacity duration-500"
            style={{ opacity: hover ? 0 : 1 }}
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/70">
                M01 / 2025
              </div>
              <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {M.cardTitle}
              </h3>
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/65 md:inline">
              {M.clickHint}
            </span>
          </div>
          {/* expand icon overlay */}
          <div
            className="pointer-events-none absolute right-5 top-12 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition-opacity duration-300"
            style={{ opacity: hover ? 1 : 0 }}
          >
            ⤢
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

const motionItems = [
  {
    id: "m01",
    title: "Short Motion Graphics",
    num: "M01",
    type: "youtube",
    src: "CAtGhFXoekk",
    note: "2025",
    tags: "3D · Audio Sync",
  },
];

const vjLoops = [
  {
    id: "v01",
    title: "Crystal Tunnel",
    num: "V01",
    type: "video",
    src: "assets/vj/crystal-tunnel.mp4",
    tools: "Blender · After Effects",
    tags: "3D · Loop",
  },
  {
    id: "v02",
    title: "Abstract / 06",
    num: "V02",
    type: "video",
    src: "assets/vj/abstract6.mp4",
    tools: "Cavalry · Blender",
    tags: "3D · Loop",
  },
  {
    id: "v03",
    title: "VJ Visual / 03",
    num: "V03",
    type: "youtube",
    src: "lEQNqZ_5YVk",
    tools: "Blender · Touchdesigner",
    tags: "3D · Loop",
  },
  {
    id: "v04",
    title: "VJ Visual / 04",
    num: "V04",
    type: "youtube",
    src: "P_mQIGGsf3U",
    tools: "Blender · After Effects",
    tags: "3D · Loop",
  },
];

function VJSection({ onOpen, t }) {
  const V = t.art.vj;
  return (
    <section id="a-vj" className="relative bg-[#050505] px-0 py-32">
      <FadeIn>
        <div className="mb-12 flex items-end justify-between border-t border-white/10 px-6 pt-8 md:px-10">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              {V.eyebrow}
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {V.title}
            </h2>
            <p className="mt-4 max-w-md text-sm text-white/55">
              {V.body}
            </p>
          </div>
          <div className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 md:block">
            {V.hint}
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-px bg-white/5 md:grid-cols-2">
        {vjLoops.map((v, i) => (
          <FadeIn key={v.id} delay={i * 0.08}>
            <div
              data-cursor="zoom +"
              onClick={() => onOpen(v, vjLoops)}
              className="group relative h-full cursor-pointer bg-black"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                {v.type === "video" ? (
                  <video
                    src={v.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.src}?autoplay=1&mute=1&loop=1&playlist=${v.src}&controls=0&modestbranding=1&rel=0&playsinline=1`}
                    title={v.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 h-full w-full pointer-events-none"
                  />
                )}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 mix-blend-difference">
                <span>{v.num}</span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400" />
                  LOOP
                </span>
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), transparent 80%)",
                }}
              >
                <div>
                  <div className="text-lg font-semibold tracking-tight text-white md:text-xl">
                    {v.title}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                    {v.tools}
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  ⤢
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Music × Visual ---------------- */
function MusicSection() {
  const bars = Array.from({ length: 48 }, (_, i) => i);
  return (
    <section id="a-music" className="relative px-6 py-32 md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeIn>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              004 · Music × Visual
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Sound is<br />
              <span className="text-white/55">a frame too.</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60 md:text-base">
              Bass Music を中心とした作曲と、映像との完全シンクロ。
              音と画が分かれていない、ひと続きの体験を作っています。
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
              <div>
                <div className="text-white/35">BPM</div>
                <div className="mt-1 text-white">140 — 174</div>
              </div>
              <div>
                <div className="text-white/35">DAW</div>
                <div className="mt-1 text-white">Ableton Live</div>
              </div>
              <div>
                <div className="text-white/35">Format</div>
                <div className="mt-1 text-white">WAV · Stems</div>
              </div>
              <div>
                <div className="text-white/35">Sync</div>
                <div className="mt-1 text-white">Frame-accurate</div>
              </div>
            </div>
          </FadeIn>
        </div>

        <div className="md:col-span-7">
          <FadeIn delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden border border-white/15 bg-black">
              {/* deck-like display */}
              <VJLoopPlaceholder label="" hue={250} aspect="16/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                  <span>track_07 — “Aphelion”</span>
                  <span>03:48 / 04:32</span>
                </div>
                <div className="mt-3 flex h-16 items-end gap-[2px]">
                  {bars.map((i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-white/85"
                      style={{
                        height: `${
                          12 +
                          Math.abs(Math.sin(i * 0.42)) * 60 +
                          Math.abs(Math.sin(i * 0.13)) * 20
                        }%`,
                        animation: `bar-pulse ${
                          0.8 + (i % 7) * 0.1
                        }s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.02}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  <button
                    data-cursor="play"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition-colors hover:bg-white hover:text-black"
                  >
                    ▶
                  </button>
                  <div className="h-px flex-1 bg-white/20">
                    <div className="h-full w-[83%] bg-white/85" />
                  </div>
                  <span>−6db</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About / Contact ---------------- */
function ArtAbout({ t }) {
  const A = t.art.about;
  const tools = [
    "After Effects",
    "Blender",
    "Cavalry",
    "Illustrator",
    "Cubase",
  ];
  const [copied, setCopied] = useStateI(false);
  return (
    <section
      id="a-about"
      className="relative border-t border-white/10 px-6 py-32 md:px-10"
    >
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeIn>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/45">
              {A.eyebrow}
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {A.h2a}<br />
              {A.h2b}<br />
              <span className="text-white/55">{A.h2c}</span>
            </h2>
          </FadeIn>
        </div>
        <div className="md:col-span-7">
          <FadeIn delay={0.1}>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              {A.body}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                {A.toolkit}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/75 transition-colors hover:border-white/45 hover:text-white"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                {A.contact}
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("IFvisuals4401@gmail.com");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                data-cursor="copy"
                className="group mt-4 flex items-baseline gap-4"
              >
                <span className="text-2xl text-white transition-colors group-hover:text-[#a8d5ff] md:text-3xl">
                  IFvisuals4401@gmail.com
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                  {copied ? A.copyDone : A.copyDefault}
                </span>
              </button>
              <div className="mt-4 flex gap-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                <a href="https://x.com/IF_Kakuhito" target="_blank" rel="noopener noreferrer" data-cursor="→" className="hover:text-white">
                  X / Twitter
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-32 flex items-center justify-between border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
          <span>{A.footer}</span>
          <span>
            ▮ ▮ ▮ <span className="text-white/15">▮ ▮ ▮ ▮</span>
          </span>
        </div>
      </FadeIn>
    </section>
  );
}

/* ---------------- Spotlight ---------------- */
function ArtSpotlight() {
  const [pos, setPos] = useStateI({ x: -1000, y: -1000 });
  useEffectI(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px,
          rgba(126,58,255,0.10),
          rgba(0,240,255,0.05) 30%,
          transparent 65%)`,
      }}
    />
  );
}

/* ---------------- Page ---------------- */
function ArtPage({ go, t, lang, setLang, openShare }) {
  const [box, setBox] = useStateI(null); // { item, items } | null

  const open = (item, items) => setBox({ item, items });
  const close = () => setBox(null);
  const navigate = (delta) => {
    if (!box) return;
    const i = box.items.findIndex((it) => it.id === box.item.id);
    const next = (i + delta + box.items.length) % box.items.length;
    setBox({ item: box.items[next], items: box.items });
  };

  return (
    <div className="art-scope relative min-h-screen overflow-hidden bg-black text-white">
      <ArtSpotlight />
      <ArtCursor />
      <ArtNav go={go} t={t} lang={lang} setLang={setLang} />
      <main className="relative z-10">
        <ArtHero t={t} />
        <GraphicWorks onOpen={open} t={t} />
        <MotionGraphicsSection onOpen={open} t={t} />
        <VJSection onOpen={open} t={t} />
        <ArtAbout t={t} />
      </main>
      <MediaLightbox
        item={box ? box.item : null}
        items={box ? box.items : []}
        onClose={close}
        onNavigate={navigate}
      />
    </div>
  );
}

window.ArtPage = ArtPage;
