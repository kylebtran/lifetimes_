// app/api/db/addDream/route.js

import clientPromise from "@/app/_lib/mongodb"; // Adjust the path if necessary
import { NextResponse } from "next/server";

// Handle POST requests
export async function POST(req) {
  try {
    // Parse the request body to get the post data
    const { post } = await req.json();

    // Await the MongoDB connection
    const client = await clientPromise;
    const db = client.db("Dreams");

    // Insert the post into the "Post" collection
    const result = await db.collection("Post").insertOne(post);

    // Return the inserted document ID as a response
    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json({ error: "Failed to add post" }, { status: 500 });
  }
}
