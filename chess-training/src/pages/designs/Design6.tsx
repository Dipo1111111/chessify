// ─── D E S I G N  6 :  A I R ───
// Fresh, airy, no boxes — tasks flow like a well-designed document
// Font: Inter Tight + Inter  |  Palette: warm white, sage green

export default function Design6() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF9F7", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-8 py-12">
        {/* Header — lean */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm font-medium tracking-wide" style={{ color: "#8B8580" }}>
              Day 14 · Tuesday
            </p>
            <div className="flex items-center gap-3 text-sm" style={{ color: "#6B8F7A" }}>
              <span className="font-medium">{'♡'} 12-day run</span>
              <span className="w-px h-3" style={{ backgroundColor: "#D9D4CE" }} />
              <span>Block A</span>
            </div>
          </div>

          <h1 className="text-5xl font-light tracking-tight mb-2" style={{
            fontFamily: "'Inter Tight', sans-serif",
            color: "#2C2A28"
          }}>
            Today
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-base" style={{ color: "#6B8F7A", fontFamily: "'Inter Tight', sans-serif" }}>
              Forks / Double Attacks
            </span>
            <span className="text-xs" style={{ color: "#B0ABA3" }}>
              Lichess Forks folder
            </span>
          </div>
        </div>

        {/* Tasks — no boxes, just separators */}
        <div className="divide-y" style={{ borderColor: "#E8E4DE" }}>
          {[
            { title: "Tactical Puzzles", time: "30 min", note: "Themed folder · calculate fully before moving" },
            { title: "Live Matches", time: "1 hr 15 min", note: "2 games · 15+10 Rapid · CCT loop" },
            { title: "Match Analysis", time: "10 min", note: "Per game · find the evaluation swing" },
            { title: "Stockfish Sparring", time: "30 min", note: "Block A: Endgame Escalation" },
          ].map((task, i) => (
            <div key={i} className="group cursor-pointer py-5 transition-opacity hover:opacity-70">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-medium" style={{
                  fontFamily: "'Inter Tight', sans-serif",
                  color: "#2C2A28"
                }}>
                  {task.title}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium" style={{ color: "#8B8580" }}>{task.time}</span>
                  <div className="w-5 h-5 rounded-sm border-2 flex items-center justify-center" style={{ borderColor: "#D9D4CE" }}>
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "transparent" }} />
                  </div>
                </div>
              </div>
              <p className="text-sm" style={{ color: "#B0ABA3" }}>{task.note}</p>
            </div>
          ))}
        </div>

        {/* Progress — subtle */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ fontFamily: "'Inter Tight', sans-serif", color: "#2C2A28" }}>
              Block A · Endgame Escalation
            </p>
            <p className="text-xs font-medium" style={{ color: "#6B8F7A" }}>
              2/5 wins
            </p>
          </div>
          <div className="flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-1.5 transition-all" style={{
                backgroundColor: i <= 2 ? "#6B8F7A" : "#E8E4DE"
              }} />
            ))}
          </div>
        </div>

        {/* Quiet footer */}
        <p className="mt-12 text-xs text-center" style={{ color: "#C5C0B8" }}>
          One session at a time.
        </p>
      </div>
    </div>
  );
}
