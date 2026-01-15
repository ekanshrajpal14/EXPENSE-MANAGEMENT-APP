export interface Expense {
  id: number;
  amount: number;
  category: string;
  date: string; // YYYY-MM-DD
}

export interface Category {
  id: number;
  name: string;
  totalExp?: number;
}
