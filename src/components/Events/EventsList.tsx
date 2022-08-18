/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */

import { Prisma } from "@prisma/client";
import EventItem from "./EventItem";

interface Props {
  data: Prisma.EventsGetPayload<true>[];
  registered?: boolean;
}

export default function EventsList({ data, registered = false }: Props) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {/* <pre>
          <code>{JSON.stringify(data, null, 4)}</code>
        </pre> */}
        {data.length === 0 && (
          <span className="p-2">{`No results found...`}</span>
        )}
        {data.map((event, index) => (
          <EventItem registered={registered} event={event} key={index} />
        ))}
      </ul>
    </div>
  );
}
