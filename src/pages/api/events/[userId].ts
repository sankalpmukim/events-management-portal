// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
        return res.status(200).json({ data: events });
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default events;
