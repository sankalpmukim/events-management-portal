/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import EventsList from "../components/Events/List";
import useFetchEvents from "../components/Events/useFetchEvents";
import Layout from "../components/Layout";

export const Home: NextPage = () => {
  const { data: session } = useSession();
  const [q, setQ] = useState<string>("");
  const { status, events, errorMsg } = useFetchEvents({ q });

  return (
    <Layout
      enableSearch
      pageTitle="Events"
      session={session}
      onSubmit={(str: string) => {
        console.log("submit called");
        setQ(str);
      }}
    >
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>{errorMsg}</div>}
      {status === "success" && <EventsList data={events} />}
    </Layout>
  );
};

export default Home;
