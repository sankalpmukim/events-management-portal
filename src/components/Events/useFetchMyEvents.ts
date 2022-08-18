import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Options {
  q?: string;
}

type Status = "loading" | "success" | "error";

const useFetchMyEvents = ({ q }: Options) => {
  const [status, setStatus] = useState<Status>("loading");
  const [events, setEvents] = useState<Prisma.EventsGetPayload<true>[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { data: session } = useSession();
  useEffect(() => {
    console.log("useEffect");
    const asFn = async () => {
      try {
        if (typeof q === "undefined" || q === "") {
          setStatus("loading");
          const res = await fetch(`/api/events/${session?.user?.id ?? ``}`);
          if (res.ok) {
            const data = (await res.json()).data as {
              event: Prisma.EventsGetPayload<true>;
            }[];
            setEvents(data.map((d) => d.event));
            setStatus("success");
            console.log(data);
          } else {
            setStatus("error");
            setErrorMsg(res.statusText);
          }
        } else {
          setStatus("loading");
          const res = await fetch(`/api/events?q=${q}`);
          if (res.ok) {
            const data = (await res.json()).data as {
              event: Prisma.EventsGetPayload<true>;
            }[];
            setEvents(data.map((d) => d.event));
            setStatus("success");
            console.log(data);
          } else {
            setStatus("error");
            setErrorMsg(res.statusText);
          }
        }
      } catch (error) {
        setStatus("error");
      }
    };
    asFn();
  }, [q, session?.user?.id]);
  return { status, events, errorMsg };
};

export default useFetchMyEvents;
