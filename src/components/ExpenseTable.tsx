
import React from "react";
import { Expense, SortField, SortDirection } from "@/types/expense";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ExpenseTableProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onSort: (field: SortField) => void;
  sortField: SortField | null;
  sortDirection: SortDirection;
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({
  expenses,
  onDelete,
  onSort,
  sortField,
  sortDirection,
}) => {
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    
    return (
      <ArrowUpDown
        className={`ml-2 h-4 w-4 inline-block ${
          sortDirection === "asc" ? "transform rotate-180" : ""
        }`}
      />
    );
  };

  const handleSort = (field: SortField) => {
    onSort(field);
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-expense-secondary">
          <TableRow>
            <TableHead
              className="cursor-pointer hover:bg-expense-light transition-colors"
              onClick={() => handleSort("description")}
            >
              Description {getSortIcon("description")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-expense-light transition-colors"
              onClick={() => handleSort("category")}
            >
              Category {getSortIcon("category")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-expense-light transition-colors text-right"
              onClick={() => handleSort("amount")}
            >
              Amount {getSortIcon("amount")}
            </TableHead>
            <TableHead
              className="cursor-pointer hover:bg-expense-light transition-colors"
              onClick={() => handleSort("date")}
            >
              Date {getSortIcon("date")}
            </TableHead>
            <TableHead className="w-[80px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No expenses found.
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-gray-50">
                <TableCell>{expense.description}</TableCell>
                <TableCell>
                  <span className="bg-expense-light text-expense-primary px-2 py-1 rounded-full text-xs font-medium">
                    {expense.category}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(expense.amount)}
                </TableCell>
                <TableCell>{formatDate(expense.date)}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(expense.id)}
                    aria-label={`Delete expense: ${expense.description}`}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
