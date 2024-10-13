import { NextResponse } from "next/server";
import { Reply } from "../../../../../(models)/db";

export async function GET(req, { params }) {
  const { user_id, date } = params;
  try {
    const parsedDate = new Date(date);
    const posts = await Reply(user_id, parsedDate.toISOString().split("T")[0]);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
