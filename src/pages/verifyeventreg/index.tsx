import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import Layout from "../../components/Layout";
import TextSubmit from "../../components/TextSubmit";

const VerifyEventReg: NextPage = () => {
  const [text, setText] = useState("");
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
        <div>
          <TextSubmit
            label="Enter Code"
            onSubmit={() => {
              console.log(`submitting ${text}`);
            }}
            setText={setText}
            text={text}
          />
        </div>
      </Layout>
    </>
  );
};

export default VerifyEventReg;
