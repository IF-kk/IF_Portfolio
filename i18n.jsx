/* i18n — bilingual content & helpers */

const STRINGS = {
  ja: {
    /* ===== Landing ===== */
    landing: {
      cornerLeft: "IF — Portfolio 2026",
      cornerRight: "Two practices · One creator",
      tagline: "Choose your path",
      footerLeft: "← クライアント向け",
      footerRight: "アート活動 →",
      visuals: {
        cat: "01 / Commercial",
        sub: "Advertising · Commercial",
        title: "IF Visuals.",
        body: "広告・BtoB企業向けのモーショングラフィックスと映像制作。クライアントのゴールから逆算した、伝わるための映像を。",
        tags: ["Motion Graphics", "Infographics", "LP Video", "Edit"],
        enter: "Enter",
        footer: "広告 / BtoB / プロダクト動画",
        badge: "BtoB",
      },
      art: {
        cat: "02 / Art",
        sub: "Visual Artist · Music Producer",
        title: "IF.",
        body: "グラフィック / モーション / サウンドを手がけるビジュアルアーティスト & ミュージックプロデューサー。",
        tags: ["Graphic", "3D / VJ", "Motion", "Music"],
        enter: "Enter",
        footer: "Gallery / VJ / MV / Sound",
        badge: "Art",
      },
    },

    /* ===== IF Visuals ===== */
    visuals: {
      nav: { services: "Services", works: "Works", about: "About", contact: "Contact", cta: "お問い合わせ", brand: "Visuals" },
      hero: {
        eyebrow: "Motion · Edit · 3D · Infographics",
        h1a: "ビジネスを動かす",
        h1b: "映像をつくる。",
        body: "広告 / BtoB企業向けのモーション・編集・3D。目的から逆算した、伝わるための映像制作。",
        cta1: "実績を見る",
        reelTitle: "Showreel 2026",
      },
      stats: [
        ["3yrs", "Editing & Motion"],
        ["AE · Blender · PR", "Main Stack"],
        ["JP / EN", "Languages"],
        ["Tokyo", "Based · Remote OK"],
      ],
      services: {
        eyebrow: "Services",
        title: "提供できること",
        count: "04 categories",
        items: [
          {
            n: "01",
            title: "Motion Graphics",
            desc: "ブランドの世界観を翻訳する、目的設計のモーション。CMからSNS縦型まで、用途に最適化したカット設計でメッセージを伝えます。",
            deliverables: "15s / 30s / 60s · 縦型 / 横型",
          },
          {
            n: "02",
            title: "Infographics",
            desc: "数字とフローを可視化する情報設計。複雑なプロダクト・仕組み・サービス内容を、誰にでも伝わる流れに編み直します。",
            deliverables: "Explainer / Pitch / IR",
          },
          {
            n: "03",
            title: "Product LP Video",
            desc: "ランディングページに溶け込むファーストビュー動画。ファネル設計に基づき、CVRに効くテンポと情報量を計算して制作します。",
            deliverables: "Web LP / OOH / Loop",
          },
          {
            n: "04",
            title: "YouTube / Short Edit",
            desc: "シナリオ設計からテロップ・SE・BGMまで一気通貫。チャンネルの世界観に合わせた、視聴維持率の高い編集を提供します。",
            deliverables: "Long form / Reels / Shorts",
          },
        ],
        more: "詳細を見る",
      },
      works: {
        eyebrow: "Works",
        title: "実績紹介",
        range: "Selected · 2024–2026",
        items: [
          { title: "Promotion / Motion Graphics", client: "Concept Work", tag: "Motion Graphics" },
          { title: "Showreel 2026", client: "IF Visuals", tag: "Reel" },
          { title: "Music Sync Short", client: "Bemaybe", tag: "3D / Audio Sync" },
          { title: "YouTube Long-form", client: "Concept Work", tag: "Edit" },
          { title: "Short Form / Vertical", client: "Concept Work", tag: "Shorts" },
        ],
        more: "More on request",
      },
      about: {
        eyebrow: "About",
        name: "Eiki Tanaka",
        role: "Motion Designer",
        body: "モーショングラフィックスを中心に、広告・BtoB企業の課題解決を行う映像クリエイター。企画段階からの参画を得意とし、目的設計に基づいた表現で「伝わる映像」を制作します。",
        meta: [
          ["Based", "Tokyo / JP"],
          ["Languages", "JP / EN"],
          ["Workflow", "Remote · On-site"],
        ],
      },
      contact: {
        eyebrow: "Contact",
        h2a: "次のプロジェクト、",
        h2b: "話しましょう。",
        emailLabel: "Email",
        copyDefault: "Copy",
        copyDone: "Copied!",
        twitterLabel: "X / Twitter",
        footer: "© 2026 IF Visuals · All rights reserved.",
        footerRight: "Tokyo · Available worldwide",
      },
    },

    /* ===== IF (Art) ===== */
    art: {
      nav: ["Graphic", "Motion", "3D / VJ", "About"],
      hero: {
        kicker: "IF — 002 / Art Practice",
        tagline: "Motion / Graphic / Sound",
        body: "Live action × abstract × sci-fi. Built for screens, clubs and the future.",
        meta: ["2026 — ongoing", "Tokyo / Anywhere", "Available for commissions"],
      },
      graphic: {
        eyebrow: "001 · Graphic Works",
        title: "Graphic.",
        hint: "click to expand",
      },
      motion: {
        eyebrow: "002 · Motion Graphics",
        title: "Motion.",
        body: "2D / 3D / サウンドシンク。一弾の作品としてのモーション。",
        featured: "Featured / 2025 · click to expand",
        cardTitle: "Short Motion Graphics",
        clickHint: "click to expand →",
      },
      vj: {
        eyebrow: "003 · 3D / VJ Visuals",
        title: "Visuals in motion.",
        body: "Loopable visuals for clubs, live shows and installations. Sound-reactive variants on request.",
        hint: "click to expand",
      },
      about: {
        eyebrow: "004 · About",
        h2a: "I make the",
        h2b: "future I want",
        h2c: "to see.",
        body: "実写・抽象・SFを混ぜた、グラフィック / モーション / 3D / サウンド作品を作っています。ゲーム、エンタメ、MV周辺のディレクターと、世界観を共作することが特に得意です。",
        toolkit: "Toolkit",
        contact: "Contact",
        copyDefault: "click to copy",
        copyDone: "copied",
        footer: "© 2026 IF · End of file.",
      },
    },
  },

  en: {
    /* ===== Landing ===== */
    landing: {
      cornerLeft: "IF — Portfolio 2026",
      cornerRight: "Two practices · One creator",
      tagline: "Choose your path",
      footerLeft: "← For Clients",
      footerRight: "For the Work →",
      visuals: {
        cat: "01 / Commercial",
        sub: "Advertising · Commercial",
        title: "IF Visuals.",
        body: "Motion graphics and video production for advertising and B2B brands. Built backwards from your business goal.",
        tags: ["Motion Graphics", "Infographics", "LP Video", "Edit"],
        enter: "Enter",
        footer: "Ads / B2B / Product Video",
        badge: "BtoB",
      },
      art: {
        cat: "02 / Art",
        sub: "Visual Artist · Music Producer",
        title: "IF.",
        body: "Graphic, motion, and sound — visual artist & music producer working at the edge of the screen.",
        tags: ["Graphic", "3D / VJ", "Motion", "Music"],
        enter: "Enter",
        footer: "Gallery / VJ / MV / Sound",
        badge: "Art",
      },
    },

    /* ===== IF Visuals ===== */
    visuals: {
      nav: { services: "Services", works: "Works", about: "About", contact: "Contact", cta: "Get in touch", brand: "Visuals" },
      hero: {
        eyebrow: "Motion · Edit · 3D · Infographics",
        h1a: "Video that",
        h1b: "moves business.",
        body: "Motion, edit & 3D for advertising and B2B. Built backwards from your goal — designed to land.",
        cta1: "See the work",
        reelTitle: "Showreel 2026",
      },
      stats: [
        ["3yrs", "Editing & Motion"],
        ["AE · Blender · PR", "Main Stack"],
        ["JP / EN", "Languages"],
        ["Tokyo", "Based · Remote OK"],
      ],
      services: {
        eyebrow: "Services",
        title: "What I do",
        count: "04 categories",
        items: [
          {
            n: "01",
            title: "Motion Graphics",
            desc: "Mission-driven motion that translates a brand's world. From TV spots to vertical socials — every cut is shaped to land the message.",
            deliverables: "15s / 30s / 60s · Vertical / Landscape",
          },
          {
            n: "02",
            title: "Infographics",
            desc: "Information design that makes numbers and flows obvious. We re-thread complex products and systems into something anyone can follow.",
            deliverables: "Explainer / Pitch / IR",
          },
          {
            n: "03",
            title: "Product LP Video",
            desc: "Above-the-fold video designed for the landing page. We calculate tempo and information density against your funnel — to move CVR.",
            deliverables: "Web LP / OOH / Loop",
          },
          {
            n: "04",
            title: "YouTube / Short Edit",
            desc: "End-to-end — from script to subtitles, SFX and BGM. Editing that matches your channel's voice and holds attention to the end.",
            deliverables: "Long form / Reels / Shorts",
          },
        ],
        more: "More details",
      },
      works: {
        eyebrow: "Works",
        title: "Selected Works",
        range: "Selected · 2024–2026",
        items: [
          { title: "Promotion / Motion Graphics", client: "Concept Work", tag: "Motion Graphics" },
          { title: "Showreel 2026", client: "IF Visuals", tag: "Reel" },
          { title: "Music Sync Short", client: "Bemaybe", tag: "3D / Audio Sync" },
          { title: "YouTube Long-form", client: "Concept Work", tag: "Edit" },
          { title: "Short Form / Vertical", client: "Concept Work", tag: "Shorts" },
        ],
        more: "More on request",
      },
      about: {
        eyebrow: "About",
        name: "Eiki Tanaka",
        role: "Motion Designer",
        body: "A video creator focused on motion graphics, solving problems for advertising and B2B brands. Comfortable joining at the planning stage — building 'video that lands' from purpose first.",
        meta: [
          ["Based", "Tokyo / JP"],
          ["Languages", "JP / EN"],
          ["Workflow", "Remote · On-site"],
        ],
      },
      contact: {
        eyebrow: "Contact",
        h2a: "Let's talk about",
        h2b: "your next project.",
        emailLabel: "Email",
        copyDefault: "Copy",
        copyDone: "Copied!",
        twitterLabel: "X / Twitter",
        footer: "© 2026 IF Visuals · All rights reserved.",
        footerRight: "Tokyo · Available worldwide",
      },
    },

    /* ===== IF (Art) ===== */
    art: {
      nav: ["Graphic", "Motion", "3D / VJ", "About"],
      hero: {
        kicker: "IF — 002 / Art Practice",
        tagline: "Motion / Graphic / Sound",
        body: "Live action × abstract × sci-fi. Built for screens, clubs and the future.",
        meta: ["2026 — ongoing", "Tokyo / Anywhere", "Available for commissions"],
      },
      graphic: {
        eyebrow: "001 · Graphic Works",
        title: "Graphic.",
        hint: "click to expand",
      },
      motion: {
        eyebrow: "002 · Motion Graphics",
        title: "Motion.",
        body: "2D / 3D / audio sync. Motion as a single, complete piece.",
        featured: "Featured / 2025 · click to expand",
        cardTitle: "Short Motion Graphics",
        clickHint: "click to expand →",
      },
      vj: {
        eyebrow: "003 · 3D / VJ Visuals",
        title: "Visuals in motion.",
        body: "Loopable visuals for clubs, live shows and installations. Sound-reactive variants on request.",
        hint: "click to expand",
      },
      about: {
        eyebrow: "004 · About",
        h2a: "I make the",
        h2b: "future I want",
        h2c: "to see.",
        body: "Graphic / motion / 3D / sound, mixing live action, abstraction and sci-fi. Especially at home co-authoring worlds with directors in games, entertainment and music video.",
        toolkit: "Toolkit",
        contact: "Contact",
        copyDefault: "click to copy",
        copyDone: "copied",
        footer: "© 2026 IF · End of file.",
      },
    },
  },
};

function readLangFromURL() {
  const params = new URLSearchParams(window.location.search);
  const l = (params.get("lang") || "").toLowerCase();
  return l === "en" ? "en" : "ja";
}

function buildShareURL(mode, lang) {
  const { origin, pathname } = window.location;
  const base = origin + pathname;
  const query = lang === "en" ? "?lang=en" : "";
  const hash = mode === "landing" ? "" : "#" + mode;
  return base + query + hash;
}

Object.assign(window, { STRINGS, readLangFromURL, buildShareURL });
