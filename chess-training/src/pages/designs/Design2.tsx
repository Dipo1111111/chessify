import { cn } from "@/lib/utils";

// ─── D E S I G N  2 :  T E R M I N A L ───
// Hacker / Monochrome — green phosphor on black, monospace everything
// Vibe: cyber, focused, tactical

export default function Design2() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#0A0A0A",
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {/* CRT scan line overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.08) 2px, rgba(0,255,65,0.08) 4px)",
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Terminal header */}
        <div
          className="border mb-8"
          style={{ borderColor: "#1A1A1A", backgroundColor: "#0D0D0D" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 text-xs"
            style={{ backgroundColor: "#111", color: "#555", borderBottom: "1px solid #1A1A1A" }}
          >
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3" style={{ color: "#555" }}>
              chess-trainer@master — Session 14
            </span>
          </div>

          <div className="px-4 py-5">
            {/* Prompt line */}
            <div className="mb-6">
              <p className="text-sm mb-1" style={{ color: "#888" }}>
                <span style={{ color: "#00FF41" }}>user@master</span>
                <span style={{ color: "#555" }}>:</span>
                <span style={{ color: "#FFB000" }}>~</span>
                <span style={{ color: "#555" }}>$ </span>
                ./status
              </p>
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: "#00FF41" }}>
                <span>day: 14</span>
                <span>streak: 12</span>
                <span>block: A</span>
                <span>stockfish: 2/5</span>
              </div>
            </div>

            {/* ASCII separator */}
            <p className="text-xs mb-4" style={{ color: "#333" }}>
              ───────────────────────────────────────────────
            </p>

            {/* Today's theme highlight */}
            <div className="mb-6 p-3" style={{ backgroundColor: "#0D0D0D", borderLeft: "3px solid #FFB000" }}>
              <p className="text-xs" style={{ color: "#666" }}>TODAY_THEME</p>
              <p className="text-base" style={{ color: "#FFB000" }}>$ Forks / Double Attacks</p>
              <p className="text-xs mt-1" style={{ color: "#555" }}>source: lichess.org/training/forks</p>
            </div>

            {/* Task list */}
            <p className="text-xs mb-3" style={{ color: "#666" }}>TASKS</p>

            {[
              { cmd: "puzzles", desc: "Tactical Chunking Warm-Up", time: "30m", status: "pending" },
              { cmd: "matches", desc: "Adaptation Live Matches (15+10)", time: "1h15m", status: "pending" },
              { cmd: "analysis", desc: "Cognitive Recovery Analysis", time: "10m", status: "pending" },
              { cmd: "sparring", desc: "Stockfish Sparring Arena", time: "30m", status: "pending" },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 border-b cursor-pointer hover:opacity-80 transition-opacity"
                style={{ borderColor: "#1A1A1A" }}
              >
                {/* Checkbox as terminal-style [ ] */}
                <span
                  className={cn(
                    "text-sm shrink-0",
                    task.status === "done" ? "" : ""
                  )}
                  style={{
                    color: task.status === "done" ? "#00FF41" : "#555",
                  }}
                >
                  {task.status === "done" ? "[x]" : "[ ]"}
                </span>

                <div className="flex-1 min-w-0">
                  <span className="text-sm" style={{ color: "#00FF41" }}>
                    {task.desc}
                  </span>
                  <span className="text-xs ml-2" style={{ color: "#555" }}>
                    ({task.cmd})
                  </span>
                </div>

                <span className="text-xs shrink-0" style={{ color: "#666" }}>
                  {task.time}
                </span>
              </div>
            ))}

            {/* ASCII separator */}
            <p className="text-xs my-5" style={{ color: "#333" }}>
              ───────────────────────────────────────────────
            </p>

            {/* Block progression */}
            <p className="text-xs mb-2" style={{ color: "#666" }}>BLOCK_A_PROGRESS</p>
            <div className="flex gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-1 h-3 flex items-center justify-center text-[10px]"
                  style={{
                    backgroundColor: i <= 2 ? "#00FF41" : "#111",
                    color: i <= 2 ? "#0A0A0A" : "#333",
                  }}
                >
                  {i}
                </div>
              ))}
            </div>
            <p className="text-xs" style={{ color: "#555" }}>
              stockfish_wins: 2/5 — gate locked until 5 consecutive
            </p>

            {/* Blinking cursor */}
            <div className="mt-6 flex items-center gap-1">
              <span className="text-sm" style={{ color: "#00FF41" }}>$</span>
              <span className="text-sm" style={{ color: "#888" }}>_</span>
              <span
                className="w-2 h-4 animate-pulse"
                style={{ backgroundColor: "#00FF41" }}
              />
            </div>
          </div>
        </div>

        {/* Tiny system info */}
        <p className="text-[10px] text-center" style={{ color: "#333" }}>
          CHESS_TRAINING v0.1 // MEM: 14% // UPTIME: 12d
        </p>
      </div>
    </div>
  );
}
