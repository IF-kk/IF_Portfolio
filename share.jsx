/* Share / URL panel — shows 6 URLs (3 modes × 2 langs) with copy */

const { useState: useStateS, useEffect: useEffectS } = React;

function SharePanel({ open, onClose }) {
  const [copiedKey, setCopiedKey] = useStateS(null);
  useEffectS(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const rows = [
    { mode: "landing", label: "Top Page", note: "ランディング — 2ブランド分岐" },
    { mode: "visuals", label: "IF Visuals", note: "広告 / BtoB ブランド" },
    { mode: "art", label: "IF.", note: "アート / ビジュアル & ミュージック" },
  ];

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[12000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
      style={{ cursor: "auto" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-[#0c0c10] text-white shadow-[0_30px_120px_-30px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/45">
              Share / URLs
            </div>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">
              ページ別 URL
            </h3>
            <p className="mt-1 text-[12px] text-white/55">
              JP (日本語) / EN (English) の両バージョンをコピーできます。
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:bg-white hover:text-black"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="divide-y divide-white/8">
          {rows.map((row) => (
            <div key={row.mode} className="px-6 py-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[15px] font-semibold tracking-tight">
                    {row.label}
                  </div>
                  <div className="mt-0.5 text-[12px] text-white/55">
                    {row.note}
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  /{row.mode === "landing" ? "" : row.mode}
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {[
                  { lang: "ja", label: "JP / 日本語" },
                  { lang: "en", label: "EN / English" },
                ].map(({ lang, label }) => {
                  const url = buildShareURL(row.mode, lang);
                  const key = row.mode + ":" + lang;
                  const copied = copiedKey === key;
                  return (
                    <div
                      key={lang}
                      className="group flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 transition-colors hover:border-white/25"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/45">
                          {label}
                        </div>
                        <div
                          className="mt-0.5 truncate font-mono text-[11px] text-white/85"
                          title={url}
                        >
                          {url}
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          onClick={() => copy(url, key)}
                          className={`rounded-md border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
                            copied
                              ? "border-emerald-400 text-emerald-300"
                              : "border-white/20 text-white/70 hover:border-white hover:text-white"
                          }`}
                        >
                          {copied ? "✓" : "Copy"}
                        </button>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener"
                          className="rounded-md border border-white/20 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white hover:text-white"
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
          ?lang=en パラメータで英語版に切替 · Esc で閉じる
        </div>
      </div>
    </div>,
    document.body
  );
}

/* Language switcher — small inline pill */
function LangSwitch({ lang, setLang, dark = true }) {
  const items = [
    { key: "ja", label: "JP" },
    { key: "en", label: "EN" },
  ];
  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${
        dark
          ? "border-white/20 bg-white/5"
          : "border-black/10 bg-black/5"
      }`}
    >
      {items.map((it) => {
        const active = lang === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setLang(it.key)}
            className={`px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${
              active
                ? dark
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : dark
                ? "text-white/55 hover:text-white"
                : "text-black/55 hover:text-black"
            }`}
          >
            {it.label}
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { SharePanel, LangSwitch });
