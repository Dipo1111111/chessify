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

/** A single Stockfish sparring setup inside a block. */
export interface PositionConfig {
  id: string;
  /** Short display name */
  name: string;
  /** Setup FEN — paste into the board editor */
  fen: string;
  /** What you must do to clear this position */
  goal: string;
  /** Optional move sequence that reaches the setup */
  setupNote?: string;
}

export interface BlockConfig {
  id: string;
  label: string;
  theme: string;
  dayStart: number;
  dayEnd: number;
  positions: PositionConfig[];
  /** Label for the success button (defaults to "Win") */
  winLabel?: string;
  /** Label for the failure button (defaults to "Loss") */
  lossLabel?: string;
}

/** Persisted gate progress for a single position. */
export interface PositionData {
  /** Consecutive successes on this position */
  consecutiveWins: number;
  /** Number of consecutive wins needed to pass (5) */
  winsNeeded: number;
  /** Whether this position has been passed */
  passed: boolean;
}

export interface BlockData {
  id: string;
  label: string;
  theme: string;
  dayStart: number;
  dayEnd: number;
  positions: PositionData[];
  /** Whether every position in the block has been passed */
  gatePassed: boolean;
  /** How many gate games played on the current training day */
  gamesToday: number;
  /** The training day number that gamesToday was last reset against */
  gamesTodayDay: number;
  /** Max gate games allowed per training day (10) */
  maxDailyGames: number;
}

export interface TrainingState {
  /** ISO date string of the day the user started the program */
  startDate: string;
  /** What day the user is currently looking at in the UI */
  viewingDay: number;
  /** All 60 days of data */
  days: DayData[];
  /** The 4 training blocks with per-position Stockfish gate status */
  blocks: BlockData[];
  /** Current streak — consecutive completed days from Day 1 */
  streak: number;
}

/** A resolved "current" position within a block. */
export interface CurrentPosition {
  /** 0-based index into the block's position list */
  positionIndex: number;
  /** 1-based display number */
  positionNumber: number;
  config: PositionConfig;
  data: PositionData;
}

/** The live Stockfish gate: the first block with an unpassed position. */
export interface GateInfo {
  block: BlockData;
  blockConfig: BlockConfig;
  current: CurrentPosition;
}

// ─── C O N F I G ──────────────────────────────────────────────────────

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

