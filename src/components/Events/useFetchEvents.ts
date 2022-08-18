import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";

interface Options {
  q?: string;
}

type Status = "loading" | "success" | "error";

const useFetchEvents = ({ q }: Options) => {
  const [status, setStatus] = useState<Status>("loading");
  const [events, setEvents] = useState<Prisma.EventsSelect[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  useEffect(() => {
    console.log("useEffect");
    const asFn = async () => {
      try {
        if (typeof q === "undefined" || q === "") {
          setStatus("loading");
          const res = await fetch("http://localhost:3000/api/events");
          if (res.ok) {
            const data = (await res.json()) as Prisma.EventsSelect[];
            setEvents(data);
            setStatus("success");
            console.log(data);
          } else {
            setStatus("error");
            setErrorMsg(res.statusText);
          }
        } else {
          setStatus("loading");
          const res = await fetch(`http://localhost:3000/api/events?q=${q}`);
          if (res.ok) {
            const data = (await res.json()) as Prisma.EventsSelect[];
            setEvents(data);
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
  }, [q]);
  return { status, events, errorMsg };
};

export default useFetchEvents;
