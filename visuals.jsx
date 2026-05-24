/* IF Visuals — Commercial / BtoB brand
   Now bilingual via t.visuals (i18n). Keeps Inter, mono labels, smooth transitions. */

const { useState: useStateV, useEffect: useEffectV, useRef: useRefV } = React;

/* Service color accents (i18n-independent) */
const visualsServiceColors = ["#2a6fdb", "#1f8a5b", "#b8762a", "#7a48c4"];

/* Work meta — videoIds & years (i18n-independent) */
const visualsWorksMeta = [
  { videoId: "Dwcolf0WEoQ", year: "2026" },
  { videoId: "PBCakwNhR3A", year: "2026" },
  { videoId: "CAtGhFXoekk", year: "2025" },
  { videoId: "GL9ReHFRcbU", year: "2025" },
  { videoId: "tleyEB8NJJ8", year: "2025" },
];

function VisualsNav({ go, t, lang, setLang, openShare }) {
  const [scrolled, setScrolled] = useStateV(false);
  useEffectV(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const V = t.visuals.nav;
  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-black/8 bg-[#fafaf7]/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => go("landing")}
          className="flex items-center gap-3 transition-opacity hover:opacity-70"
        >
          <img
            src="assets/logo_IF_trim.png"
            alt="IF"
            className="h-9 w-auto"
            style={{ filter: "invert(1)" }}
          />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.3em] text-black/60 md:inline">
            {V.brand}
          </span>
        </button>
        <div className="flex items-center gap-5 md:gap-7">
          {[
            [V.services, "v-services"],
            [V.works, "v-works"],
            [V.about, "v-about"],
            [V.contact, "v-contact"],
          ].map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-[13px] text-black/65 transition-colors hover:text-black"
            >
              {label}
            </a>
          ))}
          <LangSwitch lang={lang} setLang={setLang} dark={false} />
          <a
            href="#v-contact"
            className="hidden rounded-full bg-black px-4 py-2 text-[12px] font-medium text-white transition-transform hover:scale-[1.02] md:inline-block"
          >
            {V.cta}
          </a>
        </div>
      </div>
    </nav>
  );
}

