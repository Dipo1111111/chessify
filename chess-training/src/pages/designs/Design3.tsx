// ─── D E S I G N  3 :  W A B I - S A B I  ✦  F I N A L ───
// Winner. Warm, curated, calm.
// Inter Tight body + Playfair Display serif. Sage green accent.

export default function Design3() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#F8F6F3",
        fontFamily: "'Inter Tight', sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header — asymmetric */}
        <div className="flex items-start justify-between mb-16">
          <div>
            <div
              className="w-12 h-0.5 mb-6"
              style={{ backgroundColor: "#B8653A" }}
            />
            <p
              className="text-xs tracking-[0.25em] uppercase mb-2"
              style={{ color: "#8B8178" }}
            >
              Day 14
            </p>
            <h1
              className="text-5xl font-semibold leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#2D2A24",
              }}
            >
              The Board
            </h1>
            <p className="text-lg mt-2" style={{ color: "#6B6560" }}>
              Tuesday &middot; 12 day streak
            </p>
          </div>
          <div className="text-right">
            <p
              className="text-2xl font-light mt-2"
              style={{ fontFamily: "'Playfair Display', serif", color: "#B8653A" }}
            >
              xiv
            </p>
            <p className="text-xs mt-2" style={{ color: "#8B8178" }}>
              Block A &middot; 14/15
            </p>
          </div>
        </div>

        {/* Today's theme — subtle */}
        <div
          className="mb-14 inline-block"
          style={{
            borderBottom: "2px solid #B8653A",
            paddingBottom: 8,
          }}
        >
          <p
            className="text-xs tracking-[0.15em] uppercase mb-1"
            style={{ color: "#8B8178" }}
          >
            Today's study
          </p>
          <p
            className="text-xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#2D2A24",
            }}
          >
            Forks / Double Attacks
          </p>
        </div>

        {/* 4 Tasks — one column */}
        <div className="space-y-2">
          {[
            {
              num: "I",
              title: "Tactical Chunking",
              detail: "30 min &middot; Lichess Forks folder",
            },
            {
              num: "II",
              title: "Adaptation Matches",
              detail: "1 hr 15 min &middot; 15+10 Rapid, 2 games",
            },
            {
              num: "III",
              title: "Recovery Analysis",
              detail: "10 min &middot; Post-game review",
            },
            {
              num: "IV",
              title: "Stockfish Sparring",
              detail: "30 min &middot; Block A: Endgame",
            },
          ].map((task, i) => (
            <div
              key={i}
              className="group cursor-pointer transition-all hover:translate-x-1"
            >
              <div className="flex items-start gap-6 py-4">
                {/* Roman numeral */}
                <span
                  className="text-lg font-light shrink-0 mt-0.5"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: "#B8653A",
                    minWidth: 28,
                    opacity: 0.75,
                  }}
                >
                  {task.num}
                </span>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className="text-lg"
                      style={{
                        fontWeight: 500,
                        color: "#2D2A24",
                      }}
                    >
                      {task.title}
                    </h3>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "#8B8178" }}
                    >
                      {task.detail}
                    </span>
                  </div>
                  {/* Underline on hover */}
                  <div
                    className="h-px mt-3 transition-all duration-300"
                    style={{
                      backgroundColor: "#B8653A",
                      width: 0,
                      opacity: 0.4,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.width = "100%";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.width = "0";
                    }}
                  />
                </div>

                {/* Check circle */}
                <div
                  className="w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors"
                  style={{ borderColor: "#D4CEC6" }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "transparent" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Block progress */}
        <div className="mt-14 pt-8">
          <div className="flex items-baseline justify-between mb-5">
            <p
              className="text-sm font-medium"
              style={{ color: "#2D2A24" }}
            >
              Block A &middot; Endgame Escalation
            </p>
            <p className="text-sm" style={{ color: "#B8653A" }}>
              2/5 Stockfish wins
            </p>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-1 h-10 flex items-center justify-center text-sm transition-all"
                style={{
                  backgroundColor: i <= 2 ? "#B8653A" : "#E8E4DE",
                  color: i <= 2 ? "#F8F6F3" : "#B0A89A",
                }}
              >
                {i <= 2 ? '✓' : '—'}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p
            className="text-sm leading-relaxed italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#B0A89A",
            }}
          >
            One move at a time
          </p>
        </div>
      </div>
    </div>
  );
}
