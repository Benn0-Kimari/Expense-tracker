
import { Expense } from "../types/expense";

export const mockExpenses: Expense[] = [
  {
    id: 1,
    description: "Groceries at Whole Foods",
    category: "Food",
    amount: 89.32,
    date: "2025-04-01"
  },
  {
    id: 2,
    description: "Monthly Netflix subscription",
    category: "Entertainment",
    amount: 14.99,
    date: "2025-04-02"
  },
  {
    id: 3,
    description: "Electric bill",
    category: "Utilities",
    amount: 123.45,
    date: "2025-04-05"
  },
  {
    id: 4,
    description: "Gas for car",
    category: "Transportation",
    amount: 42.50,
    date: "2025-04-08"
  },
  {
    id: 5,
    description: "Dinner at Italian restaurant",
    category: "Food",
    amount: 78.99,
    date: "2025-04-10"
  },
  {
    id: 6,
    description: "Movie tickets",
    category: "Entertainment",
    amount: 32.00,
    date: "2025-04-12"
  },
  {
    id: 7,
    description: "Water bill",
    category: "Utilities",
    amount: 45.22,
    date: "2025-04-15"
  },
  {
    id: 8,
    description: "Uber ride",
    category: "Transportation",
    amount: 24.50,
    date: "2025-04-16"
  }
];

export const expenseCategories = [
  "Food",
  "Entertainment",
  "Utilities",
  "Transportation",
  "Housing",
  "Healthcare",
  "Education",
  "Personal",
  "Other"
];
