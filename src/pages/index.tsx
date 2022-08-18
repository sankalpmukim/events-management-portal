/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "../components/Layout";

export const Home: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <Layout pageTitle="Events" session={session}>
        <div className="container">
          Welcome user {session!.user!.name!}!
          <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout pageTitle="Events" session={session}>
      <div className="container">
        Click to sign into your user account <br />
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </Layout>
  );
};

export default Home;
