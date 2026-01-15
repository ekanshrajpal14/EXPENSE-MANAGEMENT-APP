import { Category, Expense } from "../types/expense";
import { db } from "./index";

export const addExpense = async (amount: number, category_id: number, date: string, name: string): Promise<void> => {
  await db.runAsync("INSERT INTO expenses (amount, category_id,date,name) VALUES (?, ?, ?, ?)", amount, category_id, date, name);
};

export const getExpensesByDateAndCategory = async (date: string, category_id: number): Promise<Expense[]> => {
  return await db.getAllAsync<Expense>("SELECT * FROM expenses WHERE date = ? AND category_id = ?  ORDER BY id DESC", date, category_id);
};

export const createCategory = async (name: string): Promise<void> => {
  await db.runAsync("INSERT INTO categories (name) VALUES (?)", name);
};

export const getAllCategoryByDate = async (date: string): Promise<Category[]> => {
  return await db.getAllAsync<Category>("SELECT c.name,c.id,SUM(e.amount) as totalExp FROM categories c INNER JOIN expenses as e ON c.id = e.category_id where date = ? GROUP BY c.id ", date);
};

export const fetchAllCategory = async (): Promise<Category[]> => {
  return await db.getAllAsync("SELECT * FROM categories");
};

export const fetchAllExp = async () => {
  return await db.getAllAsync("SELECT * FROM expenses");
};

export const fetchCategoryBasedItems = async (date: string, category_id: number): Promise<Expense[]> => {
  return await db.getAllAsync("SELECT * FROM expenses WHERE category_id  = ? AND date = ? ", category_id, date);
};

export const fetchBalanceOfDayBased = async (date: string): Promise<{ balance: number } | null> => {
  return await db.getFirstAsync("SELECT sum(amount) as balance FROM expenses where date = ? ", date);
};