/** The 60-day syllabus. Position FENs come from the Master Chess Protocol. */
export const BLOCK_CONFIG: BlockConfig[] = [
  {
    id: "A",
    label: "Block A",
    theme: "Endgame Escalation Arena",
    dayStart: 1,
    dayEnd: 15,
    positions: [
      {
        id: "A1",
        name: "The Heavy Rook Escort",
        fen: "4k3/8/8/8/8/8/5PP1/4K2R w K - 0 1",
        goal: "You start up two clean pawns. Promote one to a Queen and deliver a clean checkmate.",
      },
      {
        id: "A2",
        name: "The Core King & Pawn Walk",
        fen: "4k3/4P3/4K3/8/8/8/8/8 w - - 0 1",
        goal: "Use your King as a shield to win the opposition. Promote without falling into a draw or stalemate.",
      },
      {
        id: "A3",
        name: "The Pawn Breakthrough Race",
        fen: "4k3/8/8/p1p1p3/P1P1P3/8/8/4K3 w - - 0 1",
        goal: "Break the locked pawn front, create a passed pawn via a lever or sacrifice, and escort it to promotion.",
      },
    ],
  },
  {
    id: "B",
    label: "Block B",
    theme: "Middlegame Attacking Storm",
    dayStart: 16,
    dayEnd: 30,
    positions: [
      {
        id: "B1",
        name: "The Closed Center Kingside Pawn Storm",
        fen: "r4rk1/pppqb1pp/4nn2/3pp1P1/P1P1P3/3P1N2/1P1B1P2/RN1Q1RK1 w - - 0 1",
        goal: "Launch your kingside pawns at the black King's shield. Breach the pocket, win heavy material, or checkmate.",
      },
      {
        id: "B2",
        name: "Major Piece Penetration on Open Files",
        fen: "2r2rk1/pp1bqppp/4p3/3p4/8/3B4/PP3PPP/R2QR1K1 w - - 0 1",
        goal: "Take the open files, control the center lines, stop Stockfish's counterplay, and infiltrate the back rank.",
      },
      {
        id: "B3",
        name: "The Isolated Queen's Pawn (IQP) Dynamic Charge",
        fen: "r2q1rk1/pp1nbppp/4p3/3p4/3P4/2N2N2/PP2QPPP/R4RK1 w - - 0 1",
        goal: "Use your superior piece speed to attack before the d4 pawn gets blockaded. Win material.",
      },
    ],
  },
  {
    id: "C",
    label: "Block C",
    theme: "Middlegame Open Board Chaos",
    dayStart: 31,
    dayEnd: 45,
    positions: [
      {
        id: "C1",
        name: "The Dual Bishop Laser Board",
        fen: "r4rk1/pp2bppp/2n1bn2/8/8/2N1BN2/PP2BPPP/R4RK1 w - - 0 1",
        goal: "The center pawns have vanished. Keep your long-range Bishops safe and catch Stockfish in a tactical crossfire.",
      },
      {
        id: "C2",
        name: "Endgame Transition Under Tension",
        fen: "r4rk1/pp3ppp/2n1b3/2b5/8/2N1PN2/PP3PPP/R3KB1R w KQ - 0 1",
        goal: "Queens off, King stuck in the center. Develop, castle manually if needed, and out-coordinate Stockfish.",
      },
      {
        id: "C3",
        name: "The Knight Outpost Crucible",
        fen: "r4rk1/pppn1ppp/4p3/3n4/3P4/2N2N2/PP3PPP/R4RK1 w - - 0 1",
        goal: "Stockfish has a monster Knight on d5. Challenge or exchange it safely, then win the positional battle.",
      },
    ],
  },
  {
    id: "D",
    label: "Block D",
    theme: "Opening Fortification Shield",
    dayStart: 46,
    dayEnd: 60,
    winLabel: "Survived",
    lossLabel: "Failed",
    positions: [
      {
        id: "D1",
        name: "The White Shield — English Opening",
        fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3",
        setupNote: "1. c4 e5 2. Nc3 Nf6",
        goal: "Survive to Move 20 with a completely playable, equal position. No premature attacks.",
      },
      {
        id: "D2",
        name: "The Black Shield — Pirc Defense",
        fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
        setupNote: "1. e4 d6 2. d4 Nf6 3. Nc3 g6",
        goal: "Survive to Move 20 without losing critical material or getting checkmated. Strike the center only when secure.",
      },
    ],
  },
];

// ─── H E L P E R S ────────────────────────────────────────────────────

function getDayOfWeek(dayNumber: number): string {
  // Day 1 is Wednesday (Day 14 = Tuesday in the design mockup)
  const ref = new Date(2026, 6, 15); // Wednesday, July 15, 2026
  const d = new Date(ref);
  d.setDate(ref.getDate() + (dayNumber - 1));
  return DAY_NAMES[d.getDay()];
}

function generateTasks(dayNumber: number): Task[] {
  const dow = getDayOfWeek(dayNumber);
  const puzzleTheme = PUZZLE_THEMES[dow];

  return [
    {
      id: `d${dayNumber}-puzzles`,
      type: "puzzles",
      title: "Tactical Chunking",
      detail: `30 min · Lichess ${puzzleTheme} folder`,
      completed: false,
    },
    {
      id: `d${dayNumber}-matches`,
      type: "matches",
      title: "Adaptation Matches",
      detail: "1 hr–1 hr 15 · 15+10 Rapid, 2 games",
      completed: false,
    },
    {
      id: `d${dayNumber}-analysis`,
      type: "analysis",
      title: "Recovery Analysis",
      detail: "10 min · 5 min per game review",
      completed: false,
    },
    {
      id: `d${dayNumber}-sparring`,
      type: "sparring",
      title: "Stockfish Sparring",
      detail: "Max engine · gate-locked",
      completed: false,
    },
  ];
}

function generateAllDays(): DayData[] {
  const days: DayData[] = [];
  for (let n = 1; n <= 60; n++) {
    days.push({
      dayNumber: n,
      dayOfWeek: getDayOfWeek(n),
      puzzleTheme: PUZZLE_THEMES[getDayOfWeek(n)],
      tasks: generateTasks(n),
      completed: false,
    });
  }
  return days;
}

