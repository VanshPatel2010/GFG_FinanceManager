import mongoose, { Schema, Document, Model } from 'mongoose';

// Interfaces for TypeScript
interface IBudget extends Document {
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ICategory extends Document {
  name: string;
  idealAmount: number;
  budget: mongoose.Types.ObjectId;
  createdAt: Date;
}

interface IExpense extends Document {
  amount: number;
  category: mongoose.Types.ObjectId;
  budget: mongoose.Types.ObjectId;
  createdAt: Date;
}

// Budget Schema
const BudgetSchema: Schema = new Schema<IBudget>(
  {
    total: {
      type: Number,
      required: true,
      default: 0.0,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Category Schema
const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    idealAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget',
      required: true,
    },
  },
  { timestamps: true }
);

// Expense Schema
const ExpenseSchema: Schema = new Schema<IExpense>(
  {
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Budget',
      required: true,
    },
  },
  { timestamps: true }
);

// Models
const Budget: Model<IBudget> = mongoose.models.Budget || mongoose.model<IBudget>('Budget', BudgetSchema);
const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

export { Budget, Category, Expense };