function VisualsHero({ t }) {
  const H = t.visuals.hero;
  return (
    <section className="relative px-6 pt-36 pb-20 md:px-12 md:pt-44 md:pb-28">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45">
            {H.eyebrow}
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="mt-6 max-w-5xl text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-black text-balance">
            {H.h1a}<br />
            <span className="text-black/55">{H.h1b}</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-black/65 md:text-lg">
            {H.body}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#v-works"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
            >
              {H.cta1}
              <span>→</span>
            </a>
          </div>
        </FadeIn>

        {/* Reel embed */}
        <FadeIn delay={0.45}>
          <div className="mt-16 overflow-hidden rounded-2xl border border-black/8 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] md:mt-20">
            <div className="relative aspect-video">
              <iframe
                src="https://www.youtube.com/embed/PBCakwNhR3A?autoplay=1&mute=1&loop=1&playlist=PBCakwNhR3A&controls=1&modestbranding=1&rel=0"
                title="Showreel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-3 text-[11px] font-mono uppercase tracking-[0.25em] text-white/70">
              <span>{H.reelTitle}</span>
              <span>03:42</span>
            </div>
          </div>
        </FadeIn>

        {/* Stats strip */}
        <FadeIn delay={0.55}>
          <div className="mt-20 grid grid-cols-2 gap-y-8 border-t border-black/10 pt-10 md:grid-cols-4">
            {t.visuals.stats.map(([big, small]) => (
              <div key={small} className="px-2">
                <div className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
                  {big}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-black/45">
                  {small}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function VisualsServices({ t }) {
  const S = t.visuals.services;
  return (
    <section id="v-services" className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45">
                {S.eyebrow}
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {S.title}
              </h2>
            </div>
            <div className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-black/40 md:block">
              {S.count}
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {S.items.map((s, i) => {
            const color = visualsServiceColors[i % visualsServiceColors.length];
            return (
              <FadeIn key={s.n} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-black/8 bg-white p-7 transition-all duration-500 hover:border-black/20 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:p-9">
                  <div className="flex items-start justify-between">
                    <span
                      className="font-mono text-[11px] tracking-[0.2em]"
                      style={{ color }}
                    >
                      {s.n}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
                      {s.deliverables}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight text-black">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-black/65">
                    {s.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-[12px] text-black/55 transition-all duration-300 group-hover:gap-3 group-hover:text-black">
                    <span>{S.more}</span>
                    <span>→</span>
                  </div>
                  <div
                    className="pointer-events-none absolute -bottom-1 left-0 h-1 transition-all duration-500 group-hover:w-full"
                    style={{ width: "0%", background: color }}
                  />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function VisualsWorks({ t }) {
  const [hoveredId, setHoveredId] = useStateV(null);
  const W = t.visuals.works;
  const works = W.items.map((it, i) => ({ ...it, ...visualsWorksMeta[i] }));
  return (
    <section id="v-works" className="relative bg-[#f0efe9] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <FadeIn>
          <div className="flex items-end justify-between border-b border-black/10 pb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45">
                {W.eyebrow}
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black md:text-4xl">
                {W.title}
              </h2>
            </div>
            <div className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-black/40 md:block">
              {W.range}
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <article
                onMouseEnter={() => setHoveredId(i)}
                onMouseLeave={() => setHoveredId(null)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video overflow-hidden rounded-xl border border-black/8 bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${w.videoId}?autoplay=1&mute=1&loop=1&playlist=${w.videoId}&controls=0&modestbranding=1&rel=0`}
                    title={w.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 h-full w-full pointer-events-none transition-all duration-700"
                    style={{
                      opacity: hoveredId === i ? 1 : 0.55,
                      transform: hoveredId === i ? "scale(1.02)" : "scale(1)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.55), transparent 50%)",
                      opacity: hoveredId === i ? 0 : 0.6,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 transition-opacity duration-500"
                    style={{ opacity: hoveredId === i ? 0 : 1 }}
                  >
                    <span>{w.tag}</span>
                    <span>{w.year}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-tight text-black">
                      {w.title}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-black/55">{w.client}</p>
                  </div>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-black/45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}

          {/* "more" card */}
          <FadeIn delay={works.length * 0.07}>
            <a
              href="#v-contact"
              className="group flex aspect-video items-center justify-center rounded-xl border border-dashed border-black/20 transition-colors hover:border-black/45 hover:bg-white/40"
            >
              <div className="text-center">
                <div className="text-4xl text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-black/60">
                  →
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-black/45">
                  {W.more}
                </div>
              </div>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function VisualsAbout({ t }) {
  const A = t.visuals.about;
  const tools = [
    { name: "After Effects", icon: "assets/adobe-aftereffects-file.svg" },
    { name: "Illustrator", icon: "assets/adobe-illustrator.svg" },
    { name: "Premiere Pro", icon: "assets/adobe-premiere-pro.svg" },
    { name: "Blender", icon: "assets/blender.svg" },
  ];
  return (
    <section id="v-about" className="relative bg-[#f0efe9] px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeIn>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45">
              {A.eyebrow}
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black md:text-4xl">
              {A.name}<br />
              <span className="text-black/55">{A.role}</span>
            </h2>
          </FadeIn>
        </div>
        <div className="md:col-span-7">
          <FadeIn delay={0.1}>
            <p className="text-base leading-relaxed text-black/70 md:text-lg">
              {A.body}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-3 py-3 transition-all hover:border-black/25"
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className={`h-7 w-7 ${
                      tool.name === "Illustrator" ? "scale-110" : ""
                    }`}
                  />
                  <span className="text-[12px] font-medium text-black">{tool.name}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-black/10 pt-8 md:grid-cols-3">
              {A.meta.map(([k, v]) => (
                <div key={k}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/40">
                    {k}
                  </div>
                  <div className="mt-1.5 text-[14px] text-black">{v}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function VisualsContact({ t }) {
  const [copied, setCopied] = useStateV(false);
  const C = t.visuals.contact;
  return (
    <section id="v-contact" className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <FadeIn>
              <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45">
                {C.eyebrow}
              </div>
              <h2 className="mt-3 text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-black">
                {C.h2a}<br />
                <span className="text-black/55">{C.h2b}</span>
              </h2>
            </FadeIn>
          </div>
          <div className="md:col-span-5">
            <FadeIn delay={0.15}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("IFvisuals4401@gmail.com");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-5 py-4 text-left transition-colors hover:border-black/30"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/45">
                    {C.emailLabel}
                  </div>
                  <div className="mt-1 text-[15px] font-medium text-black">
                    IFvisuals4401@gmail.com
                  </div>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/55 group-hover:text-black">
                  {copied ? C.copyDone : C.copyDefault}
                </span>
              </button>
              <div className="mt-3">
                <a
                  href="https://x.com/IF_Kakuhito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-black/10 bg-white px-5 py-4 transition-colors hover:border-black/30"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-black/45">
                    {C.twitterLabel}
                  </div>
                  <div className="mt-1 text-[14px] text-black">@IF_Kakuhito</div>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-8 text-[11px] font-mono uppercase tracking-[0.25em] text-black/45 md:flex-row md:items-center">
            <span>{C.footer}</span>
            <span>{C.footerRight}</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function VisualsPage({ go, t, lang, setLang, openShare }) {
  return (
    <div className="visuals-scope min-h-screen bg-[#fafaf7] text-black">
      <VisualsNav go={go} t={t} lang={lang} setLang={setLang} openShare={openShare} />
      <main>
        <VisualsHero t={t} />
        <VisualsServices t={t} />
        <VisualsWorks t={t} />
        <VisualsAbout t={t} />
        <VisualsContact t={t} />
      </main>
    </div>
  );
}

window.VisualsPage = VisualsPage;
