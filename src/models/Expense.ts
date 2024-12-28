// import mongoose, { Document } from 'mongoose';

// export interface IExpense extends Document {
//   description: string;
//   amount: number;
//   paidBy: string;
//   splitAmong: string[];
//   date: Date;
// }

// const ExpenseSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   paidBy: {
//     type: String,
//     required: true,
//   },
//   splitAmong: {
//     type: [String],
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Expense = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

// export default Expense;

// 2nd
// import mongoose, { Document } from 'mongoose';

// export interface IExpense extends Document {
//   description: string;
//   amount: number;
//   paidBy: mongoose.Types.ObjectId;
//   splitAmong: mongoose.Types.ObjectId[];
//   date: Date;
// }

// const ExpenseSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   paidBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   splitAmong: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   }],
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Expense = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

// export default Expense;

import mongoose, { Document } from 'mongoose';

export interface IExpense extends Document {
  description: string;
  amount: number;
  paidBy: string; // email
  splitAmong: string[]; // array of emails
  groupId: mongoose.Types.ObjectId;
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
  splitAmong: [{
    type: String,
    required: true,
  }],
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.models.Expense || mongoose.model<IExpense>('Expense', ExpenseSchema);

export default Expense;


