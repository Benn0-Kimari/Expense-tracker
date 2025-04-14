
import React from "react";
import { Expense } from "@/types/expense";
import { formatCurrency } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Calendar, PieChart } from "lucide-react";

interface ExpenseStatsProps {
  expenses: Expense[];
}

const ExpenseStats: React.FC<ExpenseStatsProps> = ({ expenses }) => {
  // Calculate total expenses
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Get the count of unique categories
  const uniqueCategories = new Set(expenses.map((expense) => expense.category));
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-expense-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Expense Count</CardTitle>
          <Calendar className="h-4 w-4 text-expense-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expenses.length}</div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          <PieChart className="h-4 w-4 text-expense-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{uniqueCategories.size}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseStats;
