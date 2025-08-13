export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FilterType = "all" | "pending" | "completed";
export type SortType = "date" | "priority" | "title";
