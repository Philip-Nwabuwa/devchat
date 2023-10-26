import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  await connectMongoDB();
  const user = await db.collection<User>("users").findOne({ email });

  return user ? NextResponse.json({ user }) : NextResponse.json({ user: null });
}
