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
            onSubmit={async () => {
              console.log(`submitting ${text}`);
              const res = await fetch(`/api/verify`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ registrationId: text }),
              });
              if (res.ok) {
                alert("Successfully verified");
              } else {
                alert((await res.json()).error);
              }
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
