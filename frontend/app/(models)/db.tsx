// app/(models)/PostComponent.tsx
import { ObjectId } from "mongodb";
import clientPromise from "../_lib/mongodb";

export interface Analytics {
  happiness: number;
  sadness: number;
  fear: number;
  anger: number;
  surprise: number;
  disgust: number;
  concern: number;
}

export interface Reply {
  user_id: string;
  content: string;
  createdAt: string;
}

export interface Post {
  _id?: ObjectId;
  user_id: string; // "Primary"
  date: string; // "Primary"
  content: string;
  title: string;
  isPrivate: boolean;
  tags: string[];
  coordinate: [number, number];
  duration: number;
  analytics: Analytics;
  replies: Reply[];
}

export interface User {
  user_id: string;
  username: string;
  profilePicture: string;
  friends: string[];
}

// Returns all posts
export async function Posts() {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const posts = await db.collection("Post").find({}).toArray();

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return sortedPosts;
}

// Returns all posts given a user_id
export async function PostsId(user_id_in: string) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const posts = await db
    .collection("Post")
    .find({ user_id: user_id_in })
    .toArray();
  console.log(posts);
  return posts;
}

// Returns a given dream given user_id and date
export async function ExactPost(user_id: string, date: Date) {
  console.log(user_id + " " + date);
  const client = await clientPromise;
  const db = client.db("Dreams");
  const post = await db.collection("Post").findOne({
    user_id: user_id,
    date: {
      $eq: date,
    },
  });
  return post;
}

// Returns coords of a given dream takes in user_id and date
export async function Coord(user_id: string, date: Date) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const post = await db.collection("Post").findOne(
    {
      user_id: user_id,
      date: {
        $eq: date,
      },
    },
    {
      projection: { coordinate: 1 },
    }
  );

  if (post == null || post.coordinate == null) {
    return [];
  }
  return post.coordinate;
}

// Returns analytics and duration for a given dream; takes in user_id and date
export async function Reply(user_id: string, date: Date) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const posts = await db
    .collection("Post")
    .find(
      {
        user_id: user_id,
        date: {
          $eq: date,
        },
      },
      {
        projection: { replies: 1 },
      }
    )
    .toArray();

  const result = posts.map((post) => ({
    replies: post.replies,
  }));
  return result;
}

// adds reply for a post
export async function AddReply(
  post_id: string,
  user_id: string,
  content: string,
  post_date: string,
  reply_date: string
) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const parsedDate = new Date().toISOString().split("T")[0];
  const reply = { user_id, content, createdAt: parsedDate };

  // Find the post to get the existing replies
  const post = await db
    .collection("Post")
    .findOne({ user_id: post_id, date: post_date });

  if (!post) {
    throw new Error("Post not found");
  }

  let replies = JSON.parse(post.replies);

  // Add the new reply to the replies array
  replies.push(reply);

  // Update the post by stringifying the updated replies array and storing it back
  await db.collection("Post").updateOne(
    { user_id: post_id, date: post_date },
    {
      $set: {
        replies: JSON.stringify(replies), // Stringify the updated replies array
      },
    }
  );
  // console.log(posts);
  // return posts;
}

// get comments for a dream
export async function Analytics(user_id: string, date: Date) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const posts = await db
    .collection("Post")
    .find(
      {
        user_id: user_id,
        date: {
          $eq: date,
        },
      },
      {
        projection: { analytics: 1, duration: 1 },
      }
    )
    .toArray();

  const result = posts.map((post) => ({
    analytics: post.analytics,
    duration: post.duration,
  }));
  return result;
}

// last week of dreams durations and dates
export async function LastDreams(user_id: string) {
  const client = await clientPromise;
  const db = client.db("Dreams");

  const posts = await db
    .collection("Post")
    .find(
      { user_id: user_id },
      {
        projection: { duration: 1, date: 1 },
      }
    )
    .toArray();

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let x = Math.min(sortedPosts.length, 7);
  const result = sortedPosts.slice(0, x).map((post) => ({
    duration: post.duration,
    date: post.date,
  }));

  return result.reverse();
}

/*
 *   All functions below here are friend functions
 */

// Returns user info
export async function getInfo(user_id: string) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const user = await db
    .collection("User")
    .findOne({ user_id }, { projection: { profilePicture: 1, username: 1 } });

  if (!user) {
    throw new Error("User not found");
  }
  return {
    username: user.username,
    profilePicture: user.profilePicture,
  };
}

// Returns all friends of a given user_id (must be mutuals)
export async function Frens(user_id: string) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const user = await db.collection("User").findOne({ user_id });

  if (user && user.friends && user.friends.length > 0) {
    // Find users whose `friends` array contains the given user_id
    const mutualFriends = await db
      .collection("User")
      .find({
        user_id: { $in: user.friends },
        friends: user_id,
      })
      .toArray();

    return mutualFriends;
  } else {
    return [];
  }
}

// returns all users with friend requests to our current user_id
export async function IncFrenReq(user_id: string) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const user = await db.collection("User").findOne({ user_id });

  if (user) {
    const oneSidedFriends = await db
      .collection("User")
      .find({
        friends: user_id,
        user_id: { $nin: user.friends },
      })
      .toArray();

    return oneSidedFriends;
  } else {
    return [];
  }
}

// returns all outgoing friend requests
export async function OutFrenReq(user_id: string) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const user = await db.collection("User").findOne({ user_id });

  if (user && user.friends && user.friends.length > 0) {
    const oneSidedFriends = await db
      .collection("User")
      .find({
        user_id: { $in: user.friends },
        friends: { $nin: [user_id] },
      })
      .toArray();

    return oneSidedFriends;
  } else {
    return [];
  }
}
