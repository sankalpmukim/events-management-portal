// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../auth/[...nextauth]";

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getServerSession(req, res, nextAuthOptions);
    if (session) {
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
      } else {
        // method not allowed
        return res.status(405).json({ error: "Method not allowed" });
      }
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default events;
