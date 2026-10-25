import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { UserName, Email, Password } = await request.json();

    if (!UserName || !Email || !Password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const PasswordHash = await bcrypt.hash(Password, 10);

    const user = await prisma.user.create({
      data: { UserName, Email, PasswordHash },
      select: { UserID: true, UserName: true, Email: true }
    });

    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Registration failed. Check the input or existing email." },
      { status: 400 }
    );
  }
}
