import { useState } from "react";

/* eslint-disable @next/next/no-img-element */
export default function Create() {
  const [data, setData] = useState({
    name: "",
    description: "",
    start: "",
    end: "",
    location: "",
    url: "",
    image: "",
    totalSeats: "",
  });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(data);
        const res = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            totalSeats: Number(data.totalSeats),
            seatsLeft: Number(data.totalSeats),
            image: "https://via.placeholder.com/150",
          }),
        });
        if (res.ok) {
          alert("Event created");
          //   clear form
          setData({
            name: "",
            description: "",
            start: "",
            end: "",
            location: "",
            url: "",
            image: "",
            totalSeats: "",
          });
        } else if (res.status !== 500) {
          alert((await res.json()).error ?? (await res.json()).message);
        } else {
          alert("Something went wrong");
        }
      }}
      className="space-y-8 divide-y divide-gray-200"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {`Create events`}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {`Create events by filling information here.`}
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {`Name of the event`}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    value={data.name}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                {`Description`}
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value={data.description}
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                />
                <p className="mt-2 text-sm text-gray-500">
                  {`Write a few sentences about the event.`}
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex items-center">
                  <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <img src="/defaultlogo.svg" alt="image for the event" />
                  </span>
                  <button
                    type="button"
                    className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="start-time"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {`Start Time (UTC)`}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="start-time"
                id="start-time"
                autoComplete="given-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                value={data.start}
                onChange={(e) => {
                  setData({ ...data, start: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {`End time (UTC)`}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                value={data.end}
                onChange={(e) => {
                  setData({ ...data, end: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {`URL`}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  {`https://`}
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  value={data.url}
                  onChange={(e) => {
                    setData({ ...data, url: e.target.value });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {`Total Seats`}
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="postal-code"
                id="postal-code"
                autoComplete="postal-code"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                value={data.totalSeats}
                onChange={(e) => {
                  // remove all non numeric characters
                  setData({
                    ...data,
                    totalSeats: e.target.value.replace(/[^0-9]/g, ""),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
