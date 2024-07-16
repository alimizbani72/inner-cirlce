import { NextResponse } from "next/server";

export async function POST() {
  // Simulate a delay of 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return NextResponse.json({ message: "incorrect keyword, please try again" }, { status: 200 });
}
