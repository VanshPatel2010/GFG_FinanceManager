import { NextResponse } from 'next/server';
import {Category} from '@/app/models/Budget'; // Assuming the Category schema is defined in models/Category
import {connect} from '@/app/lib/mongodb';

// Connect to database
connect();

// Get all categories
export async function GET() {
  try {
    const categories = await Category.find();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// Create a new category
export async function POST(req: Request) {
  try {
    const { name, idealAmount } = await req.json();
    const category = await Category.create({ name, idealAmount });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

// Delete a category
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
