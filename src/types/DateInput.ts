export interface DateInput {
  year: number;
  month: number;
  day?: number | null;
}

export interface DateInputDaySelectedState {
  year: number;
  month: number;
  day: number;
}
