import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../../components/Layout";

const VerifyEventReg: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>{`Verify Events`}</title>
      </Head>

      <Layout
        session={session}
        pageTitle="Verify Event registration of participants"
        currentPage="Verify Events"
      >
        <div>CrudEvents</div>
      </Layout>
    </>
  );
};

export default VerifyEventReg;
