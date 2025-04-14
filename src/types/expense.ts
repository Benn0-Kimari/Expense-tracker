
export interface Expense {
  id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
}

export type SortField = 'description' | 'category' | 'amount' | 'date';
export type SortDirection = 'asc' | 'desc';
