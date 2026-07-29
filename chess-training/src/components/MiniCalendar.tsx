import { cn } from "../lib/utils";
import type { DayData } from "../store/TrainingContext";

interface MiniCalendarProps {
  days: DayData[];
  viewingDay: number;
  todayDay: number;
  onSelectDay: (dayNumber: number) => void;
}

export default function MiniCalendar({
  days,
  viewingDay,
  todayDay,
  onSelectDay,
}: MiniCalendarProps) {
  // Show the 30 days leading up to and including todayDay
  const endDay = todayDay;
  const startDay = Math.max(1, endDay - 29);
  const range: DayData[] = [];
  for (let n = startDay; n <= endDay; n++) {
    const d = days.find((day) => day.dayNumber === n);
    if (d) range.push(d);
  }

  // Compute day-of-week offset so the grid starts on the correct column
  const startDow = getDowNumber(startDay);

  // Build rows (7 columns: Sun=0 .. Sat=6)
  const rows: (DayData | null)[][] = [];
  let row: (DayData | null)[] = [];

  // Pad leading nulls so first day lands on correct column
  for (let i = 0; i < startDow; i++) {
    row.push(null);
  }

  for (const d of range) {
    row.push(d);
    if (row.length === 7) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length > 0) {
    while (row.length < 7) row.push(null);
    rows.push(row);
  }

  const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div>
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-[10px] text-center uppercase tracking-[0.1em] py-1 text-taupe"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Grid rows */}
      <div className="space-y-1">
        {rows.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((day, di) => {
              if (!day) {
                return <div key={`e-${di}`} className="h-8" />;
              }

              const isViewing = day.dayNumber === viewingDay;
              const isToday = day.dayNumber === todayDay;
              const isCompleted = day.completed;
              const isPartial =
                !isCompleted &&
                day.tasks.some((t) => t.completed);

              // Mutually-exclusive color scheme
              let colorClass = "bg-transparent text-taupe";
              if (isCompleted) {
                colorClass = "bg-brand text-paper";
              } else if (isPartial) {
                colorClass = "bg-brand-pale text-ink-soft";
              } else if (isToday) {
                colorClass = "bg-today-bg text-ink ring-1 ring-inset ring-brand";
              }

              // Show a small dot above today if not yet started
              const showDot = isToday && !isCompleted && !isPartial;

              return (
                <button
                  key={day.dayNumber}
                  onClick={() => onSelectDay(day.dayNumber)}
                  className={cn(
                    "h-8 text-xs transition-all hover:scale-110 relative",
                    colorClass,
                    isViewing ? "font-bold" : "font-medium"
                  )}
                  title={`Day ${day.dayNumber}: ${day.dayOfWeek}${isCompleted ? " ✓" : ""}`}
                >
                  {day.dayNumber}
                  {showDot && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-brand" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Map day number (1-60) to day-of-week number (0=Sunday, 6=Saturday)
function getDowNumber(dayNumber: number): number {
  // Day 1 is Wednesday (day of week 3)
  return (dayNumber - 1 + 3) % 7;
}
