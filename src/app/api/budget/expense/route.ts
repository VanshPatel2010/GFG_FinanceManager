import { NextResponse } from 'next/server';
import {Category, Expense, Budget} from '@/app/models/Budget'; // Assuming the Category schema is defined in models/Category
import {connect} from '@/app/lib/mongodb';

// Connect to database
connect();

// Get all expenses
export async function GET() {
  try {
    const expenses = await Expense.find().populate('category', 'name');
    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
  }
}

// Add a new expense
export async function POST(req: Request) {
  try {
    const { amount, categoryId, budgetId } = await req.json();

    const budget = await Budget.findById(budgetId);
    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    if (budget.total < amount) {
      return NextResponse.json({ error: 'Insufficient budget' }, { status: 400 });
    }

    const expense = await Expense.create({ amount, category: categoryId });
    budget.total -= amount;
    await budget.save();

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add expense' }, { status: 500 });
  }
}
