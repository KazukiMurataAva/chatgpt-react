import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "./firebase";
import { User, signInWithRedirect } from "firebase/auth";

interface UserInfoProps {
  user: User | null;
}

function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      {user && <img src={user.photoURL as string} alt="User" />}
    </>
  );
}

function SignInButton() {
  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <p>Googleでログイン</p>
    </button>
  );
}

function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>
      <p>サインアウト</p>
    </button>
  );
}

function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <>
          <UserInfo user={user} />
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </div>
  );
}

export default Home;
