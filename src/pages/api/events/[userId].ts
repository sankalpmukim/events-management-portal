// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../auth/[...nextauth]";

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, nextAuthOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });
    if (req.method === "GET") {
      const { userId } = req.query;
      if (typeof userId === "string") {
        const events = await prisma.eventRegistration.findMany({
          where: {
            userId: userId,
          },
          include: {
            event: true,
          },
        });
        return res.status(200).json({ data: events.map((e) => e.event) });
      }
    } else if (req.method === "POST") {
      // if (!session?.user?.role || session?.user?.role !== "admin")
      //   return res.status(403).json({ error: "Forbidden" });

      const { userId: eventId } = req.query;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const userId = session!.user!.id!;
      if (typeof eventId !== "string")
        return res.status(400).json({ error: "Bad Request, event not found" });
      // check numSeatsLeft in event
      const event = await prisma.events.findFirst({
        where: {
          id: eventId,
        },
      });
      if (!event) return res.status(404).json({ error: "Event not found" });
      // check seats left
      if (event.seatsLeft <= 0)
        return res.status(400).json({ error: "All seats filled" });
      // check user is not already registered for this event
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
        include: {
          EventRegistration: true,
        },
      });
      if (!user) return res.status(404).json({ error: "User not found" });

      const existingEventRegistrationCheck = prisma.eventRegistration.findFirst(
        {
          where: {
            userId: userId,
            eventId: eventId,
          },
        }
      );
      if (!existingEventRegistrationCheck)
        return res.status(400).json({ error: "User already registered" });
      // register user for event
      const eventRegistration = await prisma.eventRegistration.create({
        data: {
          userId: userId,
          eventId: eventId,
        },
      });
      // subtract seats left
      await prisma.events.update({
        where: {
          id: eventId,
        },
        data: {
          seatsLeft: event.seatsLeft - 1,
        },
      });
      return res.status(201).json({ data: eventRegistration });
    } else if (req.method === "PATCH") {
      if (!session?.user?.role || session?.user?.role !== "admin")
        return res.status(403).json({ error: "Forbidden" });
      const { userId: eventId } = req.query;
      console.log(`eventId`, eventId);
      if (typeof eventId !== "string")
        return res.status(400).json({ error: "Invalid query" });
      const s = await prisma.events.update({
        where: {
          id: eventId,
        },
        data: {
          ...{ ...req.body, eventId: undefined },
        },
      });
      if (s) return res.status(200).json({ data: s });
      return res.status(404).json({ error: "Registration not found" });
    } else if (req.method === "DELETE") {
      if (!session?.user?.role || session?.user?.role !== "admin")
        return res.status(403).json({ error: "Forbidden" });
      const { userId: eventId } = req.query;
      console.log(`eventId`, eventId);
      if (typeof eventId !== "string")
        return res.status(400).json({ error: "Invalid query" });
      const s = await prisma.events.delete({
        where: {
          id: eventId,
        },
      });
      if (s) return res.status(200).json({ data: s });
      return res.status(404).json({ error: "Registration not found" });
    } else {
      // method not allowed
      return res.status(405).json({ error: "Method not allowed" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default events;
