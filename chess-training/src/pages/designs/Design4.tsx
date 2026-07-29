import { cn } from "@/lib/utils";

// ─── D E S I G N  4 :  A R C A D E ───
// Retro Gaming — neon on dark, chunky, glow effects, health bars
// Vibe: energetic, fun, boss-fight energy

export default function Design4() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#1A0B2E",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,245,255,0.05) 3px, rgba(0,245,255,0.05) 6px)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p
                className="text-xs tracking-[0.25em] uppercase mb-1"
                style={{ color: "#00F5FF" }}
              >
                Day 14 · Tuesday
              </p>
              <h1
                className="text-4xl font-bold"
                style={{
                  color: "#FFFFFF",
                  textShadow: "0 0 20px rgba(0,245,255,0.3)",
                }}
              >
                TRAINING
              </h1>
            </div>

            {/* Health bar streak */}
            <div className="text-right">
              <p className="text-xs mb-1" style={{ color: "#888" }}>
                STREAK
              </p>
              <div
                className="h-3 rounded-full overflow-hidden"
                style={{ width: 120, backgroundColor: "#2D1554" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: "80%", backgroundColor: "#FF2E9A" }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "#FF2E9A" }}>
                12 / 60 days {'\u{1F525}'}
              </p>
            </div>
          </div>

          {/* Score-style progress */}
          <div
            className="border-2 p-3"
            style={{ borderColor: "#FFE600", backgroundColor: "rgba(255,230,0,0.05)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold" style={{ color: "#FFE600" }}>
                {'◥'} TODAY'S BOSS: Forks / Double Attacks
              </span>
              <span className="text-xs" style={{ color: "#FFE600" }}>
                BLOCK A
              </span>
            </div>
          </div>
        </header>

        {/* 4 Mission cards */}
        <div className="space-y-4">
          {[
            {
              icon: "⚔",
              title: "Tactical Puzzles",
              detail: "30m · Forks folder",
              xp: "+300 XP",
              difficulty: "Hard",
              color: "#00F5FF",
            },
            {
              icon: "♞",
              title: "Live Matches",
              detail: "1h15m · 15+10 Rapid ×2",
              xp: "+500 XP",
              difficulty: "Expert",
              color: "#FFE600",
            },
            {
              icon: "◈",
              title: "Match Analysis",
              detail: "10m · Post-game review",
              xp: "+100 XP",
              difficulty: "Normal",
              color: "#FF2E9A",
            },
            {
              icon: "BOSS",
              title: "Stockfish Sparring",
              detail: "30m · Block A: Endgame",
              xp: "+1000 XP",
              difficulty: "Legendary",
              color: "#FF2E9A",
            },
          ].map((task, i) => (
            <div
              key={i}
              className="group cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <div
                className="border-2 p-4"
                style={{
                  borderColor: task.color,
                  backgroundColor: `rgba(${task.color === "#00F5FF" ? "0,245,255" : task.color === "#FFE600" ? "255,230,0" : "255,46,154"}, 0.04)`,
                  boxShadow: `0 0 15px rgba(${task.color === "#00F5FF" ? "0,245,255" : task.color === "#FFE600" ? "255,230,0" : "255,46,154"}, 0.06)`,
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox — retro box */}
                  <div
                    className="w-8 h-8 border-2 flex items-center justify-center shrink-0 transition-colors"
                    style={{ borderColor: task.color }}
                  >
                    <span className="text-lg" style={{ color: task.color }}>
                      {task.icon}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className="text-base font-bold"
                        style={{ color: "#FFFFFF" }}
                      >
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {/* Difficulty badge */}
                        <span
                          className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider"
                          style={{
                            color: task.difficulty === "Legendary" ? "#FF2E9A" : task.difficulty === "Expert" ? "#FFE600" : "#00F5FF",
                            border: `1px solid ${task.difficulty === "Legendary" ? "#FF2E9A" : task.difficulty === "Expert" ? "#FFE600" : "#00F5FF"}`,
                          }}
                        >
                          {task.difficulty}
                        </span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: "#FFE600" }}
                        >
                          {task.xp}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "#888" }}>
                      {task.detail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stockfish boss health bar */}
        <div className="mt-10 p-4" style={{ backgroundColor: "#2D1554" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold" style={{ color: "#FF2E9A" }}>
              {'☠'} STOCKFISH BOSS FIGHT
            </p>
            <p className="text-xs" style={{ color: "#888" }}>
              BLOCK A GATE
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-1 h-8 flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  backgroundColor: i <= 2 ? "#FF2E9A" : "#2D1554",
                  color: i <= 2 ? "#1A0B2E" : "#555",
                  border: "1px solid",
                  borderColor: i <= 2 ? "#FF2E9A" : "#3D2564",
                }}
              >
                {i <= 2 ? '\u{1F480}' : '▢'}
              </div>
            ))}
          </div>
          <p className="text-xs mt-2" style={{ color: "#555" }}>
            2/5 consecutive wins — defeat Stockfish 3 more times to unlock Block B
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[10px]" style={{ color: "#3D2564" }}>
            PRESS START TO CONTINUE · INSERT COIN FOR NEW BLOCK
          </p>
        </div>
      </div>
    </div>
  );
}
