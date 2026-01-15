/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useMemo, useState } from "react";
import { initDatabase } from "../database";
import { getAllCategoryByDate } from "../database/expense.service";
import { DateItem, generateDateRange } from "../helpers/dates";
import { Category } from "../types/expense";

interface ExpenseContextType {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  fetchCategories: () => Promise<void>;
  dates: DateItem[];
  activeDate: string;
  onDatePress: (item: DateItem) => void;
}

export const ExpenseContext = createContext<ExpenseContextType>({} as ExpenseContextType);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dates, setDates] = useState<DateItem[]>([]);
  const fetchCategories = async () => {
    try {
      const data = await getAllCategoryByDate(selectedDate);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    initDatabase();
    // resetDatabase();
  }, []);

  useEffect(() => {
    if (!selectedDate) return;
    fetchCategories();
  }, [selectedDate]);

  useMemo(() => {
    const data = generateDateRange(30);
    setDates(data);
  }, [selectedDate]);

  const todayKey = new Date().toISOString().split("T")[0];
  const [activeDate, setActiveDate] = useState<string>(todayKey);

  const onDatePress = (item: DateItem) => {
    setActiveDate(item.key);
    setSelectedDate(item.key);
  };

  return (
    <ExpenseContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        categories,
        setCategories,
        fetchCategories,
        dates,
        activeDate,
        onDatePress,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};
