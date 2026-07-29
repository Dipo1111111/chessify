import { useNavigate } from "react-router-dom";

const designs = [
  {
    id: "3",
    title: "Wabi-Sabi",
    subtitle: "Winner — Refined",
    colors: ["#F8F6F3", "#2D2A24", "#B8653A", "#8B8178"],
    description: "Inter Tight + Playfair Display. Warm terracotta accent. Roman numerals. Clean, curated, calm.",
    font: "Inter Tight + Playfair Display",
    vibe: "Warm · Calm · Curated",
    rotation: "-1deg",
    top: "8%",
    left: "3%",
  },
  {
    id: "8",
    title: "Slate",
    subtitle: "Reference — Clean Modern",
    colors: ["#F8F9FA", "#1E2A3A", "#5A6B8A", "#E8ECF0"],
    description: "The original precision. Blue-gray polish, left-border interactions, crisp pill tags.",
    font: "Inter",
    vibe: "Clean · Modern · Sharp",
    rotation: "1deg",
    top: "6%",
    left: "45%",
  },
  {
    id: "9",
    title: "Wabi · Slate",
    subtitle: "The Hybrid — Best of Both",
    colors: ["#F7F5F2", "#1E2A3A", "#C4493C", "#9A8E84"],
    description: "Wabi-Sabi's soul meets Slate's polish. Warm asymmetry with clean borders. Japanese numerals meet professional clarity. The haiku stays.",
    font: "Inter Tight + Noto Serif JP",
    vibe: "Warm · Clean · Refined",
    rotation: "-0.5deg",
    top: "5%",
    left: "70%",
  },
  {
    id: "10",
    title: "Habit Crunch",
    subtitle: "Gamified Habit Tracker",
    colors: ["#F4F3F0", "#2D2A24", "#C4493C", "#EDEAE6"],
    description: "XP bars, level ranks, achievement unlocks, boss gates. Game mechanics for habit tracking — without the neon.",
    font: "Inter + Inter Tight",
    vibe: "Playful · Progress · Reward",
    rotation: "1.5deg",
    top: "55%",
    left: "3%",
  },
  {
    id: "11",
    title: "Wabi-Sabi Refined",
    subtitle: "The Winner — Tuned",
    colors: ["#F8F6F3", "#2C2925", "#C4493C", "#8C7F74"],
    description: "Japanese elements removed. Colors cleaned. No blue — pure warm charcoal, terracotta, off-white. Ready to build.",
    font: "Inter Tight + Inter",
    vibe: "Warm · Calm · Final",
    rotation: "-0.5deg",
    top: "53%",
    left: "42%",
  },
];

export default function Compare() {
  const navigate = useNavigate();

  return (
    <div className="whiteboard-bg min-h-screen p-8">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#2D2A24] mb-2 tracking-tight">
          {'\u{1F3A8}'} Design Explorer
        </h1>
        <p className="text-lg text-[#6B6560] font-['Inter']">
          Wabi-Sabi wins so far. One more contender before we commit.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto" style={{ height: "80vh", minHeight: 600 }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#000" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {designs.map((d) => (
          <button
            key={d.id}
            onClick={() => navigate(`/design/${d.id}`)}
            className="absolute group cursor-pointer"
            style={{
              top: d.top,
              left: d.left,
              transform: `rotate(${d.rotation})`,
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[rgba(200,192,175,0.5)] rounded-sm z-10" />

            <div
              className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden"
              style={{ width: 300 }}
            >
              <div className="h-2 flex">
                {d.colors.map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>

              <div className="p-5 text-left">
                <h2 className="text-xl font-bold text-[#2D2A24] mb-0.5">{d.title}</h2>
                <p className="text-sm text-[#8B8580] font-medium mb-2">{d.subtitle}</p>
                <p className="text-sm text-[#6B6560] mb-3 leading-relaxed">{d.description}</p>

                <div className="flex items-center justify-between text-xs text-[#8B8580] border-t border-[#E8E4DE] pt-3">
                  <span>{d.font}</span>
                  <span className="font-medium">{d.vibe}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
