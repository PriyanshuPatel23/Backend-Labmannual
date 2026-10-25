import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { UserID, OldPassword, NewPassword } = await request.json();

    if (!Number.isInteger(Number(UserID)) ||
        !OldPassword || !NewPassword || NewPassword.length < 8) {
      return NextResponse.json(
        { message: "Enter valid details and a password of at least 8 characters" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { UserID: Number(UserID) }
    });

    if (!user || !(await bcrypt.compare(OldPassword, user.PasswordHash))) {
      return NextResponse.json(
        { message: "Invalid user ID or old password" },
        { status: 401 }
      );
    }

    const PasswordHash = await bcrypt.hash(NewPassword, 10);

    await prisma.user.update({
      where: { UserID: Number(UserID) },
      data: { PasswordHash }
    });

    return NextResponse.json({ message: "Password changed successfully" });
  } catch {
    return NextResponse.json(
      { message: "Unable to change password" },
      { status: 400 }
    );
  }
}