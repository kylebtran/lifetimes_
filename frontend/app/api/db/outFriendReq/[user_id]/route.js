import { NextResponse } from "next/server";
import { OutFrenReq } from "../../../../(models)/db";

export async function GET(req, { params }) {
  const { user_id } = params;
  try {
    const posts = await OutFrenReq(user_id);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
