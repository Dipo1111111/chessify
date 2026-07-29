// ─── D E S I G N  1 1 :  W A B I - S A B I   R E F I N E D ───
// The winner, tuned. Japanese elements removed. Colors clarified.
// No blue. Nothing ambiguous. Warm charcoal, terracotta, off-white.

export default function Design11() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F6F3", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-8 py-12">
        {/* Thin accent line */}
        <div className="w-10 h-0.5 mb-8" style={{ backgroundColor: "#C4493C" }} />

        {/* Header — asymmetric */}
        <div className="flex items-start justify-between mb-14">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "#9A8E84" }}>
              Day 14 &middot; Tuesday
            </p>
            <h1 className="text-5xl font-medium leading-tight mb-2" style={{
              fontFamily: "'Inter Tight', sans-serif",
              color: "#2C2925"
            }}>
              Today's Session
            </h1>
            <div className="flex items-center gap-4 text-sm" style={{ color: "#8C7F74" }}>
              <span>12-day streak</span>
              <span className="w-px h-3" style={{ backgroundColor: "#D4CCC4" }} />
              <span>Block A</span>
              <span className="w-px h-3" style={{ backgroundColor: "#D4CCC4" }} />
              <span style={{ color: "#C4493C" }}>14 / 15 days</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium tracking-wider" style={{ color: "#9A8E84" }}>
              Focus
            </p>
            <p className="text-lg font-medium mt-0.5" style={{
              fontFamily: "'Inter Tight', sans-serif",
              color: "#C4493C"
            }}>
              Forks
            </p>
          </div>
        </div>

        {/* 4 Tasks — flowing, no boxes */}
        <div className="space-y-1">
          {[
            { num: "01", title: "Tactical Puzzles", time: "30 min", desc: "Lichess Forks folder &middot; calculate the full line before moving" },
            { num: "02", title: "Live Matches", time: "1 hr 15 min", desc: "15+10 Rapid &middot; 2 games &middot; CCT mental loop" },
            { num: "03", title: "Match Analysis", time: "10 min", desc: "Post-game review &middot; find the eval swing before checking engine" },
            { num: "04", title: "Stockfish Sparring", time: "30 min", desc: "Block A &middot; Endgame Escalation &middot; 5-win gate" },
          ].map((task, i) => (
            <div key={i} className="group cursor-pointer transition-all hover:translate-x-1">
              <div className="flex items-start gap-5 py-5">
                {/* Number */}
                <span className="text-sm font-medium tracking-wider shrink-0" style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  color: "#C4493C",
                  opacity: 0.8,
                  minWidth: 24,
                }}>
                  {task.num}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-medium" style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      color: "#2C2925"
                    }}>
                      {task.title}
                    </h3>
                    <span className="text-xs font-medium shrink-0" style={{ color: "#9A8E84" }}>
                      {task.time}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: "#B5ABA1" }}>{task.desc}</p>

                  {/* Hover underline accent */}
                  <div className="h-px mt-3 transition-all duration-300" style={{
                    backgroundColor: "#C4493C",
                    width: 0,
                    opacity: 0.3,
                  }}
                    onMouseEnter={e => (e.target as HTMLElement).style.width = "100%"}
                    onMouseLeave={e => (e.target as HTMLElement).style.width = "0"}
                  />
                </div>

                {/* Check circle */}
                <div className="w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                  style={{ borderColor: "#D4CCC4" }}
                />
              </div>

              {/* Separator between tasks */}
              {i < 3 && (
                <div className="ml-[52px] h-px" style={{ backgroundColor: "#EDE9E4" }} />
              )}
            </div>
          ))}
        </div>

        {/* Block progress */}
        <div className="mt-12 ml-[52px]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium" style={{
              fontFamily: "'Inter Tight', sans-serif",
              color: "#2C2925"
            }}>
              Block A &middot; Endgame Escalation
            </p>
            <p className="text-xs font-medium" style={{ color: "#C4493C" }}>
              2 / 5 Stockfish wins
            </p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-medium transition-all" style={{
                backgroundColor: i <= 2 ? "#C4493C" : "#EDE9E4",
                color: i <= 2 ? "#F8F6F3" : "#C5BDB5",
                fontFamily: "'Inter Tight', sans-serif",
              }}>
                {i <= 2 ? '✓' : '—'}
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "#B5ABA1" }}>
            Gate: 5 consecutive wins required to unlock Block B
          </p>
        </div>

        {/* Quiet close */}
        <p className="mt-16 text-xs text-center" style={{ color: "#D4CCC4" }}>
          One session at a time.
        </p>
      </div>
    </div>
  );
}
