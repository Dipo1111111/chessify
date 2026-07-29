import React, { createContext, useContext, useReducer, useEffect } from "react";

// ─── T Y P E S ────────────────────────────────────────────────────────

export type PuzzleTheme =
  | "Pins"
  | "Forks"
  | "Skewers"
  | "Back-Rank"
  | "Discovered"
  | "Puzzle Streak";

export type TaskType = "puzzles" | "matches" | "analysis" | "sparring";

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  detail: string;
  completed: boolean;
}

export interface DayData {
  dayNumber: number;
  dayOfWeek: string;
  puzzleTheme: PuzzleTheme;
  tasks: Task[];
  completed: boolean;
}

export interface BlockData {
  id: string;
  label: string;
  theme: string;
  dayStart: number;
  dayEnd: number;
  /** Current streak of consecutive Stockfish wins for this block */
  consecutiveWins: number;
  /** Number of consecutive wins needed to pass the gate (5) */
  winsNeeded: number;
  /** Whether this block's Stockfish gate has been passed */
  gatePassed: boolean;
}

export interface TrainingState {
  /** ISO date string of the day the user started the program */
  startDate: string;
  /** What day the user is currently looking at in the UI */
  viewingDay: number;
  /** All 60 days of data */
  days: DayData[];
  /** The 4 training blocks with Stockfish gate status */
  blocks: BlockData[];
  /** Current streak — consecutive completed days as of today */
  streak: number;
}

// ─── H E L P E R S ────────────────────────────────────────────────────

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const PUZZLE_THEMES: Record<string, PuzzleTheme> = {
  Monday: "Pins",
  Tuesday: "Forks",
  Wednesday: "Skewers",
  Thursday: "Back-Rank",
  Friday: "Discovered",
  Saturday: "Puzzle Streak",
  Sunday: "Puzzle Streak",
};

const BLOCK_CONFIG = [
  { id: "A", label: "Block A", theme: "Endgame Escalation", dayStart: 1, dayEnd: 15 },
  { id: "B", label: "Block B", theme: "Middlegame Mayhem", dayStart: 16, dayEnd: 30 },
  { id: "C", label: "Block C", theme: "Minor Pieces", dayStart: 31, dayEnd: 45 },
  { id: "D", label: "Block D", theme: "Opening Arsenal", dayStart: 46, dayEnd: 60 },
];

/** Get the next block after a given block ID, or null if none */
function nextBlockId(id: string): string | null {
  const order = ["A", "B", "C", "D"];
  const idx = order.indexOf(id);
  return idx < order.length - 1 ? order[idx + 1] : null;
}

function getDayOfWeek(dayNumber: number): string {
  // Day 1 is Wednesday (Day 14 = Tuesday in the design mockup)
  const ref = new Date(2026, 6, 15); // Wednesday, July 15, 2026
  const d = new Date(ref);
  d.setDate(ref.getDate() + (dayNumber - 1));
  return DAY_NAMES[d.getDay()];
}

function generateTaskId(dayNumber: number, type: TaskType): string {
  return `d${dayNumber}-${type}`;
}

function generateTasks(dayNumber: number, blockId: string): Task[] {
  const dow = getDayOfWeek(dayNumber);
  const puzzleTheme = PUZZLE_THEMES[dow];
  const block = BLOCK_CONFIG.find((b) => b.id === blockId)!;

  return [
    {
      id: generateTaskId(dayNumber, "puzzles"),
      type: "puzzles",
      title: "Tactical Chunking",
      detail: `30 min &middot; Lichess ${puzzleTheme} folder`,
      completed: false,
    },
    {
      id: generateTaskId(dayNumber, "matches"),
      type: "matches",
      title: "Adaptation Matches",
      detail: "1 hr 15 min &middot; 15+10 Rapid, 2 games",
      completed: false,
    },
    {
      id: generateTaskId(dayNumber, "analysis"),
      type: "analysis",
      title: "Recovery Analysis",
      detail: "10 min &middot; Post-game review",
      completed: false,
    },
    {
      id: generateTaskId(dayNumber, "sparring"),
      type: "sparring",
      title: "Stockfish Sparring",
      detail: `30 min &middot; ${block.theme}`,
      completed: false,
    },
  ];
}

function generateAllDays(): DayData[] {
  const days: DayData[] = [];
  for (let n = 1; n <= 60; n++) {
    const block = BLOCK_CONFIG.find((b) => n >= b.dayStart && n <= b.dayEnd)!;
    days.push({
      dayNumber: n,
      dayOfWeek: getDayOfWeek(n),
      puzzleTheme: PUZZLE_THEMES[getDayOfWeek(n)],
      tasks: generateTasks(n, block.id),
      completed: false,
    });
  }
  return days;
}

function generateBlocks(): BlockData[] {
  return BLOCK_CONFIG.map((bc) => ({
    ...bc,
    consecutiveWins: 0,
    winsNeeded: 5,
    gatePassed: false,
  }));
}

/** Calculate what day number the user is on based on their start date. */
function calcTodayDayNumber(startDate: string): number {
  const start = new Date(startDate + "T00:00:00");
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(60, diffDays + 1));
}

/** Count consecutive completed days going backwards from `fromDay`.
 *  If fromDay itself is completed, include it. Otherwise start from yesterday. */
