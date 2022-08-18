import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

export const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="container">
        Welcome user
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="container">
      Click to sign into your user account <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Home;
