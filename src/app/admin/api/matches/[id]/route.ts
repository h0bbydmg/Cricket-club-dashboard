import connectDB from '../../../../../../libs/mongodb';
import Match from '../../../../../../models/Match';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();
  await connectDB();
  const updatedMatch = await Match.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updatedMatch);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Match.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Match deleted' });
}