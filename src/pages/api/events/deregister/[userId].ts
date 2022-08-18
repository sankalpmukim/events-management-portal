// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../../auth/[...nextauth]";

const deregister = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, nextAuthOptions);
    if (!session) return res.status(401).json({ error: "Unauthorized" });
    if (req.method === "DELETE") {
      //   if (!session?.user?.role || session?.user?.role !== "admin")
      //     return res.status(403).json({ error: "Forbidden" });
      const { userId: eventId } = req.query;
      //   console.log(`eventId`, eventId);
      if (typeof eventId !== "string")
        return res.status(400).json({ error: "Invalid query" });
      console.log(eventId, session?.user?.id);
      const eventReg = await prisma.eventRegistration.findFirst({
        where: {
          AND: [
            {
              eventId,
            },
            {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              userId: session!.user!.id!,
            },
          ],
        },
      });
      if (!eventReg)
        return res.status(400).json({
          error: "Registration not found",
        });
      const s = await prisma.eventRegistration.delete({
        where: {
          id: eventReg.id,
        },
      });
      // increase seat in event
      const d = await prisma.events.findFirst({
        where: {
          id: eventId,
        },
      });
      if (!d) return res.status(400).json({ error: "Event not found" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updated = await prisma.events.update({
        where: {
          id: eventId,
        },
        data: {
          seatsLeft: d.seatsLeft + 1,
        },
      });
      return res.status(200).json({
        data: `Succesfully deleted ${s.id}`,
      });
    } else {
      // method not allowed
      return res.status(405).json({ error: "Method not allowed" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default deregister;
