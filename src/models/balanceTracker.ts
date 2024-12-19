// import mongoose, { Schema, Document, model } from 'mongoose';

// interface IBalance extends Document {
//   type: 'income' | 'expense'; // Either income or expense
//   amount: number;            // Amount of the balance entry
//   date: Date;                // Date of the transaction
// }

// const BalanceSchema: Schema = new Schema({
//   type: {
//     type: String,
//     enum: ['income', 'expense'],
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
// });

// const Balance = model<IBalance>('Balance', BalanceSchema);

// export default Balance;

import mongoose from 'mongoose';

const BalanceSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['income', 'expense'], // Restrict to 'income' or 'expense'
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Balance = mongoose.models.Balance || mongoose.model('Balance', BalanceSchema);

export default Balance;
