// ─── D E S I G N  5 :  B R U T A L I S T ───
// Raw / Avant-Garde — white, black, safety orange, no curves
// Vibe: bold, provocative, gallery

export default function Design5() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top stripe */}
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#FF4D00" }}
        />

        {/* Header section — massive, raw */}
        <div className="border-b border-black px-8 py-10">
          <div className="flex items-start justify-between">
            <div>
              <p
                className="text-sm font-bold tracking-[0.3em] uppercase mb-2"
                style={{ color: "#FF4D00" }}
              >
                Day 14 · Tuesday
              </p>
              <h1
                className="text-7xl font-bold leading-none tracking-tight"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: "#000000",
                }}
              >
                TRAINING
              </h1>
              <p className="text-lg mt-2 font-medium" style={{ color: "#666" }}>
                Block A · 14/15 days
              </p>
            </div>
            <div
              className="text-right"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <p className="text-sm tracking-widest" style={{ color: "#888" }}>
                STREAK
              </p>
              <p className="text-6xl leading-none" style={{ color: "#FF4D00" }}>
                12
              </p>
              <p className="text-sm tracking-widest" style={{ color: "#888" }}>
                DAYS
              </p>
            </div>
          </div>
        </div>

        {/* Theme callout — thick red stripe */}
        <div
          className="px-8 py-5"
          style={{ backgroundColor: "#000000" }}
        >
          <p className="text-sm font-bold tracking-[0.2em] uppercase" style={{ color: "#FFFFFF" }}>
            Today's theme: Forks / Double Attacks
          </p>
          <p className="text-xs mt-1" style={{ color: "#888" }}>
            Lichess Forks folder · 30 minutes
          </p>
        </div>

        {/* 4 Tasks — brutalist table */}
        <div className="divide-y divide-black border-b border-black">
          {[
            {
              id: "01",
              title: "Tactical Chunking",
              time: "30 MIN",
              tag: "PUZZLE",
            },
            {
              id: "02",
              title: "Adaptation Matches",
              time: "1H 15M",
              tag: "PLAY",
            },
            {
              id: "03",
              title: "Recovery Analysis",
              time: "10 MIN",
              tag: "STUDY",
            },
            {
              id: "04",
              title: "Stockfish Sparring",
              time: "30 MIN",
              tag: "BOSS",
            },
          ].map((task, i) => (
            <div
              key={i}
              className="group cursor-pointer transition-all hover:bg-black hover:text-white"
            >
              <div className="flex items-center px-8 py-6">
                {/* Number */}
                <span
                  className="text-3xl font-bold mr-8 w-12 shrink-0"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: "#000000",
                  }}
                >
                  {task.id}
                </span>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl font-bold uppercase tracking-tight"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {task.title}
                  </h3>
                </div>

                {/* Tag */}
                <span
                  className="text-xs font-bold tracking-[0.2em] mx-6 shrink-0"
                  style={{ color: "#FF4D00" }}
                >
                  {task.tag}
                </span>

                {/* Time */}
                <span
                  className="text-sm font-bold shrink-0"
                  style={{ color: "#000000" }}
                >
                  {task.time}
                </span>

                {/* Checkbox — raw square */}
                <div
                  className="w-7 h-7 border-2 border-black ml-6 shrink-0 group-hover:bg-white group-hover:border-white"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Block progress — monolithic */}
        <div className="px-8 py-10">
          <div className="flex items-baseline justify-between mb-5">
            <p className="text-2xl font-bold uppercase tracking-tight" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#000000"
            }}>
              Block A · Endgame Arena
            </p>
            <p className="text-lg font-bold" style={{ color: "#FF4D00" }}>
              2 / 5
            </p>
          </div>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex-1 h-16 flex items-center justify-center text-2xl font-bold transition-all"
                style={{
                  backgroundColor: i <= 2 ? "#000000" : "#F0F0F0",
                  color: i <= 2 ? "#FFFFFF" : "#DDD",
                  fontFamily: "'Bebas Neue', sans-serif",
                }}
              >
                {i <= 2 ? '\u{1F480}' : '—'}
              </div>
            ))}
          </div>

          <p className="text-xs mt-3 font-bold tracking-wider uppercase" style={{ color: "#888" }}>
            5 consecutive Stockfish wins required to unlock Block B
          </p>
        </div>

        {/* Footer — aggressive */}
        <div
          className="px-8 py-6 flex items-center justify-between"
          style={{ backgroundColor: "#000000" }}
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#888" }}>
            No excuses. No shortcuts. Every day.
          </p>
          <p className="text-xs font-bold" style={{ color: "#FF4D00" }}>
            CHESS v0.1
          </p>
        </div>
      </div>
    </div>
  );
}
