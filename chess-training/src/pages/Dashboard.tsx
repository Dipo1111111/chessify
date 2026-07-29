import { useState } from "react";
import { cn } from "../lib/utils";
import { useTraining } from "../store/TrainingContext";
import Stats from "./Stats";

export default function Dashboard() {
  const { state, dispatch, viewingDayData, viewingBlock, todayDay } =
    useTraining();
  const [tab, setTab] = useState<"board" | "stats">("board");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  if (!viewingDayData || !viewingBlock) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-ink-muted">Loading...</p>
      </div>
    );
  }

  const isToday = state.viewingDay === todayDay;
  const roman = toRoman(state.viewingDay);

  const toggleExpand = (taskId: string) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="min-h-screen flex bg-paper safe-top safe-bottom">
      {/* ═══ Sidebar ═══ */}
      <aside className="w-56 shrink-0 flex flex-col min-h-screen bg-surface border-r border-border-light safe-top safe-left">
        {/* Brand */}
        <div className="px-6 pt-10 pb-8">
          <div className="w-8 h-0.5 mb-4 bg-brand" />
          <h2 className="text-lg font-semibold font-display text-ink">
            Chess Training
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] mt-1 text-ink-muted">
            Day {state.viewingDay}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          <SidebarTab
            label="The Board"
            active={tab === "board"}
            onClick={() => setTab("board")}
          />
          <SidebarTab
            label="Stats"
            active={tab === "stats"}
            onClick={() => setTab("stats")}
          />
        </nav>

        {/* Footer */}
        <div className="px-6 pb-8 safe-bottom">
          <p className="text-[10px] italic font-display text-taupe">
            One move at a time
          </p>
        </div>
      </aside>

      {/* ═══ Main content ═══ */}
      <main className="flex-1 min-w-0">
        {tab === "board" ? (
          <div className="page-container">
            {/* ═══ Header ═══ */}
            <div className="flex items-start justify-between mb-16">
              <div>
                <div className="w-12 h-0.5 mb-6 bg-brand" />
                <div className="flex items-center gap-3">
                  <p className="text-xs tracking-[0.25em] uppercase mb-2 text-ink-muted">
                    Day {state.viewingDay}
                  </p>
                  {!isToday && (
                    <button
                      onClick={() => dispatch({ type: "GO_TODAY" })}
                      className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded transition-opacity hover:opacity-70 text-paper bg-brand"
                    >
                      Today
                    </button>
                  )}
                </div>
                <h1 className="text-2xl font-semibold leading-tight font-display text-ink">
                  The Board
                </h1>
                <p className="text-sm mt-2 text-ink-soft">
                  {viewingDayData.dayOfWeek} &middot; {state.streak} day streak
                </p>
              </div>

              {/* Right side */}
              <div className="text-right flex flex-col items-end gap-2">
                <p className="text-xl font-light font-display text-brand">
                  {roman}
                </p>
                <p className="text-xs text-ink-muted">
                  {viewingBlock.label} &middot; {state.viewingDay}/{viewingBlock.dayEnd}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_VIEWING_DAY", dayNumber: state.viewingDay - 1 })
                    }
                    disabled={state.viewingDay <= 1}
                    className="text-xs tracking-wider uppercase transition-opacity disabled:opacity-20 hover:opacity-60 text-brand"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      dispatch({ type: "SET_VIEWING_DAY", dayNumber: state.viewingDay + 1 })
                    }
                    disabled={state.viewingDay >= 60}
                    className="text-xs tracking-wider uppercase transition-opacity disabled:opacity-20 hover:opacity-60 text-brand"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* ═══ Today's theme ═══ */}
            <div className="mb-14 inline-block border-b-2 border-brand pb-2">
              <p className="text-xs tracking-[0.15em] uppercase mb-1 text-ink-muted">
                Today's study
              </p>
              <p className="text-base font-display text-ink">
                {viewingDayData.puzzleTheme} / Double Attacks
              </p>
            </div>

            {/* ═══ 4 Tasks with expandable detail ═══ */}
            <div className="space-y-1">
              {viewingDayData.tasks.map((task, i) => {
                const isExpanded = expandedTask === task.id;
                return (
                  <div key={task.id} className="group">
                    {/* Task row */}
                    <div className="flex items-start gap-6 py-4">
                      {/* Roman numeral — click to expand */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(task.id);
                        }}
                        className="shrink-0 mt-0.5 transition-all hover:scale-110 text-left min-w-[28px]"
                        title="Click for details"
                      >
                        <span
                          className={cn(
                            "text-lg font-light font-display transition-all",
                            isExpanded
                              ? "text-brand border-b border-brand"
                              : task.completed
                                ? "text-taupe opacity-40"
                                : "text-brand opacity-75"
                          )}
                        >
                          {toRoman(i + 1)}
                        </span>
                      </button>

                      {/* Content — click to toggle completion */}
                      <div
                        className="flex-1 min-w-0 cursor-pointer"
                        onClick={() =>
                          dispatch({
                            type: "TOGGLE_TASK",
                            dayNumber: state.viewingDay,
                            taskId: task.id,
                          })
                        }
                      >
                        <div className="flex items-center justify-between">
                          <h3
                            className={cn(
                              "text-lg",
                              task.completed ? "text-taupe line-through" : "text-ink"
                            )}
                          >
                            {task.title}
                          </h3>
                          <span
                            className="text-xs font-medium text-ink-muted"
                            dangerouslySetInnerHTML={{ __html: task.detail }}
                          />
                        </div>
                        {/* Hover underline (only when not expanded) */}
                        {!isExpanded && (
                          <div className="h-px mt-3 transition-all duration-300 bg-brand/30 w-0 group-hover:w-full" />
                        )}
                      </div>

                      {/* Check circle */}
                      <button
                        className={cn(
                          "w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors",
                          task.completed
                            ? "border-brand bg-brand"
                            : "border-border-lighter bg-transparent"
                        )}
                        onClick={() =>
                          dispatch({
                            type: "TOGGLE_TASK",
                            dayNumber: state.viewingDay,
                            taskId: task.id,
                          })
                        }
                      >
                        {task.completed && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5L4 7L8 3"
                              stroke="#F8F6F3"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Expandable detail area */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="ml-[60px] mb-5 p-5 text-sm leading-relaxed bg-surface text-ink-soft">
                        <TaskDetail type={task.type} theme={viewingDayData.puzzleTheme} blockTheme={viewingBlock.theme} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ═══ Block Gate ═══ */}
            <BlockGate block={viewingBlock} dispatch={dispatch} />

            {/* ═══ Footer ═══ */}
            <div className="mt-16 text-center">
              <p className="text-sm leading-relaxed italic font-display text-taupe">
                One move at a time
              </p>
            </div>
          </div>
        ) : (
          <Stats />
        )}
      </main>
    </div>
  );
}