function computeStreak(days: DayData[], fromDay: number): number {
  const today = days.find((d) => d.dayNumber === fromDay);
  const start = today?.completed ? fromDay : fromDay - 1;
  let streak = 0;
  for (let n = start; n >= 1; n--) {
    const day = days.find((d) => d.dayNumber === n);
    if (day?.completed) streak++;
    else break;
  }
  return streak;
}

// ─── I N I T I A L   S T A T E ───────────────────────────────────────

const STORAGE_KEY = "chess-training-state";

function createInitialState(): TrainingState {
  const startDate = new Date().toISOString().split("T")[0];
  const days = generateAllDays();
  const todayDay = calcTodayDayNumber(startDate);
  return {
    startDate,
    viewingDay: todayDay,
    days,
    blocks: generateBlocks(),
    streak: computeStreak(days, todayDay),
  };
}

function loadState(): TrainingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TrainingState;
      if (parsed.days?.length === 60 && parsed.startDate) {
        // Recalculate today on every load
        const todayDay = calcTodayDayNumber(parsed.startDate);
        const streak = computeStreak(parsed.days, todayDay);

        // Migrate old stockfishWins → consecutiveWins if needed
        const blocks = parsed.blocks.map((b) => {
          const old = b as BlockData & { stockfishWins?: number };
          if (old.stockfishWins !== undefined && old.consecutiveWins === undefined) {
            return {
              ...b,
              consecutiveWins: old.stockfishWins,
              winsNeeded: b.winsNeeded || 5,
              gatePassed: old.stockfishWins >= (b.winsNeeded || 5),
            };
          }
          return {
            ...b,
            winsNeeded: b.winsNeeded || 5,
            gatePassed: b.gatePassed ?? b.consecutiveWins >= (b.winsNeeded || 5),
          };
        });
        return { ...parsed, blocks, streak };
      }
    }
  } catch {
    // corrupted data — reset
  }
  return createInitialState();
}

function saveState(state: TrainingState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full — silently fail
  }
}

// ─── R E D U C E R ────────────────────────────────────────────────────

type TrainingAction =
  | { type: "TOGGLE_TASK"; dayNumber: number; taskId: string }
  | { type: "STOCKFISH_WIN"; blockId: string }
  | { type: "STOCKFISH_LOSS"; blockId: string }
  | { type: "SET_VIEWING_DAY"; dayNumber: number }
  | { type: "GO_TODAY" }
  | { type: "IMPORT_STATE"; state: TrainingState };

function trainingReducer(
  state: TrainingState,
  action: TrainingAction
): TrainingState {
  switch (action.type) {
    case "TOGGLE_TASK": {
      const newDays = state.days.map((day) => {
        if (day.dayNumber !== action.dayNumber) return day;
        const newTasks = day.tasks.map((task) =>
          task.id === action.taskId
            ? { ...task, completed: !task.completed }
            : task
        );
        return { ...day, tasks: newTasks, completed: newTasks.every((t) => t.completed) };
      });

      const todayDay = calcTodayDayNumber(state.startDate);
      const newStreak = computeStreak(newDays, todayDay);
      return { ...state, days: newDays, streak: newStreak };
    }

    case "STOCKFISH_WIN": {
      const newBlocks = state.blocks.map((block) => {
        if (block.id !== action.blockId) return block;
        const newWins = block.consecutiveWins + 1;
        return {
          ...block,
          consecutiveWins: newWins,
          gatePassed: newWins >= block.winsNeeded,
        };
      });
      return { ...state, blocks: newBlocks };
    }

    case "STOCKFISH_LOSS": {
      const newBlocks = state.blocks.map((block) => {
        if (block.id !== action.blockId) return block;
        return { ...block, consecutiveWins: 0 };
      });
      return { ...state, blocks: newBlocks };
    }

    case "SET_VIEWING_DAY": {
      return { ...state, viewingDay: Math.max(1, Math.min(60, action.dayNumber)) };
    }

    case "GO_TODAY": {
      const todayDay = calcTodayDayNumber(state.startDate);
      return { ...state, viewingDay: todayDay };
    }

    case "IMPORT_STATE": {
      const imported = action.state;
      if (!imported.days || imported.days.length !== 60 || !imported.startDate) {
        return state; // invalid — refuse
      }
      const todayDay = calcTodayDayNumber(imported.startDate);
      const streak = computeStreak(imported.days, todayDay);
      return { ...imported, streak, viewingDay: todayDay, blocks: imported.blocks };
    }

    default:
      return state;
  }
}

// ─── C O N T E X T ────────────────────────────────────────────────────

interface TrainingContextValue {
  state: TrainingState;
  dispatch: React.Dispatch<TrainingAction>;
  viewingDayData: DayData | undefined;
  viewingBlock: BlockData | undefined;
  todayDay: number;
}

const TrainingContext = createContext<TrainingContextValue | null>(null);

export function TrainingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(trainingReducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const todayDay = calcTodayDayNumber(state.startDate);
  const viewingDayData = state.days.find((d) => d.dayNumber === state.viewingDay);
  const viewingBlock = state.blocks.find(
    (b) => state.viewingDay >= b.dayStart && state.viewingDay <= b.dayEnd
  );

  return (
    <TrainingContext.Provider
      value={{ state, dispatch, viewingDayData, viewingBlock, todayDay }}
    >
      {children}
    </TrainingContext.Provider>
  );
}

export function useTraining(): TrainingContextValue {
  const ctx = useContext(TrainingContext);
  if (!ctx) throw new Error("useTraining must be used within a TrainingProvider");
  return ctx;
}
