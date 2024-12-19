import { NextResponse } from 'next/server';
import {connect } from '@/app/lib/mongodb';
import Balance from '@/app/models/balanceTracker';
connect(); // Ensure database is connected

// Calculate the current balance
export async function GET() {
  try {
    const transactions = await Balance.find({});

    const currentBalance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'income'
        ? acc + transaction.amount
        : acc - transaction.amount;
    }, 0);

    return NextResponse.json({ success: true, balance: currentBalance });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to calculate balance', error: error.message },
      { status: 500 }
    );
  }
}