function generateBlocks(): BlockData[] {
  return BLOCK_CONFIG.map((bc) => ({
    id: bc.id,
    label: bc.label,
    theme: bc.theme,
    dayStart: bc.dayStart,
    dayEnd: bc.dayEnd,
    positions: bc.positions.map(() => ({
      consecutiveWins: 0,
      winsNeeded: 5,
      passed: false,
    })),
    gatePassed: false,
    gamesToday: 0,
    gamesTodayDay: 1,
    maxDailyGames: 10,
  }));
}

/** A day completes when every non-sparring task is checked. Sparring is
 *  gate-driven and never blocks the calendar. */
function isDayComplete(tasks: Task[]): boolean {
  return tasks
    .filter((t) => t.type !== "sparring")
    .every((t) => t.completed);
}

/** Find the first day (from Day 1) that isn't fully completed.
 *  This is the "current" day the user should be working on. */
function firstUncompletedDay(days: DayData[]): number {
  for (let i = 0; i < days.length; i++) {
    if (!days[i].completed) return days[i].dayNumber;
  }
  return days.length; // all 60 days done — stay on the last one
}

/** Count consecutive completed days from Day 1 — how far along the user is. */
function computeStreak(days: DayData[]): number {
  let streak = 0;
  for (let i = 0; i < days.length; i++) {
    if (days[i].completed) streak++;
    else break;
  }
  return streak;
}

/** Coerce raw persisted blocks into the current shape (migration guard). */
function normalizeBlocks(raw?: BlockData[]): BlockData[] {
  const fresh = generateBlocks();
  if (!Array.isArray(raw) || raw.length === 0) return fresh;
  return fresh.map((f) => {
    const r = raw.find((b) => b.id === f.id);
    if (!r || !Array.isArray(r.positions) || r.positions.length !== f.positions.length) {
      return f;
    }
    return {
      ...f,
      positions: f.positions.map((fp, i) => {
        const rp = r.positions[i];
        const consecutiveWins = rp.consecutiveWins ?? 0;
        const winsNeeded = rp.winsNeeded || fp.winsNeeded;
        return {
          consecutiveWins,
          winsNeeded,
          passed: rp.passed ?? consecutiveWins >= winsNeeded,
        };
      }),
      gatePassed: f.positions.every((_, i) => {
        const rp = r.positions[i];
        const w = rp.consecutiveWins ?? 0;
        return rp.passed ?? w >= (rp.winsNeeded || 5);
      }),
      gamesToday: r.gamesToday ?? 0,
      gamesTodayDay: r.gamesTodayDay ?? 1,
      maxDailyGames: r.maxDailyGames ?? 10,
    };
  });
}

/** The live gate block: the first block with an unpassed position. */
export function currentGateOf(blocks: BlockData[]): GateInfo | null {
  const block = blocks.find((b) => !b.gatePassed);
  if (!block) return null;
  const blockConfig = BLOCK_CONFIG.find((b) => b.id === block.id);
  if (!blockConfig) return null;
  const idx = block.positions.findIndex((p) => !p.passed);
  if (idx === -1) return null;
  return {
    block,
    blockConfig,
    current: {
      positionIndex: idx,
      positionNumber: idx + 1,
      config: blockConfig.positions[idx],
      data: block.positions[idx],
    },
  };
}

// ─── I N I T I A L   S T A T E ───────────────────────────────────────

const STORAGE_KEY = "chess-training-state";

function createInitialState(): TrainingState {
  const startDate = new Date().toISOString().split("T")[0];
  return {
    startDate,
    viewingDay: 1,
    days: generateAllDays(),
    blocks: generateBlocks(),
    streak: 0,
  };
}

