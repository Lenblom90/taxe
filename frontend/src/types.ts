export type Task = {
  id: string;
  area_id: string;
  name?: string;
  note?: string | number | readonly string[];
  status?: string;
  previous_status?: string;
  estimate?: string;
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
