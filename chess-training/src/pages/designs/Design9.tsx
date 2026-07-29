// ─── D E S I G N  9 :  W A B I   S L A T E ───
// The hybrid — Wabi-Sabi's soul + Slate's polish
// Warm meets clean. Asymmetry meets function. Emotion meets substance.

export default function Design9() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F7F5F2", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-8 py-12">
        {/* Header — asymmetric, borrowed from Wabi-Sabi, cleaned up */}
        <div className="flex items-start justify-between mb-14">
          <div>
            <div className="w-10 h-px mb-5" style={{ backgroundColor: "#C4493C" }} />
            <p className="text-xs tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "#9A8E84" }}>
              Day 14
            </p>
            <h1 className="text-4xl font-medium leading-tight mb-1" style={{
              fontFamily: "'Inter Tight', sans-serif",
              color: "#1E2A3A"
            }}>
              The Board
            </h1>
            <p className="text-sm" style={{ color: "#8B8178" }}>
              Tuesday &middot; 12-day streak
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light leading-none mb-1" style={{
              fontFamily: "'Inter Tight', sans-serif",
              color: "#C4493C"
            }}>
              二
            </div>
            <p className="text-xs font-medium" style={{ color: "#9A8E84" }}>
              Block A · 14/15
            </p>
          </div>
        </div>

        {/* Theme pill — borrowed from Slate, warmed up */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-sm mb-12" style={{
          backgroundColor: "#EEEAE5",
          color: "#5A4E44",
          borderRadius: 3,
        }}>
          <span className="font-medium" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Today:</span>
          <span>Forks / Double Attacks &mdash; Lichess folder</span>
        </div>

        {/* Tasks — hybrid layout */}
        <div className="space-y-1">
          {[
            { ja: "一", title: "Tactical Chunking", time: "30 min", desc: "Themed puzzle folder &middot; calculate fully before moving" },
            { ja: "二", title: "Adaptation Matches", time: "1 hr 15 min", desc: "2 games &middot; 15+10 Rapid &middot; CCT mental loop" },
            { ja: "三", title: "Recovery Analysis", time: "10 min", desc: "Per game &middot; find the eval swing before checking engine" },
            { ja: "四", title: "Stockfish Sparring", time: "30 min", desc: "Block A &middot; Endgame Escalation &middot; 5-win gate" },
          ].map((task, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex items-center gap-5 px-4 py-5 transition-all duration-200" style={{
                borderLeft: "2px solid transparent",
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.borderLeftColor = "#C4493C"}
                onMouseLeave={e => (e.target as HTMLElement).style.borderLeftColor = "transparent"}
              >
                {/* Japanese numeral — from Wabi-Sabi */}
                <span className="text-lg font-light shrink-0 transition-colors duration-200" style={{
                  fontFamily: "'Noto Serif JP', serif",
                  color: "#C4493C",
                  width: 24,
                  opacity: 0.7,
                }}>
                  {task.ja}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#1E2A3A" }}>
                      {task.title}
                    </h3>
                    <span className="text-xs font-medium shrink-0" style={{ color: "#9A8E84" }}>{task.time}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "#B0A59A" }}>{task.desc}</p>
                </div>

                {/* Checkbox — clean square from Slate */}
                <div className="w-4 h-4 rounded-sm border-2 shrink-0 transition-colors" style={{ borderColor: "#D4CCC4" }} />
              </div>

              {/* Thin separator — not a full box */}
              {i < 3 && <div className="ml-16 mr-4 h-px" style={{ backgroundColor: "#EDE9E4" }} />}
            </div>
          ))}
        </div>

        {/* Block progress — Slate's rounded bars, Wabi-Sabi's warmth */}
        <div className="mt-10 ml-16">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#1E2A3A" }}>
              Block A &middot; Endgame Escalation
            </p>
            <p className="text-xs font-medium" style={{ color: "#C4493C" }}>
              2 / 5 Stockfish wins
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-2 rounded-full transition-all" style={{
                backgroundColor: i <= 2 ? "#C4493C" : "#E8E2DB"
              }} />
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "#B0A59A" }}>
            Gate: 5 consecutive wins to unlock Block B
          </p>
        </div>

        {/* Footer — haiku from Wabi-Sabi */}
        <div className="mt-14 text-center">
          <p className="text-sm leading-relaxed" style={{
            fontFamily: "'Noto Serif JP', serif",
            color: "#C5BDB5"
          }}>
            One move at a time<br />
            The board holds no secrets<br />
            Only patience
          </p>
        </div>
      </div>
    </div>
  );
}