function loadState(): TrainingState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TrainingState;
      if (parsed.days?.length === 60 && parsed.startDate) {
        // Rebuild days with the current task copy, preserving the user's
        // completed checks by task type. Sparring is gate-driven — never
        // carried as a manual check. Gates are reseeded per the new plan.
        const days: DayData[] = parsed.days.map((oldDay) => {
          const oldByType = new Map(oldDay.tasks.map((t) => [t.type, t.completed]));
          const tasks = generateTasks(oldDay.dayNumber).map((t) => ({
            ...t,
            completed: t.type !== "sparring" && oldByType.get(t.type) === true,
          }));
          return {
            dayNumber: oldDay.dayNumber,
            dayOfWeek: getDayOfWeek(oldDay.dayNumber),
            puzzleTheme: PUZZLE_THEMES[getDayOfWeek(oldDay.dayNumber)],
            tasks,
            completed: isDayComplete(tasks),
          };
        });
        const streak = computeStreak(days);
        const currentDay = firstUncompletedDay(days);
        return {
          startDate: parsed.startDate,
          viewingDay: currentDay,
          days,
          blocks: generateBlocks(),
          streak,
        };
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
        const newTasks = day.tasks.map((task) => {
          // Sparring is gate-driven — it can never be toggled by hand.
          if (task.id !== action.taskId || task.type === "sparring") return task;
          return { ...task, completed: !task.completed };
        });
        return { ...day, tasks: newTasks, completed: isDayComplete(newTasks) };
      });

      const newStreak = computeStreak(newDays);

      return { ...state, days: newDays, streak: newStreak };
    }

    case "STOCKFISH_WIN": {
      const todayDay = firstUncompletedDay(state.days);
      const newBlocks = state.blocks.map((block) => {
        if (block.id !== action.blockId || block.gatePassed) return block;
        // Reset daily counter if the training day rolled over
        const gamesToday = block.gamesTodayDay !== todayDay ? 0 : block.gamesToday;
        if (gamesToday >= block.maxDailyGames) return block; // daily cap reached
        const idx = block.positions.findIndex((p) => !p.passed);
        if (idx === -1) return block;
        const positions = block.positions.map((p, i) =>
          i === idx
            ? {
                ...p,
                consecutiveWins: p.consecutiveWins + 1,
                passed: p.consecutiveWins + 1 >= p.winsNeeded,
              }
            : p
        );
        return {
          ...block,
          positions,
          gatePassed: positions.every((p) => p.passed),
          gamesToday: gamesToday + 1,
          gamesTodayDay: todayDay,
        };
      });
      return { ...state, blocks: newBlocks };
    }

    case "STOCKFISH_LOSS": {
      const todayDay = firstUncompletedDay(state.days);
      const newBlocks = state.blocks.map((block) => {
        if (block.id !== action.blockId || block.gatePassed) return block;
        // Reset daily counter if the training day rolled over
        const gamesToday = block.gamesTodayDay !== todayDay ? 0 : block.gamesToday;
        if (gamesToday >= block.maxDailyGames) return block; // daily cap reached
        const idx = block.positions.findIndex((p) => !p.passed);
        if (idx === -1) return block;
        const positions = block.positions.map((p, i) =>
          i === idx ? { ...p, consecutiveWins: 0 } : p
        );
        return {
          ...block,
          positions,
          gamesToday: gamesToday + 1,
          gamesTodayDay: todayDay,
        };
      });
      return { ...state, blocks: newBlocks };
    }

    case "SET_VIEWING_DAY": {
      return { ...state, viewingDay: Math.max(1, Math.min(60, action.dayNumber)) };
    }

    case "GO_TODAY": {
      const currentDay = firstUncompletedDay(state.days);
      return { ...state, viewingDay: currentDay };
    }

    case "IMPORT_STATE": {
      const imported = action.state;
      if (!imported.days || imported.days.length !== 60 || !imported.startDate) {
        return state; // invalid — refuse
      }
      const currentDay = firstUncompletedDay(imported.days);
      const streak = computeStreak(imported.days);
      return {
        ...imported,
        streak,
        viewingDay: currentDay,
        blocks: normalizeBlocks(imported.blocks),
      };
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
  viewingBlockConfig: BlockConfig | undefined;
  todayDay: number;
  /** The live Stockfish gate (first block with an unpassed position) */
  currentGate: GateInfo | null;
}

const TrainingContext = createContext<TrainingContextValue | null>(null);

export function TrainingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(trainingReducer, null, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // "Today" = the first day the user hasn't fully completed
  const todayDay = firstUncompletedDay(state.days);
  const viewingDayData = state.days.find((d) => d.dayNumber === state.viewingDay);
  const viewingBlock = state.blocks.find(
    (b) => state.viewingDay >= b.dayStart && state.viewingDay <= b.dayEnd
  );
  const viewingBlockConfig = BLOCK_CONFIG.find((b) => b.id === viewingBlock?.id);
  const currentGate = currentGateOf(state.blocks);

  return (
    <TrainingContext.Provider
      value={{
        state,
        dispatch,
        viewingDayData,
        viewingBlock,
        viewingBlockConfig,
        todayDay,
        currentGate,
      }}
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
