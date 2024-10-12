import { NextResponse } from "next/server";
import { PostsId } from "../../../../(models)/db";

export async function GET(req, { params }) {
  const { user_id } = params;
  console.log("Reached the userid postId method");
  try {
    const posts = await PostsId(user_id);
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
