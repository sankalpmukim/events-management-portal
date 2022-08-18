import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Create from "../../components/CRUDEvents/Create";
import Layout from "../../components/Layout";

const CrudEvents: NextPage = () => {
  const { data: session } = useSession({ required: true });
  return (
    <>
      <Head>
        <title>{`Crud on Events`}</title>
      </Head>

      <Layout
        session={session}
        pageTitle="CRUD on Events made by you"
        currentPage="CRUD Events"
      >
        <Create />
      </Layout>
    </>
  );
};

export default CrudEvents;
