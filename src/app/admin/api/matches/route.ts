import connectDB from '../../../../../libs/mongodb';
import Match from '../../../../../models/Match';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const matches = await Match.find();
  return NextResponse.json(matches);
}

export async function POST(request: Request) {
  const body = await request.json();
  await connectDB();
  const newMatch = await Match.create(body);
  return NextResponse.json(newMatch);
}