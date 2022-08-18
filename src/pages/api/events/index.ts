// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../auth/[...nextauth]";

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { q } = req.query;
      if (typeof q === "string") {
        if (q !== "") {
          const events = await prisma.events.findMany({
            where: {
              OR: [{ name: { contains: q } }, { description: { contains: q } }],
            },
          });
          res.status(200).json({ data: events });
        } else {
          const events = await prisma.events.findMany();
          res.status(200).json({ data: events });
        }
      } else if (typeof q === "undefined") {
        const events = await prisma.events.findMany();
        res.status(200).json({ data: events });
      } else {
        res.status(400).json({ error: "Invalid query" });
      }
    } else if (req.method === "POST") {
      const session = await getServerSession(req, res, nextAuthOptions);
      // need to be logged in
      if (!session) return res.status(401).json({ error: "Unauthorized" });
      // only admins can access this endpoint
      if (!session?.user?.role || session?.user?.role !== "admin")
        return res.status(403).json({ error: "Forbidden" });
      const {
        name,
        description,
        seatsLeft,
        totalSeats,
        location,
        start,
        end,
        url,
        image,
      } = req.body;
      if (
        typeof name === "string" &&
        typeof description === "string" &&
        typeof seatsLeft === "number" &&
        typeof totalSeats === "number" &&
        typeof location === "string" &&
        (typeof start === "number" || typeof start === "string") &&
        (typeof end === "number" || typeof end === "string") &&
        typeof url === "string" &&
        typeof image === "string"
      ) {
        let startDateTime: Date, endDateTime: Date;
        try {
          startDateTime = new Date(start);
          endDateTime = new Date(end);
        } catch (e) {
          return res.status(400).json({ error: "Invalid date format" });
        }
        console.log(startDateTime, endDateTime);
        const event = await prisma.events.create({
          data: {
            name,
            description,
            seatsLeft,
            totalSeats,
            location,
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
            url,
            image,
            adminId: session?.user?.id,
          },
        });
        return res.status(201).json({ data: event });
      } else {
        console.log(
          `name, description, seatsLeft, totalSeats, location, start, end, url, image`
        );
        return res.status(400).json({ error: "Invalid request body" });
      }
    } else {
      // method not allowed
      return res.status(405).json({ error: "Method not allowed" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default events;
