import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import mongoose from 'mongoose'
import Group from '@/models/Group'
import { authOptions } from '../../../auth/[...nextauth]/route'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = params

  try {
    await mongoose.connect(process.env.MONGODB_URI!)
    const group = await Group.findOne({
      _id: id,
      members: session.user.email
    })

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    }

    return NextResponse.json(group)
  } catch (error) {
    console.error('Error fetching group:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

