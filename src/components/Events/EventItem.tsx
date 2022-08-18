/* eslint-disable @next/next/no-img-element */
import { Prisma } from "@prisma/client";
import React, { useState } from "react";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  MailIcon,
  XIcon,
} from "@heroicons/react/solid";
import { getDottedString } from "../../utils";
import { useSession } from "next-auth/react";
import moment from "moment";

interface Props {
  event: Prisma.EventsGetPayload<true>;
  registered: boolean;
}
const EventItem = ({ event, registered = false }: Props) => {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { data: session } = useSession();
  return (
    <>
      {/* //{" "}
      <pre>
        // <code>{JSON.stringify(event, null, 4)}</code>
        //{" "}
      </pre> */}
      <li key={event.id}>
        <a href={`#`} className="block hover:bg-gray-50">
          <div className="flex items-center px-4 py-4 sm:px-6">
            <div className="min-w-0 flex-1 flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full"
                  src={event.image}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    {event.name}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <MailIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span className="truncate">
                      {`${getDottedString(event.description, 97)}`}
                    </span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      From{" "}
                      <time dateTime={new Date(event.start).toISOString()}>
                        {new Date(event.start).toLocaleString()} to{" "}
                        {new Date(event.end).toLocaleString()}
                      </time>
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <CheckCircleIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                      {registered
                        ? `Event starts ${moment(event.start).fromNow()}`
                        : `${event.seatsLeft} seat(s) left`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {session ? (
              <button
                className="border rounded p-2"
                onClick={async () => {
                  console.log(session.user?.id, event.id);
                  setBtnDisabled(true);
                  try {
                    let res;
                    if (!registered) {
                      res = await fetch(`/api/events/${event.id}`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                    } else {
                      res = await fetch(`/api/events/deregister/${event.id}`, {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      });
                    }
                    if (res.ok) {
                      alert(`Successfully deregistered for ${event.name}`);
                      setBtnDisabled(false);
                    } else {
                      if (res.status !== 500) {
                        alert((await res.json()).error);
                        setBtnDisabled(false);
                      } else {
                        console.error((await res.json()).error);
                        alert("An error occurred");
                        setBtnDisabled(false);
                      }
                    }
                  } catch (error) {
                    alert("An error occurred");
                    console.error(error);
                    setBtnDisabled(false);
                  }
                }}
                title={`Register for "${event.name}"`}
                disabled={btnDisabled}
              >
                {!registered ? (
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <XIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            ) : (
              <span>{`Login to register`}</span>
            )}
          </div>
        </a>
      </li>
    </>
  );
};

export default EventItem;
