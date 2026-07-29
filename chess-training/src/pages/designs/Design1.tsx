import { cn } from "@/lib/utils";

// ─── D E S I G N  1 :  C L A S S I C   G R A N D M A S T E R ───
// Editorial / Elegant — cream parchment, navy, gold serif
// Vibe: private chess club in St. Petersburg

export default function Design1() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#F5F0E8", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Decorative top rule */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-px flex-1" style={{ backgroundColor: "#C8A45C" }} />
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "#8B7355" }}
          >
            The Master Protocol
          </span>
          <div className="h-px flex-1" style={{ backgroundColor: "#C8A45C" }} />
        </div>

        {/* Header */}
        <header className="text-center mb-14">
          <p className="text-sm tracking-[0.2em] uppercase mb-3" style={{ color: "#8B7355" }}>
            Day 14 · Tuesday
          </p>
          <h1
            className="text-5xl mb-3 font-bold"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1B2838",
            }}
          >
            60-Day Ascent
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm" style={{ color: "#6B6560" }}>
            <span>{'\u{1F525}'} 12-day streak</span>
            <span>Block A · 14/15 days</span>
          </div>
        </header>

        {/* Progress bar */}
        <div className="mb-12" style={{ backgroundColor: "#E8E4DE", height: 2 }}>
          <div
            className="h-full transition-all"
            style={{ backgroundColor: "#C8A45C", width: "23%" }}
          />
        </div>

        {/* Today's theme — ornate callout */}
        <div
          className="border-2 mb-10 px-6 py-4 text-center"
          style={{
            borderColor: "#C8A45C",
            backgroundColor: "rgba(200, 164, 92, 0.06)",
          }}
        >
          <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: "#8B7355" }}>
            Today's Puzzle Theme
          </p>
          <p
            className="text-2xl italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1B2838",
            }}
          >
            Forks / Double Attacks
          </p>
        </div>

        {/* 4 Task cards */}
        {[
          {
            step: "I",
            title: "Tactical Chunking Warm-Up",
            time: "30 min",
            platform: "Lichess · Forks folder",
            done: false,
          },
          {
            step: "II",
            title: "Adaptation Live Matches",
            time: "1 hr 15 min",
            platform: "15+10 Rapid · 2 games",
            done: false,
          },
          {
            step: "III",
            title: "Cognitive Recovery Analysis",
            time: "10 min",
            platform: "Post-game review",
            done: false,
          },
          {
            step: "IV",
            title: "Stockfish Sparring Arena",
            time: "30 min",
            platform: "Block A · Endgame Escalation",
            done: false,
          },
        ].map((task, i) => (
          <div
            key={i}
            className="mb-4 group cursor-pointer transition-all hover:-translate-y-0.5"
          >
            <div
              className="border px-6 py-5"
              style={{
                borderColor: task.done ? "#C8A45C" : "#D4D0C8",
                backgroundColor: task.done ? "rgba(200, 164, 92, 0.06)" : "#FFFFFF",
              }}
            >
              <div className="flex items-start gap-5">
                {/* Roman numeral */}
                <div
                  className="w-10 h-10 flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#C8A45C",
                    border: "1px solid #C8A45C",
                  }}
                >
                  {task.step}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-4">
                    <h3
                      className="text-lg font-semibold"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "#1B2838",
                      }}
                    >
                      {task.title}
                    </h3>
                    <span
                      className="text-xs whitespace-nowrap font-medium"
                      style={{ color: "#8B7355" }}
                    >
                      {task.time}
                    </span>
                  </div>
                  <p className="text-sm mt-1" style={{ color: "#8B7355" }}>
                    {task.platform}
                  </p>
                </div>

                {/* Checkbox */}
                <div
                  className={cn(
                    "w-6 h-6 rounded-sm border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                    task.done
                      ? "border-[#C8A45C] bg-[#C8A45C]"
                      : "border-[#D4D0C8]"
                  )}
                >
                  {task.done && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M3 7.5L6 10.5L11 4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Block tracker */}
        <div
          className="mt-12 pt-8 border-t"
          style={{ borderColor: "#D4D0C8" }}
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-sm font-semibold tracking-wider uppercase"
              style={{ color: "#1B2838" }}
            >
              Block A · Endgame Arena
            </span>
            <span className="text-sm" style={{ color: "#C8A45C" }}>
              2 / 5 Stockfish wins
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-1 h-2 transition-all"
                style={{
                  backgroundColor:
                    i <= 2 ? "#C8A45C" : "#E8E4DE",
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-12 text-center text-xs tracking-wide"
          style={{ color: "#B0A89A" }}
        >
          <p>"The board is a battle. The pieces are your soldiers."</p>
        </div>
      </div>
    </div>
  );
}
