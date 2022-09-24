import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  if (router.pathname == '/user/signup') return;

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button id='sign-out-button' onClick={() => signOut()}>
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button id='sign-in-button' onClick={() => signIn()}>
        Sign in
      </button>
      <button id='sign-up-button' onClick={() => router.push('/user/signup')}>
        Sign up
      </button>
    </>
  );
}
