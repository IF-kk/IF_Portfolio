/* Landing page — choose your path: IF Visuals vs IF */

const { useState: useStateL, useEffect: useEffectL } = React;

function Landing({ go, t, lang, setLang, openShare }) {
  const [hover, setHover] = useStateL(null); // 'visuals' | 'if' | null
  const [mounted, setMounted] = useStateL(false);
  useEffectL(() => {
    const ti = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(ti);
  }, []);
  const L = t.landing;

  return (
    <div
      className="landing-root relative h-screen w-full overflow-hidden bg-black text-white"
      style={{
        backgroundImage: "url('assets/Grad.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* center tagline */}
      <div
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s",
        }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.6em] text-white/85 md:text-sm">
          {L.tagline}
        </p>
        <div className="mt-3 h-px w-10 bg-white/30" />
      </div>

      {/* corner mark */}
      <div
        className="absolute left-6 top-6 z-40 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:left-10 md:top-8"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.9s ease 0.6s",
        }}
      >
        {L.cornerLeft}
      </div>
      <div
        className="absolute right-6 top-6 z-40 flex items-center gap-3 md:right-10 md:top-8"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.9s ease 0.6s",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {L.cornerRight}
        </span>
        <LangSwitch lang={lang} setLang={setLang} dark />
      </div>

      {/* split halves */}
      <div className="absolute inset-0 z-10 grid grid-cols-1 md:grid-cols-2">
        {/* IF Visuals — left */}
        <Side
          variant="visuals"
          active={hover === "visuals"}
          dimmed={hover === "if"}
          onEnter={() => setHover("visuals")}
          onLeave={() => setHover(null)}
          onClick={() => go("visuals")}
          mounted={mounted}
          delay={0.1}
          copy={L.visuals}
        />
        {/* IF — right */}
        <Side
          variant="if"
          active={hover === "if"}
          dimmed={hover === "visuals"}
          onEnter={() => setHover("if")}
          onLeave={() => setHover(null)}
          onClick={() => go("art")}
          mounted={mounted}
          delay={0.2}
          copy={L.art}
        />
      </div>

      {/* divider */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-20 hidden h-full md:block"
        style={{
          width: "1px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0.18) 70%, transparent 100%)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s ease 0.4s",
        }}
      />

      {/* footer marquee hint */}
      <div
        className="pointer-events-none absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.9s ease 0.9s",
        }}
      >
        <span>{L.footerLeft}</span>
        <span className="text-white/20">|</span>
        <span>{L.footerRight}</span>
      </div>
    </div>
  );
}

function Side({ variant, active, dimmed, onEnter, onLeave, onClick, mounted, delay, copy }) {
  const isVisuals = variant === "visuals";
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative h-full cursor-pointer overflow-hidden"
      style={{
        opacity: mounted ? (dimmed ? 0.35 : 1) : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.9s cubic-bezier(.25,.1,.25,1) ${delay}s, transform 0.9s cubic-bezier(.25,.1,.25,1) ${delay}s`,
      }}
    >
      {/* Tinted background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: isVisuals
            ? "linear-gradient(135deg, rgba(245,245,247,0.10) 0%, rgba(41,151,255,0.05) 50%, transparent 100%)"
            : "linear-gradient(225deg, rgba(94,92,230,0.18) 0%, rgba(255,43,214,0.06) 50%, transparent 100%)",
          opacity: active ? 1 : 0.5,
        }}
      />

      {/* IF Visuals: subtle grid */}
      {isVisuals && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] transition-opacity duration-700"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: active ? 0.14 : 0.06,
          }}
        />
      )}

      {/* IF: scan lines + diagonal */}
      {!isVisuals && (
        <React.Fragment>
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-700"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
              opacity: active ? 1 : 0.6,
            }}
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/3 h-[400px] w-[600px] rounded-full blur-[100px] transition-all duration-1000"
            style={{
              background: "radial-gradient(circle, rgba(126,58,255,0.4), transparent 60%)",
              opacity: active ? 1 : 0.5,
              transform: active ? "scale(1.1)" : "scale(1)",
            }}
          />
        </React.Fragment>
      )}

      {/* content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-16">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: isVisuals ? "#2997ff" : "#a855ff" }}
          />
          {copy.cat}
        </div>

        <div>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/55 transition-all duration-500"
            style={{
              opacity: active ? 1 : 0.75,
              transform: active ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {copy.sub}
          </div>
          <h2
            className="mt-3 leading-none tracking-tight transition-all duration-700"
            style={{
              transform: active ? "translateX(8px)" : "translateX(0)",
            }}
          >
            {isVisuals ? (
              <span
                className="font-semibold text-[clamp(3rem,7vw,6rem)] text-white"
                style={{ letterSpacing: "-0.04em" }}
              >
                IF Visuals.
              </span>
            ) : (
              <span className="relative inline-flex items-center">
                <span
                  className="absolute inset-0 -z-10 blur-[60px]"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(168, 92, 255, 0.55), rgba(0, 240, 255, 0.18) 45%, transparent 75%)",
                    opacity: active ? 1 : 0.6,
                    transition: "opacity 0.7s",
                  }}
                />
                <img
                  src="assets/logo_IF_trim.png"
                  alt="IF"
                  className="h-[clamp(5rem,12vw,11rem)] w-auto select-none"
                  style={{
                    mixBlendMode: "screen",
                    filter: active
                      ? "drop-shadow(0 0 24px rgba(168,92,255,0.45))"
                      : "drop-shadow(0 0 12px rgba(168,92,255,0.2))",
                    transition: "filter 0.6s",
                  }}
                  draggable="false"
                />
                <span
                  className="ml-[-0.1em] font-bold text-[clamp(5rem,12vw,11rem)] leading-[0.85] text-white"
                  style={{ letterSpacing: "-0.06em" }}
                >
                  .
                </span>
              </span>
            )}
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            {copy.body}
          </p>

          {/* discipline tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {copy.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="mt-10 flex items-center gap-3 transition-all duration-500"
            style={{
              transform: active ? "translateX(8px)" : "translateX(0)",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white">
              {copy.enter}
            </span>
            <span
              className={`transition-transform duration-300 ${
                active ? "translate-x-2" : ""
              }`}
            >
              →
            </span>
          </div>
        </div>

        <div className="flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span>{copy.footer}</span>
          <span>{copy.badge}</span>
        </div>
      </div>
    </div>
  );
}

window.Landing = Landing;
