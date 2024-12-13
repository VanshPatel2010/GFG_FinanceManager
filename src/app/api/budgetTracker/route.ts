import { NextResponse } from 'next/server';
import { Budget, Category, Expense } from '@/app/models/budgetTracker'; // Assuming the Budget schema is defined in models/Budget
import {connect} from '@/app/utils/db'; // Function to connect to MongoDB

// Connect to database
connect();

// Get the budget
export async function GET() {
  try {
    const budget = await Budget.findOne();
    return NextResponse.json({ total: budget ? budget.total : 0 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch budget' }, { status: 500 });
  }
}

// Set a new budget
export async function POST(req: Request) {
  try {
    const { total } = await req.json();
    let budget = await Budget.findOne();

    if (budget) {
      budget.total = total;
      await budget.save();
    } else {
      budget = await Budget.create({ total });
    }

    return NextResponse.json({ total: budget.total });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set budget' }, { status: 500 });
  }
}

// Update the budget (add an additional amount)
export async function PUT(req: Request) {
  try {
    const { additionalAmount } = await req.json();
    const budget = await Budget.findOne();

    if (!budget) {
      return NextResponse.json({ error: 'Budget not found' }, { status: 404 });
    }

    budget.total += additionalAmount;
    await budget.save();

    return NextResponse.json({ total: budget.total });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update budget' }, { status: 500 });
  }
}
