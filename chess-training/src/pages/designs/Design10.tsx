// ─── D E S I G N  1 0 :  H A B I T   C R U N C H ───
// Gamified habit tracker — progress mechanics, levels, streaks, achievements
// Tasteful gamification. No neon. No glow. Just satisfying progress loops.

export default function Design10() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F4F3F0", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-2xl mx-auto px-8 py-10">
        {/* Top bar — level + streak + score */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            {/* Level badge */}
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold" style={{
              backgroundColor: "#E8E4DE",
              color: "#5A4E44",
              fontFamily: "'Inter Tight', sans-serif",
            }}>
              14
            </div>
            <div>
              <p className="text-xs font-medium tracking-wider uppercase" style={{ color: "#9A8E84" }}>Level</p>
              <p className="text-sm font-semibold" style={{ color: "#2D2A24", fontFamily: "'Inter Tight', sans-serif" }}>Tactician</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs font-medium" style={{ color: "#9A8E84" }}>Streak</p>
              <p className="text-xl font-semibold" style={{ color: "#C4493C", fontFamily: "'Inter Tight', sans-serif" }}>
                12
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium" style={{ color: "#9A8E84" }}>Score</p>
              <p className="text-xl font-semibold" style={{ color: "#2D2A24", fontFamily: "'Inter Tight', sans-serif" }}>
                2,450
              </p>
            </div>
          </div>
        </div>

        {/* Today's XP bar */}
        <div className="mb-8 p-4" style={{ backgroundColor: "#EDEAE6", borderRadius: 4 }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#8B8178" }}>
              Today's Progress
            </p>
            <p className="text-xs font-semibold" style={{ color: "#C4493C" }}>
              0 / 4 tasks
            </p>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E0DAD4" }}>
            <div className="h-full rounded-full transition-all" style={{ width: "0%", backgroundColor: "#C4493C" }} />
          </div>
        </div>

        {/* Tasks — with XP values */}
        <div className="space-y-3">
          {[
            { title: "Tactical Puzzles", xp: "300 XP", time: "30m", desc: "Forks folder &middot; 10 puzzles minimum" },
            { title: "Live Matches", xp: "500 XP", time: "1h 15m", desc: "15+10 Rapid &middot; 2 games &middot; CCT loop" },
            { title: "Match Analysis", xp: "150 XP", time: "10m", desc: "Post-game review &middot; find the swing" },
            { title: "Stockfish Sparring", xp: "750 XP", time: "30m", desc: "Block A &middot; Endgame Escalation &middot; boss battle" },
          ].map((task, i) => (
            <div key={i} className="group cursor-pointer" style={{ backgroundColor: "#FFFFFF", borderRadius: 4 }}>
              <div className="p-4">
                <div className="flex items-center gap-4">
                  {/* Completion checkbox */}
                  <div className="w-5 h-5 rounded-sm border-2 shrink-0 flex items-center justify-center transition-colors" style={{ borderColor: "#D4CCC4" }} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold" style={{ color: "#2D2A24", fontFamily: "'Inter Tight', sans-serif" }}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold" style={{ color: "#C4493C" }}>{task.xp}</span>
                        <span className="text-xs font-medium" style={{ color: "#9A8E84" }}>{task.time}</span>
                      </div>
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: "#B0A59A" }}>{task.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievement row */}
        <div className="mt-6 flex items-center gap-3 p-3" style={{ backgroundColor: "#EDEAE6", borderRadius: 4 }}>
          <span className="text-base" style={{ color: "#C4493C" }}>{'{'}&#10003;{'}'}</span>
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: "#2D2A24", fontFamily: "'Inter Tight', sans-serif" }}>
              Complete all 4 tasks today
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#9A8E84" }}>
              Achievement: +500 bonus XP &middot; Unlocks at streak day 14
            </p>
          </div>
          <div className="text-xs font-medium px-2 py-1" style={{ backgroundColor: "#E0DAD4", color: "#8B8178", borderRadius: 2 }}>
            0/4
          </div>
        </div>

        {/* Block gate — boss health style */}
        <div className="mt-8 p-4" style={{ backgroundColor: "#EDEAE6", borderRadius: 4 }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#2D2A24", fontFamily: "'Inter Tight', sans-serif" }}>
              Block A Gate &middot; Stockfish Boss
            </p>
            <p className="text-xs font-bold" style={{ color: "#C4493C" }}>
              {2}/{5} defeated
            </p>
          </div>
          <div className="flex gap-1.5">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-bold transition-all" style={{
                backgroundColor: i <= 2 ? "#C4493C" : "#E0DAD4",
                color: i <= 2 ? "#FFFFFF" : "#B0A59A",
                fontFamily: "'Inter Tight', sans-serif",
                borderRadius: 2,
              }}>
                {i <= 2 ? '✓' : i}
              </div>
            ))}
          </div>
        </div>

        {/* Level progress — tasteful */}
        <div className="mt-6 pt-4 text-center">
          <p className="text-xs font-medium" style={{ color: "#9A8E84" }}>
            Next rank: <span className="font-semibold" style={{ color: "#C4493C" }}>Strategist</span> at Level 20
          </p>
          <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "#E0DAD4" }}>
            <div className="h-full rounded-full" style={{ width: "70%", backgroundColor: "#2D2A24" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
