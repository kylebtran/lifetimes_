import { NextResponse } from "next/server";
import { IncFrenReq } from "../../../../(models)/db";

export async function GET(req, { params }) {
  const { user_id } = params;
  try {
    const posts = await IncFrenReq(user_id);

    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
