export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate?: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export type FilterType = "all" | "pending" | "completed";
export type SortType = "date" | "priority" | "title";

export const CATEGORY_COLORS: Record<string, string> = {
  Client: "bg-blue-100 text-blue-700 border-blue-200",
  Portfolio: "bg-purple-100 text-purple-700 border-purple-200",
  Personal: "bg-teal-100 text-teal-700 border-teal-200",
  Work: "bg-orange-100 text-orange-700 border-orange-200",
  Learning: "bg-pink-100 text-pink-700 border-pink-200",
  Errands: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

const COLOR_PALETTE = [
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
  "bg-amber-100 text-amber-700 border-amber-200",
  "bg-rose-100 text-rose-700 border-rose-200",
];

export function getCategoryColor(category: string): string {
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  let hash = 0;
  for (let i = 0; i < category.length; i++) {
    hash = (hash << 5) - hash + category.charCodeAt(i);
    hash |= 0;
  }
  return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length];
}

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "can", "need", "to", "for", "of",
  "in", "on", "at", "by", "with", "from", "and", "or", "but", "not",
  "my", "your", "his", "her", "its", "our", "their", "this", "that",
  "these", "those", "i", "you", "he", "she", "it", "we", "they",
]);

export function generateCategoryFromTitle(title: string): string {
  const words = title.trim().split(/\s+/);
  for (const word of words) {
    const cleaned = word.replace(/[^a-zA-Z]/g, "");
    if (cleaned.length >= 3 && !STOP_WORDS.has(cleaned.toLowerCase())) {
      return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
    }
  }
  return words[0]
    ? words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase()
    : "General";
}

export function getUniqueCategories(tasks: Task[]): string[] {
  const categories = new Set<string>();
  tasks.forEach((task) => {
    if (task.category) categories.add(task.category);
  });
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}
