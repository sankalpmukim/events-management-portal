// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../auth/[...nextauth]";

const events = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST")
      return res.status(405).json({ error: "Method not allowed" });
    const session = await getServerSession(req, res, nextAuthOptions);
    // need to be logged in
    if (!session) return res.status(401).json({ error: "Unauthorized" });
    // only admins can access this endpoint
    if (!session?.user?.role || session?.user?.role !== "admin")
      return res.status(403).json({ error: "Forbidden" });
    const { registrationId } = req.body;
    if (typeof registrationId !== "string")
      return res.status(400).json({ error: "Invalid registrationId" });
    const registration = await prisma.eventRegistration.update({
      where: {
        id: registrationId,
      },
      data: {
        registrationApproved: true,
      },
    });
    res.status(200).json({ data: registration });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export default events;
