import { useState } from "react";
import { cn } from "../lib/utils";
import { useTraining } from "../store/TrainingContext";
import Stats from "./Stats";

export default function Dashboard() {
  const { state, dispatch, viewingDayData, viewingBlock, todayDay } =
    useTraining();
  const [tab, setTab] = useState<"board" | "stats">("board");
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen flex bg-paper safe-top safe-bottom relative">
      {/* ═══ Mobile menu backdrop ═══ */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ═══ Sidebar (desktop: normal, mobile: overlay drawer) ═══ */}
      <aside
        className={cn(
          "shrink-0 flex flex-col bg-surface border-r border-border-light safe-top safe-left",
          "w-56",
          "fixed inset-y-0 left-0 z-50 transition-transform duration-200 ease-in-out",
          "md:relative md:translate-x-0 md:z-auto md:min-h-screen",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="px-6 pt-10 pb-8">
          <div className="flex items-center justify-between md:justify-start">
            <div className="w-8 h-0.5 mb-4 bg-brand md:mb-4" />
            {/* Close button — mobile only */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden text-ink-muted hover:text-ink transition-colors p-1"
              aria-label="Close menu"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
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
            onClick={() => { setTab("board"); setMobileMenuOpen(false); }}
          />
          <SidebarTab
            label="Stats"
            active={tab === "stats"}
            onClick={() => { setTab("stats"); setMobileMenuOpen(false); }}
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

        {/* ═══ Mobile top bar (hamburger + title) — shared across tabs ═══ */}
        <div className="flex items-center gap-3 mb-8 md:hidden px-5 sm:px-4 pt-6">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="shrink-0 p-1 -ml-1 text-ink-muted hover:text-ink transition-colors"
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">
              {tab === "board"
                ? `Day ${state.viewingDay} · ${state.streak} day streak`
                : `${state.days.filter(d => d.completed).length}/${tab === "stats" ? 60 : 60} days`
              }
            </p>
            <h1 className="text-lg font-semibold font-display text-ink truncate">
              {tab === "board" ? "The Board" : "Progress"}
            </h1>
          </div>
          {tab === "board" && !isToday && (
            <button
              onClick={() => dispatch({ type: "GO_TODAY" })}
              className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded text-paper bg-brand shrink-0"
            >
              Today
            </button>
          )}
        </div>

        {tab === "board" ? (
          <div className="page-container">
            {/* ═══ Desktop header ═══ */}
            <div className="hidden md:flex items-start justify-between mb-16">
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

            {/* ═══ Mobile prev/next nav ═══ */}
            <div className="flex items-center justify-between mb-8 md:hidden">
              <button
                onClick={() => dispatch({ type: "SET_VIEWING_DAY", dayNumber: state.viewingDay - 1 })}
                disabled={state.viewingDay <= 1}
                className="text-xs tracking-wider uppercase transition-opacity disabled:opacity-20 hover:opacity-60 text-brand"
              >
                ← Prev
              </button>
              <div className="text-center">
                <p className="text-lg font-light font-display text-brand">{roman}</p>
                <p className="text-[10px] text-ink-muted">
                  {viewingBlock.label} &middot; {state.viewingDay}/{viewingBlock.dayEnd}
                </p>
              </div>
              <button
                onClick={() => dispatch({ type: "SET_VIEWING_DAY", dayNumber: state.viewingDay + 1 })}
                disabled={state.viewingDay >= 60}
                className="text-xs tracking-wider uppercase transition-opacity disabled:opacity-20 hover:opacity-60 text-brand"
              >
                Next →
              </button>
            </div>

            {/* ═══ Today's theme ═══ */}
            <div className="mb-10 md:mb-14 inline-block border-b-2 border-brand pb-2">
              <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase mb-1 text-ink-muted">
                Today's study
              </p>
              <p className="text-sm md:text-base font-display text-ink">
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
                    <div className="flex items-start gap-3 md:gap-6 py-4">
                      {/* Roman numeral — click to expand */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(task.id);
                        }}
                        className="shrink-0 mt-0.5 transition-all hover:scale-110 text-left min-w-[20px] md:min-w-[28px]"
                        title="Click for details"
                      >
                        <span
                          className={cn(
                            "text-base md:text-lg font-light font-display transition-all",
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
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0">
                          <h3
                            className={cn(
                              "text-sm md:text-lg",
                              task.completed ? "text-taupe line-through" : "text-ink"
                            )}
                          >
                            {task.title}
                          </h3>
                          <span
                            className="text-[10px] md:text-xs font-medium text-ink-muted"
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
                          "w-5 h-5 md:w-6 md:h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors",
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
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" className="md:w-[10px] md:h-[10px]">
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
                        isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="ml-[28px] md:ml-[60px] mb-5 p-4 md:p-5 text-sm leading-relaxed bg-surface text-ink-soft">
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
            <div className="mt-12 md:mt-16 text-center">
              <p className="text-xs md:text-sm leading-relaxed italic font-display text-taupe">
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
      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-brand font-medium md:min-w-10">
          Goal
        </span>
        <span className="text-xs">{d.goal}</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] text-brand font-medium md:min-w-10">
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
  block: { id: string; label: string; theme: string; consecutiveWins: number; winsNeeded: number; gatePassed: boolean; gamesToday: number; gamesTodayDay: number; maxDailyGames: number };
  dispatch: React.Dispatch<any>;
}) {
  const gatePassed = block.gatePassed;
  const currentWins = block.consecutiveWins;
  const needed = block.winsNeeded;
  const dailyGames = block.gamesToday;
  const dailyCap = block.maxDailyGames;
  const atDailyCap = dailyGames >= dailyCap;

  return (
    <div className="mt-10 md:mt-14 pt-6 md:pt-8">
      <p className="text-xs tracking-[0.15em] uppercase mb-4 text-ink-muted">
        Block Gate
      </p>

      <div
        className={cn(
          "p-4 md:p-6",
          gatePassed ? "bg-brand-light border border-brand" : "bg-surface border border-border-light"
        )}
      >
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2 md:gap-0">
          <div>
            <p className="text-sm font-medium text-ink">
              {block.label} &middot; {block.theme}
            </p>
            <p className="text-[10px] md:text-xs mt-0.5 text-ink-muted">
              {gatePassed
                ? "Gate cleared — next block unlocked"
                : `Win ${needed} Stockfish games in a row to unlock next block`}
            </p>
          </div>
          {gatePassed && (
            <span className="text-[10px] md:text-xs uppercase tracking-[0.1em] px-3 py-1 text-paper bg-brand self-start md:self-auto">
              Passed
            </span>
          )}
        </div>

        {/* 5-box win tracker */}
        <div className="flex gap-1.5 md:gap-2 mb-4">
          {Array.from({ length: needed }, (_, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 h-8 md:h-12 flex items-center justify-center text-sm md:text-base transition-all",
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] md:text-xs text-ink-muted">
              {gatePassed
                ? "All gates cleared for this block"
                : atDailyCap
                  ? `Daily limit reached — ${dailyCap}/${dailyCap} games today, come back tomorrow`
                  : currentWins > 0
                    ? `${currentWins} consecutive win${currentWins > 1 ? "s" : ""} — a loss resets to 0`
                    : "No wins recorded yet. Beat Stockfish to start your streak."}
            </p>
            {!gatePassed && (
              <p className="text-[10px] text-ink-muted/60">
                {dailyGames}/{dailyCap} gate games played today
              </p>
            )}
          </div>
          {!gatePassed && (
            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: "STOCKFISH_LOSS", blockId: block.id })}
                disabled={currentWins === 0 || atDailyCap}
                className="text-[10px] md:text-xs uppercase tracking-[0.1em] px-3 md:px-4 py-2 transition-all disabled:opacity-25 hover:opacity-70 text-taupe border border-border-lighter"
              >
                ✕ Loss
              </button>
              <button
                onClick={() => dispatch({ type: "STOCKFISH_WIN", blockId: block.id })}
                disabled={atDailyCap}
                className="text-[10px] md:text-xs uppercase tracking-[0.1em] px-3 md:px-4 py-2 transition-all disabled:opacity-25 hover:opacity-80 text-paper bg-brand"
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