// ═══ S I D E B A R   T A B ═══════════════════════════════════════════

function SidebarTab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 text-sm transition-all",
        active
          ? "bg-tab-active text-ink border-l-2 border-brand font-medium"
          : "bg-transparent text-ink-muted border-l-2 border-transparent font-normal"
      )}
    >
      <span className="text-xs uppercase tracking-[0.15em]">{label}</span>
    </button>
  );
}

// ═══ T A S K   D E T A I L ═══════════════════════════════════════════

function TaskDetail({
  type,
  theme,
  blockTheme,
}: {
  type: string;
  theme: string;
  blockTheme: string;
}) {
  const details: Record<string, { goal: string; focus: string }> = {
    puzzles: {
      goal: `Solve puzzles from the Lichess ${theme} folder. 30 min timer.`,
      focus: "Pattern recognition. Sort by rating, aim for 90%+ accuracy.",
    },
    matches: {
      goal: "Play 2 rapid games (15+10 time control). Full focus, no distractions.",
      focus: `Apply ${theme} patterns in real positions. Review each game immediately.`,
    },
    analysis: {
      goal: "Review both games from today's session. Find 3 critical moments per game.",
      focus: "Use Lichess analysis board. Note what you missed and why.",
    },
    sparring: {
      goal: `Practice ${blockTheme} positions vs Stockfish. Level 5.`,
      focus: "Play solid moves, calculate deeply. Accuracy over speed.",
    },
  };

  const d = details[type] ?? details.puzzles;

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <span className="text-xs uppercase tracking-[0.1em] text-brand font-medium min-w-10">
          Goal
        </span>
        <span className="text-xs">{d.goal}</span>
      </div>
      <div className="flex items-start gap-2">
        <span className="text-xs uppercase tracking-[0.1em] text-brand font-medium min-w-10">
          Focus
        </span>
        <span className="text-xs">{d.focus}</span>
      </div>
    </div>
  );
}

