"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Twitter, Instagram, Play, ChevronDown, Mail, Check, Volume2, VolumeX } from "lucide-react";

function useSpotlight() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  const onMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  return { pos, visible, onMouseMove, onMouseLeave };
}

function useInView(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, isInView };
}

function useScrollFade(targetRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight;
      const p = Math.min(Math.max(-rect.top / (total * 0.5), 0), 1);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  return progress;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView("-80px");

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function MountFade({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={className}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-20px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const t = setTimeout(() => setMounted(true), 10);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-12 ${scrolled
        ? "bg-background/80 backdrop-blur-2xl border-b border-border/50"
        : "bg-transparent"
        }`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(-20px)",
        transition: `opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s, background-color 0.5s`,
      }}
    >
      <div style={{ mixBlendMode: 'screen' }}>
        <img src="/assets/logo_IF.png" alt="IF Logo" className="h-10 w-auto object-contain" />
      </div>
      <div className="flex items-center gap-8">
        {["Works", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-text-secondary transition-colors duration-300 hover:text-foreground"
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scrollProgress = useScrollFade(ref);
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const opacity = 1 - scrollProgress;
  const scale = 1 - scrollProgress * 0.05;

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6"
    >
      <div
        className="flex flex-col items-center"
        style={{ opacity, transform: `scale(${scale})` }}
      >
        <div
          className="relative"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.9)",
            transition: "opacity 1s cubic-bezier(0.25,0.1,0.25,1), transform 1s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <div className="relative text-[clamp(6rem,20vw,14rem)] font-bold leading-none tracking-tighter text-foreground flex justify-center">
            <img src="/assets/logo_IF.png" alt="IF Logo" className="relative z-10 h-[2em] w-auto object-cover transform scale-125 pointer-events-none" style={{ mixBlendMode: 'screen' }} />
            <div
              className="absolute inset-0 blur-[100px] opacity-70 -z-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, var(--glow-cyan), transparent 60%)",
              }}
            />
          </div>
        </div>

        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          <p className="mt-2 text-center text-sm tracking-[0.3em] uppercase text-text-secondary md:text-base">
            Visual Design & Motion Graphics
          </p>
        </div>

        <div
          className="mt-14 w-full max-w-4xl"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(40px)",
            transition:
              "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.7s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.7s",
          }}
        >
          <div
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 md:rounded-3xl cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/PBCakwNhR3A?autoplay=1&mute=1&loop=1&playlist=PBCakwNhR3A&controls=1&modestbranding=1&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full opacity-60 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-glow-cyan/5 via-transparent to-glow-indigo/5 pointer-events-none" />


            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">
                Showreel 2026
              </span>
            </div>

            <div
              className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl transition-opacity duration-400"
              style={{
                opacity: isHovering ? 1 : 0,
                boxShadow:
                  "inset 0 0 0 1px rgba(41, 151, 255, 0.2), 0 0 60px rgba(41, 151, 255, 0.06)",
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10"
        style={{
          opacity: mounted ? 0.4 : 0,
          transition: "opacity 0.6s ease 1.2s",
        }}
      >
        <div className="animate-bounce">
          <ChevronDown size={20} className="text-text-secondary" />
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Logo Animation",
    description:
      "ブランドの象徴に、命を吹き込む。\n\n精緻なキーフレーム制御により、静止した図形を魅惑的なモーションへと昇華させます。流体的な動きから複雑な幾何学アニメーションまで、ブランドのアイデンティティを視覚的に拡張します。",
    number: "01",
    videoId: "Ovn9YIFT8bs",
  },
  {
    title: "Showreel",
    description:
      "あらゆる世界観を、自在に操る。\n\n重厚なコーポレートデザインから、ポップなSNS向けプロモーションまで。目的に合わせた最適なトーン＆マナーを構築し、多様な視覚表現を提供します。\n※本セクションの映像は、技術デモを目的としたコンセプトワーク（架空案件）です。",
    number: "02",
    videoId: "PBCakwNhR3A",
  },
  {
    title: "Short Motion Graphics",
    description:
      "次元を超え、音と同期する視覚体験。\n\n2Dの枠を超えた3DCGの空間設計と、ビートに完璧にシンクロする心地よいモーション。ライブ演出やイベントVTRなど、没入感のある映像体験を創出します。\nMusic by Bemaybe",
    number: "03",
    videoId: "CAtGhFXoekk",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.15}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/50 p-8 transition-colors duration-500 hover:border-glow-cyan/20 md:p-10"
        style={{
          background: "var(--surface-glass)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl">
          {service.videoId && (
            <iframe
              src={`https://www.youtube.com/embed/${service.videoId}?autoplay=1&mute=1&loop=1&playlist=${service.videoId}&controls=0&modestbranding=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-700 pointer-events-none"
              style={{
                opacity: isHovered ? 0.5 : 0,
                transform: isHovered ? "scale(1.05)" : "scale(1)",
              }}
            />
          )}
        </div>

        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(41, 151, 255, 0.06), transparent 70%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: "inset 0 0 0 1px rgba(41, 151, 255, 0.15)",
          }}
        />

        <div className="relative z-10">
          <span className="text-xs font-mono text-text-tertiary tracking-wider">
            {service.number}
          </span>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {service.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {service.description}
          </p>
        </div>

        <div className="relative z-10 mt-8">
          <span className="inline-flex items-center gap-1 text-xs tracking-wider text-text-secondary transition-colors duration-300 group-hover:text-foreground">
            View Projects
            <span
              className="inline-block transition-transform duration-300"
              style={{
                transform: isHovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </FadeIn>
  );
}

function Works() {
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="works" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div
        className={`fixed inset-0 z-40 pointer-events-none flex items-center justify-center transition-all duration-700 ${hoveredVideo ? 'opacity-100 bg-background/80 backdrop-blur-md' : 'opacity-0'}`}
      >
        <div className="relative w-[90vw] max-w-[1920px] aspect-video rounded-xl overflow-hidden shadow-[0_0_100px_rgba(41,151,255,0.15)] pointer-events-auto">
          {services.map((s, i) => (
            s.videoId && (
              <iframe
                key={i}
                src={`https://www.youtube.com/embed/${s.videoId}?autoplay=1&mute=${hoveredVideo === s.videoId && !isMuted ? 0 : 1}&loop=1&playlist=${s.videoId}&controls=0&modestbranding=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${hoveredVideo === s.videoId ? 'opacity-100' : 'opacity-0'}`}
              />
            )
          ))}

          <div className={`absolute bottom-6 right-6 z-50 transition-opacity duration-500 ${hoveredVideo ? 'opacity-100' : 'opacity-0'}`}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/20 bg-background/50 backdrop-blur-md text-foreground transition-all duration-300 hover:scale-110 hover:bg-background/80"
              aria-label="Toggle Mute"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>

      <FadeIn>
        <div className="mb-16">
          <span className="text-xs font-mono tracking-wider text-text-tertiary uppercase">
            Services
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
            What I Do
          </h2>
        </div>
      </FadeIn>

      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service, i) => (
          <div
            key={service.number}
            onMouseEnter={() => setHoveredVideo(service.videoId || null)}
            onMouseLeave={() => setHoveredVideo(null)}
          >
            <ServiceCard service={service} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

const mainTools = [
  { name: "After Effects", category: "Motion", icon: "/assets/adobe-aftereffects-file.svg" },
  { name: "Illustrator", category: "Design", icon: "/assets/adobe-illustrator.svg" },
  { name: "Premiere Pro", category: "Edit", icon: "/assets/adobe-premiere-pro.svg" },
  { name: "Blender", category: "3D", icon: "/assets/blender.svg" },
];

const utilityTools = [{ name: "Python" }, { name: "AI Vibe Coding" }];

function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <span className="text-xs font-mono tracking-wider text-text-tertiary uppercase">
            About
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl text-balance">
            Tools & Craft
          </h2>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Specializing in visual storytelling through motion. Every frame is
            intentional, every transition purposeful. I transform static ideas
            into living, breathing visual experiences.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {mainTools.map((tool, i) => (
            <FadeIn key={tool.name} delay={0.1 * i}>
              <div className="group flex items-center gap-4 rounded-xl border border-border/50 p-5 transition-colors duration-300 hover:border-glow-cyan/20 hover:bg-surface-elevated/50">
                <div className="flex bg-transparent items-center justify-center p-1">
                  <img src={tool.icon} alt={tool.name} className={`h-10 w-10 object-contain ${tool.name === 'Illustrator' ? 'scale-125' : ''}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {tool.name}
                  </p>
                  <p className="text-xs text-text-tertiary">{tool.category}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-16 border-t border-border/30 pt-8">
            <span className="text-[11px] font-mono tracking-wider text-text-tertiary uppercase">
              Workflow / Utility
            </span>
            <div className="mt-4 flex items-center gap-6">
              {utilityTools.map((tool) => (
                <span
                  key={tool.name}
                  className="text-sm text-text-tertiary transition-colors duration-300 hover:text-text-secondary"
                >
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("IFvisuals4401@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative px-6 py-16 md:px-12 lg:px-24">
      <FadeIn>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 border-t border-border/30 pt-12 md:flex-row">
          <p className="text-xs text-text-tertiary tracking-wider">
            &copy; 2026 IF. All Rights Reserved.
          </p>
          <div className="flex items-center">
            <button
              onClick={handleCopy}
              className="group flex items-center gap-3 rounded-full border border-border/50 bg-surface-elevated/30 px-5 py-2.5 transition-all duration-300 hover:border-glow-cyan/30 hover:bg-surface-elevated/80"
            >
              {copied ? (
                <Check size={16} className="text-emerald-400" />
              ) : (
                <Mail size={16} className="text-text-secondary group-hover:text-foreground transition-colors" />
              )}
              <span className={`text-sm tracking-wide transition-colors ${copied ? 'text-emerald-400' : 'text-text-secondary group-hover:text-foreground'}`}>
                {copied ? "Copied to Clipboard!" : "IFvisuals4401@gmail.com"}
              </span>
            </button>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

export default function PortfolioPage() {
  const { pos, visible, onMouseMove, onMouseLeave } = useSpotlight();

  return (
    <div
      className="relative min-h-screen bg-background overflow-x-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundImage: "url('/assets/Grad.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
          background: `
            radial-gradient(
              700px circle at ${pos.x}px ${pos.y}px,
              rgba(30, 180, 255, 0.09),
              rgba(90, 80, 240, 0.05) 30%,
              rgba(0, 0, 0, 0) 65%
            )
          `,
        }}
      />

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[400px] -left-[200px] h-[800px] w-[800px] rounded-full opacity-[0.03] blur-[120px]"
          style={{ background: "var(--glow-cyan)" }}
        />
        <div
          className="absolute -bottom-[300px] -right-[200px] h-[600px] w-[600px] rounded-full opacity-[0.025] blur-[120px]"
          style={{ background: "var(--glow-indigo)" }}
        />
      </div>

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Works />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  );
}
