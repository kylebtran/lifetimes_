import { NextResponse } from "next/server";
import { AddReply } from "../../../(models)/db";

export async function POST(req, res) {
  const { post_id, user_id, content, post_date } = await req.json();

  try {
    const parsedDate = new Date().toISOString().split("T")[0];
    const res = await AddReply(
      post_id,
      user_id,
      content,
      post_date,
      parsedDate
    );
    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding reply" },
      { status: 500 }
    );
  }
}
