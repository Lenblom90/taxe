export type Task = {
  id: string;
  area_id: string;
  name?: string;
  note?: string | number | readonly string[];
  status?: string;
  previous_status?: string;
  estimate?: number;
  priority?: number;
  motivation?: string;
  eisenhower?: number;
  sources?: {}[];
  source?: string;
  source_id?: string;
  created_at: string;
  updated_at: string;
  scheduled_on?: string;
  completed_at?: string;
  deleted_at?: string;
};

export enum status {
  later = "later",
  next = "next",
  started = "started",
  waiting = "waiting",
  completed = "completed",
}

export enum estimate {
  five_minutes = 5,
  ten_minutes = 10,
  fifteen_minutes = 15,
  twenty_minutes = 20,
  thirty_minutes = 30,
  fortyfive_minutes = 45,
  one_hour = 60,
  two_hours = 120,
  four_hours = 240,
  eight_hours = 480,
}

export enum priority {
  highest = 2,
  high = 1,
  normal = 0,
  low = -1,
  lowest = -2,
}

export enum motivation {
  must = "must",
  should = "should",
  want = "want",
  unknown = "unknown",
}

export enum eisenhower {
  urgent_important = 1,
  urgent = 2,
  important = 3,
  none = 4,
  uncategorized = 0,
}

export enum grouping {
  none = 0,
  nowLater = 1,
  byStatus = 2,
  byMotivation = 3,
  Eisenhower = 4,
}

export enum sorting {
  urgency = "urgency",
  priority = "priority",
  estimate = "estimate",
  age = "age",
}

export type Entry = {
  id: string;
  title: string;
  date: string;
  text: string;
  mood: number;
  energy: number;
  busy: number;
};

export type Habit = {
  id: string;
  name: string;
  color: string;
  recurrence: string;
  scheduled_time: string;
  estimate: number;
  healthy: boolean;
  paused: boolean;
};
