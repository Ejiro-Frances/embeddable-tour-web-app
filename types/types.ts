export interface TourStats {
  totalToursCreated: number;
  totalToursCompleted: number;
  completionRate: number;
  stepsSkipped: number;
  averageDurationInMinutes: number;
  activeToursToday: number;
  abandonRate: number;
}

export interface CompletionTrend {
  day: string;
  completed: number;
}
