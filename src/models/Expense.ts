import mongoose, { Document } from 'mongoose';

export interface IExpense extends Document {
  description: string;
  amount: number;
  paidBy: string;
  splitAmong: string[];
  date: Date;
}

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paidBy: {
    type: String,
    required: true,
  },
  splitAmong: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;

