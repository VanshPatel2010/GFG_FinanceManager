// import { NextResponse } from 'next/server';
// import {connect } from '@/app/utils/db';
// import Balance from '@/app/models/balanceTracker'; // Import your Balance schema
// import { HydratedDocument } from 'mongoose';

// connect();
// export async function GET(): Promise<NextResponse> {
//   try {


//     const data = () => {
//       return Balance.find({});
//     }
//     const balances = await data();
//     return NextResponse.json({ success: true, data: balances });
//   } catch (err : any) {
//     return NextResponse.json(
//       { success: false, message: 'Failed to fetch balances', error: err.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: Request): Promise<NextResponse> {
//   try {
    

//     const body = await req.json();

//     // Create a new balance document using the schema
//     const newBalance = new Balance({
//       type: body.type,
//       amount: body.amount,
//       date: body.date,
//     });

//     // Validate the document before saving
//     await newBalance.validate();

//     // Save the document to the database
//     const savedBalance = await newBalance.save();

//     return NextResponse.json({ success: true, data: savedBalance }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, message: 'Failed to save balance', error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import {connect } from '@/app/utils/db'; // Replace with your database connection logic
import Balance from '@/app/models/balanceTracker';
connect(); // Ensure database is connected

// Fetch all transactions
export async function GET() {
  try {
    const transactions = await Balance.find({}).sort({ date: -1 }); // Sort by most recent first
    return NextResponse.json({ success: true, data: transactions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch balances', error: error.message },
      { status: 500 }
    );
  }
}

// Add a new transaction
export async function POST(req: Request) {
  try {
    const { type, amount, date } = await req.json();

    if (!type || !amount) {
      return NextResponse.json(
        { success: false, message: 'Type and amount are required' },
        { status: 400 }
      );
    }

    const transaction = new Balance({
      type,
      amount,
      date: date || new Date(),
    });

    await transaction.save();

    return NextResponse.json({ success: true, message: 'Transaction added successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to add transaction', error: error.message },
      { status: 500 }
    );
  }
}
