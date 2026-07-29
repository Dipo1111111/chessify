import { cn } from "../lib/utils";
import { useParams, useNavigate } from "react-router-dom";

interface DesignViewProps {
  components: Record<string, React.FC>;
}

const designNames: Record<string, string> = {
  "3": "Wabi-Sabi",
  "8": "Slate",
  "9": "Wabi &middot; Slate",
  "10": "Habit Crunch",
  "11": "Wabi-Sabi Refined",
};

export default function DesignView({ components }: DesignViewProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const DesignComponent = id ? components[id] : null;

  if (!DesignComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ink mb-2">Design not found</h1>
          <button
            onClick={() => navigate("/compare")}
            className="text-ink-soft hover:text-ink underline"
          >
            Back to compare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border-faint">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/compare")}
            className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-ink">
              {designNames[id ?? ""] ?? `Design ${id}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {["3", "8", "9", "10", "11"].map((did) => (
              <button
                key={did}
                onClick={() => navigate(`/design/${did}`)}
                className={cn(
                  "w-7 h-7 rounded-full text-xs font-medium transition-all",
                  did === id
                    ? "bg-ink text-white scale-110"
                    : "bg-border-faint text-ink-soft hover:bg-[#D4D0C8]"
                )}
              >
                {did}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full design */}
      <DesignComponent />
    </div>
  );
}
