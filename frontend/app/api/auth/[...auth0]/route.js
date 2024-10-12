import { handleAuth } from "@auth0/nextjs-auth0";
export const GET = handleAuth();
export const POST = handleAuth();
{
  /* reserved for app/[...]/page.tsx
import { getSession } from '@auth0/nextjs-auth0';
export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    // Redirect to login if no session
    return { redirect: { destination: '/api/auth/login', permanent: false } };
  }
  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
    </div>
  );
}
*/
}
