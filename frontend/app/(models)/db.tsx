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
  createdAt: Date;
}

export interface Post {
  _id?: ObjectId;
  user_id: string; // "Primary"
  date: Date; // "Primary"
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
  return posts;
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

/*
 * ADDING TO DB
 */

// adds a dream given a Post; must follow interface above
export async function AddDream(dream: Post) {
  const client = await clientPromise;
  const db = client.db("Dreams");
  const res = await db.collection("Post").insertOne(dream);

  return res.insertedId;
}
