import { useRef } from "react";
import { cn } from "../lib/utils";
import { useTraining } from "../store/TrainingContext";
import MiniCalendar from "../components/MiniCalendar";

export default function Stats() {
  const { state, dispatch, todayDay } = useTraining();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Overall stats
  const totalDays = 60;
  const completedDays = state.days.filter((d) => d.completed).length;
  const partialDays = state.days.filter(
    (d) => !d.completed && d.tasks.some((t) => t.completed)
  ).length;
  const totalTasks = state.days.reduce((sum, d) => sum + d.tasks.length, 0);
  const completedTasks = state.days.reduce(
    (sum, d) => sum + d.tasks.filter((t) => t.completed).length,
    0
  );

  // Current block
  const currentBlock = state.blocks.find(
    (b) => todayDay >= b.dayStart && todayDay <= b.dayEnd
  );

  // Export
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chess-training-${state.startDate}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import
  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.days || !parsed.startDate || !parsed.blocks) {
          alert("Invalid file — missing required fields.");
          return;
        }
        dispatch({ type: "IMPORT_STATE", state: parsed });
        alert("Data imported successfully.");
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);

    // Reset so the same file can be re-imported
    e.target.value = "";
  };

  // Reset
  const handleReset = () => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      localStorage.removeItem("chess-training-state");
      window.location.reload();
    }
  };

  return (
    <div className="page-container">
      {/* ═══ Summary stats ═══ */}
      <div className="mb-10 md:mb-14">
        <div className="w-12 h-0.5 mb-6 bg-brand" />
        <h1 className="text-2xl font-semibold leading-tight font-display text-ink">
          Progress
        </h1>
        <p className="text-sm mt-1 text-ink-soft">
          {completedDays} of {totalDays} days completed
        </p>
      </div>

      {/* Stat cards — stack on mobile, 3 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-14">
        <StatCard label="Days Done" value={`${completedDays}/${totalDays}`} />
        <StatCard label="Tasks Done" value={`${completedTasks}/${totalTasks}`} />
        <StatCard label="Streak" value={`${state.streak} days`} />
      </div>

      {/* Block gate statuses */}
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.15em] uppercase mb-4 text-ink-muted">
          Block Gates
        </p>
        <div className="space-y-2">
          {state.blocks.map((block) => {
            const isCurrent = block.id === currentBlock?.id;
            const passedCount = block.positions.filter((p) => p.passed).length;
            const totalPositions = block.positions.length;
            const activePos = block.positions.find((p) => !p.passed);
            const status = block.gatePassed
              ? "✓ Passed"
              : activePos && activePos.consecutiveWins > 0
                ? `${passedCount}/${totalPositions} positions · ${activePos.consecutiveWins}/${activePos.winsNeeded}`
                : `${passedCount}/${totalPositions} positions`;
            return (
              <div
                key={block.id}
                className={cn(
                  "flex items-center justify-between px-3 md:px-4 py-3 gap-2",
                  isCurrent
                    ? "bg-brand-light border border-brand"
                    : "bg-transparent border border-border-faint"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 min-w-0">
                  <span className="text-sm font-medium text-ink truncate">
                    {block.label}
                  </span>
                  <span className="text-[10px] md:text-xs text-ink-muted truncate">
                    {block.theme}
                  </span>
                </div>
                <span
                  className={cn(
                    "text-xs shrink-0",
                    block.gatePassed
                      ? "text-brand font-semibold"
                      : "text-taupe font-normal"
                  )}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ 30-Day Heatmap ═══ */}
      <div className="mb-10 md:mb-14">
        <p className="text-xs tracking-[0.15em] uppercase mb-4 text-ink-muted">
          30-Day Heatmap
        </p>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <div className="min-w-[280px]">
            <MiniCalendar
              days={state.days}
              viewingDay={state.viewingDay}
              todayDay={todayDay}
              onSelectDay={(n) =>
                dispatch({ type: "SET_VIEWING_DAY", dayNumber: n })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-3">
          <Legend color="bg-brand" label="Complete" />
          <Legend color="bg-brand-pale" label="Partial" />
          <Legend color="bg-today-bg" label="Today" />
          <Legend color="bg-transparent" label="Not started" border={true} />
        </div>
      </div>

      {/* ═══ Data management ═══ */}
      <div className="pt-6 md:pt-8 border-t border-border-faint">
        <p className="text-xs tracking-[0.15em] uppercase mb-4 text-ink-muted">
          Data
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExport}
            className="text-[10px] md:text-xs uppercase tracking-[0.1em] px-3 md:px-4 py-2 transition-all hover:opacity-70 text-paper bg-brand"
          >
            Export Data
          </button>
          <button
            onClick={handleImport}
            className="text-[10px] md:text-xs uppercase tracking-[0.1em] px-3 md:px-4 py-2 transition-all hover:opacity-70 text-brand border border-brand"
          >
            Import Data
          </button>
          <button
            onClick={handleReset}
            className="text-[10px] md:text-xs uppercase tracking-[0.1em] px-3 md:px-4 py-2 transition-all hover:opacity-70 text-taupe"
          >
            Reset All
          </button>
        </div>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-4 text-center border border-border-faint">
      <p className="text-lg font-semibold font-display text-brand">
        {value}
      </p>
      <p className="text-xs mt-0.5 uppercase tracking-[0.1em] text-ink-muted">
        {label}
      </p>
    </div>
  );
}

function Legend({
  color,
  label,
  border,
}: {
  color: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          "w-3 h-3",
          color,
          border && "border border-border-lighter"
        )}
      />
      <span className="text-[10px] uppercase tracking-[0.05em] text-taupe">
        {label}
      </span>
    </div>
  );
}
