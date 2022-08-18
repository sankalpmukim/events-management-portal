import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/Layout";

const CrudEvents: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>{`Crud on Events`}</title>
      </Head>

      <Layout
        session={session}
        pageTitle="CRUD on Events made by you"
        currentPage="CRUD on Events"
      >
        <div>CrudEvents</div>
      </Layout>
    </>
  );
};

export default CrudEvents;
