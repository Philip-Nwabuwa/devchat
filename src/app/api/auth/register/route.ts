import User from "@/app/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { username: name, email, password, image } = data;
    await connectMongoDB();

    console.log(name, email, password, image);

    const emailExist = await User.findOne({ email }).select("_id");
    const userName = name.toLowerCase();
    console.log(userName);

    const userNameExist = await User.findOne({ name: userName }).select("_id");

    if (emailExist) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    } else if (userNameExist) {
      return NextResponse.json(
        { message: "Username already exist" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, image });

    console.log(name, email, hashedPassword, image);

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user" },
      { status: 500 }
    );
  }
}
