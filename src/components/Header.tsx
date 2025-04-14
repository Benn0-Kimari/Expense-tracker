
import React from "react";
import { CreditCard } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="py-4 mb-6">
      <div className="flex items-center justify-center gap-2">
        <CreditCard className="h-6 w-6 text-expense-primary" />
        <h1 className="text-2xl font-bold text-center">Expense Tracker</h1>
      </div>
      <p className="text-center text-muted-foreground mt-1">
        Manage and track your expenses easily
      </p>
    </header>
  );
};

export default Header;
