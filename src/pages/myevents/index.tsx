/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import EventsList from "../../components/Events/EventsList";
import useFetchMyEvents from "../../components/Events/useFetchMyEvents";
import Layout from "../../components/Layout";

export const Home: NextPage = () => {
  const { data: session } = useSession();
  const [q, setQ] = useState<string>("");
  const { status, events, errorMsg } = useFetchMyEvents({ q });

  return (
    <>
      <Head>
        <title>{`My Events`}</title>
      </Head>
      <Layout
        enableSearch
        pageTitle="My Events"
        session={session}
        onSubmit={(str: string) => {
          console.log("submit called");
          setQ(str);
        }}
        currentPage="My Events"
      >
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>{errorMsg}</div>}
        {status === "success" && <EventsList registered data={events} />}
      </Layout>
    </>
  );
};

export default Home;
