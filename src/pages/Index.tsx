
import React, { useState, useEffect, useMemo } from "react";
import { Expense, SortField, SortDirection } from "@/types/expense";
import { mockExpenses } from "@/data/mockExpenses";
import Header from "@/components/Header";
import ExpenseTable from "@/components/ExpenseTable";
import ExpenseForm from "@/components/ExpenseForm";
import SearchBar from "@/components/SearchBar";
import ExpenseStats from "@/components/ExpenseStats";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  // State for expenses
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  
  // State for search
  const [searchTerm, setSearchTerm] = useState("");
  
  // State for sorting
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Handle adding a new expense
  const handleAddExpense = (newExpense: Omit<Expense, "id">) => {
    const expenseWithId: Expense = {
      ...newExpense,
      id: Date.now(), // Simple way to generate a unique ID
    };
    
    setExpenses((prevExpenses) => [...prevExpenses, expenseWithId]);
    
    toast({
      title: "Expense added",
      description: `${newExpense.description} has been added to your expenses.`,
    });
  };

  // Handle deleting an expense
  const handleDeleteExpense = (id: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
    
    toast({
      title: "Expense deleted",
      description: "The expense has been removed from your list.",
    });
  };

  // Handle search term change
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // If clicking on the same field, toggle the direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If clicking on a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter expenses based on search term
  const filteredExpenses = useMemo(() => {
    if (!searchTerm) return expenses;
    
    return expenses.filter(
      (expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [expenses, searchTerm]);

  // Sort the filtered expenses
  const sortedExpenses = useMemo(() => {
    if (!sortField) return filteredExpenses;
    
    return [...filteredExpenses].sort((a, b) => {
      if (sortField === "amount") {
        // Sort numerically for amount
        return sortDirection === "asc"
          ? a.amount - b.amount
          : b.amount - a.amount;
      }

      // Sort alphabetically for strings
      const aValue = a[sortField].toLowerCase();
      const bValue = b[sortField].toLowerCase();
      
      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [filteredExpenses, sortField, sortDirection]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Header />
      
      <div className="mb-8">
        <ExpenseStats expenses={expenses} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>
        
        <div className="lg:col-span-2">
          <div className="mb-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
          </div>
          
          <ExpenseTable
            expenses={sortedExpenses}
            onDelete={handleDeleteExpense}
            onSort={handleSort}
            sortField={sortField}
            sortDirection={sortDirection}
          />
          
          {filteredExpenses.length !== expenses.length && (
            <p className="text-sm text-gray-500 mt-2">
              Showing {filteredExpenses.length} of {expenses.length} expenses
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
