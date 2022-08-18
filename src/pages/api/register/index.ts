// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // register is a post request only
    if (req.method === "POST") {
      const { userId, eventId } = req.body;
      // check numSeatsLeft in event
      const event = await prisma.events.findFirst({
        where: {
          id: eventId,
        },
      });
      if (event) {
        // check seats left
        if (event.seatsLeft > 0) {
          // check user is not already registered for this event
          const user = await prisma.user.findFirst({
            where: {
              id: userId,
            },
            include: {
              EventRegistration: true,
            },
          });
          if (user) {
            const existingEventRegistrationCheck = user.EventRegistration.find(
              (registration) => registration.eventId === eventId
            );
            if (!existingEventRegistrationCheck) {
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
              return res.status(200).json({ data: eventRegistration });
            } else {
              return res.status(400).json({ error: "User already registered" });
            }
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        } else {
          return res.status(400).json({ error: "All seats filled" });
        }
      } else {
        return res.status(404).json({ error: "Event not found" });
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

export default register;