// ═══ B L O C K   G A T E ═════════════════════════════════════════════

function BlockGate({
  block,
  dispatch,
}: {
  block: { id: string; label: string; theme: string; consecutiveWins: number; winsNeeded: number; gatePassed: boolean };
  dispatch: React.Dispatch<any>;
}) {
  const gatePassed = block.gatePassed;
  const currentWins = block.consecutiveWins;
  const needed = block.winsNeeded;

  return (
    <div className="mt-14 pt-8">
      <p className="text-xs tracking-[0.15em] uppercase mb-4 text-ink-muted">
        Block Gate
      </p>

      <div
        className={cn(
          "p-6",
          gatePassed ? "bg-brand-light border border-brand" : "bg-surface border border-border-light"
        )}
      >
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-ink">
              {block.label} &middot; {block.theme}
            </p>
            <p className="text-xs mt-0.5 text-ink-muted">
              {gatePassed
                ? "Gate cleared — next block unlocked"
                : `Win ${needed} Stockfish games in a row to unlock next block`}
            </p>
          </div>
          {gatePassed && (
            <span className="text-xs uppercase tracking-[0.1em] px-3 py-1 text-paper bg-brand">
              Passed
            </span>
          )}
        </div>

        {/* 5-box win tracker */}
        <div className="flex gap-2 mb-4">
          {Array.from({ length: needed }, (_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 h-12 flex items-center justify-center text-base transition-all",
                i < currentWins
                  ? "bg-brand text-paper border-none"
                  : "bg-transparent text-taupe border border-border-lighter"
              )}
            >
              {i < currentWins ? "✓" : i + 1}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-muted">
            {gatePassed
              ? "All gates cleared for this block"
              : currentWins > 0
                ? `${currentWins} consecutive win${currentWins > 1 ? "s" : ""} — a loss resets to 0`
                : "No wins recorded yet. Beat Stockfish to start your streak."}
          </p>
          {!gatePassed && (
            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: "STOCKFISH_LOSS", blockId: block.id })}
                disabled={currentWins === 0}
                className="text-xs uppercase tracking-[0.1em] px-4 py-2 transition-all disabled:opacity-25 hover:opacity-70 text-taupe border border-border-lighter"
              >
                ✕ Loss
              </button>
              <button
                onClick={() => dispatch({ type: "STOCKFISH_WIN", blockId: block.id })}
                className="text-xs uppercase tracking-[0.1em] px-4 py-2 transition-all hover:opacity-80 text-paper bg-brand"
              >
                + Win
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══ R O M A N   N U M E R A L   H E L P E R ═══════════════════════

function toRoman(n: number): string {
  const map: [number, string][] = [
    [60, "lx"], [50, "l"], [40, "xl"], [30, "xxx"],
    [20, "xx"], [19, "xix"], [18, "xviii"], [17, "xvii"],
    [16, "xvi"], [15, "xv"], [14, "xiv"], [13, "xiii"],
    [12, "xii"], [11, "xi"], [10, "x"], [9, "ix"],
    [8, "viii"], [7, "vii"], [6, "vi"], [5, "v"],
    [4, "iv"], [3, "iii"], [2, "ii"], [1, "i"],
  ];
  for (const [value, numeral] of map) {
    if (n >= value) return numeral;
  }
  return "";
}
