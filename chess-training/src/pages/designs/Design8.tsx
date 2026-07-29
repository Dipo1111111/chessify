// ─── D E S I G N  8 :  S L A T E ───
// Clean, modern, functional — minimal borders, generous spacing
// Font: Inter throughout  |  Palette: light blue-gray, deep slate, muted indigo

export default function Design8() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F8F9FA", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-6" style={{ borderBottom: "1px solid #E8ECF0" }}>
          <div>
            <p className="text-xs font-medium tracking-wider uppercase" style={{ color: "#7A8A9A" }}>
              Day 14 &middot; Tuesday
            </p>
            <h1 className="text-4xl font-semibold mt-1 tracking-tight" style={{
              fontFamily: "'Inter', sans-serif",
              color: "#1E2A3A"
            }}>
              Training
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-medium" style={{ color: "#7A8A9A" }}>Streak</p>
              <p className="text-xl font-semibold" style={{ color: "#5A6B8A" }}>12</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium" style={{ color: "#7A8A9A" }}>Block</p>
              <p className="text-xl font-semibold" style={{ color: "#1E2A3A" }}>A</p>
            </div>
          </div>
        </div>

        {/* Theme pill */}
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 text-sm" style={{
          backgroundColor: "#EDF0F3",
          color: "#5A6B8A",
          borderRadius: 4
        }}>
          <span className="font-medium">Today:</span>
          <span>Forks / Double Attacks &mdash; Lichess Forks folder</span>
        </div>

        {/* Tasks */}
        <div className="space-y-1">
          {[
            { title: "Tactical Chunking", time: "30 min", desc: "Themed puzzle folder &middot; calculate fully" },
            { title: "Live Matches", time: "1 hr 15 min", desc: "2 games &middot; 15+10 Rapid &middot; CCT loop" },
            { title: "Match Analysis", time: "10 min", desc: "Per game &middot; find eval swing" },
            { title: "Stockfish Sparring", time: "30 min", desc: "Block A: Endgame Escalation" },
          ].map((task, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="flex items-center gap-4 px-4 py-4 transition-all" style={{
                borderLeft: "2px solid transparent",
              }}
                onMouseEnter={e => (e.target as HTMLElement).style.borderLeftColor = "#5A6B8A"}
                onMouseLeave={e => (e.target as HTMLElement).style.borderLeftColor = "transparent"}
              >
                <div className="w-4 h-4 rounded-sm border-2 shrink-0 flex items-center justify-center transition-colors" style={{ borderColor: "#D0D6DC" }}>
                  <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: "transparent" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium" style={{ color: "#1E2A3A" }}>
                      {task.title}
                    </h3>
                    <span className="text-xs font-medium" style={{ color: "#7A8A9A" }}>{task.time}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: "#9AABB8" }} dangerouslySetInnerHTML={{ __html: task.desc }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-10 px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: "#1E2A3A" }}>
              Block A &middot; Endgame Escalation
            </p>
            <p className="text-xs font-medium" style={{ color: "#5A6B8A" }}>
              Gate: 2 / 5
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-2 rounded-full transition-all" style={{
                backgroundColor: i <= 2 ? "#5A6B8A" : "#E8ECF0"
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
