// ─── D E S I G N  7 :  S T U D I O ───
// Curated editorial — asymmetric, warm clay accent, flowing layout
// Font: Inter Tight throughout  |  Palette: warm gray, clay

export default function Design7() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F4F2", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Header — asymmetric */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: "#C47A5A" }} />
            <p className="text-xs tracking-widest uppercase font-medium mb-1" style={{ color: "#9A9088" }}>
              Day 14
            </p>
            <h1 className="text-5xl font-light leading-tight mb-1" style={{
              fontFamily: "'Inter Tight', sans-serif",
              color: "#2E2B28"
            }}>
              Session
            </h1>
            <p className="text-sm font-medium" style={{ color: "#C47A5A" }}>
              Tuesday &middot; 12-day streak
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#9A9088" }}>
              Block A
            </p>
            <p className="text-3xl font-light" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#C47A5A" }}>
              14/15
            </p>
          </div>
        </div>

        {/* Theme — soft callout, not a box */}
        <div className="mb-14">
          <p className="text-xs tracking-widest uppercase font-medium mb-2" style={{ color: "#9A9088" }}>
            Today's focus
          </p>
          <p className="text-2xl font-light" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#2E2B28" }}>
            Forks / Double Attacks
          </p>
          <p className="text-sm mt-1" style={{ color: "#B0A89A" }}>
            Lichess &middot; 30 min &middot; Forks folder
          </p>
        </div>

        {/* Tasks — flowing, no cards */}
        <div className="space-y-8">
          {[
            { num: "01", title: "Tactical Chunking", detail: "30 min · Lichess Forks folder", lines: "Calculate the full line before touching a piece" },
            { num: "02", title: "Adaptation Matches", detail: "1 hr 15 min · 15+10 Rapid, 2 games", lines: "CCT loop after every opponent move" },
            { num: "03", title: "Recovery Analysis", detail: "10 min · Post-game review", lines: "Find the evaluation swing before checking engine" },
            { num: "04", title: "Stockfish Sparring", detail: "30 min · Block A: Endgame", lines: "Trading down technique + king activation" },
          ].map((task, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex items-start gap-5">
                {/* Number */}
                <span className="text-sm font-medium tracking-wider shrink-0" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#C47A5A" }}>
                  {task.num}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#2E2B28" }}>
                      {task.title}
                    </h3>
                    <span className="text-xs shrink-0" style={{ color: "#9A9088" }}>{task.detail}</span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: "#B0A89A" }}>{task.lines}</p>
                  {/* Underline on hover */}
                  <div className="h-px mt-3 transition-all duration-300" style={{
                    backgroundColor: "#C47A5A",
                    width: 0,
                    opacity: 0.3
                  }} onMouseEnter={e => (e.target as HTMLElement).style.width = "100%"}
                     onMouseLeave={e => (e.target as HTMLElement).style.width = "0"} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Block progress */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#2E2B28" }}>
              Block A &middot; Endgame Escalation
            </p>
            <p className="text-xs font-medium" style={{ color: "#C47A5A" }}>
              2 &middot; 5 Stockfish wins
            </p>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-12 flex items-center justify-center text-xs font-medium transition-all" style={{
                backgroundColor: i <= 2 ? "#C47A5A" : "#E8E4DE",
                color: i <= 2 ? "#F5F4F2" : "#C5BFB8",
                fontFamily: "'Inter Tight', sans-serif"
              }}>
                {i <= 2 ? '✓' : i}
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "#B0A89A" }}>
            5 consecutive wins required to unlock Block B
          </p>
        </div>
      </div>
    </div>
  );
}
