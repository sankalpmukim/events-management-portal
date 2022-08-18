// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { q } = req.query;
      if (typeof q === "string") {
        const events = await prisma.events.findMany({
          where: {
            OR: [{ name: { contains: q } }, { description: { contains: q } }],
          },
        });
        res.status(200).json({ data: events });
      } else if (typeof q === "undefined") {
        const events = await prisma.events.findMany();
        res.status(200).json({ data: events });
      } else {
        res.status(400).json({ error: "Invalid query" });
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
