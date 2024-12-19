export interface Expense {
  description: string;
  amount: number;
  date: Date;
}

export interface Category {
  name: string;
  allocation: number;
  expenses: Expense[];
}

export interface Budget {
  _id?: string;  // MongoDB ObjectId, optional as it might not exist for new budgets
  userId: string;
  totalBudget: number;
  categories: Category[];
}

