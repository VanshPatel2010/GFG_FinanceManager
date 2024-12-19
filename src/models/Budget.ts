import mongoose from 'mongoose'

const BudgetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  totalBudget: { type: Number, required: true },
  categories: [{
    name: { type: String, required: true },
    allocation: { type: Number, required: true },
    expenses: [{
      description: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now }
    }]
  }]
})

export default mongoose.models.Budget || mongoose.model('Budget', BudgetSchema)

